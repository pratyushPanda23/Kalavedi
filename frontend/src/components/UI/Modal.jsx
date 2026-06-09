import React, { useEffect } from 'react';
import GlassCard from './GlassCard';
import GlowingButton from './GlowingButton';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={styles.overlay}>
      <div className="modal-backdrop" onClick={onClose} style={styles.backdrop}></div>
      <div className="modal-content-container" style={styles.container}>
        <GlassCard className={`modal-box ${className}`} style={styles.box}>
          <div style={styles.header}>
            <h3 className="display-font" style={styles.title}>{title}</h3>
            <button onClick={onClose} style={styles.closeBtn}>&times;</button>
          </div>
          <div className="konark-divider" style={{ margin: '12px 0 20px 0' }}></div>
          <div style={styles.body}>
            {children}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(9, 3, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  container: {
    position: 'relative',
    zIndex: 5001,
    width: '100%',
    maxWidth: '560px',
    animation: 'modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
  },
  box: {
    padding: '30px',
    borderTop: '4px solid var(--gold)',
    borderRadius: '12px',
    background: 'rgba(18, 6, 0, 0.95)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'between',
    width: '100%'
  },
  title: {
    flex: 1,
    fontSize: '1.2rem',
    color: 'var(--gold)',
    letterSpacing: '1.5px',
    textAlign: 'left'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '0 5px',
    lineHeight: 1,
    transition: 'color 0.3s'
  },
  body: {
    maxHeight: '75vh',
    overflowY: 'auto',
    paddingRight: '4px'
  }
};

// Add standard keyframe rule directly for standard styling compatibility
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes modalScaleIn {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(styleTag);
}

export default Modal;
