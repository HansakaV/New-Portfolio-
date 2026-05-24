import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Float, Torus, MeshDistortMaterial } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'Frontend',
    items: [
      { name: 'React / Next.js',    level: 95 },
      { name: 'TypeScript',         level: 88 },
      { name: 'Three.js / R3F',     level: 82 },
      { name: 'GSAP / Animations',  level: 85 },
      { name: 'Tailwind CSS',       level: 92 },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js / Express',  level: 92 },
      { name: 'Python / FastAPI',   level: 80 },
      { name: 'GraphQL',            level: 78 },
      { name: 'PostgreSQL',         level: 85 },
      { name: 'MongoDB / Redis',    level: 83 },
    ]
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'AWS / Cloud',        level: 80 },
      { name: 'Docker / K8s',       level: 75 },
      { name: 'CI/CD Pipelines',    level: 82 },
      { name: 'Git / GitHub',       level: 95 },
      { name: 'Linux / Shell',      level: 78 },
    ]
  }
];

function Torus3D() {
  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={0.3}>
      <Torus args={[1, 0.3, 32, 64]}>
        <MeshDistortMaterial
          color="#00ff88" attach="material"
          distort={0.3} speed={2}
          roughness={0} metalness={1}
          transparent opacity={0.2} wireframe
        />
      </Torus>
    </Float>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo(gridRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' } }
      );
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = bar.dataset.level / 100;
        gsap.to(bar, {
          scaleX: level, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 85%' }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      {/* Three.js torus */}
      <div className="skills-canvas">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#00ff88" intensity={4} />
          <Torus3D />
        </Canvas>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div ref={titleRef}>
          <p className="section-label" style={{ marginBottom: 12 }}>// expertise</p>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, marginBottom: 56 }}>
            WHAT I<br /><span style={{ color: 'var(--green)' }}>MASTER</span>
          </h2>
        </div>

        <div ref={gridRef} className="skills-grid">
          {skillGroups.map(group => (
            <div key={group.category}>
              <p className="section-label" style={{ marginBottom: 24 }}>{group.category}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {group.items.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: 'var(--text)' }}>{skill.name}</span>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--green)' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: 2, background: 'var(--surface-2)', position: 'relative' }}>
                      <div className="skill-bar-fill" data-level={skill.level}
                        style={{ height: '100%', background: 'var(--green)', transformOrigin: 'left', transform: 'scaleX(0)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          padding: 120px 40px; background: var(--dark);
          position: relative; overflow: hidden;
        }
        .skills-canvas {
          position: absolute; right: 0; top: 50%;
          transform: translateY(-50%);
          width: 350px; height: 350px;
          pointer-events: none; opacity: 0.5;
        }
        .skills-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 40px; max-width: 900px;
        }

        @media (max-width: 1100px) {
          .skills-canvas { width: 240px; height: 240px; opacity: 0.3; }
        }
        @media (max-width: 900px) {
          .skills-section { padding: 80px 24px; }
          .skills-canvas  { display: none; }
          .skills-grid    { grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 100%; }
        }
        @media (max-width: 600px) {
          .skills-section { padding: 60px 16px; }
          .skills-grid    { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </section>
  );
}
