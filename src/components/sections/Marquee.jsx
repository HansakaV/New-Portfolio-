export default function Marquee() {
  const items = ['React', 'Node.js', 'TypeScript', 'Three.js', 'Next.js', 'PostgreSQL', 'GraphQL', 'Docker', 'AWS', 'MongoDB', 'GSAP', 'Tailwind'];
  const repeated = [...items, ...items];

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--dark-2)', padding: '16px 0' }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="mono" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: 60, whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--green)', marginRight: 12 }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
