import React, { useState } from 'react';
import GlassCard from './UI/GlassCard';
import GlowingButton from './UI/GlowingButton';

const LanguagePortal = ({ onSelectLanguage }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleSelect = (lang) => {
    setFadeOut(true);
    setTimeout(() => {
      onSelectLanguage(lang);
    }, 500); // Allow fadeOut animation to finish
  };

  return (
    <div style={{
      ...styles.portal,
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'scale(1.05)' : 'scale(1)',
      pointerEvents: fadeOut ? 'none' : 'auto'
    }}>
      {/* Absolute Decorative SVG Konark Wheel in background */}
      <svg style={styles.wheelLeft} className="spin-slow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.15"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.15"/>
        {Array.from({ length: 8 }).map((_, i) => (
          <line 
            key={i} 
            x1="50" 
            y1="50" 
            x2={50 + 45 * Math.cos((i * Math.PI) / 4)} 
            y2={50 + 45 * Math.sin((i * Math.PI) / 4)} 
            stroke="var(--gold)" 
            strokeWidth="0.3" 
            strokeOpacity="0.15"
          />
        ))}
      </svg>

      <svg style={styles.wheelRight} className="spin-slow-reverse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.15"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.15"/>
        {Array.from({ length: 8 }).map((_, i) => (
          <line 
            key={i} 
            x1="50" 
            y1="50" 
            x2={50 + 45 * Math.cos((i * Math.PI) / 4)} 
            y2={50 + 45 * Math.sin((i * Math.PI) / 4)} 
            stroke="var(--gold)" 
            strokeWidth="0.3" 
            strokeOpacity="0.15"
          />
        ))}
      </svg>

      {/* Main Glassmorphic Portal Box */}
      <GlassCard className="portal-card" style={styles.card}>
        <img src="/logo.jpg" alt="Academy Logo" style={styles.portalLogo} />
        <div style={styles.badge} className="heading-font">★ SWARAJHANKAR ACADEMY ★</div>
        
        <h1 className="display-font" style={styles.titleEn}>Swarajhankar</h1>
        <h1 className="odia" style={styles.titleOr}>ସ୍ୱରଝଙ୍କାର ସଙ୍ଗୀତ ଅନୁଷ୍ଠାନ</h1>
        
        <div className="konark-divider" style={{ margin: '20px 0' }}></div>
        
        <p style={styles.subtitleEn}>Select your preferred language to enter the academy</p>
        <p className="odia" style={styles.subtitleOr}>ଅନୁଷ୍ଠାନରେ ପ୍ରବେଶ କରିବା ପାଇଁ ଭାଷା ଚୟନ କରନ୍ତୁ</p>
        
        <div style={styles.buttonGroup}>
          <div style={styles.buttonWrapper}>
            <GlowingButton variant="primary" onClick={() => handleSelect('en')} style={styles.btn}>
              ENGLISH
            </GlowingButton>
            <span style={styles.btnLabel}>Explore in English</span>
          </div>
          <div style={styles.buttonWrapper}>
            <GlowingButton variant="outline" onClick={() => handleSelect('or')} style={{ ...styles.btn, fontFamily: 'Noto Sans Oriya, serif' }}>
              ଓଡ଼ିଆ (Odia)
            </GlowingButton>
            <span style={{ ...styles.btnLabel, fontFamily: 'Noto Serif, serif', fontStyle: 'italic' }}>ଓଡ଼ିଆ ଭାଷାରେ ଦେଖନ୍ତୁ</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const styles = {
  portal: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'radial-gradient(circle at 50% 50%, #200600 0%, #0d0500 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    overflow: 'hidden'
  },
  wheelLeft: {
    position: 'absolute',
    left: '-15%',
    bottom: '-15%',
    width: '600px',
    height: '600px',
    pointerEvents: 'none'
  },
  wheelRight: {
    position: 'absolute',
    right: '-10%',
    top: '-10%',
    width: '450px',
    height: '450px',
    pointerEvents: 'none'
  },
  card: {
    maxWidth: '540px',
    width: '90%',
    padding: '50px 40px',
    textAlign: 'center',
    border: '1px solid rgba(201, 150, 12, 0.25)',
    boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(201,150,12,0.1)',
    position: 'relative',
    zIndex: 2,
    background: 'rgba(12, 4, 0, 0.85)'
  },
  portalLogo: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '2px solid var(--gold)',
    marginBottom: '10px',
    objectFit: 'cover',
    boxShadow: '0 0 20px rgba(201,150,12,0.25)'
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    background: 'rgba(201, 150, 12, 0.1)',
    border: '1px solid rgba(201, 150, 12, 0.4)',
    borderRadius: '30px',
    color: 'var(--gold)',
    fontSize: '0.68rem',
    letterSpacing: '2.5px',
    marginBottom: '28px'
  },
  titleEn: {
    fontSize: '2.8rem',
    color: 'var(--gold)',
    letterSpacing: '3px',
    lineHeight: 1.1,
    textShadow: '0 0 30px rgba(201,150,12,0.3)'
  },
  titleOr: {
    fontSize: '1.8rem',
    color: 'var(--parchment)',
    marginTop: '6px',
    lineHeight: 1.3
  },
  subtitleEn: {
    color: 'var(--text-light)',
    fontSize: '0.88rem',
    letterSpacing: '1px',
    marginTop: '10px'
  },
  subtitleOr: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    marginTop: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    marginTop: '40px',
    flexWrap: 'wrap'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flex: '1',
    minWidth: '160px'
  },
  btn: {
    width: '100%',
    textAlign: 'center',
    padding: '14px 20px',
    fontSize: '0.85rem',
    letterSpacing: '2px'
  },
  btnLabel: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px'
  }
};

export default LanguagePortal;
