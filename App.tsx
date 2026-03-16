import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Quiz from './components/Quiz';
import Timeline from './components/Timeline';
import Preloader from './components/Preloader';
import Wishes from './components/Wishes';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'gallery' | 'timeline' | 'quiz' | 'wishes'>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
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
              <Timeline onBack={() => setActiveSection('home')} />
            )}
            {activeSection === 'quiz' && (
              <Quiz />
            )}
            {activeSection === 'gallery' && (
              <Gallery />
            )}
            {activeSection === 'wishes' && (
              <Wishes />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default App;
