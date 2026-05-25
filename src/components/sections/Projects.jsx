import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const listRef    = useRef(null);
  const [, setActive] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo(listRef.current.children,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (idx, entering) => {
    const row = listRef.current.children[idx];
    if (entering) {
      gsap.to(row.querySelector('.proj-num'),   { x: 8, color: 'var(--green)', duration: 0.3 });
      gsap.to(row.querySelector('.proj-title'), { x: 8, duration: 0.3 });
      gsap.to(row.querySelector('.proj-bar'),   { scaleX: 1, duration: 0.6, ease: 'power3.out' });
      setActive(idx);
    } else {
      gsap.to(row.querySelector('.proj-num'),   { x: 0, color: 'var(--text-muted)', duration: 0.3 });
      gsap.to(row.querySelector('.proj-title'), { x: 0, duration: 0.3 });
      gsap.to(row.querySelector('.proj-bar'),   { scaleX: 0, duration: 0.4 });
      setActive(null);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <SectionHeader
          ref={titleRef}
          label="// selected work"
          title="PROJECTS"
          highlight="THAT SHIP"
          extra={
            <span className="mono proj-year-label" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2 }}>
              2023 — 2024
            </span>
          }
          style={{ opacity: 0 }}
        />

        {/* Project rows */}
        <div ref={listRef}>
          {projects.map((proj, i) => (
            <div key={proj.id}
               className="hover-target proj-row"
               onMouseEnter={() => handleHover(i, true)}
               onMouseLeave={() => handleHover(i, false)}>
              {/* Accent bar */}
              <div className="proj-bar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--green)', transformOrigin: 'left', transform: 'scaleX(0)' }} />

              <div className="proj-grid">
                {/* Number */}
                <span className="proj-num mono" style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: 2 }}>{proj.id}</span>

                {/* Info */}
                <div>
                  <div className="proj-title-row">
                    <h3 className="proj-title display" style={{ fontSize: 'clamp(22px, 3.5vw, 52px)', lineHeight: 1, letterSpacing: 1 }}>{proj.title}</h3>
                    <span className="mono proj-cat" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, border: '1px solid var(--border)', padding: '3px 8px', flexShrink: 0 }}>{proj.category}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>{proj.desc}</p>
                </div>

                {/* Meta */}
                <div className="proj-meta">
                  <p className="mono proj-year" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 8 }}>{proj.year}</p>
                  <div className="proj-tags">
                    {proj.tech.map(t => (
                      <span key={t} className="mono" style={{ fontSize: 9, color: 'var(--green)', letterSpacing: 1, border: '1px solid rgba(0,255,136,0.25)', padding: '2px 8px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 40, textAlign: 'center' }}>
          <Button variant="outline" scaleOnHover style={{color:'var(--green)'}} onClick={() => window.open('https://github.com/HansakaV?tab=repositories', '_blank')}>
            View All Projects
          </Button>
        </div>
      </div>

      <style>{`
        .projects-section { padding: 120px 40px; background: var(--dark-2); }
        .proj-row {
          position: relative; border-top: 1px solid var(--border);
          padding: 32px 0; cursor: pointer; overflow: hidden;
        }
        .proj-grid {
          display: grid; grid-template-columns: 72px 1fr auto;
          gap: 20px; align-items: center;
        }
        .proj-title-row {
          display: flex; align-items: baseline;
          gap: 16px; margin-bottom: 8px; flex-wrap: wrap;
        }
        .proj-meta { text-align: right; }
        .proj-tags {
          display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end;
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .projects-section { padding: 80px 24px; }
          .proj-year-label { display: none; }
          .proj-grid { grid-template-columns: 48px 1fr; gap: 12px; }
          .proj-meta { text-align: left; margin-top: 8px; grid-column: 2; }
          .proj-tags { justify-content: flex-start; }
          .proj-year { margin-bottom: 6px !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .projects-section { padding: 60px 16px; }
          .proj-grid { grid-template-columns: 1fr; gap: 10px; }
          .proj-num { display: none; }
          .proj-cat { display: none; }
          .proj-row { padding: 20px 0; }
          .proj-title-row { gap: 10px; margin-bottom: 6px; }
          .proj-meta { grid-column: 1; margin-top: 8px; }
        }
      `}</style>
    </section>
  );
}
