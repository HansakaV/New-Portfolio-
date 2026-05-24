import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const statsRef   = useRef(null);
  const imgRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo(imgRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo(statsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { num: '1+',  label: 'Years Industry Experience' },
    { num: '30+', label: 'Projects Built'   },
    { num: '2+', label: 'Years Acadamic Experience'    },
    { num: '∞',   label: 'Lines of Code'    },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-inner">
        {/* Text column */}
        <div ref={textRef}>
          <p className="section-label" style={{ marginBottom: 20 }}>// about me</p>
          <h2 className="display about-heading">
            FULL STACK<br /><span style={{ color: 'var(--green)' }}>DEVELOPER</span><br />&amp; ML ENGINNER
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
            Hey, I'm <strong style={{ color: 'var(--text)' }}>Mahesh Hansaka</strong> — a full stack developer who obsesses over clean code, seamless user experiences, and the space where logic meets aesthetics.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
            I architect scalable systems and craft pixel-perfect interfaces. From spinning up APIs to choreographing 3D animations, I live at every layer of the stack.
          </p>
          <div>
            <a href="/resume.pdf" target="_blank" style={{
              display: 'inline-block', background: 'transparent', color: 'var(--green)',
              border: '1px solid var(--green)', padding: '10px 24px',
              fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 2,
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--green)'; e.target.style.color = 'var(--dark)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--green)'; }}>
              Download CV
            </a>
          </div>
        </div>

        {/* Visual column */}
        <div>
          <div ref={imgRef} style={{ position: 'relative', marginBottom: 40 }}>
            {/* Code block */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 12, left: 16, display: 'flex', gap: 6 }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                {[
                  { indent: 0, text: 'const mahesh = {',         color: 'var(--text)'      },
                  { indent: 1, text: 'role: "Full Stack Dev",',  color: 'var(--text-muted)' },
                  { indent: 1, text: 'passion: "Clean Code",',   color: 'var(--text-muted)' },
                  { indent: 1, text: 'stack: [React, Node, Python, AWS],', color: 'var(--text-muted)' },
                  { indent: 1, text: 'available: true,',         color: 'var(--green)'      },
                  { indent: 0, text: '};',                       color: 'var(--text)'      },
                ].map((line, i) => (
                  <p key={i} className="mono" style={{ fontSize: 13, color: line.color, lineHeight: 2, paddingLeft: line.indent * 20 }}>
                    {line.text}
                  </p>
                ))}
              </div>
            </div>
            {/* Decorative corners */}
            <div style={{ position: 'absolute', bottom: -8, right: -8, width: 40, height: 40, border: '2px solid var(--green)', zIndex: -1 }} />
            <div style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20, background: 'var(--green)', zIndex: -1 }} />
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: 'var(--dark)', padding: '24px 20px', textAlign: 'center' }}>
                <p className="display" style={{ fontSize: 48, color: 'var(--green)', lineHeight: 1 }}>{s.num}</p>
                <p className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 120px 40px;
          background: var(--dark);
        }
        .about-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .about-heading {
          font-size: clamp(40px, 6vw, 80px);
          line-height: 0.95; margin-bottom: 32px; color: var(--text);
        }

        @media (max-width: 900px) {
          .about-section { padding: 80px 24px; }
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 600px) {
          .about-section { padding: 60px 16px; }
          .about-inner { gap: 36px; }
        }
      `}</style>
    </section>
  );
}
