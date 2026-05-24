import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutVideo from '../assets/ab.mp4';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: '1+',  label: 'Years Industry Experience' },
  { num: '30+', label: 'Projects Built'             },
  { num: '2+',  label: 'Years Academic Experience'  },
  { num: '∞',   label: 'Lines of Code'              },
];

const codeLines = [
  { indent: 0, text: 'const mahesh = {',                       color: 'var(--text)'       },
  { indent: 1, text: 'role: "Full Stack Dev",',                color: 'var(--text-muted)' },
  { indent: 1, text: 'passion: "Clean Code",',                 color: 'var(--text-muted)' },
  { indent: 1, text: 'stack: [React, Node, Python, AWS],',     color: 'var(--text-muted)' },
  { indent: 1, text: 'available: true,',                       color: 'var(--green)'      },
  { indent: 0, text: '};',                                     color: 'var(--text)'       },
];

export default function About() {
  const sectionRef   = useRef(null);
  const videoRef     = useRef(null);
  const visualRef    = useRef(null);
  const statsRef     = useRef(null);
  const codeRef      = useRef(null);
  const cvRef        = useRef(null);
  const labelRef     = useRef(null);
  const analyzerRef  = useRef(null);

  const [hasRevealed, setHasRevealed] = useState(false);
  const [percent, setPercent] = useState(0);

  /* ── Section header scroll-trigger ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Drive the Decryption percentage loading counter in sync with the video ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleTimeUpdate = () => {
      if (vid.duration) {
        const pct = Math.min(Math.floor((vid.currentTime / vid.duration) * 100), 100);
        setPercent(pct);
      }
    };

    vid.addEventListener('timeupdate', handleTimeUpdate);
    return () => vid.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  /* ── GSAP Reveal Transition once video ends ── */
  const revealVisual = () => {
    if (hasRevealed) return;
    setHasRevealed(true);

    const tl = gsap.timeline();

    // 1. Hide the analyzer layout cleanly
    tl.to(analyzerRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        if (analyzerRef.current) analyzerRef.current.style.display = 'none';
      }
    })
    // 2. Reveal the active Visual Column components smoothly
    .fromTo(visualRef.current,
      { display: 'flex', opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(codeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(statsRef.current.children,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(cvRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.15'
    );
  };

  const handleVideoEnded = () => {
    setPercent(100);
    revealVisual();
  };

  return (
    <section id="about" ref={sectionRef} className="about-section">

      {/* Header */}
      <div ref={labelRef} className="about-header" style={{ opacity: 0 }}>
        <p className="section-label">// about me</p>
        <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 3 }}>
          MAHESH HANSAKA — FULL STACK / ML
        </span>
      </div>

      <div className="about-inner">

        {/* ── LEFT: Modern Video Player (Symmetric Height matching Right column) ── */}
        <div className="about-video-col">
          <div className="modern-video-wrapper">
            <video
              ref={videoRef}
              className="about-video"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
            >
              <source src={aboutVideo} type="video/mp4" />
            </video>
            {/* Subtle glow border accent */}
            <div className="video-border-accent" />
          </div>
        </div>

        {/* ── RIGHT: Visual Column Area ── */}
        <div className="about-right-panel">

          {/* 1. FUTURISTIC ANALYZER PLACEHOLDER (Shows while video plays) */}
          {!hasRevealed && (
            <div ref={analyzerRef} className="retro-analyzer">
              <div className="analyzer-header mono">
                <span className="blink-dot" />
                <span>SYSTEM DIAGNOSTIC IN PROGRESS</span>
              </div>
              
              <div className="analyzer-body">
                {/* Rolling Matrix-style Loading stats */}
                <div className="analyzer-row mono">
                  <span className="label">DECRYPTING CODES :</span>
                  <span className="value progress-text">{percent}% SECURE</span>
                </div>
                <div className="analyzer-progress-bar">
                  <div className="analyzer-progress-fill" style={{ width: `${percent}%` }} />
                </div>

                {/* Cybernetic scanning terminal logs */}
                <div className="terminal-logs mono">
                  <div>&gt; CONNECTING TO MAHESH_CORE... SUCCESS</div>
                  <div>&gt; FETCHING SOURCE REPOSITORIES... {percent > 30 ? 'OK' : 'PENDING'}</div>
                  <div>&gt; INJECTING MACHINE LEARNING AGENTS... {percent > 65 ? 'OK' : 'PENDING'}</div>
                  <div>&gt; COMPILING FULL-STACK DESIGN ARCHITECTURE... {percent > 85 ? 'OK' : 'PENDING'}</div>
                  {percent === 100 && <div style={{ color: 'var(--green)' }}>&gt; SUCCESS: DATA DECRYPTION COMPLETE!</div>}
                </div>
              </div>

              {/* Laser scanning line moving down across the card */}
              <div className="laser-scanning-line" />
            </div>
          )}

          {/* 2. REAL ACTIVE VISUAL COLUMN (Revealed on Video Completion) */}
          <div
            ref={visualRef}
            className="about-visual-col"
            style={{ display: 'none', opacity: 0 }}
          >
            {/* Code block */}
            <div ref={codeRef} className="code-block">
              <div className="code-dots">
                {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                {codeLines.map((line, i) => (
                  <p key={i} className="mono" style={{ fontSize: 13, color: line.color, lineHeight: 2, paddingLeft: line.indent * 20 }}>
                    {line.text}
                  </p>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 40, height: 40, border: '2px solid var(--green)', zIndex: -1 }} />
              <div style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20, background: 'var(--green)', zIndex: -1 }} />
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-cell">
                  <p className="display" style={{ fontSize: 44, color: 'var(--green)', lineHeight: 1 }}>{s.num}</p>
                  <p className="mono" style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Download CV button */}
            <div ref={cvRef} style={{ marginTop: 24 }}>
              <a href="/resume.pdf" target="_blank" className="cv-btn"
                onMouseEnter={e => { e.target.style.background = 'var(--green)'; e.target.style.color = 'var(--dark)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--green)'; }}>
                Download CV ↓
              </a>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        /* ─── Section Layout ─── */
        .about-section {
          padding: 100px 40px 120px;
          background: var(--dark);
        }
        .about-header {
          max-width: 1200px; margin: 0 auto 48px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* ─── Grid (Both Sides Balanced & Aligned) ─── */
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1.1fr 1fr;
          gap: 64px; align-items: stretch; /* Aligns left and right heights symmetrically */
        }

        /* ─── Modern Symmetric Video column ─── */
        .about-video-col {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .modern-video-wrapper {
          position: relative;
          border: 1px solid var(--border);
          background: #000;
          overflow: hidden;
          width: 100%;
          height: 480px; /* Perfectly aligns with right panel height for symmetry */
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .modern-video-wrapper:hover {
          border-color: rgba(0, 255, 136, 0.3);
          box-shadow: 0 20px 45px rgba(0, 255, 136, 0.08);
        }
        .about-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .video-border-accent {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          pointer-events: none;
          z-index: 2;
          transition: border-color 0.3s ease;
        }
        .modern-video-wrapper:hover .video-border-accent {
          border-color: rgba(0, 255, 136, 0.1);
        }

        /* ─── Right Panel Area ─── */
        .about-right-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 480px;
        }

        /* ─── Futuristic Diagnostic Analyzer (Ux Placeholder) ─── */
        .retro-analyzer {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--surface);
          padding: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .analyzer-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--text-muted);
        }
        .blink-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: analyzerBlink 1s step-end infinite;
        }
        @keyframes analyzerBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .analyzer-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .analyzer-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          letter-spacing: 1px;
        }
        .analyzer-row .label { color: var(--text-muted); }
        .analyzer-row .value { color: var(--green); font-weight: bold; }

        .analyzer-progress-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          width: 100%;
          position: relative;
          border-radius: 2px;
        }
        .analyzer-progress-fill {
          height: 100%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          width: 0%;
          transition: width 0.1s linear;
        }

        .terminal-logs {
          font-size: 11px;
          line-height: 1.8;
          color: var(--text-muted);
          opacity: 0.75;
          margin-top: 8px;
          min-height: 120px;
        }

        /* Continuous laser sweep animation overlay */
        .laser-scanning-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--green), transparent);
          box-shadow: 0 0 10px var(--green);
          animation: laserSweep 3.5s infinite linear;
          opacity: 0.45;
        }
        @keyframes laserSweep {
          0% { top: -5%; }
          100% { top: 105%; }
        }

        /* ─── Visual Column (Actual data layout) ─── */
        .about-visual-col {
          flex-direction: column;
          gap: 0;
          width: 100%;
        }

        /* Code block */
        .code-block {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 32px;
          position: relative;
          overflow: hidden;
          margin-bottom: 2px;
        }
        .code-dots {
          display: flex; gap: 6px;
        }

        /* Stats */
        .stats-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--border);
          margin-bottom: 0;
        }
        .stat-cell {
          background: var(--dark);
          padding: 24px 20px;
          text-align: center;
          transition: background 0.3s;
        }
        .stat-cell:hover {
          background: var(--surface);
        }

        /* Download CV Button styling */
        .cv-btn {
          display: inline-block;
          background: transparent; color: var(--green);
          border: 1px solid var(--green);
          padding: 12px 28px;
          font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.3s, color 0.3s;
        }

        /* ─── Responsive Adjustments ─── */
        @media (max-width: 1024px) {
          .about-inner { gap: 48px; }
          .modern-video-wrapper, .about-right-panel { height: 420px; min-height: 420px; }
        }
        @media (max-width: 900px) {
          .about-section { padding: 72px 24px 80px; }
          .about-inner { grid-template-columns: 1fr; gap: 40px; }
          .about-header { flex-direction: column; align-items: flex-start; gap: 8px; }
          .modern-video-wrapper, .about-right-panel { height: auto; min-height: 0; }
          .about-visual-col { display: flex !important; opacity: 1 !important; } 
          .retro-analyzer { display: none !important; } /* Always display direct content on mobile */
        }
        @media (max-width: 600px) {
          .about-section { padding: 48px 16px 60px; }
          .about-inner { gap: 32px; }
          .code-block { padding: 20px; }
        }
      `}</style>
    </section>
  );
}
