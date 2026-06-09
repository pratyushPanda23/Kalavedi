import React from 'react';

const GlowingButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlowingButton;
