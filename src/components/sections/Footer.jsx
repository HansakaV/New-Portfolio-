import { developerInfo, socials } from '../../data/socials';

/* ── Nav sections for quick links ── */
const quickLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',   href: '#about' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Projects',href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const contactDetails = [
  { icon: '✉', label: 'Email',    value: developerInfo.email,        href: `mailto:${developerInfo.email}` },
  { icon: '◎', label: 'Phone',   value: '+94 71 035 6244',          href: 'tel:+94710356244' },
  { icon: '◈', label: 'Location', value: 'Rathnapura, Sri Lanka',     href: null },
];

/* ── Social icon map (text fallback for custom chars) ── */
const socialIcons = { GitHub: 'GH', LinkedIn: 'IN', Twitter: 'TW', Dribbble: 'DB' };

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="ft-root">

      {/* ── Top band ── */}
      <div className="ft-top">
        <div className="ft-inner">

          {/* ── Col 1: Brand ── */}
          <div className="ft-brand">
            <div className="ft-logo">
              <span className="mono highlight ft-logo-text">MH</span>
            </div>
            <div>
              <p className="ft-brand-name display">MAHESH HANSAKA</p>
              <p className="ft-brand-role mono">{developerInfo.role}</p>
            </div>
            <p className="ft-brand-tagline">
              Crafting performant, production-grade applications at the intersection
              of clean engineering and thoughtful design.
            </p>
            {/* Social icons */}
            <div className="ft-socials">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="ft-social-pill mono hover-target"
                >
                  {socialIcons[s.name] ?? s.name.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="ft-col">
            <p className="ft-col-title mono">// Quick Links</p>
            <ul className="ft-link-list">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="ft-link mono hover-target">
                    <span className="ft-link-arrow">→</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div className="ft-col">
            <p className="ft-col-title mono">// Get In Touch</p>
            <ul className="ft-contact-list">
              {contactDetails.map(d => (
                <li key={d.label} className="ft-contact-item">
                  <span className="ft-contact-icon">{d.icon}</span>
                  <div>
                    <p className="ft-contact-label mono">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="ft-contact-value hover-target">{d.value}</a>
                    ) : (
                      <p className="ft-contact-value">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href="#contact" className="ft-cta mono hover-target">
              Start a Project →
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <span className="mono ft-copy">© {year} Mahesh Hansaka — All Rights Reserved</span>
          <span className="mono ft-made">Built with React &amp; GSAP</span>
        </div>
      </div>

      {/* ─────────────────────── STYLES ─────────────────────── */}
      <style>{`

        /* ── Root ── */
        .ft-root {
          background: var(--dark);
          border-top: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        /* subtle radial glow top-left */
        .ft-root::before {
          content: '';
          position: absolute;
          top: -120px; left: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Top section ── */
        .ft-top { padding: 80px 40px 56px; }
        .ft-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr;
          gap: 64px;
        }

        /* ── Brand column ── */
        .ft-logo {
          width: 40px; height: 40px;
          border: 1.5px solid var(--green);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-bottom: 14px;
        }
        .ft-logo-text { font-size: 11px; font-weight: 700; }
        .ft-brand-name {
          font-size: clamp(18px, 2.2vw, 26px);
          line-height: 1; color: var(--text); letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .ft-brand-role {
          font-size: 9px; letter-spacing: 3px;
          color: var(--green); text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ft-brand-tagline {
          font-size: 13px; line-height: 1.75;
          color: var(--text-muted); margin-bottom: 28px;
          max-width: 340px;
        }

        /* Social pills */
        .ft-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .ft-social-pill {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 7px 14px;
          text-decoration: none;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        .ft-social-pill:hover {
          color: var(--green);
          border-color: rgba(0,255,136,0.4);
          background: rgba(0,255,136,0.04);
        }

        /* ── Generic column ── */
        .ft-col { display: flex; flex-direction: column; }
        .ft-col-title {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--green); margin-bottom: 24px;
        }

        /* Quick links */
        .ft-link-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .ft-link {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-muted); text-decoration: none;
          transition: color 0.25s, gap 0.25s;
        }
        .ft-link:hover { color: var(--text); gap: 14px; }
        .ft-link-arrow {
          font-size: 11px; color: var(--green);
          transition: transform 0.25s;
        }
        .ft-link:hover .ft-link-arrow { transform: translateX(4px); }

        /* Contact list */
        .ft-contact-list { list-style: none; display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        .ft-contact-item { display: flex; align-items: flex-start; gap: 14px; }
        .ft-contact-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--green);
          margin-top: 2px;
        }
        .ft-contact-label {
          font-size: 9px; letter-spacing: 2px; color: var(--text-muted);
          text-transform: uppercase; margin-bottom: 3px;
        }
        .ft-contact-value {
          font-size: 13px; color: var(--text);
          text-decoration: none;
          transition: color 0.25s;
        }
        a.ft-contact-value:hover { color: var(--green); }

        /* CTA button */
        .ft-cta {
          display: inline-flex; align-items: center;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--green); text-decoration: none;
          border: 1px solid rgba(0,255,136,0.4);
          padding: 10px 20px;
          align-self: flex-start;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .ft-cta:hover {
          background: var(--green);
          color: var(--dark);
          border-color: var(--green);
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid var(--border);
          padding: 20px 40px;
        }
        .ft-bottom-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }
        .ft-copy, .ft-made {
          font-size: 10px; letter-spacing: 2px;
          color: var(--text-muted); text-transform: uppercase;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .ft-inner { grid-template-columns: 1fr 1fr; gap: 48px; }
          .ft-brand { grid-column: 1 / -1; }
          .ft-brand-tagline { max-width: 100%; }
        }
        @media (max-width: 640px) {
          .ft-top { padding: 56px 20px 40px; }
          .ft-bottom { padding: 16px 20px; }
          .ft-inner { grid-template-columns: 1fr; gap: 40px; }
          .ft-made  { display: none; }
          .ft-bottom-inner { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
