import React from 'react';

/**
 * A highly styled, reusable Input component.
 * 
 * @param {Object} props
 * @param {string} [props.type='text']
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {function} [props.onChange]
 * @param {string} [props.className='']
 * @param {Object} [props.style={}]
 */
export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`portfolio-input ${className}`}
        style={style}
        {...rest}
      />

      <style>{`
        .portfolio-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 16px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease;
        }

        .portfolio-input:focus {
          border-color: var(--green);
          box-shadow: 0 0 12px rgba(0, 255, 136, 0.05);
        }

        .portfolio-input::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }
      `}</style>
    </>
  );
}
