import React from 'react';

/**
 * A highly reusable, animated Button component for the portfolio.
 * Supports standard button and anchor <a> elements.
 * 
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary' | 'secondary' | 'outline' | 'accent-outline' | 'text'
 * @param {string} [props.as='button'] - 'button' | 'a'
 * @param {string} [props.href] - Link destination if rendered as <a>
 * @param {string} [props.target] - Link target if rendered as <a>
 * @param {boolean} [props.scaleOnHover=false] - Whether to apply a subtle scale-up bounce on hover
 * @param {boolean} [props.fullWidth=false] - Whether to span full width
 * @param {React.ReactNode} props.children - Button label / content
 */
export default function Button({
  variant = 'primary',
  as = 'button',
  href,
  target,
  scaleOnHover = false,
  fullWidth = false,
  style = {},
  className = '',
  onClick,
  ...rest
}) {
  const Component = as === 'a' ? 'a' : 'button';
  
  const componentProps = {
    className: `portfolio-btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${scaleOnHover ? 'btn-scale' : ''} ${className}`,
    style,
    onClick,
    ...rest
  };

  if (as === 'a') {
    componentProps.href = href;
    componentProps.target = target;
    if (target === '_blank') {
      componentProps.rel = 'noopener noreferrer';
    }
  }

  return (
    <>
      <Component {...componentProps}>
        {componentProps.children}
      </Component>

      <style>{`
        .portfolio-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          user-select: none;
          white-space: nowrap;
          border: none;
          background: transparent;
        }

        .btn-full {
          width: 100%;
        }

        /* ── Variants ── */
        
        /* 1. Primary - solid green background with dark text */
        .btn-primary {
          background: var(--green);
          color: var(--dark);
          font-weight: 700;
          padding: 14px 28px;
        }
        .btn-primary:hover {
          background: var(--green-dim);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.25);
        }

        /* 2. Secondary - transparent, dark-tint border and muted text */
        .btn-secondary {
          border: 1px solid var(--border);
          color: var(--text);
          padding: 14px 28px;
        }
        .btn-secondary:hover {
          border-color: var(--green);
          color: var(--green);
        }

        /* 3. Outline - transparent, default border, turns green on hover */
        .btn-outline {
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 14px 40px;
        }
        .btn-outline:hover {
          border-color: var(--green);
          color: var(--green);
        }

        /* 4. Accent-Outline - transparent, green border, turns green fill on hover */
        .btn-accent-outline {
          border: 1px solid var(--green);
          color: var(--green);
          padding: 12px 28px;
        }
        .btn-accent-outline:hover {
          background: var(--green);
          color: var(--dark);
          font-weight: 700;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
        }

        /* 5. Text - no border, just text, highlights green on hover */
        .btn-text {
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          padding-bottom: 2px;
          letter-spacing: 2px;
        }
        .btn-text:hover {
          color: var(--green);
          border-bottom-color: var(--green);
        }

        /* ── Scale Animation ── */
        .btn-scale:hover {
          transform: scale(1.03);
        }
        .btn-scale:active {
          transform: scale(0.98);
        }
        
        /* ── Touch devices restoration ── */
        @media (max-width: 1024px) {
          .portfolio-btn {
            cursor: pointer !important;
          }
        }
      `}</style>
    </>
  );
}
