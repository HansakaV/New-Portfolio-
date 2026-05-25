import { useState } from 'react';
import Loader from './components/common/Loader';
import Cursor from './components/common/Cursor';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import './index.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* 90s loader sits on top until complete */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main site (mounts and starts animations only after loader completes) */}
      {loaded && (
        <div>
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}
