import React, { useEffect, useState } from 'react';
import GlassCard from '../components/UI/GlassCard';

const NoticeBoard = ({ language }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotices(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notices:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = language === 'or' 
      ? ['ଜାନୁ', 'ଫେବୃ', 'ମାର୍ଚ୍ଚ', 'ଅପ୍ରେ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗ', 'ସେପ୍ଟ', 'ଅକ୍ଟୋ', 'ନଭେ', 'ଡିସେ']
      : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: day < 10 ? '0' + day : day,
      month: months[d.getMonth()]
    };
  };

  const getNoticeTagStyle = (category) => {
    switch (category) {
      case 'exam':
        return { bg: 'rgba(122,18,18,0.3)', border: 'rgba(255,100,100,0.2)', color: '#ff8080' };
      case 'event':
        return { bg: 'rgba(26,107,90,0.3)', border: 'rgba(80,200,150,0.2)', color: '#80ffcc' };
      case 'fees':
        return { bg: 'rgba(201,150,12,0.15)', border: 'rgba(201,150,12,0.3)', color: 'var(--gold)' };
      case 'admission':
        return { bg: 'rgba(150,80,200,0.2)', border: 'rgba(150,80,200,0.3)', color: '#d4a0ff' };
      default:
        return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', color: '#fff' };
    }
  };

  const feeStatusItems = [
    { monthEn: 'April 2025', monthOr: 'ଏପ୍ରିଲ ୨୦୨୫', statusEn: 'Cleared', statusOr: 'ପୈଠ ହୋଇଛି', type: 'clear' },
    { monthEn: 'May 2025', monthOr: 'ମଇ ୨୦୨୫', statusEn: 'Cleared', statusOr: 'ପୈଠ ହୋଇଛି', type: 'clear' },
    { monthEn: 'June 2025', monthOr: 'ଜୁନ ୨୦୨୫', statusEn: 'Due (5th June)', statusOr: 'ଦେୟ (୫ ଜୁନ)', type: 'due' }
  ];

  const miniEvents = [
    { titleEn: 'Annual Recital Exam', titleOr: 'ବାର୍ଷିକ ପ୍ରାୟୋଗିକ ପରୀକ୍ଷା', dateEn: '28th June', dateOr: '୨୮ ଜୁନ' },
    { titleEn: 'Odissi Workshops', titleOr: 'ଓଡ଼ିଶି ନୃତ୍ୟ କର୍ମଶାଳା', dateEn: '10th July', dateOr: '୧୦ ଜୁଲାଇ' },
    { titleEn: 'Independence Concert', titleOr: 'ସ୍ୱାଧୀନତା ଦିବସ ସମାରୋହ', dateEn: '15th August', dateOr: '୧୫ ଅଗଷ୍ଟ' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଅନୁଷ୍ଠାନ ସୂଚନା' : 'BULLETINS'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'ଅଫିସିଆଲ' : 'Academy'} <span>{language === 'or' ? 'ସୂଚନା ଫଳକ' : 'Notice Board'}</span>
        </h2>
      </div>

      <div style={styles.layout}>
        {/* Left Side: Notices List */}
        <GlassCard style={styles.noticesWrapper}>
          <div style={styles.wrapperHeader}>
            <span style={styles.headerIcon}>🔔</span>
            <h3 className="heading-font" style={styles.wrapperTitle}>
              {language === 'or' ? 'ସଦ୍ୟ ବିଜ୍ଞପ୍ତି ସମୂହ' : 'Latest Announcements'}
            </h3>
          </div>
          <div className="konark-divider" style={{ margin: '10px 0 20px 0' }}></div>

          {loading ? (
            <div style={styles.loading}>{language === 'or' ? 'ସୂଚନା ଲୋଡ୍ ହେଉଛି...' : 'Fetching announcements...'}</div>
          ) : notices.length === 0 ? (
            <div style={styles.loading}>{language === 'or' ? 'କୌଣସି ସୂଚନା ଉପଲବ୍ଧ ନାହିଁ' : 'No announcements published.'}</div>
          ) : (
            <div style={styles.list}>
              {notices.map((n) => {
                const dateParts = formatDate(n.date);
                const tagStyle = getNoticeTagStyle(n.category);
                return (
                  <div key={n._id} style={styles.item}>
                    {/* Date Block */}
                    <div style={styles.dateBlock}>
                      <span className="display-font" style={styles.day}>{dateParts.day}</span>
                      <span style={styles.month}>{dateParts.month}</span>
                    </div>

                    {/* Content Block */}
                    <div style={styles.contentBlock}>
                      <h4 className="heading-font" style={styles.noticeTitle}>
                        {language === 'or' ? n.titleOr : n.titleEn}
                      </h4>
                      <p style={styles.noticeText}>
                        {language === 'or' ? n.contentOr : n.contentEn}
                      </p>
                      <span style={{
                        ...styles.tag,
                        background: tagStyle.bg,
                        borderColor: tagStyle.border,
                        color: tagStyle.color
                      }} className="heading-font">
                        {n.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Right Side Widgets Column */}
        <div style={styles.widgetsCol}>
          {/* Tuition Fee Tracker Widget */}
          <GlassCard style={styles.feeWidget}>
            <h4 className="heading-font" style={styles.widgetTitle}>
              💸 {language === 'or' ? 'ମାସିକ ଶିକ୍ଷା ଦେୟ ବିବରଣୀ' : 'Tuition Fees Tracker'}
            </h4>
            <div style={styles.feeList}>
              {feeStatusItems.map((item, idx) => (
                <div key={idx} style={styles.feeRow}>
                  <span style={styles.feeMonth}>{language === 'or' ? item.monthOr : item.monthEn}</span>
                  <span style={{
                    ...styles.statusChip,
                    background: item.type === 'clear' ? 'rgba(26,107,90,0.15)' : 'rgba(122,18,18,0.2)',
                    color: item.type === 'clear' ? '#80ffcc' : '#ff8080',
                    border: item.type === 'clear' ? '1px solid rgba(80,200,150,0.2)' : '1px solid rgba(255,80,80,0.2)'
                  }} className="heading-font">
                    {language === 'or' ? item.statusOr : item.statusEn}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Mini Event Schedule Widget */}
          <GlassCard style={styles.eventWidget}>
            <h4 className="heading-font" style={styles.widgetTitle}>
              📅 {language === 'or' ? 'ଆଗାମୀ ସାଂସ୍କୃତିକ ସମାରୋହ' : 'Upcoming recitals'}
            </h4>
            <div style={styles.eventList}>
              {miniEvents.map((evt, idx) => (
                <div key={idx} style={styles.eventRow}>
                  <span style={styles.eventDot}></span>
                  <div style={styles.eventInfo}>
                    <strong className="heading-font" style={styles.eventTitle}>
                      {language === 'or' ? evt.titleOr : evt.titleEn}
                    </strong>
                    <span style={styles.eventDate}>
                      🕒 {language === 'or' ? evt.dateOr : evt.dateEn} · Town Hall
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px',
    alignItems: 'start'
  },
  noticesWrapper: {
    padding: '30px',
    background: 'rgba(10, 4, 0, 0.7)'
  },
  wrapperHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  headerIcon: {
    fontSize: '1.4rem'
  },
  wrapperTitle: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    textAlign: 'left'
  },
  loading: {
    padding: '40px 0',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  item: {
    display: 'flex',
    gap: '20px',
    background: 'rgba(201, 150, 12, 0.03)',
    border: '1px solid rgba(201,150,12,0.08)',
    borderRadius: '4px',
    padding: '16px',
    transition: 'all 0.3s',
    textAlign: 'left'
  },
  dateBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--maroon), var(--deepmaroon))',
    border: '1px solid rgba(201,150,12,0.3)',
    borderRadius: '4px',
    width: '60px',
    height: '64px',
    flexShrink: 0
  },
  day: {
    fontSize: '1.4rem',
    color: 'var(--gold)',
    lineHeight: '1.1'
  },
  month: {
    fontSize: '0.62rem',
    color: 'var(--text-muted)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginTop: '2px'
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  noticeTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    lineHeight: '1.4'
  },
  noticeText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '10px'
  },
  tag: {
    display: 'inline-block',
    fontSize: '0.62rem',
    letterSpacing: '1.5px',
    padding: '2px 8px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    border: '1px solid'
  },
  widgetsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  feeWidget: {
    borderTop: '3px solid var(--gold)',
    background: 'linear-gradient(135deg, rgba(201,150,12,0.06) 0%, rgba(10,4,0,0.85) 100%)'
  },
  widgetTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    textAlign: 'left',
    marginBottom: '16px'
  },
  feeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  feeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(201,150,12,0.1)'
  },
  feeMonth: {
    fontSize: '0.82rem',
    color: 'var(--text-light)',
    fontFamily: 'Cinzel, serif',
    letterSpacing: '0.5px'
  },
  statusChip: {
    fontSize: '0.64rem',
    padding: '3px 10px',
    borderRadius: '2px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  eventWidget: {
    borderTop: '3px solid var(--teal)',
    background: 'rgba(10, 4, 0, 0.7)'
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  eventRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(26,107,90,0.1)'
  },
  eventDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--teal)',
    marginTop: '6px',
    flexShrink: 0
  },
  eventInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  eventTitle: {
    fontSize: '0.78rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    lineHeight: '1.3'
  },
  eventDate: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
    marginTop: '2px'
  }
};

// CSS responsive overrides for Notice board columns
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .noticesWrapper div[style*="display: flex; gap: 20px"]:hover {
      border-color: rgba(201,150,12,0.3) !important;
      background: rgba(201, 150, 12, 0.06) !important;
    }
    @media (max-width: 900px) {
      div[style*="grid-template-columns: 1.2fr 0.8fr"] {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default NoticeBoard;
