import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../ui/Button';

export default function Navbar() {
  const navRef      = useRef(null);
  const overlayRef  = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('portfolio-theme') || 'dark'
  );

  /* ── Apply theme to <html> ── */
  useEffect(() => {
    const root = document.documentElement;
    theme === 'light'
      ? root.classList.add('light-mode')
      : root.classList.remove('light-mode');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  /* ── Nav entrance + scroll blur ── */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
    const onScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.style.background = 'var(--nav-bg)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.borderBottom = '1px solid var(--nav-border)';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = '1px solid transparent';
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Mobile overlay animation ── */
  useEffect(() => {
    if (menuOpen && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(overlayRef.current.querySelectorAll('.mob-item'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.25 }
      );
    }
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 10);
  };

  const navLinks = ['about', 'projects', 'skills', 'contact'];

  return (
    <>
      {/* ── Main navbar ── */}
      <nav ref={navRef} className="portfolio-navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        transition: 'background 0.4s, border-color 0.4s, padding 0.3s',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, border: '1.5px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono highlight" style={{ fontSize: 12, fontWeight: 700 }}>MH</span>
          </div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Portfolio</span>
        </div>

        {/* Desktop links */}
        <div className="desk-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {navLinks.map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              {id}
            </button>
          ))}
        </div>

        {/* Right: theme toggle + CTA + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Theme toggle */}
          <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="theme-btn" aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            style={{ transition: 'border-color 0.3s, color 0.3s !important' }}>
            {theme === 'dark' ? (
              /* Sun */
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon */
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* CTA – desktop */}
          <Button
            className="desk-cta"
            variant="accent-outline"
            onClick={() => scrollTo('contact')}
            style={{ padding: '8px 20px' }}
          >
            Hire Me
          </Button>

          {/* Burger – mobile */}
          <button className="burger" onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu" style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: 6, flexDirection: 'column',
              gap: 5, alignItems: 'center', justifyContent: 'center',
            }}>
            <span style={{
              width: 22, height: 2, background: 'var(--text)', display: 'block',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}/>
            <span style={{
              width: 22, height: 2, background: 'var(--text)', display: 'block',
              opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s',
            }}/>
            <span style={{
              width: 22, height: 2, background: 'var(--text)', display: 'block',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}/>
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {menuOpen && (
        <div ref={overlayRef} className="mobile-overlay" style={{ clipPath: 'inset(0 0 100% 0)' }}>
          {navLinks.map(id => (
            <button key={id} onClick={() => scrollTo(id)}
              className="mob-item nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}>
              {id}
            </button>
          ))}
          <Button
            className="mob-item"
            variant="primary"
            scaleOnHover
            onClick={() => scrollTo('contact')}
            style={{ marginTop: 12, minWidth: 200, padding: '14px 40px' }}
          >
            Hire Me
          </Button>
        </div>
      )}

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          .desk-links { display: none !important; }
          .desk-cta   { display: none !important; }
          .burger     { display: flex !important; }
          .portfolio-navbar { padding: 16px 20px !important; }
        }
        @media (min-width: 769px) {
          .desk-links { display: flex !important; }
          .desk-cta   { display: inline-flex !important; }
          .burger     { display: none !important; }
        }
      `}</style>
    </>
  );
}
