import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mePhoto from '../../assets/abou-me.jpeg';
import { developerInfo } from '../../data/socials';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  { indent: 0, text: 'const mahesh = {',                       color: 'var(--text)'       },
  { indent: 1, text: 'role: "Full Stack Dev",',                color: 'var(--text-muted)' },
  { indent: 1, text: 'passion: "Clean Code",',                 color: 'var(--text-muted)' },
  { indent: 1, text: 'stack: [React, Node, Python, Java, DevOps],',     color: 'var(--text-muted)' },
  { indent: 1, text: 'available: true,',                       color: 'var(--green)'      },
  { indent: 0, text: '};',                                     color: 'var(--text)'       },
];

export default function About() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const photoColRef = useRef(null);
  const rightColRef = useRef(null);
  const bioRef      = useRef(null);
  const codeRef     = useRef(null);
  const cvRef       = useRef(null);
  const imgRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Header fade-in ── */
      gsap.fromTo(labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      );

      /* ── Photo column: slide in from left ── */
      gsap.fromTo(photoColRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
      );

      /* ── Subtle floating animation on the photo frame ── */
      gsap.to(imgRef.current, {
        y: -10,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' }
      });

      /* ── Right column unified staggered entrance timeline ── */
      const rightTL = gsap.timeline({
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 78%',
        }
      });

      rightTL
        .fromTo(rightColRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 }
        )
        .fromTo(codeRef.current,
          { y: 50, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.85, ease: 'power3.out' }
        )
        .fromTo(bioRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(cvRef.current,
          { y: 30, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.5)' },
          '-=0.5'
        );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">

      {/* Header */}
      <SectionHeader
        ref={labelRef}
        label="//about me"
        extra={
          <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 3 }}>
             FULL STACK / ML
          </span>
        }
        style={{ opacity: 0 }}
      />

      <div className="about-inner">

        {/* ── LEFT: Photo Column ── */}
        <div ref={photoColRef} className="about-photo-col" style={{ opacity: 0 }}>
          <div ref={imgRef} className="photo-frame-wrapper">
            {/* Decorative corner accents */}
            <span className="corner-accent corner-tl" />
            <span className="corner-accent corner-tr" />
            <span className="corner-accent corner-bl" />
            <span className="corner-accent corner-br" />

            {/* Glow ring */}
            <div className="photo-glow-ring" />

            {/* The photo */}
            <div className="photo-clip">
              <img
                src={mePhoto}
                alt="Mahesh Hansaka"
                className="about-photo"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="photo-overlay" />
            </div>

            {/* Bottom badge */}
            <div className="photo-badge mono">
              <span className="badge-dot" />
              
            </div>
          </div>
        </div>

        {/* ── RIGHT: Info Column ── */}
        <div ref={rightColRef} className="about-right-panel" style={{ opacity: 0 }}>

          {/* Code block */}
          <div ref={codeRef} className="code-block" style={{ opacity: 0 }}>
            <div className="code-dots">
              {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              {codeLines.map((line, i) => (
                <p 
                  key={i} 
                  className="mono code-line" 
                  style={{ 
                    fontSize: 13, 
                    color: line.color, 
                    lineHeight: 2, 
                    paddingLeft: `${line.indent * 20}px`,
                    '--indent': `${line.indent * 20}px` 
                  }}
                >
                  {line.text}
                </p>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: -8, right: -8, width: 40, height: 40, border: '2px solid var(--green)', zIndex: -1 }} />
            <div style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20, background: 'var(--green)', zIndex: -1 }} />
          </div>

          {/* Bio description */}
          <div ref={bioRef} className="about-bio" style={{ opacity: 0 }}>
            <p className="bio-text">
              I'm a <span className="bio-highlight">Full Stack Developer & ML enthusiast</span> based in Sri Lanka,
              passionate about crafting performant, production-grade applications that sit at the intersection
              of clean engineering and thoughtful design.
            </p>
          </div>

          {/* Download CV button */}
          <div ref={cvRef} style={{ opacity: 0 }}>
            <Button
              as="a"
              href={developerInfo.resumeUrl}
              target="_blank"
              variant="accent-outline"
              scaleOnHover
            >
              Download CV ↓
            </Button>
          </div>

        </div>

      </div>

      <style>{`
        /* ─── Section Layout ─── */
        .about-section {
          padding: 100px 40px 120px;
          background: var(--dark);
        }

        /* ─── Grid ─── */
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.1fr;
          gap: 72px; align-items: center;
        }

        /* ─── Photo Column ─── */
        .about-photo-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .photo-frame-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
          user-select: none;
        }

        /* Corner bracket accents */
        .corner-accent {
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--green);
          border-style: solid;
          z-index: 2;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .photo-frame-wrapper:hover .corner-accent { opacity: 1; }
        .corner-tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -8px; right: -8px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -8px; left: -8px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; }

        /* Ambient glow ring behind photo */
        .photo-glow-ring {
          position: absolute;
          inset: -20px;
          border-radius: 4px;
          background: radial-gradient(ellipse at center,
            rgba(0,255,136,0.07) 0%,
            transparent 70%);
          z-index: 0;
          pointer-events: none;
          transition: background 0.4s;
        }
        .photo-frame-wrapper:hover .photo-glow-ring {
          background: radial-gradient(ellipse at center,
            rgba(0,255,136,0.13) 0%,
            transparent 70%);
        }

        /* Photo clip & image */
        .photo-clip {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          border: 1px solid var(--border);
          z-index: 1;
          transition: border-color 0.35s;
          box-shadow:
            0 24px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(0,255,136,0.06);
        }
        .photo-frame-wrapper:hover .photo-clip {
          border-color: rgba(0,255,136,0.35);
          box-shadow:
            0 28px 70px rgba(0,0,0,0.6),
            0 0 40px rgba(0,255,136,0.08);
        }
        .about-photo {
          display: block;
          width: 100%;
          height: 480px;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(20%) contrast(1.05);
          transition: filter 0.5s ease, transform 0.6s ease;
        }
        .photo-frame-wrapper:hover .about-photo {
          filter: grayscale(0%) contrast(1.08);
          transform: scale(1.03);
        }

        /* Gradient overlay at bottom */
        .photo-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
          pointer-events: none;
        }

        /* Available badge */
        .photo-badge {
          position: absolute;
          bottom: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark);
          border: 1px solid var(--green);
          color: var(--green);
          font-size: 10px;
          letter-spacing: 2.5px;
          padding: 7px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          z-index: 3;
          box-shadow: 0 0 20px rgba(0,255,136,0.12);
        }
        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: badgePulse 1.4s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--green); }
          50% { opacity: 0.4; box-shadow: 0 0 3px var(--green); }
        }

        /* ─── Right Panel ─── */
        .about-right-panel {
          display: flex;
          flex-direction: column;
          gap: 28px;
          justify-content: center;
        }

        /* ─── Code Block ─── */
        .code-block {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .code-dots {
          display: flex; gap: 6px;
        }

        /* ─── Bio Description ─── */
        .about-bio {
          border-left: 2px solid var(--green);
          padding: 20px 24px;
          background: var(--surface);
        }
        .bio-text {
          font-size: 14px;
          line-height: 1.85;
          color: var(--text-muted);
          margin: 0;
        }
        .bio-highlight {
          color: var(--text);
          font-weight: 500;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .about-inner { gap: 48px; }
          .about-photo { height: 420px; }
        }
        @media (max-width: 900px) {
          .about-section { padding: 72px 24px 80px; }
          .about-inner { grid-template-columns: 1fr; gap: 60px; }
          .about-photo-col { justify-content: center; }
          .photo-frame-wrapper { max-width: 320px; }
          .about-photo { height: 380px; }
        }
        @media (max-width: 600px) {
          .about-section { padding: 48px 16px 60px; }
          .about-inner { gap: 40px; }
          .code-block { padding: 20px; }
          .code-line {
            font-size: 11px !important;
            padding-left: calc(var(--indent) * 0.6) !important;
          }
          .photo-frame-wrapper { max-width: 280px; }
          .about-photo { height: 320px; }
        }
      `}</style>
    </section>
  );
}
