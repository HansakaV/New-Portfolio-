import { useState } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* 90s loader sits on top until complete */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main site (rendered in DOM but hidden until loader exits) */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
