import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const formRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo(formRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
    color: 'var(--text)', padding: '16px', fontFamily: 'Syne, sans-serif',
    fontSize: 14, outline: 'none', transition: 'border-color 0.3s',
  };
  const focus = (e) => { e.target.style.borderColor = 'var(--green)'; };
  const blur  = (e) => { e.target.style.borderColor = 'var(--border)'; };

  const socials = [
    { name: 'GitHub',   url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter',  url: 'https://twitter.com' },
    { name: 'Dribbble', url: 'https://dribbble.com' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero heading */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-label" style={{ marginBottom: 16 }}>// let's build something</p>
          <h2 className="display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 0.9, marginBottom: 24 }}>
            LET'S<br /><span style={{ color: 'var(--green)' }}>CONNECT</span>
          </h2>
          <a href="mailto:mahesh.hansaka@gmail.com" style={{
            fontFamily: 'Space Mono', fontSize: 13, color: 'var(--text-muted)',
            letterSpacing: 2, textDecoration: 'none', borderBottom: '1px solid var(--border)',
            paddingBottom: 2, transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--green)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            mahesh.hansaka@gmail.com
          </a>
        </div>

        {/* 2-col grid */}
        <div className="contact-grid">
          {/* Form */}
          <div ref={formRef}>
            <p className="section-label" style={{ marginBottom: 24 }}>Send a message</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text"  placeholder="Your Name"    style={inputStyle} onFocus={focus} onBlur={blur} />
              <input type="email" placeholder="Your Email"   style={inputStyle} onFocus={focus} onBlur={blur} />
              <input type="text"  placeholder="Subject"      style={inputStyle} onFocus={focus} onBlur={blur} />
              <textarea rows={5} placeholder="Your Message"  style={{ ...inputStyle, resize: 'none' }} onFocus={focus} onBlur={blur} />
              <button style={{
                background: 'var(--green)', color: 'var(--dark)', border: 'none',
                padding: '16px', fontFamily: 'Space Mono', fontSize: 11,
                letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700,
                cursor: 'pointer', transition: 'opacity 0.3s',
              }}
                onMouseEnter={e => gsap.to(e.target, { scale: 1.02, duration: 0.2 })}
                onMouseLeave={e => gsap.to(e.target, { scale: 1, duration: 0.2 })}>
                Send Message →
              </button>
            </div>
          </div>

          {/* Socials + availability */}
          <div>
            <p className="section-label" style={{ marginBottom: 32 }}>// find me here</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid var(--border)', padding: '20px 0',
                    textDecoration: 'none', transition: 'padding-left 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.querySelector('.sl-name').style.color = 'var(--green)'; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.querySelector('.sl-name').style.color = 'var(--text)'; }}>
                  <span className="sl-name display" style={{ fontSize: 28, color: 'var(--text)', transition: 'color 0.3s' }}>{s.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>↗</span>
                </a>
              ))}
              <div style={{ borderTop: '1px solid var(--border)' }} />
            </div>

            <div style={{ marginTop: 40, padding: 24, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="section-label" style={{ marginBottom: 12 }}>availability</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                <p className="mono" style={{ fontSize: 12, color: 'var(--text)' }}>Open to freelance &amp; full-time roles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { padding: 120px 40px 80px; background: var(--dark-2); }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; box-shadow: 0 0 8px var(--green); }
          50%      { opacity: 0.5; box-shadow: 0 0 20px var(--green); }
        }

        @media (max-width: 900px) {
          .contact-section { padding: 80px 24px 60px; }
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 600px) {
          .contact-section { padding: 60px 16px 40px; }
          .contact-grid { gap: 36px; }
        }
      `}</style>
    </section>
  );
}
