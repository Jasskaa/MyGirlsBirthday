import React, { useState, useEffect } from 'react';
import { Cake, ArrowRight } from 'lucide-react';
import StatCard from './StatCard';

interface HeroProps {
  onStartQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-07-21T22:00:00');
    const updateTimer = () => {
      const now = new Date();
      const diff = Math.abs(now.getTime() - targetDate.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({ days, hours, minutes, seconds });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center scale-105"
        >
          <source 
            src="https://ltjymquwgguwr1d1.public.blob.vercel-storage.com/ds.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-20 text-center md:gap-14 mt-16">
        <div className="flex flex-col gap-6 items-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 backdrop-blur-md">
            <Cake className="h-4 w-4 text-pink-200" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-pink-50">It's your special day</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Happy Birthday,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200">
              Manheer!
            </span>
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-100/95 md:text-xl">
            Celebrating the day the world got brighter, and the day my life finally made sense.
          </p>
        </div>

        <div className="w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="mb-3 text-center text-lg font-semibold text-pink-200">
            Loving you for:
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8 text-white">
            <StatCard value={time.days.toString()} label="Days" delay="0.4s" />
            <StatCard value={time.hours.toString().padStart(2, '0')} label="Hours" delay="0.5s" />
            <StatCard value={time.minutes.toString().padStart(2, '0')} label="Minutes" delay="0.6s" />
            <StatCard value={time.seconds.toString().padStart(2, '0')} label="Seconds" delay="0.7s" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => window.location.href = 'https://guess-the-phhrase.vercel.app/'}
            className="group relative flex h-16 min-w-[240px] items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-10 text-white shadow-xl shadow-red-900/40 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-lg font-bold tracking-wide text-white">Play The Trailer</span>
            <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;