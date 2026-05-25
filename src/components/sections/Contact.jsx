import { useEffect, useRef, useState } from 'react';
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

  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo([formRef.current.querySelector('.section-label'), formRef.current.querySelector('.contact-form-container')],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${developerInfo.formspreeId || 'mnqeyobd'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Direct Message',
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setStatus('error');
    }
  };

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
          {/* Form wrapper */}
          <div ref={formRef}>
            <p className="section-label" style={{ marginBottom: 24 }}>Send a message</p>
            
            <form onSubmit={handleSubmit} className="contact-form-container">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
                
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
                
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                
                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />

                {/* Cyber Feedback Status Alerts */}
                {status === 'success' && (
                  <div className="cyber-alert cyber-alert--success mono">
                    <span className="alert-pulse-green" />
                    <span>SECURE PACKETS TRANSMITTED SUCCESSFULLY! WILL RESPOND SHORTLY.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="cyber-alert cyber-alert--error mono">
                    <span className="alert-pulse-red" />
                    <span>TRANSMISSION FAILED. PLEASE RETRY OR EMAIL DIRECTLY!</span>
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  scaleOnHover
                  style={{ padding: '16px' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'TRANSMITTING PACKETS...' : 'Send Message →'}
                </Button>
              </div>
            </form>
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

        .contact-form-container {
          width: 100%;
        }

        /* Cyber alert boxes */
        .cyber-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-size: 11px;
          letter-spacing: 1px;
          border-radius: 2px;
          margin-top: 8px;
          border: 1px solid;
          line-height: 1.5;
        }
        .cyber-alert--success {
          background: rgba(0, 255, 136, 0.04);
          border-color: var(--green);
          color: var(--green);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.05);
        }
        .cyber-alert--error {
          background: rgba(255, 95, 87, 0.04);
          border-color: #ff5f57;
          color: #ff5f57;
          box-shadow: 0 0 15px rgba(255, 95, 87, 0.05);
        }

        .alert-pulse-green {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          animation: pulse 1.6s infinite;
          flex-shrink: 0;
        }
        .alert-pulse-red {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ff5f57;
          box-shadow: 0 0 8px #ff5f57;
          animation: pulseRed 1.6s infinite;
          flex-shrink: 0;
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
        @keyframes pulseRed {
          0%,100% { opacity: 1; box-shadow: 0 0 8px #ff5f57; }
          50%      { opacity: 0.5; box-shadow: 0 0 20px #ff5f57; }
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
