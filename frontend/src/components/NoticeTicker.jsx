import React, { useEffect, useState } from 'react';

const NoticeTicker = ({ language }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices for ticker
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotices(data);
        }
      })
      .catch(err => console.error('Error fetching ticker notices:', err));
  }, []);

  const defaultItems = language === 'or' ? [
    '2025-26 ଶିକ୍ଷାବର୍ଷ ଭର୍ତ୍ତି ଖୋଲା — ଏବେ ଯୋଗ ଦିଅନ୍ତୁ',
    'ଜୁନ ଫି ଦେୟ: 5 ଜୁନ 2025 — ଅନ୍ଲାଇନ ବା କାଉଣ୍ଟରରେ ଦେୟ କରନ୍ତୁ',
    'ବାର୍ଷିକ ଉପସ୍ଥାପନ ପରୀକ୍ଷା — 28 ଜୁନ 2025 ବାଲାଙ୍ଗୀର ଟାଉନ ହଲ',
    'ଓଡ଼ିଶା ସରକାର ସ୍ୱୀକୃତି ନବୀକରଣ — 2025–2030'
  ] : [
    'Admissions Open for 2025–26 Academic Year — Enroll Now',
    'June Fees Due: 5th June 2025 — Pay Online or at Counter',
    'Annual Recital Exam — 28 June 2025 at Town Hall, Balangir',
    'Govt. of Odisha Accreditation Renewed — 2025–2030'
  ];

  const getTickerText = () => {
    if (notices.length === 0) return defaultItems;
    return notices.map(n => language === 'or' ? n.titleOr : n.titleEn);
  };

  const tickerItems = getTickerText();
  // Duplicate list to achieve seamless infinite loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div style={styles.ticker}>
      <div style={styles.label} className="heading-font">
        {language === 'or' ? 'ସୂଚନା' : 'ALERT'}
      </div>
      <div style={styles.scrollWrapper}>
        <div style={styles.scroll} className="ticker-scroll-anim">
          {displayItems.map((item, idx) => (
            <span key={idx} style={styles.item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  ticker: {
    position: 'fixed',
    top: '72px', // Account for header size
    left: 0,
    right: 0,
    zIndex: 998,
    background: 'linear-gradient(90deg, var(--deepmaroon), var(--maroon), var(--deepmaroon))',
    padding: '8px 0',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(201,150,12,0.2)',
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    background: 'var(--gold)',
    color: '#000',
    padding: '3px 18px',
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '2px',
    whiteSpace: 'nowrap',
    zIndex: 2,
    clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0% 100%)'
  },
  scrollWrapper: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex'
  },
  scroll: {
    display: 'flex',
    whiteSpace: 'nowrap',
    paddingLeft: '20px'
  },
  item: {
    padding: '0 40px',
    fontSize: '0.78rem',
    color: 'var(--parchment)',
    letterSpacing: '1px',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    '&::before': {
      content: '"✦"',
      marginRight: '20px',
      color: 'var(--gold)'
    }
  }
};

// CSS Injection for infinite marquee animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .ticker-scroll-anim {
      animation: tickerMarquee 30s linear infinite;
    }
    .ticker-scroll-anim:hover {
      animation-play-state: paused;
    }
    .ticker-scroll-anim span::before {
      content: "✦";
      margin-right: 30px;
      color: var(--gold);
    }
    @keyframes tickerMarquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
}

export default NoticeTicker;
