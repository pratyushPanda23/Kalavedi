import React, { useState } from 'react';

const Header = ({ language, setLanguage, activeView, setActiveView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', en: 'Home', or: 'ମୁଖ୍ୟ ପୃଷ୍ଠା' },
    { id: 'about', en: 'About Us', or: 'ଆମ ବିଷୟ' },
    { id: 'courses', en: 'Courses', or: 'ପାଠ୍ୟକ୍ରମ' },
    { id: 'notices', en: 'Notice Board', or: 'ସୂଚନା ଫଳକ' },
    { id: 'gallery', en: 'Gallery', or: 'ଗ୍ୟାଲେରି' },
    { id: 'admission', en: 'Admission', or: 'ନାମଲେଖା' },
    { id: 'fees', en: 'Fees Desk', or: 'ଫିସ୍' }
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  const handleLangToggle = (lang) => {
    setLanguage(lang);
    localStorage.setItem('swarajhankar_lang', lang);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        {/* Academy Logo */}
        <div style={styles.logo} onClick={() => handleNavClick('dashboard')}>
          <img src="/assets/swarajhankar_logo.jpg" alt="Swarajhankar Logo" style={styles.logoImg} />
          <div style={styles.logoText}>
            <h1 className="display-font" style={styles.logoTitle}>
              {language === 'or' ? 'ସ୍ୱରଝଙ୍କାର' : 'Swarajhankar'}
            </h1>
            <span style={styles.logoSubtitle}>
              {language === 'or' ? 'ସଙ୍ଗୀତ ଓ ନୃତ୍ୟ ଅଧ୍ୟୟନ · ବଲାଙ୍ଗୀର' : 'Music & Dance Academy · Balangir'}
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul style={styles.links}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button 
                onClick={() => handleNavClick(link.id)} 
                style={{
                  ...styles.linkBtn,
                  color: activeView === link.id ? 'var(--gold)' : 'var(--text-muted)',
                  borderBottom: activeView === link.id ? '2px solid var(--gold)' : '2px solid transparent'
                }}
                className="heading-font"
              >
                {language === 'or' ? link.or : link.en}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions (Language switch + responsive burger) */}
        <div style={styles.actions}>
          <div style={styles.langToggle}>
            <button 
              onClick={() => handleLangToggle('en')} 
              style={{
                ...styles.langBtn,
                ...(language === 'en' ? styles.langBtnActive : {})
              }}
            >
              EN
            </button>
            <button 
              onClick={() => handleLangToggle('or')} 
              style={{
                ...styles.langBtn,
                fontFamily: 'Noto Sans Oriya, serif',
                ...(language === 'or' ? styles.langBtnActive : {})
              }}
            >
              ଓଡ଼ି
            </button>
          </div>
          <button className="hamburger" style={styles.hamburger} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span style={{ ...styles.burgerSpan, transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ ...styles.burgerSpan, opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ ...styles.burgerSpan, transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                ...styles.mobileLinkBtn,
                color: activeView === link.id ? 'var(--gold)' : 'var(--text-light)',
                background: activeView === link.id ? 'rgba(201,150,12,0.1)' : 'transparent'
              }}
              className="heading-font"
            >
              {language === 'or' ? link.or : link.en}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(9, 3, 0, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(201, 150, 12, 0.25)'
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px',
    maxWidth: '1280px',
    margin: '0 auto'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer'
  },
  logoImg: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1.5px solid rgba(201,150,12,0.7)',
    objectFit: 'cover',
    objectPosition: 'center top',
    background: '#0a0400',
    boxShadow: '0 0 10px rgba(201,150,12,0.25)'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoTitle: {
    fontSize: '1.25rem',
    color: 'var(--gold)',
    lineHeight: 1.1,
    letterSpacing: '1.5px',
    textAlign: 'left'
  },
  logoSubtitle: {
    fontSize: '0.62rem',
    color: 'var(--text-muted)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginTop: '2px',
    textAlign: 'left'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    // Media queries simulated in render, hide on mobile
    '@media (maxWidth: 1024px)': {
      display: 'none'
    }
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.75rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '8px 12px 6px 12px',
    transition: 'all 0.3s',
    outline: 'none'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  langToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    background: 'rgba(201,150,12,0.1)',
    border: '1px solid rgba(201,150,12,0.3)',
    borderRadius: '30px',
    padding: '3px'
  },
  langBtn: {
    padding: '4px 10px',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-muted)',
    fontSize: '0.68rem',
    cursor: 'pointer',
    borderRadius: '20px',
    transition: 'all 0.3s',
    letterSpacing: '0.5px'
  },
  langBtnActive: {
    background: 'var(--gold)',
    color: '#000',
    fontWeight: 'bold'
  },
  hamburger: {
    display: 'none', // Managed in styling overrides
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '26px',
    height: '18px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  burgerSpan: {
    display: 'block',
    width: '100%',
    height: '2px',
    background: 'var(--gold)',
    transition: 'all 0.3s'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(9, 3, 0, 0.98)',
    borderBottom: '1px solid rgba(201, 150, 12, 0.25)',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  mobileLinkBtn: {
    width: '100%',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    borderLeft: '2px solid transparent',
    padding: '10px 14px',
    fontSize: '0.8rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};



export default Header;
