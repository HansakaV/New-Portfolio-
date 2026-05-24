import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import bgVideo from '../assets/background-video.mp4';

function FloatingSphere() {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero() {
  const heroRef     = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const overlayRef  = useRef(null);
  const taglineRef  = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(overlayRef.current,
      { scaleX: 1 },
      { scaleX: 0, duration: 1.4, ease: 'power4.inOut', transformOrigin: 'right' }
    )
    .fromTo(titleRef.current.children,
      { y: 120, opacity: 0, skewY: 6 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08 }, '-=0.6'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.4'
    );

    const handleScroll = () => {
      const y = window.scrollY;
      if (titleRef.current) gsap.set(titleRef.current, { y: y * 0.25 });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      {/* Video BG */}
      <video autoPlay muted loop playsInline className="hero-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="scanlines hero-overlay" />

      {/* Three.js sphere */}
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} color="#00ff88" intensity={3} />
          <FloatingSphere />
        </Canvas>
      </div>

      {/* Wipe overlay */}
      <div ref={overlayRef} className="hero-wipe" />

      {/* Content */}
      <div className="hero-content">
      
        {/* Title */}
        <div ref={titleRef} className="hero-title">
          {['MAHESH', 'HANSAKA'].map((word, i) => (
            <div key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <span className={i === 1 ? 'glitch' : ''} data-text={word} style={{ display: 'inline-block' }}>
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Sub row */}
        <div className="hero-sub-row">
          <div ref={subtitleRef} style={{ opacity: 0 }}>
            <p className="mono" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 320 }}>
              In the architecture of the web, every line of code<br />is a brushstroke toward digital transcendence.
            </p>
          </div>
          <div ref={ctaRef} className="hero-cta-group">
            <button className="btn-primary" style={{ opacity: 0 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={e => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
              onMouseLeave={e => gsap.to(e.target, { scale: 1, duration: 0.2 })}>
              View Work
            </button>
            <button className="btn-secondary" style={{ opacity: 0 }}
              onClick={() => window.open('mailto:mahesh.hansaka@gmail.com')}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="mono" style={{ fontSize: 9, letterSpacing: 3, color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>SCROLL</span>
          <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'var(--green)', animation: 'scrollBounce 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div className="hero-credit">
        <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: 2 }}>@mahesh.hansaka</span>
      </div>

      <style>{`
        .hero-section {
          position: relative; height: 100vh;
          display: flex; align-items: flex-end; overflow: hidden;
        }
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.35) saturate(0.6);
        }
        .hero-overlay {
          position: absolute; inset: 0; background: rgba(5,5,5,0.5);
        }
        .hero-canvas {
          position: absolute; inset: 0; pointer-events: none;
        }
        .hero-wipe {
          position: absolute; inset: 0; background: var(--dark); z-index: 10;
        }
        .hero-content {
          position: relative; z-index: 5; width: 100%;
          padding: 0 40px 80px;
        }
        .hero-tagline {
          position: absolute; left: 0; bottom: calc(100% + 20px);
        }
        .hero-sub-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-top: 16px; gap: 32px;
        }
        .hero-cta-group {
          display: flex; gap: 14px; align-items: center; flex-shrink: 0;
        }
        .btn-primary {
          background: var(--green); color: var(--dark); border: none;
          padding: 14px 28px; font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 700; cursor: pointer;
        }
        .btn-secondary {
          background: transparent; color: var(--text);
          border: 1px solid var(--border);
          padding: 14px 28px; font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: border-color 0.3s, color 0.3s;
        }
        .scroll-indicator {
          position: absolute; right: 40px; bottom: 80px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .hero-credit {
          position: absolute; bottom: 24px; left: 40px; z-index: 5;
        }
        @keyframes scrollBounce {
          0%   { top: -40%; }
          100% { top: 140%; }
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .hero-content { padding: 0 24px 60px; }
          .hero-tagline { left: 0; }
          .hero-sub-row { flex-direction: column; align-items: flex-start; gap: 24px; margin-top: 20px; }
          .hero-cta-group { flex-wrap: wrap; }
          .scroll-indicator { right: 24px; bottom: 60px; }
          .hero-credit { left: 24px; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero-content { padding: 0 16px 40px; }
          .hero-sub-row { gap: 20px; margin-top: 16px; }
          .hero-cta-group { gap: 10px; }
          .btn-primary, .btn-secondary { padding: 12px 20px; font-size: 10px; }
          .scroll-indicator { display: none; }
          .hero-credit { left: 16px; bottom: 12px; }
        }
      `}</style>
    </section>
  );
}
