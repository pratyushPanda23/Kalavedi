import React from 'react';
import GlassCard from '../components/UI/GlassCard';
import GlowingButton from '../components/UI/GlowingButton';

const academyQuotes = [
  {
    id: 1,
    image: '/assets/quote_pic1.jpg',
    textEn: 'Music and dance are not mere decorations of life; they are pathways to spiritual alignment and cultural resilience. Every student trained at Swarajhankar carries forward this ancient flame.',
    textOr: 'ସଙ୍ଗୀତ କେବଳ ମନୋରଞ୍ଜନ ନୁହେଁ, ଏହା ଆତ୍ମାକୁ ସଜାଡ଼ିବାର ଏକ ସାଧନା | ସ୍ୱରଝଙ୍କାରର ପ୍ରତିଟି ଛାତ୍ରଛାତ୍ରୀ ଏହି ସଂସ୍କୃତିର ବାହକ।',
    authorEn: 'Guru Shree Niranjan Behera',
    authorOr: 'ଗୁରୁ ଶ୍ରୀ ନିରଞ୍ଜନ ବେହେରା',
    roleEn: 'President & Founder',
    roleOr: 'ସଭାପତି ଓ ପ୍ରତିଷ୍ଠାତା'
  },
  {
    id: 2,
    image: '/assets/quote_pic2.jpg',
    textEn: 'Classical dance is a visual language of the soul. Through Odissi, we seek to bring the ancient stone temple sculptures of Odisha to life with human breath and expressions.',
    textOr: 'ଶାସ୍ତ୍ରୀୟ ନୃତ୍ୟ ହେଉଛି ଆତ୍ମାର ଏକ ଦୃଶ୍ୟମାନ ଭାଷା। ଓଡ଼ିଶୀ ମାଧ୍ୟମରେ ଆମେ ଓଡ଼ିଶାର ପ୍ରାଚୀନ ପଥର ମନ୍ଦିରର ଭାସ୍କର୍ଯ୍ୟକୁ ମାନବୀୟ ସ୍ପନ୍ଦନରେ ଜୀବନ୍ତ କରିବାକୁ ଚେଷ୍ଟା କରୁ।',
    authorEn: 'Vidushi Minati Mishra',
    authorOr: 'ବିଦୁଷୀ ମିନତୀ ମିଶ୍ର',
    roleEn: 'Odissi Exponent & Mentor',
    roleOr: 'ଓଡ଼ିଶୀ ପ୍ରବୀଣା ଓ ମାର୍ଗଦର୍ଶିକା'
  },
  {
    id: 3,
    image: '/assets/quote_pic3.jpg',
    textEn: 'The notes of the Sitar and Flute do not just make sound; they create a sacred space of silence inside the listener, opening gates of meditative tranquility.',
    textOr: 'ସିତାର ଏବଂ ବଂଶୀର ସ୍ୱର କେବଳ ଶବ୍ଦ ସୃଷ୍ଟି କରେ ନାହିଁ; ଏହା ଶ୍ରୋତାଙ୍କ ମଧ୍ୟରେ ଏକ ନିରବତାର ପବିତ୍ର ସ୍ଥାନ ସୃଷ୍ଟି କରି ଆଧ୍ୟାତ୍ମିକ ଦ୍ଵାର ଉନ୍ମୁକ୍ତ କରେ।',
    authorEn: 'Pandit Hariprasad Chaurasia',
    authorOr: 'ପଣ୍ଡିତ ହରିପ୍ରସାଦ ଚୌରାସିଆ',
    roleEn: 'Honorary Patron & Guru',
    roleOr: 'ମାନ୍ୟବର ସଂରକ୍ଷକ ଓ ଗୁରୁ'
  },
  {
    id: 4,
    image: '/assets/quote_pic4.jpg',
    textEn: 'Rhythm is the pulse of the universe. In Mardala playing, every beat on the leather head is a heartbeat of devotion, establishing the foundational sync of the dance.',
    textOr: 'ତାଳ ହେଉଛି ବ୍ରହ୍ମାଣ୍ଡର ସ୍ପନ୍ଦନ। ମର୍ଦ୍ଦଳ ବାଦନରେ ପ୍ରତିଟି ଆଘାତ ଭକ୍ତିର ଏକ ଏକ ସ୍ପନ୍ଦନ, ଯାହା ନୃତ୍ୟର ପ୍ରାଥମିକ ଭିତ୍ତିଭୂମି ସ୍ଥାପନ କରେ।',
    authorEn: 'Guru Banamali Maharana',
    authorOr: 'ଗୁରୁ ବନମାଳୀ ମହାରାଣା',
    roleEn: 'Mardala Maestro',
    roleOr: 'ମର୍ଦ୍ଦଳ ଗୁରୁମଣି'
  }
];

