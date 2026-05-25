import React from 'react';

/**
 * A highly styled, reusable Textarea component.
 * 
 * @param {Object} props
 * @param {number} [props.rows=5]
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {function} [props.onChange]
 * @param {string} [props.className='']
 * @param {Object} [props.style={}]
 */
export default function Textarea({
  rows = 5,
  placeholder,
  value,
  onChange,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`portfolio-textarea ${className}`}
        style={style}
        {...rest}
      />

      <style>{`
        .portfolio-textarea {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 16px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          resize: none;
          transition: border-color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease;
        }

        .portfolio-textarea:focus {
          border-color: var(--green);
          box-shadow: 0 0 12px rgba(0, 255, 136, 0.05);
        }

        .portfolio-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }
      `}</style>
    </>
  );
}
