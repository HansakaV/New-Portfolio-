import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ─────────────────────────────────────────
   Classic 90s DOS / Windows-era Loader
───────────────────────────────────────── */

const TOTAL_SEGS = 32;   // number of progress-bar blocks
const DURATION   = 2800; // total ms for progress to reach 100

// Status messages cycling as loading progresses
const MESSAGES = [
  'Initializing BIOS...            ',
  'Checking memory...              ',
  'Loading device drivers...       ',
  'Mounting file system...         ',
  'Compiling shaders...            ',
  'Loading portfolio assets...     ',
  'Establishing connection...      ',
  'Rendering interface layers...   ',
  'Almost there...                 ',
  'System ready.                   ',
];

export default function Loader({ onComplete }) {
  const wrapRef   = useRef(null);
  const [pct, setPct]       = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [blink, setBlink]   = useState(true);
  const [done, setDone]     = useState(false);
  const filled = Math.round((pct / 100) * TOTAL_SEGS);

  /* ── blinking cursor ── */
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  /* ── drive progress ── */
  useEffect(() => {
    const start = performance.now();
    let raf;

    const step = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / DURATION, 1);
      // classic "stuttery" ease: fast then slow then burst
      const eased = raw < 0.7
        ? raw * 1.1
        : 0.77 + (raw - 0.7) * 0.77;
      const p = Math.min(Math.round(eased * 100), 100);
      setPct(p);

      const newMsgIdx = Math.min(
        Math.floor((p / 100) * MESSAGES.length),
        MESSAGES.length - 1
      );
      setMsgIdx(newMsgIdx);

      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // Hold at 100% briefly, then exit
        setTimeout(() => {
          setDone(true);
          gsap.to(wrapRef.current, {
            y: '-100%',
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete,
          });
        }, 600);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Mono', monospace",
        overflow: 'hidden',
      }}
    >
      {/* CRT scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.015) 2px, rgba(0,255,80,0.015) 4px)',
        zIndex: 2,
      }} />

      {/* Content box — looks like a classic DOS dialog */}
      <div style={{
        width: 'min(560px, 90vw)',
        border: '1px solid #00ff55',
        boxShadow: '0 0 0 1px #003a1a, 0 0 40px rgba(0,255,80,0.12), inset 0 0 60px rgba(0,30,10,0.5)',
        padding: '0',
        position: 'relative', zIndex: 3,
      }}>
        {/* Title bar */}
        <div style={{
          background: '#00ff55',
          padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: '#030f06', fontSize: 11, fontWeight: 700, letterSpacing: 2, flex: 1 }}>
            ■ MAHESH.EXE — PORTFOLIO LOADER v1.0
          </span>
          <div style={{ display: 'flex', gap: 5 }}>
            {['_', '□', '✕'].map(s => (
              <span key={s} style={{ color: '#030f06', fontSize: 10, border: '1px solid #030f06', padding: '0 4px', lineHeight: '16px' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 28px 24px', background: '#050f07' }}>
          {/* ASCII logo */}
          <pre style={{
            color: '#00ff55', fontSize: 'clamp(5px, 1.8vw, 9px)',
            lineHeight: 1.2, marginBottom: 20,
            letterSpacing: 1, opacity: 0.85,
            userSelect: 'none',
          }}>{`
 ███╗   ███╗ █████╗ ██╗  ██╗███████╗███████╗██╗  ██╗
 ████╗ ████║██╔══██╗██║  ██║██╔════╝██╔════╝██║  ██║
 ██╔████╔██║███████║███████║█████╗  ███████╗███████║
 ██║╚██╔╝██║██╔══██║██╔══██║██╔══╝  ╚════██║██╔══██║
 ██║ ╚═╝ ██║██║  ██║██║  ██║███████╗███████║██║  ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`}</pre>

          {/* System info lines */}
          <div style={{ marginBottom: 18, color: '#007a30', fontSize: 10, lineHeight: 2, letterSpacing: 1 }}>
            <div>C:\PORTFOLIO\&gt; mahesh.exe --load-all</div>
            <div>C:\PORTFOLIO\&gt; <span style={{ color: '#00ff55' }}>PORTFOLIO OS 2024 [Version 4.0.1]</span></div>
            <div style={{ color: '#004f20' }}>(C) Copyright Mahesh Hansaka Corporation.</div>
          </div>

          {/* Status line with blinking cursor */}
          <div style={{
            fontSize: 11, letterSpacing: 1,
            color: '#00cc44', marginBottom: 14, minHeight: 16,
          }}>
            <span>&gt; {MESSAGES[msgIdx]}</span>
            <span style={{ opacity: blink ? 1 : 0, color: '#00ff55' }}>█</span>
          </div>

          {/* Progress bar label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 10, color: '#007a30', letterSpacing: 1 }}>
            <span>LOADING</span>
            <span style={{ color: '#00ff55' }}>{pct}%</span>
          </div>

          {/* Segmented bar */}
          <div style={{
            display: 'flex', gap: 2,
            padding: '4px',
            border: '1px solid #003a1a',
            background: '#020a04',
          }}>
            {Array.from({ length: TOTAL_SEGS }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 16,
                background: i < filled ? '#00ff55' : '#051a0b',
                boxShadow: i < filled ? '0 0 4px rgba(0,255,80,0.6)' : 'none',
                transition: 'background 0.05s, box-shadow 0.05s',
              }} />
            ))}
          </div>

          {/* Bottom status */}
          <div style={{
            marginTop: 14, fontSize: 9, letterSpacing: 2,
            color: '#004f20', borderTop: '1px solid #003a1a', paddingTop: 10,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>MEM: 640K OK</span>
            <span>DISK: C:\</span>
            <span style={{ color: done ? '#00ff55' : '#007a30' }}>
              {done ? '[ READY ]' : '[ LOADING ]'}
            </span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
        <span style={{ fontSize: 9, color: '#003a1a', letterSpacing: 3, fontFamily: 'Space Mono' }}>
          ▓▒░ MAHESH HANSAKA PORTFOLIO ░▒▓
        </span>
      </div>
    </div>
  );
}