const Dashboard = ({ language, setActiveView }) => {
  const stats = [
    { num: '25+', en: 'Years of Legacy', or: 'ବର୍ଷର ଗୌରବମୟ ଇତିହାସ' },
    { num: '40+', en: 'Years of Experience & Expertise', or: '୪୦+ ବର୍ଷର ଅଭିଜ୍ଞତା ଓ ପ୍ରବୀଣତା' },
    { num: '800+', en: 'Students Trained', or: 'ସାର୍ଟିଫିକେଟଧାରୀ ଛାତ୍ରଛାତ୍ରୀ' },
    { num: '100%', en: 'Govt. Accredited', or: 'ସରକାରୀ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ' }
  ];

  const services = [
    { nameEn: 'Hindustani Classical', nameOr: 'ହିନ୍ଦୁସ୍ତାନୀ ଶାସ୍ତ୍ରୀୟ', icon: '🎶', descEn: 'Hindustani Vocal & Classical training', descOr: 'ହିନ୍ଦୁସ୍ତାନୀ କଣ୍ଠ ସଙ୍ଗୀତ ଓ ଶାସ୍ତ୍ରୀୟ ପ୍ରଶିକ୍ଷଣ' },
    { nameEn: 'Odissi Classical Music', nameOr: 'ଓଡ଼ିଶୀ ଶାସ୍ତ୍ରୀୟ ସଙ୍ଗୀତ', icon: '🎼', descEn: 'Traditional Odissi Vocal and Raaga training', descOr: 'ପାରମ୍ପରିକ ଓଡ଼ିଶୀ କଣ୍ଠ ସଙ୍ଗୀତ ଓ ରାଗ ପ୍ରଶିକ୍ଷଣ' },
    { nameEn: 'Harmonium or Keyboard', nameOr: 'ହାରମୋନିୟମ କିମ୍ବା କିବୋର୍ଡ', icon: '🎹', descEn: 'Instrumental keys training for classical notes', descOr: 'ଶାସ୍ତ୍ରୀୟ ସ୍ଵର ପାଇଁ କିବୋର୍ଡ ଓ ହାରମୋନିୟମ ଶିକ୍ଷା' },
    { nameEn: 'Tabla or Mardala(Pakhawaj)', nameOr: 'ତବଲା କିମ୍ବା ମର୍ଦ୍ଦଳ (ପଖାୱଜ)', icon: '🥁', descEn: 'Percussion training on traditional rhythm beats', descOr: 'ପାରମ୍ପରିକ ତାଳ ଏବଂ ଲୟ ପାଇଁ ଚର୍ମ ବାଦ୍ୟ ପ୍ରଶିକ୍ଷଣ' },
    { nameEn: 'Odissi Classical Dance', nameOr: 'ଓଡ଼ିଶୀ ଶାସ୍ତ୍ରୀୟ ନୃତ୍ୟ', icon: '💃', descEn: 'Odissi dance style mudras and expressions', descOr: 'ଓଡ଼ିଶୀ ନୃତ୍ୟର ବିଭିନ୍ନ ମୁଦ୍ରା ଓ ଅଭିନୟ ଶିକ୍ଷା' },
    { nameEn: 'Folk Dance', nameOr: 'ଲୋକ ନୃତ୍ୟ', icon: '🎭', descEn: 'Vibrant regional folk dance and cultural art', descOr: 'ଓଡ଼ିଶାର ପାରମ୍ପରିକ ଲୋକନୃତ୍ୟ ଓ ସାଂସ୍କୃତିକ କଳା' }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Welcome banner */}
      <div style={styles.heroSection}>
        <div style={styles.badge} className="heading-font">
          ★ {language === 'or' ? 'ଓଡ଼ିଶା ସରକାର ସ୍ୱୀକୃତିପ୍ରାପ୍ତ ସଙ୍ଗୀତ ଅନୁଷ୍ଠାନ' : 'GOVT. OF ODISHA ACCREDITED ACADEMY'} ★
        </div>
        
        <h1 className="display-font" style={styles.title}>
          {language === 'or' ? 'ସ୍ୱରର ସୂଚନା, କଳାର ବନ୍ଦନା' : 'Where Melody Meets Heritage'}
        </h1>
        
        <p style={styles.subtitle} className={language === 'or' ? 'odia' : ''}>
          {language === 'or' 
            ? 'ଓଡ଼ିଶି ନୃତ୍ୟ, ଶାସ୍ତ୍ରୀୟ କଣ୍ଠ ସଙ୍ଗୀତ ଏବଂ ପାରମ୍ପରିକ ବାଦ୍ୟର ପବିତ୍ର ଶିକ୍ଷା କେନ୍ଦ୍ର। ଆସନ୍ତୁ ଆମ ସାଂସ୍କୃତିକ ଗୌରବର ସହଭାଗୀ ହୁଅନ୍ତୁ।'
            : 'Unlocking artistic excellence through authentic training in Odissi Dance, Hindustani & Odissi Vocal, and Classical Instruments. Enroll today to begin your artistic journey.'}
        </p>

        <div style={styles.ctas}>
          <GlowingButton variant="primary" onClick={() => setActiveView('admission')}>
            {language === 'or' ? 'ନାମଲେଖା କରନ୍ତୁ' : 'Enroll Online Now'}
          </GlowingButton>
          <GlowingButton variant="outline" onClick={() => setActiveView('courses')}>
            {language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଦେଖନ୍ତୁ' : 'Explore Courses'}
          </GlowingButton>
        </div>
      </div>

      {/* Legacy Statistics Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <GlassCard key={index} style={styles.statCard}>
            <span className="display-font" style={styles.statNum}>{stat.num}</span>
            <span style={styles.statLabel}>{language === 'or' ? stat.or : stat.en}</span>
          </GlassCard>
        ))}
      </div>

      {/* Alternating Hover Quote Cards Column Stack */}
      <div style={styles.quotesStack}>
        <div className="section-header">
          <span className="section-label">{language === 'or' ? 'ଅନୁଷ୍ଠାନର ବାଣୀ' : 'INSIGHTS & LEGACIES'}</span>
          <h2 className="section-title">
            {language === 'or' ? 'କଳା ଓ ସଂସ୍କୃତିର' : 'Whispers of'} <span>{language === 'or' ? 'ପବିତ୍ର ବାର୍ତ୍ତା' : 'the Gurus'}</span>
          </h2>
        </div>

        <div style={styles.cardsColumn}>
          {academyQuotes.map((q, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div 
                key={q.id} 
                className="quote-interactive-card"
                style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}
              >
                {/* Image Corner Frame */}
                <div className="quote-image-frame">
                  <img 
                    src={q.image} 
                    alt={language === 'or' ? q.authorOr : q.authorEn}
                    className="quote-actual-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div 
                    style={{
                      background: `linear-gradient(135deg, rgba(${20 * q.id + 50}, 14, 0, 0.45), rgba(${10 * q.id + 20}, 4, 0, 0.8))`
                    }}
                    className="image-fallback-bg"
                  >
                    {q.id === 1 ? '🪕' : q.id === 2 ? '💃' : q.id === 3 ? '🎶' : '🥁'}
                  </div>
                </div>

                {/* Floating Blurry Quote Text Panel */}
                <div className="quote-text-container">
                  {/* Quote Body Wrapper - Hidden initially, shown on hover */}
                  <div className="quote-body-wrapper">
                    <span className="quote-double-quote">“</span>
                    <p className={`quote-body ${language === 'or' ? 'odia' : ''}`}>
                      {language === 'or' ? q.textOr : q.textEn}
                    </p>
                  </div>

                  {/* Guru Author Info - Always visible next to photo */}
                  <div className="quote-author-info">
                    <strong className="author-name heading-font">
                      {language === 'or' ? q.authorOr : q.authorEn}
                    </strong>
                    <span className="author-role">
                      {language === 'or' ? q.roleOr : q.roleEn}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services Showcase Grid */}
      <div style={styles.servicesSection}>
        <div className="section-header">
          <span className="section-label">{language === 'or' ? 'ଆମର ସେବା' : 'OUR SERVICES'}</span>
          <h2 className="section-title">
            {language === 'or' ? 'ଆମର ଶିକ୍ଷା ଓ' : 'Explore Our'} <span>{language === 'or' ? 'ସେବା ସମୂହ' : 'Services'}</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <GlassCard
              key={idx}
              className="service-card"
              style={styles.serviceCard}
              onClick={() => setActiveView('courses')}
            >
              <span className="service-icon">{service.icon}</span>
              <h4 className="heading-font service-name" style={styles.serviceName}>
                {language === 'or' ? service.nameOr : service.nameEn}
              </h4>
              <p className="service-desc" style={styles.serviceDesc}>
                {language === 'or' ? service.descOr : service.descEn}
              </p>
              <span className="service-cta-arrow">→</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px'
  },
  heroSection: {
    textAlign: 'center',
    maxWidth: '860px',
    margin: '0 auto',
    padding: '20px 0',
    animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(201, 150, 12, 0.1)',
    border: '1px solid rgba(201, 150, 12, 0.35)',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '0.72rem',
    letterSpacing: '2px',
    color: 'var(--gold)',
    marginBottom: '24px'
  },
  title: {
    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
    color: 'var(--gold)',
    lineHeight: 1.15,
    textShadow: '0 0 60px rgba(201,150,12,0.3)',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'var(--parchment)',
    lineHeight: '1.7',
    marginBottom: '36px',
    fontFamily: 'Noto Serif, serif',
    fontStyle: 'italic'
  },
  ctas: {
    display: 'flex',
    gap: '18px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px'
  },
  statCard: {
    textAlign: 'center',
    padding: '28px 20px',
    background: 'linear-gradient(135deg, rgba(74,8,8,0.1) 0%, rgba(18,6,0,0.6) 100%)'
  },
  statNum: {
    display: 'block',
    fontSize: '2.2rem',
    color: 'var(--gold)',
    lineHeight: 1.1,
    marginBottom: '6px',
    textShadow: '0 0 20px rgba(201,150,12,0.2)'
  },
  statLabel: {
    fontSize: '0.76rem',
    color: 'var(--text-muted)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif'
  },
  quotesStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
    margin: '30px 0'
  },
  cardsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%'
  },
  interactiveCard: {
    position: 'relative',
    overflow: 'hidden'
  },
  servicesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  serviceCard: {
    cursor: 'pointer',
  },
  serviceName: {
    // Handled by CSS class
  },
  serviceDesc: {
    // Handled by CSS class
  }
};

