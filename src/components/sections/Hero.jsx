import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import bgVideo from '../../assets/bg.mp4';
import Button from '../ui/Button';

gsap.registerPlugin(TextPlugin);

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
  const maheshRef   = useRef(null);
  const hansakaRef  = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(overlayRef.current,
      { scaleX: 1 },
      { scaleX: 0, duration: 1.4, ease: 'power4.inOut', transformOrigin: 'right' }
    )
    // Type MAHESH
    .to(maheshRef.current, {
      text: "MAHESH",
      duration: 0.8,
      ease: "none",
      onComplete: () => {
        if (maheshRef.current) maheshRef.current.classList.add('typing-finished');
      }
    })
    // Type HANSAKA
    .to(hansakaRef.current, {
      text: "HANSAKA",
      duration: 0.9,
      ease: "none",
      onStart: () => {
        if (hansakaRef.current) hansakaRef.current.classList.add('typing-active');
      },
      onComplete: () => {
        if (hansakaRef.current) hansakaRef.current.classList.add('typing-finished');
      }
    }, "+=0.15")
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2'
    )
    .fromTo(ctaRef.current.querySelectorAll('.portfolio-btn'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.3'
    );
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

        {/* Title — Elegant typewriter system */}
        <div ref={titleRef} className="hero-title">
          <div style={{ display: 'block', overflow: 'hidden' }}>
            <span ref={maheshRef} className="hero-word-line hero-word-1" style={{ display: 'inline-block' }}></span>
          </div>
          <div style={{ display: 'block', overflow: 'hidden' }}>
            <span ref={hansakaRef} className="hero-word-line hero-word-2" style={{ display: 'inline-block' }}></span>
          </div>
        </div>

        {/* Sub row */}
        <div className="hero-sub-row">
          <div ref={subtitleRef} style={{ opacity: 0 }}>
            <p className="mono" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 320 }}>
              In the architecture of the web, every line of code<br />is a brushstroke toward digital transcendence.
            </p>
          </div>
          <div ref={ctaRef} className="hero-cta-group">
            <Button
              variant="primary"
              scaleOnHover
              style={{ opacity: 0 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </Button>
            <Button
              variant="secondary"
              style={{ opacity: 0 }}
              onClick={() => window.open('mailto:mahesh.hansaka@gmail.com')}
            >
              Get In Touch
            </Button>
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
          position: relative;
          height: 100vh;
          height: 100dvh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
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
        .hero-title {
          font-size: clamp(48px, 9vw, 110px);
          font-weight: 900; line-height: 1.05;
          letter-spacing: 2px; color: var(--text);
          margin-bottom: 24px;
        }
        .hero-title div {
          margin-bottom: 12px;
        }
        .hero-title div:last-child {
          margin-bottom: 0;
        }
        .hero-word-line {
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
          position: relative;
          min-height: 1.15em;
          display: inline-block;
        }

        /* Typewriter Cursor */
        .hero-word-line::after {
          content: '_';
          color: var(--green);
          font-weight: 300;
          margin-left: 4px;
          animation: cursorBlink 0.8s step-end infinite;
          opacity: 1;
        }
        /* Show/hide cursor selectively */
        .hero-word-1.typing-finished::after {
          display: none;
        }
        .hero-word-2::after {
          display: none;
        }
        .hero-word-2.typing-active::after {
          display: inline-block;
        }
        .hero-word-2.typing-finished::after {
          animation: cursorBlink 1.4s step-end infinite; /* Slower final breathing blink */
          display: inline-block;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .hero-sub-row {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-top: 16px; gap: 32px;
        }
        .hero-cta-group {
          display: flex; gap: 14px; align-items: center; flex-shrink: 0;
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
          .hero-sub-row { flex-direction: column; align-items: flex-start; gap: 24px; margin-top: 20px; }
          .hero-cta-group { flex-wrap: wrap; }
          .scroll-indicator { right: 24px; bottom: 60px; }
          .hero-credit { left: 24px; }
        }

        /* ── Mobile (Centered content layout) ── */
        @media (max-width: 600px) {
          .hero-section {
            align-items: center;
          }
          .hero-content {
            padding: 80px 16px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }
          .hero-title {
            text-align: center;
            font-size: clamp(38px, 11vw, 48px);
            margin-bottom: 20px;
            letter-spacing: 0.5px;
            line-height: 1.1;
          }
          .hero-title div {
            margin-bottom: 6px;
          }
          .hero-word-line {
            display: block !important;
            width: 100%;
          }
          .hero-sub-row {
            gap: 24px;
            margin-top: 0;
            width: 100%;
            align-items: center;
            text-align: center;
          }
          .hero-sub-row p {
            margin: 0 auto;
            max-width: 100% !important;
          }
          .hero-cta-group {
            width: 100%;
            justify-content: center;
            gap: 12px;
          }
          .scroll-indicator { display: none; }
          .hero-credit { left: 50%; transform: translateX(-50%); bottom: 16px; }
        }
      `}</style>
    </section>
  );
}
