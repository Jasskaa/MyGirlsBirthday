import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Quiz from './components/Quiz';
import Timeline from './components/Timeline';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'gallery' | 'timeline' | 'quiz' | 'wishes'>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <Preloader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <main className={`relative min-h-screen w-full overflow-x-hidden bg-[#fdfafb] text-slate-900 ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
        {isLoaded && (
          <>
            <Navbar onNavigate={setActiveSection} activeSection={activeSection} />
            
            {activeSection === 'home' && (
              <Hero onStartQuiz={() => setActiveSection('quiz')} />
            )}
            {activeSection === 'timeline' && (
              <Timeline />
            )}
            {activeSection === 'quiz' && (
              <Quiz />
            )}
            {activeSection === 'gallery' && (
              <Gallery />
            )}
            {activeSection === 'wishes' && (
              <div className="pt-32 px-10 text-center">
                <h2 className="text-4xl font-bold">Wishes</h2>
                <p className="text-slate-500 mt-4">Coming soon...</p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default App;
