export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, border: '1.5px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="mono highlight" style={{ fontSize: 10, fontWeight: 700 }}>MH</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2 }}>MAHESH HANSAKA</span>
      </div>
      <span className="mono footer-copy" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>© 2024 — ALL RIGHTS RESERVED</span>
      <span className="mono footer-role" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>FULL STACK DEVELOPER</span>

      <style>{`
        .footer-wrap {
          border-top: 1px solid var(--border);
          padding: 32px 40px;
          background: var(--dark);
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (max-width: 768px) {
          .footer-wrap { flex-direction: column; gap: 14px; text-align: center; padding: 28px 20px; }
          .footer-role { display: none; }
        }
        @media (max-width: 480px) {
          .footer-wrap { padding: 20px 16px; }
          .footer-copy { font-size: 9px; }
        }
      `}</style>
    </footer>
  );
}
