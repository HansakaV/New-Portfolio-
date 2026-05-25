import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials, developerInfo } from '../../data/socials';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

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

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero heading */}
        <SectionHeader
          ref={titleRef}
          label="// let's build something"
          title="LET'S"
          highlight="CONNECT"
          center
          marginBottom={72}
          extra={
            <Button
              as="a"
              href={`mailto:${developerInfo.email}`}
              variant="text"
            >
              {developerInfo.email}
            </Button>
          }
        />

        {/* 2-col grid */}
        <div className="contact-grid">
          {/* Form */}
          <div ref={formRef}>
            <p className="section-label" style={{ marginBottom: 24 }}>Send a message</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input type="text" placeholder="Subject" />
              <Textarea rows={5} placeholder="Your Message" />
              
              <Button
                variant="primary"
                fullWidth
                scaleOnHover
                style={{ padding: '16px' }}
              >
                Send Message →
              </Button>
            </div>
          </div>

          {/* Socials + availability */}
          <div>
            <p className="section-label" style={{ marginBottom: 32 }}>// find me here</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-link-row">
                  <span className="sl-name display">{s.name}</span>
                  <span className="mono sl-arrow">↗</span>
                </a>
              ))}
              <div style={{ borderTop: '1px solid var(--border)' }} />
            </div>

            <div style={{ marginTop: 40, padding: 24, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="section-label" style={{ marginBottom: 12 }}>availability</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="pulse-dot" />
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

        .social-link-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding: 20px 0;
          text-decoration: none;
          transition: padding-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .social-link-row:hover {
          padding-left: 12px;
        }

        .sl-name {
          font-size: 28px;
          color: var(--text);
          transition: color 0.3s ease;
        }

        .social-link-row:hover .sl-name {
          color: var(--green);
        }

        .sl-arrow {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 2px;
        }

        .pulse-dot {
          width: 8, height: 8;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: pulse 2s infinite;
          flex-shrink: 0;
          width: 8px;
          height: 8px;
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
