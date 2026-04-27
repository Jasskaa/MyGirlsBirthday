import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trophy, MousePointer2 } from 'lucide-react';

const GRID_SIZE = 14;
const WORDS_TO_FIND = [
  'MANHEER',
  'JASKARAN',
  'MANJIT',
  'JASHAN',
  'RYANVEER',
  'JASSI',
  'AISHMEEN',
  'NIMRAT',
  'NIVAAN',
  'NIYAMAT'
];

interface WordSearchProps {
  onComplete: (score: number) => void;
  embedded?: boolean;
}

interface Cell {
  r: number;
  c: number;
  char: string;
}

const DIRECTIONS = [
  [0, 1],   // horizontal
  [1, 0],   // vertical
  [1, 1],   // diagonal down-right
  [0, -1],  // horizontal reverse
  [-1, 0],  // vertical reverse
  [-1, -1], // diagonal up-left
  [1, -1],  // diagonal down-left
  [-1, 1],  // diagonal up-right
];

const WordSearch: React.FC<WordSearchProps> = ({ onComplete, embedded = false }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [foundPaths, setFoundPaths] = useState<{ r: number; c: number }[][]>([]);

  // Sound/Vibration feedback placeholders
  const hapticFeedback = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const generateGrid = useCallback(() => {
    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const placedWords: string[] = [];

    // Sort words by length for easier placement
    const sortedWords = [...WORDS_TO_FIND].sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const startR = Math.floor(Math.random() * GRID_SIZE);
        const startC = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(newGrid, word, startR, startC, dir)) {
          placeWord(newGrid, word, startR, startC, dir);
          placed = true;
          placedWords.push(word);
        }
        attempts++;
      }
    }

    // Fill remaining cells
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = chars[Math.floor(Math.random() * chars.length)];
        }
      }
    }

    setGrid(newGrid);
  }, []);

  const canPlaceWord = (grid: string[][], word: string, r: number, c: number, dir: number[]) => {
    for (let i = 0; i < word.length; i++) {
      const nextR = r + i * dir[0];
      const nextC = c + i * dir[1];
      if (nextR < 0 || nextR >= GRID_SIZE || nextC < 0 || nextC >= GRID_SIZE) return false;
      if (grid[nextR][nextC] !== '' && grid[nextR][nextC] !== word[i]) return false;
    }
    return true;
  };

  const placeWord = (grid: string[][], word: string, r: number, c: number, dir: number[]) => {
    for (let i = 0; i < word.length; i++) {
      const nextR = r + i * dir[0];
      const nextC = c + i * dir[1];
      grid[nextR][nextC] = word[i];
    }
  };

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  const handleMouseDown = (r: number, c: number) => {
    setIsSelecting(true);
    setStartCell({ r, c });
    setSelectedCells([{ r, c }]);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (!isSelecting || !startCell) return;

    // Calculate selection path
    const dr = r - startCell.r;
    const dc = c - startCell.c;
    
    // Only allow straight lines (horizontal, vertical, diagonal)
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    if (dr === 0 || dc === 0 || absDr === absDc) {
      const steps = Math.max(absDr, absDc);
      const stepR = steps === 0 ? 0 : dr / steps;
      const stepC = steps === 0 ? 0 : dc / steps;

      const newSelection = [];
      for (let i = 0; i <= steps; i++) {
        newSelection.push({
          r: startCell.r + i * stepR,
          c: startCell.c + i * stepC,
        });
      }
      setSelectedCells(newSelection);
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    const selectedWord = selectedCells.map(cell => grid[cell.r][cell.c]).join('');
    const reversedWord = [...selectedWord].reverse().join('');

    if (WORDS_TO_FIND.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords(prev => [...prev, selectedWord]);
      setFoundPaths(prev => [...prev, [...selectedCells]]);
      hapticFeedback();
    } else if (WORDS_TO_FIND.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords(prev => [...prev, reversedWord]);
      setFoundPaths(prev => [...prev, [...selectedCells]]);
      hapticFeedback();
    }

    setSelectedCells([]);
    setStartCell(null);
  };

  const handleTouchStart = (e: React.TouchEvent, r: number, c: number) => {
    e.preventDefault();
    setIsSelecting(true);
    setStartCell({ r, c });
    setSelectedCells([{ r, c }]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSelecting || !startCell) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cellElement = element?.closest('[data-cell]');
    if (cellElement) {
      const r = parseInt(cellElement.getAttribute('data-r') || '0');
      const c = parseInt(cellElement.getAttribute('data-c') || '0');
      handleMouseEnter(r, c);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    if (foundWords.length === WORDS_TO_FIND.length) {
      setTimeout(() => {
        onComplete(1000); // 1000 points for completing the word search
      }, 1500);
    }
  }, [foundWords, onComplete]);

  const isCellSelected = (r: number, c: number) => {
    return selectedCells.some(cell => cell.r === r && cell.c === c);
  };

  const getCellFoundIndex = (r: number, c: number) => {
    return foundPaths.findIndex(path => path.some(cell => cell.r === r && cell.c === c));
  };

  // Prevent drag selection of text
  useEffect(() => {
    const preventDefault = (e: MouseEvent) => {
      if (isSelecting) e.preventDefault();
    };
    window.addEventListener('mousemove', preventDefault);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', preventDefault);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting]);

  return (
    <div className={`flex flex-col items-center gap-8 w-full select-none ${embedded ? '' : 'max-w-5xl mx-auto px-4 py-8'}`} onMouseUp={handleMouseUp} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      {!embedded && (
        <div className="text-center space-y-4">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/50 text-pink-600 text-xs font-bold uppercase tracking-widest"
          >
            <MousePointer2 size={12} />
            <span>Interactive Game</span>
          </motion.div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sopa de Letras</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Encuentra las 10 palabras ocultas que describen nuestro amor. ¡Arrastra para seleccionar! 💖
          </p>
        </div>
      )}

      <div className={`flex flex-col gap-12 items-start w-full ${embedded ? 'lg:flex-col' : 'lg:flex-row'}`}>
        {/* Grid Area */}
        <div className={`flex-1 overflow-hidden ${embedded ? '' : 'bg-white p-2 md:p-4 rounded-[30px] md:rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100'}`}>
          <div 
            className="grid gap-0.5 md:gap-1 touch-none"
            onTouchMove={handleTouchMove}
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {grid.map((row, r) => (
              row.map((char, c) => {
                const isSelected = isCellSelected(r, c);
                const foundIndex = getCellFoundIndex(r, c);
                const isFound = foundIndex !== -1;
                
                return (
                  <motion.div
                    key={`${r}-${c}`}
                    data-cell
                    data-r={r}
                    data-c={c}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onTouchStart={(e) => handleTouchStart(e, r, c)}
                    className={`
                      relative flex items-center justify-center aspect-square text-[10px] md:text-sm font-bold rounded-md md:rounded-lg cursor-pointer transition-all duration-200
                      ${isSelected ? 'bg-pink-500 text-white scale-110 z-10' : ''}
                      ${isFound && !isSelected ? 'bg-pink-100 text-pink-600' : ''}
                      ${!isSelected && !isFound ? 'bg-slate-50 text-slate-400 hover:bg-slate-100' : ''}
                    `}
                    whileHover={{ scale: isFound || isSelected ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {char}
                    {isFound && !isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="absolute inset-0 bg-pink-500/10 rounded-md md:rounded-lg border border-pink-200" 
                      />
                    )}
                  </motion.div>
                );
              })
            ))}
          </div>
        </div>

        {/* Words List */}
        <div className={`shrink-0 space-y-6 ${embedded ? 'w-full' : 'w-full lg:w-72'}`}>
          <div className={`${embedded ? '' : 'bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-50'}`}>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-mono text-[10px]">
                {foundWords.length}
              </span>
              Words Found
            </h3>
            <div className={`grid gap-3 ${embedded ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-1'}`}>
              {WORDS_TO_FIND.map((word) => {
                const isFound = foundWords.includes(word);
                return (
                  <motion.div
                    key={word}
                    initial={false}
                    animate={{
                      opacity: isFound ? 1 : 0.4,
                      x: isFound ? 0 : 0
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                      isFound ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-transparent text-slate-400'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center ${isFound ? 'bg-green-500 text-white' : 'bg-slate-200'}`}>
                      {isFound && <Check size={10} />}
                    </div>
                    <span className="text-[11px] font-black tracking-widest uppercase">{word}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {foundWords.length === WORDS_TO_FIND.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-pink-500/30 text-center ${embedded ? 'mt-8' : 'shadow-pink-200'}`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 mb-4 animate-bounce">
                  <Trophy size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">¡Increíble!</h4>
                <p className="text-slate-400 text-sm">Has encontrado todas las palabras. Eres la mejor, amor de mi vida. ❤️</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
