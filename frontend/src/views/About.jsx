import React from 'react';
import GlassCard from '../components/UI/GlassCard';

const About = ({ language }) => {
  const values = [
    {
      titleEn: 'Guru-Shishya Tradition',
      titleOr: 'ଗୁରୁ-ଶିଷ୍ୟ ପରମ୍ପରା',
      descEn: 'Honoring the timeless lineage of knowledge transfer through close mentorship and personalized guidance.',
      descOr: 'ନିବିଡ଼ ମାର୍ଗଦର୍ଶନ ଏବଂ ପ୍ରତ୍ୟକ୍ଷ ଶିକ୍ଷାଦାନ ମାଧ୍ୟମରେ କଳାର ପବିତ୍ର ହସ୍ତାନ୍ତର ପରମ୍ପରାକୁ ସମ୍ମାନ |'
    },
    {
      titleEn: 'Accredited Authenticity',
      titleOr: 'ସରକାରୀ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ',
      descEn: 'Affiliated under the Department of Culture, Govt. of Odisha, ensuring the highest standards of certification.',
      descOr: 'ଓଡ଼ିଶା ସରକାରଙ୍କ ସଂସ୍କୃତି ବିଭାଗ ଅଧୀନରେ ପଞ୍ଜୀକୃତ ହୋଇ ପାଠ୍ୟକ୍ରମର ମାନକକୁ ସୁନିଶ୍ଚିତ କରେ |'
    },
    {
      titleEn: 'Inclusive Artistry',
      titleOr: 'ସମାବେଶୀ କଳା',
      descEn: 'Opening pathways for art enthusiasts of all age groups and backgrounds, offering both physical and online batches.',
      descOr: 'ସମସ୍ତ ବୟସର କଳାପ୍ରେମୀଙ୍କ ପାଇଁ ଅଫ୍ଲାଇନ ଏବଂ ଅନ୍ଲାଇନ ଶ୍ରେଣୀର ସୁବିଧା ସହ ଉନ୍ମୁକ୍ତ ଦ୍ଵାର |'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଆମର ପରିଚୟ' : 'OUR LEGACY'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'ଅନୁଷ୍ଠାନର' : 'A Sanctuary of'} <span>{language === 'or' ? 'ଗୌରବମୟ ଇତିହାସ' : 'Odisha Culture'}</span>
        </h2>
        <p className="section-desc">
          {language === 'or'
            ? 'ଓଡ଼ିଶାର ସ୍ଥାପତ୍ୟ, ସ୍ୱର ଏବଂ ନୃତ୍ୟର ଐତିହ୍ୟକୁ ସଂରକ୍ଷିତ ରଖିବାର ଏକ ସାଧନାଶାଳା।'
            : 'Fostering deep aesthetic knowledge and keeping the musical inheritance of Balangir, Odisha alive since 1998.'}
        </p>
      </div>

      {/* Legacy and badges layout */}
      <div style={styles.grid}>
        {/* Left text column */}
        <div style={styles.textCol}>
          <p style={styles.paragraphLead}>
            {language === 'or'
              ? 'ସ୍ୱରଝଙ୍କାର କେବଳ ଏକ ସଙ୍ଗୀତ ଅନୁଷ୍ଠାନ ନୁହେଁ; ଏହା ଓଡ଼ିଶାର କଳା ଓ ସଂସ୍କୃତି ପ୍ରତି ଉତ୍ସର୍ଗୀକୃତ ଏକ ବିଶ୍ୱାସର ନାମ।'
              : 'Established in the heartland of Balangir, Swarajhankar has stood as a towering pillar of classical performing arts, cultivating generations of musicians, instrumentalists, and Odissi exponents.'}
          </p>
          <p style={styles.paragraph}>
            {language === 'or'
              ? 'ଆମେ ଶାସ୍ତ୍ରୀୟ କଣ୍ଠ ସଙ୍ଗୀତ, ବଂଶୀ, ସିତାର, ମର୍ଦ୍ଦଳ, ଏବଂ ଓଡ଼ିଶି ନୃତ୍ୟର ପ୍ରଣାଳୀବଦ୍ଧ ଶିକ୍ଷାଦାନ କରୁ। ପ୍ରତ୍ୟେକ ବର୍ଷ ଆମର ଶତାଧିକ ଛାତ୍ରଛାତ୍ରୀ ସଫଳତାର ସହ ପରୀକ୍ଷା ଉତ୍ତୀର୍ଣ୍ଣ ହୋଇ ଓଡ଼ିଶାର କଳାକୁ ଜାତୀୟ ସ୍ତରରେ ପ୍ରତିନିଧିତ୍ଵ କରୁଛନ୍ତି।'
              : 'Our curriculum combines theoretical rigor with intensive practical training under the direct supervision of veteran gurus. Registered with the Government, our certifications pave pathways for students to pursue advanced degrees and career opportunities in performance arts.'}
          </p>

          <div style={styles.govtBadge}>
            <span style={styles.badgeStar}>★</span>
            <div style={styles.badgeText}>
              <strong className="heading-font">{language === 'or' ? 'ଓଡ଼ିଶା ସରକାର ଅନୁମୋଦିତ' : 'Govt. of Odisha Affiliated'}</strong>
              <p>{language === 'or' ? 'ସଂସ୍କୃତି ବିଭାଗ ଦ୍ୱାରା ପ୍ରମାଣିତ ପାଠ୍ୟକ୍ରମ' : 'Accreditation No: Dept-Cult/OR/89201'}</p>
            </div>
          </div>
        </div>

        {/* Right Frame/Illustrative Column */}
        <div style={styles.artCol}>
          <div style={styles.artFrame}>
            <div style={styles.artCornerTL}></div>
            <div style={styles.artCornerTR}></div>
            <div style={styles.artCornerBL}></div>
            <div style={styles.artCornerBR}></div>
            
            {/* Spinning Konark Wheel SVG (High visual excellence!) */}
            <svg style={styles.artSvg} className="spin-slow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold)" strokeWidth="1"/>
              <circle cx="50" cy="50" r="14" fill="none" stroke="var(--gold)" strokeWidth="1.5"/>
              <circle cx="50" cy="50" r="6" fill="var(--gold)"/>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 2 * Math.PI) / 12;
                return (
                  <g key={i}>
                    <line 
                      x1="50" 
                      y1="50" 
                      x2={50 + 46 * Math.cos(angle)} 
                      y2={50 + 46 * Math.sin(angle)} 
                      stroke="var(--gold)" 
                      strokeWidth="1"
                    />
                    <circle 
                      cx={50 + 32 * Math.cos(angle)} 
                      cy={50 + 32 * Math.sin(angle)} 
                      r="2" 
                      fill="var(--gold)"
                    />
                  </g>
                );
              })}
            </svg>
            <span style={styles.artBadge}>{language === 'or' ? '୨୫+ ବର୍ଷର ଗୌରବ' : 'ESTD 1998'}</span>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div style={styles.valuesSection}>
        <h3 className="heading-font" style={styles.valuesHeading}>
          {language === 'or' ? 'ଆମର ମୂଲ୍ୟବୋଧ' : 'Core Foundations'}
        </h3>
        <div style={styles.valuesGrid}>
          {values.map((v, i) => (
            <GlassCard key={i} style={styles.valueCard}>
              <span style={styles.valueNumber}>0{i+1}</span>
              <h4 className="heading-font" style={styles.valueTitle}>
                {language === 'or' ? v.titleOr : v.titleEn}
              </h4>
              <p style={styles.valueDesc}>
                {language === 'or' ? v.descOr : v.descEn}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Director Card */}
      <GlassCard style={styles.directorCard}>
        <div style={styles.directorAvatar}>
          {language === 'or' ? 'ଶ୍ରୀ' : 'GP'}
        </div>
        <div style={styles.directorInfo}>
          <h4 className="heading-font" style={styles.directorName}>
            {language === 'or' ? 'ଶ୍ରୀ ଗଦାଧର ପ୍ରସାଦ ପଟ୍ଟନାୟକ' : 'Shri Gadadhar Prasad Pattnaik'}
          </h4>
          <p style={styles.directorTitle}>
            {language === 'or' ? 'ସମ୍ପାଦକ ଏବଂ ପ୍ରଶାସନିକ ନିର୍ଦ୍ଦେଶକ' : 'Secretary & Managing Director'}
          </p>
          <div className="konark-divider" style={{ margin: '8px 0 12px 0', width: '40px' }}></div>
          <p style={styles.directorQuote}>
            {language === 'or'
              ? '“ଆମର ଲକ୍ଷ୍ୟ ହେଉଛି କଳାର ପ୍ରକୃତ ସୌନ୍ଦର୍ଯ୍ୟକୁ ପ୍ରତ୍ୟେକ ଶିକ୍ଷାର୍ଥୀଙ୍କ ନିକଟରେ ପହଞ୍ଚାଇବା। ସଙ୍ଗୀତ ଶିକ୍ଷା ଚରିତ୍ର ଗଠନ ଏବଂ ଅଧ୍ୟବସାୟର ମାର୍ଗ।”'
              : '“At Swarajhankar, we do not just teach notes; we seek to ignite the sacred discipline within each individual, crafting a cultural sanctuary for creative exploration.”'}
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '50px',
    alignItems: 'center'
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  paragraphLead: {
    fontSize: '1.1rem',
    color: 'var(--parchment)',
    lineHeight: '1.8',
    marginBottom: '16px',
    fontStyle: 'italic',
    fontFamily: 'Noto Serif, serif'
  },
  paragraph: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    marginBottom: '28px'
  },
  govtBadge: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    background: 'rgba(26, 107, 90, 0.1)',
    border: '1px solid rgba(26, 107, 90, 0.3)',
    borderRadius: '8px',
    padding: '16px 20px',
    alignSelf: 'flex-start'
  },
  badgeStar: {
    fontSize: '1.8rem',
    color: 'var(--gold)'
  },
  badgeText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  artCol: {
    display: 'flex',
    justifyContent: 'center'
  },
  artFrame: {
    width: '320px',
    height: '320px',
    border: '1px solid rgba(201, 150, 12, 0.25)',
    background: 'rgba(18, 6, 0, 0.4)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  artCornerTL: { position: 'absolute', top: '-1px', left: '-1px', width: '20px', height: '20px', borderTop: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' },
  artCornerTR: { position: 'absolute', top: '-1px', right: '-1px', width: '20px', height: '20px', borderTop: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' },
  artCornerBL: { position: 'absolute', bottom: '-1px', left: '-1px', width: '20px', height: '20px', borderBottom: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)' },
  artCornerBR: { position: 'absolute', bottom: '-1px', right: '-1px', width: '20px', height: '20px', borderBottom: '3px solid var(--gold)', borderRight: '3px solid var(--gold)' },
  artSvg: {
    width: '75%',
    height: '75%',
    opacity: 0.12
  },
  artBadge: {
    position: 'absolute',
    bottom: '-12px',
    background: 'var(--maroon)',
    border: '1px solid var(--gold)',
    color: 'var(--gold)',
    fontSize: '0.68rem',
    letterSpacing: '1.5px',
    padding: '4px 14px',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif'
  },
  valuesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  valuesHeading: {
    fontSize: '1.15rem',
    color: 'var(--gold)',
    letterSpacing: '2px',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '10px'
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },
  valueCard: {
    padding: '30px 24px',
    textAlign: 'left',
    background: 'rgba(9, 3, 0, 0.4)'
  },
  valueNumber: {
    display: 'block',
    fontSize: '1.4rem',
    color: 'var(--gold)',
    fontWeight: '800',
    fontFamily: 'Cinzel Decorative, serif',
    marginBottom: '10px',
    opacity: 0.7
  },
  valueTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '1px',
    marginBottom: '8px'
  },
  valueDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },
  directorCard: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgba(122,18,18,0.1) 0%, rgba(18,6,0,0.6) 100%)',
    padding: '30px',
    textAlign: 'left'
  },
  directorAvatar: {
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--maroon), var(--deepmaroon))',
    border: '2px solid var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--gold)',
    fontSize: '1.4rem',
    fontFamily: 'Cinzel Decorative, serif',
    flexShrink: 0
  },
  directorInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  directorName: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '1px'
  },
  directorTitle: {
    fontSize: '0.76rem',
    color: 'var(--gold)',
    marginTop: '2px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  directorQuote: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    fontStyle: 'italic',
    fontFamily: 'Noto Serif, serif',
    marginTop: '6px'
  }
};

// CSS Injection for responsive structural flex adjustments
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      div[style*="grid-template-columns: 1.2fr 0.8fr"] {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }
      div[style*="display: flex; gap: 24px; align-items: center"] {
        flex-direction: column !important;
        text-align: center !important;
        align-items: center !important;
      }
      div[style*="display: flex; gap: 24px; align-items: center"] div[style*="text-align: left"] {
        text-align: center !important;
      }
      /* Align quote dividers appropriately */
      div[style*="width: 40px"] {
        margin: 8px auto !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default About;
