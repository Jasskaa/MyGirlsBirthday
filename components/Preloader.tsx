import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Step 1: First text for 10 seconds
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 10000);

    // Step 2: Second text appears after 10s, then wait 5s to show button
    const timer2 = setTimeout(() => {
      setStep(3);
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white p-6 text-center"
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="text1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-serif italic tracking-widest">
              Hiiii BEAUTIFULLL 💕
            </h1>
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-tighter">
              I’ve prepared this little surprise just for you. It may not be something grand, but it comes straight from my heart, and I truly hope it makes you smile. 💖
            </p>
          </motion.div>
        )}

        {(step === 2 || step === 3) && (
          <motion.div
            key="text2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl flex flex-col items-center"
          >
            <h2 className="text-2xl md:text-4xl font-serif italic text-zinc-300">
              Before I begin, I just need to tell you how incredibly much I love you, my love. 💕
              <br />
              Enjoy your special little page, bugguu — it has a bit of everything, just like us… I made it all thinking of you.
              <br />
              I love youuuuu so much. MUAHHHH 😘💕
            </h2>

            <AnimatePresence>
              {step === 3 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="mt-12 px-8 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-sm tracking-[0.2em] uppercase"
                >
                  Made with love → 
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background decoration */}
      <div className="absolute bottom-10 left-10 text-[10px] text-zinc-800 font-mono tracking-widest uppercase vertical-rl">
        Est. 2024 • Forever
      </div>
      <div className="absolute top-10 right-10 text-[10px] text-zinc-800 font-mono tracking-widest uppercase">
        Birthday Edition
      </div>
    </motion.div>
  );
};

export default Preloader;
