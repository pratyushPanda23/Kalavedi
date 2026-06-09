import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard';
import Modal from '../components/UI/Modal';

const Gallery = ({ language }) => {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { id: 1, captionEn: 'Classical Odissi Dance Recital', captionOr: 'ଓଡ଼ିଶି ଶାସ୍ତ୍ରୀୟ ନୃତ୍ୟ ସମାରୋହ', size: 'large', icon: '💃' },
    { id: 2, captionEn: 'Hindustani Vocal Practice Session', captionOr: 'ଶାସ୍ତ୍ରୀୟ କଣ୍ଠ ସଙ୍ଗୀତ ଅଧ୍ୟାପନ', size: 'normal', icon: '🎤' },
    { id: 3, captionEn: 'Sitar Masterclass with Gurus', captionOr: 'ସିତାର ବାଦନ ପ୍ରାୟୋଗିକ ଶାଳା', size: 'normal', icon: '🪕' },
    { id: 4, captionEn: 'Bamboo Flute Group Session', captionOr: 'ବଂଶୀ ବାଦନ ସାମୂହିକ ଅଭ୍ୟାସ', size: 'normal', icon: '🎶' },
    { id: 5, captionEn: 'Annual Academy Convocation 2024', captionOr: 'ବାର୍ଷିକ ସମାବର୍ତ୍ତନ ଉତ୍ସବ ୨୦୨୪', size: 'wide', icon: '🎓' },
    { id: 6, captionEn: 'Tabla Tala Jugalbandi performance', captionOr: 'ତବଲା ତାଳ ଯୁଗଳବନ୍ଦୀ ବାଦନ', size: 'normal', icon: '🥁' },
    { id: 7, captionEn: 'Folk Sambalpuri Recital Group', captionOr: 'ଲୋକ ନୃତ୍ୟ ସମ୍ବଲପୁରୀ ପ୍ରଦର୍ଶନ', size: 'normal', icon: '🎪' }
  ];

  const videos = [
    { 
      id: 1, 
      titleEn: 'Odissi Guru Tribute Performance 2024', 
      titleOr: 'ଓଡ଼ିଶି ଗୁରୁ ପ୍ରଣାମ ପ୍ରଦର୍ଶନ ୨୦୨୪',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock embed
      descEn: 'Annual recital presentation choreographed by classical mentors.',
      descOr: 'ବାର୍ଷିକ ସମାରୋହ ଅଭିନୟ, ଶାସ୍ତ୍ରୀୟ ଗୁରୁମାନଙ୍କ ଦ୍ଵାରା ସଂଯୋଜିତ।'
    },
    { 
      id: 2, 
      titleEn: 'Hindustani Classical Raga Yaman Recital', 
      titleOr: 'ହିନ୍ଦୁସ୍ତାନୀ ଶାସ୍ତ୍ରୀୟ ରାଗ ୟମନ ପ୍ରସ୍ତୁତି',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Mock embed
      descEn: 'Vocal performance presented by certified senior batch students.',
      descOr: 'ଉଚ୍ଚ ମାଧ୍ୟମିକ ଶ୍ରେଣୀର ଶିକ୍ଷାର୍ଥୀଙ୍କ ଦ୍ଵାରା ସୁମଧୁର ରାଗ ଗାୟନ।'
    }
  ];

  const handleOpenPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଚିତ୍ରଶାଳା' : 'PORTFOLIO'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'କଳା' : 'Academy'} <span>{language === 'or' ? 'ଗ୍ୟାଲେରି' : 'Gallery'}</span>
        </h2>
      </div>

      {/* Media Type Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('photos')}
          style={{
            ...styles.tab,
            background: activeTab === 'photos' ? 'rgba(201,150,12,0.1)' : 'transparent',
            color: activeTab === 'photos' ? 'var(--gold)' : 'var(--text-muted)',
            borderColor: activeTab === 'photos' ? 'var(--gold)' : 'rgba(201,150,12,0.15)'
          }}
          className="heading-font"
        >
          🖼️ {language === 'or' ? 'ଚିତ୍ରସମୂହ' : 'Photo Frames'}
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          style={{
            ...styles.tab,
            background: activeTab === 'videos' ? 'rgba(201,150,12,0.1)' : 'transparent',
            color: activeTab === 'videos' ? 'var(--gold)' : 'var(--text-muted)',
            borderColor: activeTab === 'videos' ? 'var(--gold)' : 'rgba(201,150,12,0.15)'
          }}
          className="heading-font"
        >
          🎥 {language === 'or' ? 'ଭିଡିଓ ସମୂହ' : 'Video Recitals'}
        </button>
      </div>

      {/* Photos Grid Tab */}
      {activeTab === 'photos' && (
        <div style={styles.photoGrid} className="gallery-photo-grid">
          {photos.map((p) => (
            <div 
              key={p.id} 
              style={{
                ...styles.photoItem,
                gridColumn: p.size === 'large' ? 'span 2' : 'span 1',
                gridRow: p.size === 'large' ? 'span 2' : 'span 1'
              }}
              onClick={() => handleOpenPhoto(p)}
              className="gallery-photo-item"
            >
              <div style={styles.photoInner}>
                <span style={styles.photoArtIcon}>{p.icon}</span>
                <div style={styles.overlay} className="photo-item-overlay">
                  <span style={styles.caption} className="heading-font">
                    {language === 'or' ? p.captionOr : p.captionEn}
                  </span>
                  <small style={styles.zoomTip}>{language === 'or' ? '🔎 କ୍ଲିକ୍ କରନ୍ତୁ' : '🔎 Zoom Frame'}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Videos Grid Tab */}
      {activeTab === 'videos' && (
        <div style={styles.videoGrid}>
          {videos.map((v) => (
            <GlassCard key={v.id} style={styles.videoCard}>
              <div style={styles.iframeWrapper}>
                <iframe 
                  title={v.titleEn}
                  src={v.src}
                  style={styles.iframe}
                  allowFullScreen
                ></iframe>
              </div>
              <div style={styles.videoInfo}>
                <h4 className="heading-font" style={styles.videoTitle}>
                  {language === 'or' ? v.titleOr : v.titleEn}
                </h4>
                <p style={styles.videoDesc}>
                  {language === 'or' ? v.descOr : v.descEn}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Secure Lightroom Photo zoom modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title={selectedPhoto ? (language === 'or' ? selectedPhoto.captionOr : selectedPhoto.captionEn) : ''}
      >
        {selectedPhoto && (
          <div style={styles.lightboxBody}>
            <div style={styles.lightboxFrame}>
              <span style={styles.lightboxArtIcon}>{selectedPhoto.icon}</span>
            </div>
            <p style={styles.lightboxDesc}>
              {language === 'or'
                ? 'ଏହି ଚିତ୍ରଟି ସ୍ୱରଝଙ୍କାର ମ୍ୟୁଜିକ ଆଣ୍ଡ ଡ୍ୟାନ୍ସ ଏକାଡେମୀର ଅଫିସିଆଲ୍ ସାଂସ୍କୃତିକ ସଂଗ୍ରହାଳୟର ଅଟେ |'
                : 'This photograph represents authentic live presentations hosted at Swarajhankar Music & Dance Academy, Balangir.'}
            </p>
          </div>
        )}
      </Modal>

      {/* Youtube Channel direct action button */}
      <a 
        href="https://www.youtube.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={styles.ytBtn}
      >
        <span style={styles.ytIcon}>🔴</span>
        <span className="heading-font">
          {language === 'or' ? 'ୟୁଟ୍ୟୁବ ଚ୍ୟାନେଲ ସବସ୍କ୍ରାଇବ କରନ୍ତୁ' : 'Subscribe to YouTube Channel'}
        </span>
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '20px'
  },
  tab: {
    padding: '10px 24px',
    border: '1px solid',
    background: 'transparent',
    fontSize: '0.74rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none'
  },
  photoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridAutoRows: '180px',
    gap: '8px'
  },
  photoItem: {
    background: 'linear-gradient(135deg, var(--deepmaroon), rgba(26,107,90,0.1), var(--darkbg2))',
    border: '1px solid rgba(201,150,12,0.1)',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  photoInner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoArtIcon: {
    fontSize: '3.5rem',
    opacity: 0.18,
    transition: 'all 0.3s'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(9, 3, 0, 0.95) 0%, transparent 80%)',
    opacity: 0,
    transition: 'opacity 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: '16px',
    textAlign: 'left'
  },
  caption: {
    fontSize: '0.78rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    lineHeight: '1.3'
  },
  zoomTip: {
    fontSize: '0.64rem',
    color: 'var(--gold)',
    marginTop: '4px',
    letterSpacing: '0.5px'
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px'
  },
  videoCard: {
    padding: 0,
    overflow: 'hidden'
  },
  iframeWrapper: {
    width: '100%',
    aspectRatio: '16/9',
    background: '#000'
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none'
  },
  videoInfo: {
    padding: '18px 24px',
    textAlign: 'left'
  },
  videoTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    marginBottom: '6px'
  },
  videoDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },
  lightboxBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  lightboxFrame: {
    width: '100%',
    height: '240px',
    background: 'linear-gradient(135deg, var(--deepmaroon), rgba(26,107,90,0.1), var(--darkbg2))',
    border: '1px solid rgba(201,150,12,0.3)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxArtIcon: {
    fontSize: '6rem',
    animation: 'pulse 2s infinite ease-in-out'
  },
  lightboxDesc: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    textAlign: 'center'
  },
  ytBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
    margin: '40px auto 0 auto',
    padding: '14px 36px',
    background: 'linear-gradient(135deg, rgba(255,0,0,0.12), rgba(200,0,0,0.06))',
    border: '1px solid rgba(255,50,50,0.3)',
    color: '#ff8080',
    fontSize: '0.82rem',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s',
    width: 'fit-content'
  },
  ytIcon: {
    fontSize: '1rem'
  }
};

// CSS Injection for zoom transitions and responsive grid falls
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .gallery-photo-item:hover {
      border-color: rgba(201,150,12,0.4) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    .gallery-photo-item:hover .photo-item-overlay {
      opacity: 1 !important;
    }
    .gallery-photo-item:hover span[class*="photoArtIcon"] {
      transform: scale(1.08);
      opacity: 0.25 !important;
    }
    a[href*="youtube"]:hover {
      background: linear-gradient(135deg, rgba(255,0,0,0.2), rgba(200,0,0,0.12)) !important;
      border-color: rgba(255,50,50,0.6) !important;
      box-shadow: 0 0 20px rgba(255,50,50,0.15);
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    @media (max-width: 900px) {
      .gallery-photo-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        grid-auto-rows: 150px !important;
      }
      .gallery-photo-item[style*="grid-column: span 2"] {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Gallery;