// CSS Injection for Slide-Up and Interactive Card animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Interactive Quote Cards Column */
    .quote-interactive-card {
      position: relative;
      display: flex;
      align-items: center;
      background: rgba(10, 4, 0, 0.45);
      border: 1px solid rgba(201, 150, 12, 0.15);
      border-radius: 12px;
      padding: 0px; /* No padding initially so photo sits on the corner */
      height: 260px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      cursor: pointer;
      gap: 0px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .quote-interactive-card:hover {
      background: rgba(20, 8, 2, 0.6) !important;
      border-color: rgba(201, 150, 12, 0.5) !important;
      box-shadow: 0 15px 40px rgba(201, 150, 12, 0.12), 0 0 20px rgba(0,0,0,0.6) !important;
      padding: 24px !important;
      gap: 30px !important;
    }

    /* Picture Frame - Corner fit initially */
    .quote-image-frame {
      width: 260px;
      height: 100%;
      border-radius: 0;
      border: none;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 20px rgba(0,0,0,0.4);
      z-index: 2;
    }

    /* Adjust border radius based on alternating layout to fit corners beautifully */
    .quote-interactive-card[style*="flex-direction: row"] .quote-image-frame {
      border-top-left-radius: 11px;
      border-bottom-left-radius: 11px;
    }
    .quote-interactive-card[style*="flex-direction: row-reverse"] .quote-image-frame {
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
    }

    .quote-interactive-card:hover .quote-image-frame {
      width: 140px;
      height: 140px;
      border-radius: 50% !important; /* Compresses into a small circular profile! */
      border: 2px solid var(--gold) !important;
      box-shadow: 0 12px 30px rgba(201, 150, 12, 0.35) !important;
    }

    /* Alternating Rotations on hover */
    .quote-interactive-card[style*="flex-direction: row"]:hover .quote-image-frame {
      transform: scale(1.05) rotate(-3deg) !important;
    }
    .quote-interactive-card[style*="flex-direction: row-reverse"]:hover .quote-image-frame {
      transform: scale(1.05) rotate(3deg) !important;
    }

    /* Actual image inside frame */
    .quote-actual-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 15%;
      z-index: 2;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Fallback and images scaling transitions */
    .image-fallback-bg {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem; /* Large icon initially */
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      color: rgba(255, 255, 255, 0.95);
      z-index: 1;
    }

    .quote-interactive-card:hover .image-fallback-bg {
      font-size: 3rem !important; /* Shrinks on hover */
    }

    /* Text Container - occupying the remaining space */
    .quote-text-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      padding: 0 40px;
      height: 100%;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 3;
      overflow: hidden;
      min-width: 0; /* Prevents text overflow in flex containers */
    }

    .quote-text-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(rgba(9, 3, 0, 0.94), rgba(9, 3, 0, 0.94)), url('/assets/sambalpuri_pattern.png');
      background-size: cover;
      background-position: center;
      z-index: -1;
      opacity: 1;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 8px;
    }

    .quote-interactive-card:hover .quote-text-container::before {
      filter: blur(32px);
      background: linear-gradient(rgba(26, 10, 3, 0.85), rgba(26, 10, 3, 0.85)), url('/assets/sambalpuri_pattern.png');
      opacity: 0.6;
    }

    /* Make sure text aligns nicely based on left/right layout */
    .quote-interactive-card[style*="flex-direction: row"] .quote-text-container {
      align-items: flex-start;
      text-align: left;
    }
    .quote-interactive-card[style*="flex-direction: row-reverse"] .quote-text-container {
      align-items: flex-end;
      text-align: right;
    }

    /* Guru Author Info - Always Visible */
    .quote-author-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .quote-interactive-card:hover .quote-author-info {
      margin-top: 10px; /* Slight push down when quote expands */
    }

    .author-name {
      font-size: 1.35rem; /* Slightly larger name initially when it's alone */
      color: var(--gold);
      letter-spacing: 1px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95), 0 0 15px rgba(201, 150, 12, 0.25);
    }

    .quote-interactive-card:hover .author-name {
      font-size: 1.05rem; /* Shrinks slightly on hover to give room to the quote */
    }

    .author-role {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
    }

    .quote-interactive-card:hover .author-role {
      font-size: 0.7rem;
    }

    /* Quote Body Wrapper - Hidden initially, reveals on hover */
    .quote-body-wrapper {
      opacity: 0;
      max-height: 0px;
      transform: translateY(-15px) scale(0.96);
      filter: blur(10px);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      width: 100%;
      pointer-events: none;
      display: flex;
      flex-direction: column;
    }

    .quote-interactive-card[style*="flex-direction: row"] .quote-body-wrapper {
      align-items: flex-start;
    }
    .quote-interactive-card[style*="flex-direction: row-reverse"] .quote-body-wrapper {
      align-items: flex-end;
    }

    .quote-interactive-card:hover .quote-body-wrapper {
      opacity: 1 !important;
      max-height: 180px !important; /* Expands to show quote */
      transform: translateY(0) scale(1) !important;
      filter: blur(0px) !important;
      pointer-events: auto !important;
      margin-bottom: 12px;
    }

    /* Typography details */
    .quote-double-quote {
      font-size: 3rem;
      color: var(--gold);
      line-height: 0.4;
      font-family: 'Cinzel Decorative', serif;
      opacity: 0.7;
      margin-top: 10px;
      margin-bottom: -10px;
    }

    .quote-body {
      font-size: 0.92rem;
      line-height: 1.6;
      color: var(--parchment);
      font-family: 'Noto Serif', serif;
      font-style: italic;
      margin: 0;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
    }

    .quote-body.odia {
      font-size: 0.88rem;
      line-height: 1.65;
    }

    /* Services 2x3 Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      width: 100%;
      margin: 20px auto 0 auto;
      max-width: 960px;
    }

    .service-card {
      text-align: center;
      padding: 32px 24px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid rgba(201, 150, 12, 0.15) !important;
      background: linear-gradient(135deg, rgba(74, 8, 8, 0.1) 0%, rgba(18, 6, 0, 0.45) 100%) !important;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    }

    .service-card:hover {
      border-color: rgba(201, 150, 12, 0.4) !important;
      background: linear-gradient(135deg, rgba(74, 8, 8, 0.15) 0%, rgba(26, 10, 3, 0.55) 100%) !important;
      box-shadow: 0 8px 32px rgba(201, 150, 12, 0.08), 0 0 20px rgba(0,0,0,0.5) !important;
      transform: translateY(-2px);
    }

    .service-cta-arrow {
      display: block;
      margin-top: 14px;
      font-size: 1.1rem;
      color: var(--gold);
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      letter-spacing: 2px;
    }

    .service-card:hover .service-cta-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .service-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 16px;
      transition: transform 0.4s ease;
    }

    .service-name {
      font-size: 1.1rem;
      color: var(--gold);
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .service-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin: 0;
    }

    /* Mobile Responsive Adjustments */
    @media (max-width: 992px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .quote-interactive-card {
        flex-direction: column !important;
        height: auto !important;
        min-height: 320px !important;
        padding: 0px !important;
        gap: 0px !important;
      }
      .quote-image-frame {
        width: 100% !important;
        height: 200px !important;
        border-radius: 11px 11px 0 0 !important;
      }
      .quote-text-container {
        padding: 24px !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
      }
      .quote-interactive-card[style*="flex-direction"] .quote-text-container {
        align-items: center !important;
        text-align: center !important;
      }
      .quote-interactive-card[style*="flex-direction"] .quote-body-wrapper {
        align-items: center !important;
      }
      .quote-interactive-card:hover .quote-image-frame {
        width: 110px !important;
        height: 110px !important;
        border-radius: 50% !important;
        margin: 20px auto 0 auto !important;
      }
      .quote-interactive-card:hover {
        padding: 0px !important;
      }
      .author-name {
        font-size: 1.15rem;
      }
      .quote-interactive-card:hover .author-name {
        font-size: 0.95rem;
      }
    }

    @media (max-width: 576px) {
      .services-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .service-card {
        padding: 24px 16px;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;
