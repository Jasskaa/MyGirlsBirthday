import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Añade esto
import { MapPin, Check, ArrowRight, Heart, Clock, Smile, Frown } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    image: string;
  }[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Where was our first date?",
    subtitle: "Think it again, our first date...",
    options: [
      { id: 'a', label: 'Platja d`aro', image: 'https://www.apartamentos3000.com/blog/wp-content/uploads/2024/07/atardecer-play-platja-daro-ght-hotels-1672325885.jpg' },
      { id: 'b', label: 'Lloret de mar', image: 'https://www.almirall.info/assets/cache/uploads/altres/1920x1036/playa-edificios-lloret-de-mar-almirall-apartaments-1676893672.jpeg' },
      { id: 'c', label: "Angles", image: 'https://larutadelscabrera.cat/wp-content/uploads/2020/05/angles-3.jpg' },
      { id: 'd', label: 'Tossa de mar', image: 'https://www.ghthotels.com/assets/cache/uploads/00_2022-nou%20web/destinacions/tossa-de-mar/1920x1080/tossa-de-mar-vila-vella-playa-ght-hotels-1672325671.jpeg' }
    ],
    correctAnswer: 'd'
  },
  {
    id: 2,
    question: "What time did we go to sleep the day we had talked until later?",
    subtitle: "We shared a large night conversation until i fell asleep...",
    options: [
      { id: 'a', label: 'Until 1am', image: 'https://t3.ftcdn.net/jpg/17/91/31/00/360_F_1791310071_t9YVLJokuhrDLFW8rsb6d4IADeJxpuQ6.jpg' },
      { id: 'b', label: 'Until 2:25am', image: 'https://www.verywellmind.com/thmb/7Hrqh2TU1LYOqvbce0-XR42p264=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-920554794-a14221688c4b44da9e363797ecc87650.jpg' },
      { id: 'c', label: 'Until 3am', image: 'https://www.digitaltrends.com/wp-content/uploads/2013/07/iphone-sleep.jpg' },
      { id: 'd', label: 'Until 4am', image: 'https://unitedveincenters.com/wp-content/uploads/2024/01/Best-Sleeping-Positions-for-Circulation.png' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 3,
    question: "What day was it that we saw each other for the first time?",
    subtitle: "Think it... SAW EACH OTHER",
    options: [
      { id: 'a', label: '28 June', image: 'https://www.ausuddespyrenees.com/wp-content/uploads/Espai-Girones-Girona-1.png' },
      { id: 'b', label: '26 June', image: 'https://larutadelscabrera.cat/wp-content/uploads/2020/05/angles-2-1.jpg' },
      { id: 'c', label: '3 April', image: 'https://dvncorestorageprod.blob.core.windows.net/files/page/212/Image/Nagar%20Kirtan_20241025042151233.jpg' },
      { id: 'd', label: '6 August', image: 'https://estaticos-cdn.prensaiberica.es/clip/4aebab6a-69a2-43c9-9d36-1730cdbbce61_alta-libre-aspect-ratio_default_0.jpg' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 4,
    question: "What was I wearing the first time we met?",
    subtitle: "Near the beach",
    options: [
      { id: 'a', label: 'T-Shirt + Shorts', image: 'https://cdn.lookastic.com/looks/light-blue-denim-shorts-black-crew-neck-t-shirt-large-88110.jpg' },
      { id: 'b', label: 'Button-up shirt + Shorts', image: 'https://i.pinimg.com/736x/04/d4/51/04d451e0e8172cad6922364835c42810.jpg' },
      { id: 'c', label: 'Shirt + Pants', image: 'https://hespokestyle.com/wp-content/uploads/2018/08/can-i-wear-t-shirt-with-formal-pants.jpg' },
      { id: 'd', label: 'Bikini', image: 'https://cdn-images.farfetch-contents.com/11/64/73/52/11647352_7731559_1000.jpg' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 5,
    question: "What is the thing i love the most about you?",
    subtitle: "...",
    options: [
      { id: 'a', label: 'Face', image: 'https://t3.ftcdn.net/jpg/02/92/28/78/360_F_292287867_hC2Owo0yInRruYbxZXKoJZhB7YUCHdmp.jpg' },
      { id: 'b', label: 'Belly', image: 'https://adultandpediatricdermatology.com/wp-content/uploads/2024/04/How-to-Lose-Belly-Fat.webp' },
      { id: 'c', label: 'Personality', image: 'https://liveinnovation.org/wp-content/uploads/2020/06/pexels-photo-3812743.jpg' },
      { id: 'd', label: 'Eyes', image: 'https://media.allaboutvision.com/cms/caas/v1/media/405814/data/6f02a1d4933b24582c6876b4404844d0/bannerimage.jpg' }
    ],
    correctAnswer: 'b'
  },
  // Add more questions as needed
];

const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recentAnswers, setRecentAnswers] = useState<{ question: string, correct: boolean, id: number }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  const handleSelect = (id: string) => {
    if (selectedId) return;
    setSelectedId(id);
    const isCorrect = id === currentQuestion.correctAnswer;
    if (isCorrect) setScore(s => s + 100);

    setRecentAnswers(prev => [
      { question: currentQuestion.question, correct: isCorrect, id: currentQuestion.id },
      ...prev.slice(0, 4)
    ]);
  };

  const handleNext = () => {
    if (!selectedId) return;
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedId(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const isHighScore = score >= 800;
    const isPerfectScore = score === QUESTIONS.length * 100;

    return (
      <div className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center p-10 text-center animate-fade-in-up">

        <div className={`mb-6 rounded-full p-6 ${isHighScore ? 'bg-green-100' : 'bg-red-100'}`}>
          {isHighScore ? (
            <Smile className="h-16 w-16 text-green-600" />
          ) : (
            <Frown className="h-16 w-16 text-red-600" />
          )}
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          {isPerfectScore ? "Incredible!" : (isHighScore ? "So Close!" : "Oops...")}
        </h2>

        <p className="text-xl text-slate-500 mb-6">
          You scored {score} points.
        </p>

        {/* Mensaje condicional basado en si es puntuación perfecta */}
        <div className="space-y-4 mb-8">
          <p className={`text-lg font-semibold ${isPerfectScore ? 'text-green-600' : 'text-red-500'}`}>
            {isPerfectScore
              ? "Hyeeeniii! I'm so proud of you ❤️"
              : "Heinnnn really amore?... Try again to get the secret code 💔"}
          </p>

          {isPerfectScore && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border-2 border-pink-500"
            >
              <p className="text-sm uppercase tracking-widest text-pink-400 font-bold mb-1">Your Reward</p>
              <p className="text-2xl font-mono font-black tracking-widest">
                The Code is : <span className="text-green-400">MahiXula</span>
              </p>
            </motion.div>
          )}
        </div>

        <button
          onClick={() => {
            setCurrentIdx(0);
            setScore(0);
            setSelectedId(null);
            setRecentAnswers([]);
            setIsFinished(false);
          }}
          className="rounded-full bg-slate-900 px-8 py-3 font-bold text-white transition-transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Left Side: Question Area */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              <span>How well do you know us?</span>
              <span className="text-primary">Question {currentIdx + 1} <span className="text-slate-300">/ {QUESTIONS.length}</span></span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="relative rounded-[40px] bg-white p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-50 overflow-hidden">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-primary">
                <MapPin size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl mb-3">
                {currentQuestion.question}
              </h2>
              <p className="text-slate-400 italic font-medium">
                {currentQuestion.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctAnswer;
                const showFeedback = selectedId !== null;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    disabled={showFeedback}
                    className={`group relative overflow-hidden rounded-3xl aspect-[4/3] transition-all duration-300 ${isSelected
                        ? (isCorrect ? 'ring-4 ring-green-500 shadow-xl' : 'ring-4 ring-primary shadow-xl scale-[0.98]')
                        : 'hover:scale-[1.02] hover:shadow-lg'
                      }`}
                  >
                    <img
                      src={opt.image}
                      alt={opt.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                      <span className="font-bold text-lg drop-shadow-md">{opt.label}</span>
                      <div className={`h-6 w-6 rounded-full border-2 border-white/50 flex items-center justify-center transition-colors ${isSelected ? (isCorrect ? 'bg-green-500 border-green-500' : 'bg-primary border-primary') : ''}`}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    </div>

                    {isSelected && !isCorrect && (
                      <div className="absolute top-5 right-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg animate-fade-in-up">
                        Your Answer
                      </div>
                    )}
                    {showFeedback && isCorrect && (
                      <div className="absolute top-5 right-5 rounded-full bg-green-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg animate-fade-in-up">
                        Correct Answer
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={handleNext}
                disabled={!selectedId}
                className={`flex h-14 items-center gap-3 rounded-full px-10 text-sm font-bold transition-all ${selectedId
                    ? 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 translate-y-0'
                    : 'bg-slate-100 text-slate-300 translate-y-2 cursor-not-allowed'
                  }`}
              >
                <span>Next Question</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Score and Recent Answers */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Current Score Card */}
          <div className="rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200 border border-slate-50 text-center animate-fade-in-up">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
              Current Love Score
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-black text-slate-900">{score}</span>
              <span className="text-primary font-bold">pts</span>
            </div>
          </div>

          {/* Recent Answers Card */}
          <div className="rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200 border border-slate-50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <Clock size={16} className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">Recent Answers</span>
            </div>

            <div className="space-y-4">
              {recentAnswers.length === 0 ? (
                <div className="py-10 text-center text-slate-300 text-sm font-medium italic">
                  No answers yet...
                </div>
              ) : (
                recentAnswers.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 animate-fade-in-up">
                    <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {item.correct ? <Check size={12} /> : <ArrowRight size={12} />}
                    </div>
                    <div className="flex-1 border-b border-slate-50 pb-3">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className={`text-xs font-bold ${item.correct ? 'text-green-600' : 'text-red-500'}`}>
                          {item.correct ? 'Correct!' : 'Incorrect'}
                        </span>
                        <span className={`text-[10px] font-bold ${item.correct ? 'text-green-500' : 'text-slate-300'}`}>
                          {item.correct ? '+100' : '+0'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        Q{item.id}: {item.question}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;