import React from 'react';

const Footer = ({ language, setActiveView, onAdminClick }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerTop}>
        {/* Brand Col */}
        <div style={styles.brand}>
          <h2 className="display-font" style={styles.brandTitle}>
            {language === 'or' ? 'ସ୍ୱରଝଙ୍କାର' : 'Swarajhankar'}
          </h2>
          <div className="konark-divider" style={{ margin: '8px 0 14px 0', width: '60px' }}></div>
          <p style={styles.brandText}>
            {language === 'or' 
              ? 'ସଙ୍ଗୀତ ଓ ନୃତ୍ୟର ଏକ ପବିତ୍ର ଅନୁଷ୍ଠାନ, ଯାହା ଓଡ଼ିଶାର ସମୃଦ୍ଧ ସାଂସ୍କୃତିକ ପରମ୍ପରାକୁ ବଜାୟ ରଖିବା ପାଇଁ ଉତ୍ସର୍ଗୀକୃତ |' 
              : 'A sanctuary of classical music and dance, dedicated to nurturing creativity and preserving the pristine cultural heritage of Odisha since 1998.'}
          </p>
        </div>

        {/* Navigation Col */}
        <div style={styles.col}>
          <h4 className="heading-font" style={styles.colTitle}>
            {language === 'or' ? 'ପ୍ରମୁଖ ପୃଷ୍ଠା' : 'Academy Hub'}
          </h4>
          <ul style={styles.links}>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('about')}>{language === 'or' ? 'ଆମ ବିଷୟ' : 'Our Legacy'}</button></li>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('courses')}>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ' : 'Courses'}</button></li>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('notices')}>{language === 'or' ? 'ସୂଚନା ଫଳକ' : 'Notice Board'}</button></li>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('gallery')}>{language === 'or' ? 'ଗ୍ୟାଲେରି' : 'Gallery'}</button></li>
          </ul>
        </div>

        {/* Actions Col */}
        <div style={styles.col}>
          <h4 className="heading-font" style={styles.colTitle}>
            {language === 'or' ? 'ଶିକ୍ଷାର୍ଥୀ ଡେସ୍କ' : 'Student Desk'}
          </h4>
          <ul style={styles.links}>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('admission')}>{language === 'or' ? 'ନାମଲେଖା ଫର୍ମ' : 'Online Admission'}</button></li>
            <li><button style={styles.linkBtn} onClick={() => handleLinkClick('fees')}>{language === 'or' ? 'ଶିକ୍ଷା ଦେୟ ପୈଠ' : 'Fees & Payment'}</button></li>
          </ul>
        </div>

        {/* Contact Col */}
        <div style={styles.col}>
          <h4 className="heading-font" style={styles.colTitle}>
            {language === 'or' ? 'ଯୋଗାଯୋଗ' : 'Connect'}
          </h4>
          <div style={styles.contact}>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📍</span>
              <div style={styles.contactText}>
                <strong className="heading-font">{language === 'or' ? 'ଠିକଣା' : 'Academy Campus'}</strong>
                <p>{language === 'or' ? 'ରୁଗୁଡ଼ିପଡ଼ା, ବଲାଙ୍ଗୀର, ଓଡ଼ିଶା - ୭୬୭୦୦୧' : 'Rugudipada, Balangir, Odisha - 767001'}</p>
              </div>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📞</span>
              <div style={styles.contactText}>
                <strong className="heading-font">{language === 'or' ? 'ଦୂରଭାଷ' : 'Helpline'}</strong>
                <p>+91 94371 60233 · +91 63704 22894</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div style={styles.footerBottom}>
        <p style={styles.copy}>
          &copy; {currentYear} Swarajhankar. All rights reserved. · <span onClick={onAdminClick} style={{ cursor: 'pointer', color: 'rgba(201,150,12,0.6)', transition: 'color 0.3s' }} className="admin-portal-link">🔐 Admin Access</span>
        </p>
        <span className="heading-font" style={styles.motto}>
          {language === 'or' 
            ? '॥ ସୁର ସଙ୍ଗୀତ ରସ ରୂପେ ଜୀବନ ॥' 
            : '✦ Devoted to Art, Harmonized by Culture ✦'}
        </span>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'rgba(9, 3, 0, 0.98)',
    borderTop: '1px solid rgba(201, 150, 12, 0.15)',
    paddingTop: '60px',
    width: '100%',
    marginTop: 'auto'
  },
  footerTop: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.2fr',
    gap: '40px',
    maxWidth: '1280px',
    margin: '0 auto 40px auto',
    padding: '0 40px'
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  brandTitle: {
    fontSize: '1.35rem',
    color: 'var(--gold)',
    letterSpacing: '1.5px'
  },
  brandText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    maxWidth: '280px',
    fontFamily: 'Noto Serif, serif',
    fontStyle: 'italic'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  colTitle: {
    fontSize: '0.8rem',
    color: 'var(--parchment)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '18px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(201,150,12,0.15)'
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: 0,
    padding: 0
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    textAlign: 'left',
    transition: 'color 0.3s',
    outline: 'none',
    padding: '2px 0'
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  contactItem: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start'
  },
  contactIcon: {
    fontSize: '0.95rem',
    marginTop: '2px'
  },
  contactText: {
    display: 'flex',
    flexDirection: 'column'
  },
  contactCopy: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)'
  },
  footerBottom: {
    borderTop: '1px solid rgba(201, 150, 12, 0.1)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1280px',
    margin: '0 auto'
  },
  copy: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px'
  },
  motto: {
    fontSize: '0.72rem',
    color: 'var(--gold)',
    letterSpacing: '2px'
  }
};

// CSS Injection for Responsive Grid Fallbacks
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    footer button:hover { color: var(--gold) !important; }
    @media (max-width: 900px) {
      footer div[style*="display: grid"] {
        grid-template-columns: 1fr 1fr !important;
        gap: 30px !important;
      }
    }
    @media (max-width: 600px) {
      footer div[style*="display: grid"] {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      footer div[style*="justify-content: space-between"] {
        flex-direction: column !important;
        gap: 12px !important;
        text-align: center !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Footer;
