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
      {/* 90s loader sits on top until complete (fully interactive and absolute overlay) */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main site is ALWAYS mounted so that heavy Three.js compiling, shader building, and video rendering happen in the background! */}
      <div>
        <Cursor />
        <Navbar />
        <main>
          <Hero startAnimation={loaded} />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
