import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard';
import GlowingButton from '../components/UI/GlowingButton';

const Courses = ({ language, setActiveView, setAutoSelectCourse }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', en: 'All Programs', or: 'ସମସ୍ତ ଶ୍ରେଣୀ' },
    { id: 'vocal', en: 'Vocal Music', or: 'କଣ୍ଠ ସଙ୍ଗୀତ' },
    { id: 'instrumental', en: 'Instrumental', or: 'ବାଦ୍ୟ ଶିକ୍ଷା' },
    { id: 'dance', en: 'Odissi Classical', or: 'ଓଡ଼ିଶି ନୃତ୍ୟ' },
    { id: 'folk', en: 'Folk Artistry', or: 'ଲୋକ ନୃତ୍ୟ ଓ ଗୀତ' }
  ];

  const courseList = [
    {
      id: 'h_vocal',
      category: 'vocal',
      nameEn: 'Hindustani Classical Vocal',
      nameOr: 'ହିନ୍ଦୁସ୍ତାନୀ ଶାସ୍ତ୍ରୀୟ ଗାୟନ',
      descEn: 'Mastering Raga structures, Alankars, and classical voice culture methodologies.',
      descOr: 'ରାଗ ଗଠନ, ଅଳଙ୍କାର, ଏବଂ ଶାସ୍ତ୍ରୀୟ ସ୍ୱର ସାଧନାର ପ୍ରଣାଳୀବଦ୍ଧ ପ୍ରଶିକ୍ଷଣ |',
      age: '6+ Yrs',
      duration: '3/5 Years',
      modeEn: 'Physical & Online',
      modeOr: 'ଅଫ୍ଲାଇନ ଓ ଅନ୍ଲାଇନ',
      fee: '₹600'
    },
    {
      id: 'o_vocal',
      category: 'vocal',
      nameEn: 'Odissi Classical Vocal',
      nameOr: 'ଓଡ଼ିଶି ଶାସ୍ତ୍ରୀୟ ଗାୟନ',
      descEn: 'Traditional Odissi music, Chhanda, Champu, and classical composition practices.',
      descOr: 'ପାରମ୍ପରିକ ଓଡ଼ିଶି ପ୍ରବନ୍ଧ, ଛାନ୍ଦ, ଚମ୍ପୂ ଏବଂ ଶାସ୍ତ୍ରୀୟ ଶୃଙ୍ଖଳାର ଶିକ୍ଷାଦାନ |',
      age: '6+ Yrs',
      duration: '3/5 Years',
      modeEn: 'Physical & Online',
      modeOr: 'ଅଫ୍ଲାଇନ ଓ ଅନ୍ଲାଇନ',
      fee: '₹500'
    },
    {
      id: 'sitar',
      category: 'instrumental',
      nameEn: 'Sitar Artistry',
      nameOr: 'ସିତାର ବାଦନ ପ୍ରଶିକ୍ଷଣ',
      descEn: 'Intensive lessons on Gat compositions, Meend techniques, and Raga improvisations.',
      descOr: 'ଗତ ବନ୍ଦିଶ, ମୀଣ୍ଡ କାରୁକାର୍ଯ୍ୟ ଏବଂ ରାଗ ଆଲାପ ବାଦନର ଗଭୀର ଶିକ୍ଷାଦାନ |',
      age: '8+ Yrs',
      duration: '4 Years',
      modeEn: 'Physical Batches Only',
      modeOr: 'କେବଳ ଅଫ୍ଲାଇନ',
      fee: '₹800'
    },
    {
      id: 'flute',
      category: 'instrumental',
      nameEn: 'Classical Bamboo Flute',
      nameOr: 'ଶାସ୍ତ୍ରୀୟ ବଂଶୀ ବାଦନ',
      descEn: 'Training on breath control, finger positioning, and serene classical wind notes.',
      descOr: 'ଶ୍ୱାସ ନିୟନ୍ତ୍ରଣ, ଅଙ୍ଗୁଳି ଚାଳନା ଏବଂ ସୁମଧୁର ଶାସ୍ତ୍ରୀୟ ବଂଶୀ ସ୍ୱର ପ୍ରଶିକ୍ଷଣ |',
      age: '7+ Yrs',
      duration: '3 Years',
      modeEn: 'Physical & Online',
      modeOr: 'ଅଫ୍ଲାଇନ ଓ ଅନ୍ଲାଇନ',
      fee: '₹600'
    },
    {
      id: 'tabla',
      category: 'instrumental',
      nameEn: 'Tabla & Percussion Desk',
      nameOr: 'ତବଲା ଓ ମର୍ଦ୍ଦଳ ବାଦନ',
      descEn: 'Unlocking Tala cycles, Kaydas, Peshkar, and expert accompaniment patterns.',
      descOr: 'ତାଳ ଚକ୍ର, କାଏଦା, ପେଶକାର ଏବଂ ସଙ୍ଗୀତ ସଙ୍ଗତର କୌଶଳ ବୃଦ୍ଧି ପ୍ରଶିକ୍ଷଣ |',
      age: '6+ Yrs',
      duration: '4 Years',
      modeEn: 'Physical Batches Only',
      modeOr: 'କେବଳ ଅଫ୍ଲାଇନ',
      fee: '₹500'
    },
    {
      id: 'odissi',
      category: 'dance',
      nameEn: 'Odissi Classical Dance',
      nameOr: 'ଓଡ଼ିଶି ଶାସ୍ତ୍ରୀୟ ନୃତ୍ୟ',
      descEn: 'Traditional Odissi postures (Chowka, Tribhanga), Mudras, Abhinaya, and recital exams.',
      descOr: 'ଓଡ଼ିଶି ନୃତ୍ୟର ପ୍ରାଥମିକ ବ୍ୟାୟାମ, ମୁଦ୍ରା, ଚୌକା, ତ୍ରିଭଙ୍ଗୀ ଏବଂ ବାର୍ଷିକ ଅଭିନୟ ଶ୍ରେଣୀ।',
      age: '5+ Yrs',
      duration: '5 Years',
      modeEn: 'Physical & Online',
      modeOr: 'ଅଫ୍ଲାଇନ ଓ ଅନ୍ଲାଇନ',
      fee: '₹700'
    },
    {
      id: 'folk',
      category: 'folk',
      nameEn: 'Sambalpuri Folk Arts',
      nameOr: 'ସମ୍ବଲପୁରୀ ଲୋକ ନୃତ୍ୟ',
      descEn: 'Celebrating regional heritage through popular folk steps, rhythms, and seasonal songs.',
      descOr: 'ଓଡ଼ିଶାର ସମୃଦ୍ଧ ସମ୍ବଲପୁରୀ ଲୋକ ନୃତ୍ୟର ତାଳ, ଗୀତ ଏବଂ ପ୍ରାଣବନ୍ତ ଅଙ୍ଗଭଙ୍ଗୀ ଶିକ୍ଷା |',
      age: '5+ Yrs',
      duration: '1 Year Certification',
      modeEn: 'Physical Batches Only',
      modeOr: 'କେବଳ ଅଫ୍ଲାଇନ',
      fee: '₹400'
    }
  ];

  const handleEnrollClick = (courseName) => {
    setAutoSelectCourse(courseName);
    setActiveView('admission');
  };

  const filteredCourses = activeTab === 'all' 
    ? courseList 
    : courseList.filter(c => c.category === activeTab);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଶିକ୍ଷାଦାନ ପଦ୍ଧତି' : 'CURRICULUM'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'ଆମର ବିଭିନ୍ନ' : 'Explore Academy'} <span>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ସମୂହ' : 'Programs'}</span>
        </h2>
        <p className="section-desc">
          {language === 'or'
            ? 'ଓଡ଼ିଶା ସରକାର ଅନୁମୋଦିତ ପାଠ୍ୟଖସଡ଼ା ଅନୁଯାୟୀ ପ୍ରଣୀତ ପ୍ରମାଣପତ୍ରଧାରୀ ପାଠ୍ୟକ୍ରମ ସମୂହ।'
            : 'Explore certified classical and folk academies mapped carefully under experienced gurus.'}
        </p>
      </div>

      {/* Tabs Filter */}
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabBtn,
              background: activeTab === tab.id ? 'linear-gradient(135deg, var(--maroon), var(--deepmaroon))' : 'transparent',
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-muted)',
              borderColor: activeTab === tab.id ? 'var(--gold)' : 'rgba(201,150,12,0.2)'
            }}
            className="heading-font"
          >
            {language === 'or' ? tab.or : tab.en}
          </button>
        ))}
      </div>

      {/* Grid of Course Cards */}
      <div style={styles.grid}>
        {filteredCourses.map((c) => (
          <GlassCard key={c.id} style={styles.card}>
            {/* Colored Top strip based on category */}
            <div style={{
              ...styles.topStrip,
              background: c.category === 'vocal' ? 'linear-gradient(90deg, var(--maroon), var(--saffron), var(--gold))'
                        : c.category === 'instrumental' ? 'linear-gradient(90deg, var(--deepteal), var(--teal), #4ECDC4)'
                        : 'linear-gradient(90deg, #2D0B4E, #7B2D8B, #C06FD4)'
            }}></div>
            
            <div style={styles.cardBody}>
              <span style={styles.ageBadge} className="heading-font">
                🧒 {c.age}
              </span>
              
              <h3 className="heading-font" style={styles.courseTitle}>
                {language === 'or' ? c.nameOr : c.nameEn}
              </h3>
              
              <p style={styles.courseDesc}>
                {language === 'or' ? c.descOr : c.descEn}
              </p>

              <div style={styles.details}>
                <span style={styles.detailChip} className="heading-font">
                  ⏱️ {c.duration}
                </span>
                <span style={styles.detailChip} className="heading-font">
                  🌐 {language === 'or' ? c.modeOr : c.modeEn}
                </span>
              </div>
            </div>

            <div style={styles.cardFooter}>
              <div style={styles.feeWrapper}>
                <span style={styles.feeAmount}>{c.fee}</span>
                <small style={styles.feeLabel}>/ {language === 'or' ? 'ମାସିକ ଫି' : 'Monthly'}</small>
              </div>
              
              <GlowingButton variant="primary" onClick={() => handleEnrollClick(c.nameEn)} style={styles.enrollBtn}>
                {language === 'or' ? 'ଆବେଦନ' : 'Enroll'}
              </GlowingButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  tabBtn: {
    padding: '10px 24px',
    border: '1px solid',
    color: 'var(--text-muted)',
    fontSize: '0.74rem',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '24px'
  },
  card: {
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  topStrip: {
    height: '6px',
    width: '100%'
  },
  cardBody: {
    padding: '24px 24px 12px 24px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  ageBadge: {
    background: 'rgba(201, 150, 12, 0.1)',
    border: '1px solid rgba(201, 150, 12, 0.25)',
    color: 'var(--gold)',
    fontSize: '0.64rem',
    letterSpacing: '1px',
    padding: '3px 10px',
    textTransform: 'uppercase',
    marginBottom: '14px',
    borderRadius: '2px'
  },
  courseTitle: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    lineHeight: '1.4',
    marginBottom: '8px'
  },
  courseDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    fontFamily: 'Noto Serif, serif',
    marginBottom: '16px'
  },
  details: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  detailChip: {
    fontSize: '0.66rem',
    color: 'var(--stone)',
    background: 'rgba(139, 115, 85, 0.1)',
    border: '1px solid rgba(139, 115, 85, 0.25)',
    padding: '3px 10px',
    letterSpacing: '0.5px'
  },
  cardFooter: {
    padding: '14px 24px 20px 24px',
    borderTop: '1px solid rgba(201, 150, 12, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  feeWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  feeAmount: {
    fontSize: '1.15rem',
    color: 'var(--gold)',
    fontFamily: 'Cinzel Decorative, serif',
    fontWeight: 'bold'
  },
  feeLabel: {
    fontSize: '0.66rem',
    color: 'var(--text-muted)'
  },
  enrollBtn: {
    padding: '8px 20px',
    fontSize: '0.72rem',
    letterSpacing: '1px'
  }
};

export default Courses;
