import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Float, Torus, MeshDistortMaterial } from '@react-three/drei';
import SectionHeader from '../ui/SectionHeader';
import {
  services,
  techStack,
  experienceStats,
  industryExperience,
  freelanceClients,
} from '../../data/experience';

gsap.registerPlugin(ScrollTrigger);

/* ── 3D Decorative Torus ─────────────────────────────────── */
function Torus3D() {
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.4}>
      <Torus args={[1, 0.28, 40, 80]}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.25}
          speed={2}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.15}
          wireframe
        />
      </Torus>
    </Float>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const treeContainerRef = useRef(null);
  const stackRef   = useRef(null);
  const expRef     = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Group services into left & right columns for the tree layout
  const leftServices = services.slice(0, 3); // id: 01, 02, 03
  const rightServices = services.slice(3, 6); // id: 04, 05, 06

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title ScrollTrigger */
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );

      /* Tree & Services container entrance stagger */
      gsap.fromTo(
        treeContainerRef.current.querySelectorAll('.tree-anim-fade'),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: treeContainerRef.current, start: 'top 78%' },
        }
      );

      /* Tech stack row */
      gsap.fromTo(stackRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: stackRef.current, start: 'top 90%' },
        }
      );

      /* Experience section — staggered blocks */
      gsap.fromTo(
        expRef.current.querySelectorAll('.exp-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: expRef.current, start: 'top 82%' },
        }
      );

      /* Animated stat counters */
      expRef.current.querySelectorAll('.exp-stat-num').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = Number.isInteger(target)
              ? Math.round(obj.val)
              : obj.val.toFixed(1);
          },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="svc-section">

      {/* 3D Torus decoration */}
      <div className="svc-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.25} />
          <pointLight position={[6, 6, 6]} color="#00ff88" intensity={5} />
          <pointLight position={[-6, -4, 4]} color="#00ccff" intensity={2} />
          <Torus3D />
        </Canvas>
      </div>

      {/* Ambient gradient blobs */}
      <div className="svc-blob svc-blob--1" aria-hidden="true" />
      <div className="svc-blob svc-blob--2" aria-hidden="true" />

      <div className="svc-inner">

        {/* ── Section Header ── */}
        <SectionHeader
          ref={titleRef}
          label="// what i do"
          title="SERVICES &"
          highlight="EXPERTISE"
          marginBottom={64}
          style={{ opacity: 0 }}
        />

        {/* ── Nature-Inspired Swaying Tree Layout ── */}
        <div ref={treeContainerRef} className="tree-layout-wrapper">
          
          {/* Left Column Services */}
          <div className="tree-column tree-column-left">
            {leftServices.map((svc, i) => (
              <div
                key={svc.id}
                className={`svc-card tree-anim-fade hover-target ${hoveredIndex === i ? 'svc-card--active' : ''}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ '--card-accent': svc.accent, '--card-glow': svc.glow }}
              >
                <span className="svc-id mono display">{svc.id}</span>
                <div className="svc-top">
                  <div className="svc-icon-ring">
                    <span className="svc-icon">{svc.icon}</span>
                  </div>
                  <div>
                    <p className="svc-tagline mono">{svc.tagline}</p>
                    <h3 className="svc-title display">{svc.title}</h3>
                  </div>
                </div>
                <div className="svc-divider" />
                <p className="svc-desc">{svc.desc}</p>
                <div className="svc-tags">
                  {svc.tags.map(t => (
                    <span key={t} className="svc-tag mono">{t}</span>
                  ))}
                </div>
                <div className="svc-underline" />
              </div>
            ))}
          </div>

          {/* Center Column: Animated swaying SVG Tree */}
          <div className="tree-center-illustration tree-anim-fade">
            <svg viewBox="0 0 300 500" className="interactive-tree-svg" fill="none">
              <defs>
                <radialGradient id="root-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="trunk-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#052c16" />
                  <stop offset="60%" stopColor="#0a4b26" />
                  <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>
                <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Root base */}
              <circle cx="150" cy="470" r="45" fill="url(#root-glow)" />
              <path d="M120,470 Q150,465 180,470" stroke="#00ff88" strokeWidth="2" strokeOpacity="0.4" />

              {/* Central Trunk with natural breathing sway */}
              <g className="tree-sway-trunk">
                <path
                  d="M150,470 Q148,340 150,220"
                  stroke="url(#trunk-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Left Branch 1 (Connects to Service 01) */}
                <path
                  className={`tree-branch branch-left-1 ${hoveredIndex === 0 ? 'branch--active' : ''}`}
                  d="M149,380 Q100,340 30,345"
                  stroke={hoveredIndex === 0 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 0 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-left-1 ${hoveredIndex === 0 ? 'leaf--active' : ''}`}
                  cx="30"
                  cy="345"
                  r={hoveredIndex === 0 ? '7' : '4.5'}
                  fill={hoveredIndex === 0 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 0 ? 'url(#glow-effect)' : ''}
                />

                {/* Left Branch 2 (Connects to Service 02) */}
                <path
                  className={`tree-branch branch-left-2 ${hoveredIndex === 1 ? 'branch--active' : ''}`}
                  d="M149,300 Q80,270 24,250"
                  stroke={hoveredIndex === 1 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 1 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-left-2 ${hoveredIndex === 1 ? 'leaf--active' : ''}`}
                  cx="24"
                  cy="250"
                  r={hoveredIndex === 1 ? '7' : '4.5'}
                  fill={hoveredIndex === 1 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 1 ? 'url(#glow-effect)' : ''}
                />

                {/* Left Branch 3 (Connects to Service 03) */}
                <path
                  className={`tree-branch branch-left-3 ${hoveredIndex === 2 ? 'branch--active' : ''}`}
                  d="M150,230 Q90,170 45,120"
                  stroke={hoveredIndex === 2 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 2 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-left-3 ${hoveredIndex === 2 ? 'leaf--active' : ''}`}
                  cx="45"
                  cy="120"
                  r={hoveredIndex === 2 ? '7' : '4.5'}
                  fill={hoveredIndex === 2 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 2 ? 'url(#glow-effect)' : ''}
                />

                {/* Right Branch 1 (Connects to Service 04) */}
                <path
                  className={`tree-branch branch-right-1 ${hoveredIndex === 3 ? 'branch--active' : ''}`}
                  d="M151,380 Q200,340 270,345"
                  stroke={hoveredIndex === 3 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 3 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-right-1 ${hoveredIndex === 3 ? 'leaf--active' : ''}`}
                  cx="270"
                  cy="345"
                  r={hoveredIndex === 3 ? '7' : '4.5'}
                  fill={hoveredIndex === 3 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 3 ? 'url(#glow-effect)' : ''}
                />

                {/* Right Branch 2 (Connects to Service 05) */}
                <path
                  className={`tree-branch branch-right-2 ${hoveredIndex === 4 ? 'branch--active' : ''}`}
                  d="M151,300 Q220,270 276,250"
                  stroke={hoveredIndex === 4 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 4 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-right-2 ${hoveredIndex === 4 ? 'leaf--active' : ''}`}
                  cx="276"
                  cy="250"
                  r={hoveredIndex === 4 ? '7' : '4.5'}
                  fill={hoveredIndex === 4 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 4 ? 'url(#glow-effect)' : ''}
                />

                {/* Right Branch 3 (Connects to Service 06) */}
                <path
                  className={`tree-branch branch-right-3 ${hoveredIndex === 5 ? 'branch--active' : ''}`}
                  d="M150,230 Q210,170 255,120"
                  stroke={hoveredIndex === 5 ? '#00ff88' : '#0e5e32'}
                  strokeWidth={hoveredIndex === 5 ? '3.5' : '2'}
                  strokeLinecap="round"
                />
                <circle
                  className={`tree-leaf leaf-right-3 ${hoveredIndex === 5 ? 'leaf--active' : ''}`}
                  cx="255"
                  cy="120"
                  r={hoveredIndex === 5 ? '7' : '4.5'}
                  fill={hoveredIndex === 5 ? '#00ff88' : '#052c16'}
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  filter={hoveredIndex === 5 ? 'url(#glow-effect)' : ''}
                />

                {/* Tree Crown / Top Tip */}
                <path
                  d="M150,220 Q145,140 150,60"
                  stroke="url(#trunk-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  cx="150"
                  cy="60"
                  r="5"
                  fill="#00ff88"
                  filter="url(#glow-effect)"
                />
              </g>
            </svg>
          </div>

          {/* Right Column Services */}
          <div className="tree-column tree-column-right">
            {rightServices.map((svc, i) => {
              const indexShifted = i + 3; // Shift index to align with right columns
              return (
                <div
                  key={svc.id}
                  className={`svc-card tree-anim-fade hover-target ${hoveredIndex === indexShifted ? 'svc-card--active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(indexShifted)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ '--card-accent': svc.accent, '--card-glow': svc.glow }}
                >
                  <span className="svc-id mono display">{svc.id}</span>
                  <div className="svc-top">
                    <div className="svc-icon-ring">
                      <span className="svc-icon">{svc.icon}</span>
                    </div>
                    <div>
                      <p className="svc-tagline mono">{svc.tagline}</p>
                      <h3 className="svc-title display">{svc.title}</h3>
                    </div>
                  </div>
                  <div className="svc-divider" />
                  <p className="svc-desc">{svc.desc}</p>
                  <div className="svc-tags">
                    {svc.tags.map(t => (
                      <span key={t} className="svc-tag mono">{t}</span>
                    ))}
                  </div>
                  <div className="svc-underline" />
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Tech Stack Pills ── */}
        <div ref={stackRef} className="svc-stack" style={{ opacity: 0 }}>
          <p className="mono svc-stack-label">// also proficient in</p>
          <div className="svc-stack-pills">
            {techStack.map(t => (
              <span key={t} className="svc-pill mono">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Experience & Clients ── */}
        <div ref={expRef} className="exp-section">

          <p className="mono svc-stack-label exp-animate" style={{ marginBottom: 40 }}>
            // experience &amp; clients
          </p>

          {/* Stats Banner */}
          <div className="exp-stats exp-animate">
            {experienceStats.map((s, i) => (
              <div key={i} className="exp-stat-card">
                <div className="exp-stat-row">
                  <span className="exp-stat-num display" data-target={s.num}>0</span>
                  <span className="exp-stat-suffix display">{s.suffix}</span>
                </div>
                <p className="exp-stat-label">{s.label}</p>
                <p className="exp-stat-sub mono">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Industry Experience */}
          <div className="exp-industry exp-animate">
            <div className="exp-badge mono">Industry Experience</div>
            {industryExperience.map((job, i) => (
              <div key={i} className="exp-job-card">
                <div className="exp-job-left">
                  <div className="exp-job-dot" />
                  <div className="exp-job-line" />
                </div>
                <div className="exp-job-body">
                  <div className="exp-job-top">
                    <div>
                      <p className="mono exp-job-date">{job.dateRange}</p>
                      <h4 className="exp-job-title display">{job.role}</h4>
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-job-company mono hover-target"
                      >
                        {job.company} ↗
                      </a>
                    </div>
                    <div className="exp-job-badge mono">{job.badge}</div>
                  </div>
                  <p className="exp-job-desc">{job.desc}</p>
                  <div className="exp-job-tags">
                    {job.tags.map(t => (
                      <span key={t} className="svc-tag mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Freelance Clients — Logo Marquee */}
          <div className="exp-animate">
            <div className="exp-badge mono" style={{ marginBottom: 24 }}>Happy Clients</div>
            <div className="client-marquee-outer" aria-label="Freelance clients">
              {/* Edge fade masks */}
              <div className="client-marquee-fade client-marquee-fade--left"  aria-hidden="true" />
              <div className="client-marquee-fade client-marquee-fade--right" aria-hidden="true" />

              <div className="client-marquee-viewport">
                {/* Duplicate array for seamless infinite loop */}
                <div className="client-marquee-track">
                  {[...freelanceClients, ...freelanceClients].map((c, i) => (
                    <div key={i} className="client-logo-item hover-target" title={c.name}>
                      <div className="client-logo-box">
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="client-logo-img"
                          draggable="false"
                        />
                      </div>
                      <div className="client-logo-tooltip">
                        <p className="client-tooltip-name display">{c.name}</p>
                        <p className="client-tooltip-type mono">{c.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────── STYLES ─────────────────────── */}
      <style>{`

        /* ── Section shell ── */
        .svc-section {
          position: relative;
          padding: 120px 40px 100px;
          background: var(--dark);
          overflow: hidden;
        }

        /* ── 3D canvas ── */
        .svc-canvas {
          position: absolute;
          right: -60px; top: 50%;
          transform: translateY(-50%);
          width: 420px; height: 420px;
          pointer-events: none;
          opacity: 0.3; z-index: 0;
        }

        /* ── Ambient blobs ── */
        .svc-blob {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none; z-index: 0;
        }
        .svc-blob--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
          top: -100px; left: -150px;
        }
        .svc-blob--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,204,255,0.05) 0%, transparent 70%);
          bottom: -80px; right: 100px;
        }

        /* ── Inner container ── */
        .svc-inner {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        /* ── Modern Swaying Tree Layout ── */
        .tree-layout-wrapper {
          display: grid;
          grid-template-columns: 1fr 280px 1fr;
          align-items: center;
          gap: 24px;
        }

        .tree-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .tree-center-illustration {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* SVG Sway Animation */
        @keyframes treeSway {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(1.2deg); }
        }
        .interactive-tree-svg {
          width: 100%;
          max-height: 480px;
          overflow: visible;
        }
        .tree-sway-trunk {
          transform-origin: 150px 470px;
          animation: treeSway 8s ease-in-out infinite;
        }

        /* Tree Branch active states */
        .tree-branch {
          transition: stroke 0.4s ease, stroke-width 0.4s ease, stroke-dashoffset 0.4s ease;
        }
        .tree-leaf {
          transition: fill 0.4s ease, r 0.4s ease, filter 0.4s ease;
        }

        /* Dash array animation for light flow */
        @keyframes lightPulse {
          to { stroke-dashoffset: -20; }
        }
        .branch--active {
          stroke-dasharray: 6 3;
          animation: lightPulse 1.2s linear infinite;
        }

        /* ── Service cards ── */
        .svc-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 28px 24px;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .svc-card--active,
        .svc-card:hover {
          background: color-mix(in srgb, var(--card-glow, rgba(0,255,136,0.12)) 100%, var(--surface));
          border-color: var(--card-accent, var(--green));
          box-shadow: 0 8px 30px rgba(0, 255, 136, 0.08);
        }

        .svc-id {
          position: absolute; top: 16px; right: 20px;
          font-size: 36px; color: var(--text); opacity: 0.12;
          line-height: 1; user-select: none; pointer-events: none;
          transition: opacity 0.3s, transform 0.3s;
        }

        .svc-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }

        .svc-icon-ring {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; flex-shrink: 0;
          border: 1px solid var(--card-accent, var(--green));
          background: color-mix(in srgb, var(--card-glow, rgba(0,255,136,0.1)) 60%, transparent);
          transition: background 0.35s, box-shadow 0.35s;
        }
        .svc-card:hover .svc-icon-ring {
          box-shadow: 0 0 20px var(--card-glow, rgba(0,255,136,0.3));
        }
        .svc-icon { font-size: 18px; color: var(--card-accent, var(--green)); line-height: 1; }

        .svc-tagline {
          font-size: 9px; letter-spacing: 2px;
          color: var(--card-accent, var(--green));
          text-transform: uppercase; margin-bottom: 2px; opacity: 0.8;
        }
        .svc-title { font-size: 20px; line-height: 1.1; color: var(--text); letter-spacing: 0.5px; }

        .svc-divider {
          height: 1px; background: var(--border); margin-bottom: 12px;
          position: relative; overflow: hidden;
        }
        .svc-divider::after {
          content: ''; position: absolute; top: 0; left: -100%;
          height: 100%; width: 60%; background: var(--card-accent, var(--green));
          opacity: 0; transition: left 0.5s ease, opacity 0.3s ease;
        }
        .svc-card:hover .svc-divider::after { left: 0; opacity: 0.6; }

        .svc-desc { font-size: 13px; line-height: 1.65; color: var(--text-muted); margin-bottom: 16px; }

        .svc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .svc-tag {
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--card-accent, var(--green));
          border: 1px solid color-mix(in srgb, var(--card-accent, var(--green)) 30%, transparent);
          padding: 2px 8px; transition: background 0.25s, color 0.25s;
        }
        .svc-card:hover .svc-tag {
          background: color-mix(in srgb, var(--card-accent, var(--green)) 12%, transparent);
        }

        .svc-underline {
          position: absolute; bottom: 0; left: 0;
          height: 2px; width: 0;
          background: var(--card-accent, var(--green));
          transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 0 12px var(--card-glow, rgba(0,255,136,0.4));
        }
        .svc-card:hover .svc-underline { width: 100%; }

        /* ── Tech stack ── */
        .svc-stack {
          margin-top: 64px; padding-top: 40px;
          border-top: 1px solid var(--border);
        }
        .svc-stack-label {
          font-size: 10px; letter-spacing: 3px; color: var(--text-muted);
          text-transform: uppercase; margin-bottom: 20px;
        }
        .svc-stack-pills { display: flex; flex-wrap: wrap; gap: 10px; }
        .svc-pill {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-muted); border: 1px solid var(--border); padding: 6px 14px;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        .svc-pill:hover {
          color: var(--green); border-color: rgba(0,255,136,0.35);
          background: rgba(0,255,136,0.04);
        }

        /* Responsive Layout Settings */
        @media (max-width: 1024px) {
          .tree-layout-wrapper {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .tree-center-illustration {
            display: none;
          }
          .tree-column {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .svc-canvas { width: 280px; height: 280px; opacity: 0.3; }
        }

        @media (max-width: 900px) {
          .svc-section { padding: 80px 24px 72px; }
          .svc-canvas  { display: none; }
          .svc-blob    { display: none; }
          .tree-column { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .svc-section { padding: 60px 16px 56px; }
          .svc-stack   { margin-top: 40px; padding-top: 28px; }
          .svc-id      { font-size: 32px; }
        }

        /* ═══════════════════════════════════════
           EXPERIENCE SECTION
        ═══════════════════════════════════════ */

        .exp-section {
          margin-top: 80px; padding-top: 64px;
          border-top: 1px solid var(--border);
        }

        /* Stats banner */
        .exp-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); margin-bottom: 56px;
        }
        .exp-stat-card {
          background: var(--dark); padding: 32px 28px;
          position: relative; overflow: hidden; transition: background 0.3s;
        }
        .exp-stat-card::before {
          content: ''; position: absolute; bottom: 0; left: 0;
          height: 2px; width: 0; background: var(--green);
          transition: width 0.45s ease;
        }
        .exp-stat-card:hover::before { width: 100%; }
        .exp-stat-card:hover { background: rgba(0,255,136,0.03); }
        .exp-stat-row { display: flex; align-items: baseline; gap: 2px; margin-bottom: 10px; }
        .exp-stat-num  { font-size: clamp(44px, 5.5vw, 72px); line-height: 1; color: var(--green); }
        .exp-stat-suffix { font-size: clamp(28px, 3.5vw, 48px); line-height: 1; color: var(--green); }
        .exp-stat-label { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
        .exp-stat-sub { font-size: 9px; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; }

        /* Badge */
        .exp-badge {
          display: inline-flex; font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--green);
          border: 1px solid rgba(0,255,136,0.3); padding: 5px 14px; margin-bottom: 24px;
        }

        /* Industry job card */
        .exp-industry { margin-bottom: 56px; }
        .exp-job-card {
          display: flex; background: var(--surface);
          border: 1px solid var(--border); transition: border-color 0.35s; overflow: hidden;
        }
        .exp-job-card:hover { border-color: rgba(0,255,136,0.4); }
        .exp-job-left {
          display: flex; flex-direction: column; align-items: center;
          padding: 32px 0; width: 48px; flex-shrink: 0;
          background: var(--dark); border-right: 1px solid var(--border);
        }
        .exp-job-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green); box-shadow: 0 0 12px var(--green); flex-shrink: 0;
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 8px var(--green); }
          50%      { box-shadow: 0 0 20px var(--green), 0 0 40px rgba(0,255,136,0.3); }
        }
        .exp-job-line {
          flex: 1; width: 1px;
          background: linear-gradient(to bottom, var(--green), transparent);
          margin-top: 8px; opacity: 0.4;
        }
        .exp-job-body { padding: 32px 36px; flex: 1; min-width: 0; }
        .exp-job-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 16px; margin-bottom: 16px; flex-wrap: wrap;
        }
        .exp-job-date {
          font-size: 10px; letter-spacing: 2px; color: var(--text-muted);
          text-transform: uppercase; margin-bottom: 6px;
        }
        .exp-job-title { font-size: clamp(22px, 3vw, 36px); line-height: 1.05; color: var(--text); margin-bottom: 8px; }
        .exp-job-company {
          font-size: 11px; letter-spacing: 2px; color: var(--green);
          text-decoration: none; text-transform: uppercase; transition: opacity 0.2s;
        }
        .exp-job-company:hover { opacity: 0.7; }
        .exp-job-badge {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-muted); border: 1px solid var(--border);
          padding: 5px 12px; flex-shrink: 0; white-space: nowrap; height: fit-content;
        }
        .exp-job-desc { font-size: 13px; line-height: 1.8; color: var(--text-muted); margin-bottom: 20px; }
        .exp-job-tags { display: flex; flex-wrap: wrap; gap: 6px; }

        /* ── Client logo marquee ── */
        @keyframes clientScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .client-marquee-outer {
          position: relative;
          border: 1px solid var(--border);
          background: var(--surface);
          overflow: hidden;
          padding: 0;
        }

        /* Left / right fade edges */
        .client-marquee-fade {
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .client-marquee-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--dark) 0%, transparent 100%);
        }
        .client-marquee-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--dark) 0%, transparent 100%);
        }

        .client-marquee-viewport {
          overflow: hidden;
          width: 100%;
        }

        /* The scrolling track — contains 2x items for seamless loop */
        .client-marquee-track {
          display: flex;
          width: max-content;
          animation: clientScroll 22s linear infinite;
          will-change: transform;
        }
        /* Pause on hover */
        .client-marquee-outer:hover .client-marquee-track {
          animation-play-state: paused;
        }

        /* Each logo item */
        .client-logo-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 110px;
          flex-shrink: 0;
          padding: 20px 24px;
          border-right: 1px solid var(--border);
          transition: background 0.3s;
        }
        .client-logo-item:hover {
          background: rgba(0,255,136,0.04);
        }

        /* Logo image — all normalized to the same visible size */
        .client-logo-box {
          width: 140px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .client-logo-img {
          max-width: 100%;
          max-height: 100%;
          width: 140px;
          height: 64px;
          object-fit: contain;
          object-position: center;
          /* Desaturate by default, colorize on hover */
          filter: none;
          transition: filter 0.4s ease, transform 0.4s ease;
          user-select: none;
          -webkit-user-drag: none;
        }
        .client-logo-item:hover .client-logo-img {
          filter: drop-shadow(0 0 8px rgba(0,255,136,0.35));
          transform: scale(1.05);
        }

        /* Tooltip that slides up on hover */
        .client-logo-tooltip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          padding: 8px 14px;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-top: 1px solid rgba(0,255,136,0.25);
          pointer-events: none;
        }
        .client-logo-item:hover .client-logo-tooltip {
          transform: translateY(0);
        }
        .client-tooltip-name {
          font-size: 13px;
          line-height: 1.1;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .client-tooltip-type {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--green);
          margin-top: 2px;
        }

        /* ── Experience responsive ── */
        @media (max-width: 900px) {
          .exp-stats            { grid-template-columns: repeat(2, 1fr); }
          .exp-job-body         { padding: 24px; }
          .client-logo-item     { width: 160px; height: 90px; padding: 16px; }
          .client-logo-box      { width: 110px; height: 52px; }
          .client-logo-img      { width: 110px; height: 52px; }
          .client-marquee-fade  { width: 60px; }
        }
        @media (max-width: 600px) {
          .exp-section          { margin-top: 48px; padding-top: 40px; }
          .exp-stats            { grid-template-columns: repeat(2, 1fr); }
          .exp-stat-card        { padding: 20px 16px; }
          .exp-job-left         { display: none; }
          .exp-job-body         { padding: 20px 16px; }
          .client-logo-item     { width: 140px; height: 80px; padding: 12px; }
          .client-logo-box      { width: 96px; height: 44px; }
          .client-logo-img      { width: 96px; height: 44px; }
          .client-marquee-fade  { width: 40px; }
        }
      `}</style>
    </section>
  );
}
