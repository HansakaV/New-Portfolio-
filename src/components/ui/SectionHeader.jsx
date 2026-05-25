import React from 'react';

/**
 * A highly consistent and modular SectionHeader component.
 * Standardizes section titles across the portfolio pages.
 * 
 * @param {Object} props
 * @param {string} props.label - Prefixed section tag (e.g. '// selected work')
 * @param {string} props.title - Primary text (e.g. 'PROJECTS')
 * @param {string} [props.highlight] - Accent color text (e.g. 'THAT SHIP')
 * @param {React.ReactNode} [props.extra] - Right-aligned or subtitle meta components
 * @param {boolean} [props.center=false] - Center the header text
 * @param {number} [props.marginBottom=60] - Bottom margin in pixels
 * @param {Object} [props.style={}]
 */
export default React.forwardRef(function SectionHeader({
  label,
  title,
  highlight,
  extra,
  center = false,
  marginBottom = 60,
  style = {},
  ...rest
}, ref) {
  return (
    <>
      <div
        ref={ref}
        className={`section-header-wrapper ${center ? 'header-center' : ''}`}
        style={{ marginBottom: `${marginBottom}px`, ...style }}
        {...rest}
      >
        <div className="header-text-col">
          {label && (
            <p className="section-label section-label-accent">{label}</p>
          )}
          
          {(title || highlight) && (
            <h2 className="display section-header-title">
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="title-highlight">{highlight}</span>
                </>
              )}
            </h2>
          )}
        </div>
        
        {extra && (
          <div className="header-extra-col">
            {extra}
          </div>
        )}
      </div>

      <style>{`
        .section-header-wrapper {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        }

        .header-center {
          flex-direction: column;
          align-items: center !important;
          text-align: center;
        }

        .header-text-col {
          display: flex;
          flex-direction: column;
        }

        .section-label-accent {
          margin-bottom: 12px;
        }

        .header-center .section-label-accent {
          margin-bottom: 16px;
        }

        .section-header-title {
          font-size: clamp(40px, 6.5vw, 80px);
          line-height: 0.95;
          letter-spacing: 0.5px;
        }

        .header-center .section-header-title {
          font-size: clamp(48px, 8vw, 120px);
          line-height: 0.9;
          margin-bottom: 24px;
        }

        .title-highlight {
          color: var(--green);
        }

        .header-extra-col {
          flex-shrink: 0;
        }

        /* ── Tablet & Mobile Adjustments ── */
        @media (max-width: 900px) {
          .section-header-wrapper:not(.header-center) {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
});
