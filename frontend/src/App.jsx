import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoticeTicker from './components/NoticeTicker';
import LanguagePortal from './components/LanguagePortal';

// Immersive Views
import Dashboard from './views/Dashboard';
import About from './views/About';
import Courses from './views/Courses';
import NoticeBoard from './views/NoticeBoard';
import Gallery from './views/Gallery';
import Admission from './views/Admission';
import Fees from './views/Fees';
import AdminDesk from './views/AdminDesk';

import Modal from './components/UI/Modal';
import GlowingButton from './components/UI/GlowingButton';

function App() {
  const savedLang = localStorage.getItem('swarajhankar_lang');
  
  const [language, setLanguage] = useState(savedLang || null); // Null triggers the Portal selector
  const [activeView, setActiveView] = useState('dashboard');
  const [autoSelectCourse, setAutoSelectCourse] = useState('');

  // Admin Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    sessionStorage.getItem('swarajhankar_admin_auth') === 'true'
  );
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Automatically scroll window to top whenever active view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  const handleSelectLanguage = (selectedLang) => {
    setLanguage(selectedLang);
    localStorage.setItem('swarajhankar_lang', selectedLang);
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'NB07@2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('swarajhankar_admin_auth', 'true');
      sessionStorage.setItem('swarajhankar_admin_passcode', passcode);
      setIsAdminLoginOpen(false);
      setPasscode('');
      setLoginError('');
      setActiveView('admin');
    } else {
      setLoginError('Invalid passcode. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('swarajhankar_admin_auth');
    sessionStorage.removeItem('swarajhankar_admin_passcode');
    setActiveView('dashboard');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard language={language} setActiveView={setActiveView} />;
      case 'about':
        return <About language={language} />;
      case 'courses':
        return (
          <Courses 
            language={language} 
            setActiveView={setActiveView} 
            setAutoSelectCourse={setAutoSelectCourse} 
          />
        );
      case 'notices':
        return <NoticeBoard language={language} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'admission':
        return (
          <Admission 
            language={language} 
            autoSelectCourse={autoSelectCourse} 
            setAutoSelectCourse={setAutoSelectCourse} 
          />
        );
      case 'fees':
        return <Fees language={language} />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminDesk language={language} onLogout={handleLogout} />
        ) : (
          <div style={styles.deniedWrapper}>
            <span style={styles.deniedIcon}>🔒</span>
            <h3 className="heading-font" style={styles.deniedTitle}>Admin Authorization Required</h3>
            <p style={styles.deniedDesc}>
              This is a secure directory strictly reserved for the academy directors and administrative staff.
            </p>
            <div style={styles.deniedBtns}>
              <GlowingButton variant="primary" onClick={() => setIsAdminLoginOpen(true)}>
                Enter Passcode
              </GlowingButton>
              <GlowingButton variant="outline" onClick={() => setActiveView('dashboard')}>
                Return Home
              </GlowingButton>
            </div>
          </div>
        );
      default:
        return <Dashboard language={language} setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* 1. Root Language Selection Portal Overlay (Shows only if language not set) */}
      {!language && (
        <LanguagePortal onSelectLanguage={handleSelectLanguage} />
      )}

      {/* 2. Structured Academy Header */}
      <Header 
        language={language || 'en'} 
        setLanguage={handleSelectLanguage} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />

      {/* 3. Sliding bulletins Marquee alert ticker */}
      <NoticeTicker language={language || 'en'} />

      {/* 4. Academy Hub Main Workspace (Non-scrollable, dynamic view switching) */}
      <main className="workspace-content" key={activeView}>
        {renderActiveView()}
      </main>

      {/* 5. Fine Cultural Footer */}
      <Footer 
        language={language || 'en'} 
        setActiveView={setActiveView} 
        onAdminClick={() => setIsAdminLoginOpen(true)}
      />

      {/* 6. Admin Login Passcode Modal Portal */}
      <Modal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          setPasscode('');
          setLoginError('');
        }}
        title="Administrative Security Portal"
      >
        <form onSubmit={handleAdminLoginSubmit} style={styles.loginForm}>
          <p style={styles.loginDesc}>
            Enter the authorized admin passcode to unlock CRUD databases, application registries, and payment audits.
          </p>

          {loginError && (
            <div style={styles.loginError}>
              ⚠️ {loginError}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.loginLabel}>Authorized Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setLoginError('');
              }}
              style={styles.loginInput}
              placeholder="••••••••••••••"
              className="form-input"
              required
              autoFocus
            />
          </div>

          <GlowingButton type="submit" variant="primary" style={styles.loginBtn}>
            Unlock Control Desk
          </GlowingButton>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  deniedWrapper: {
    maxWidth: '480px',
    margin: '40px auto',
    padding: '40px 30px',
    background: 'rgba(10, 4, 0, 0.7)',
    border: '1px solid rgba(122,18,18,0.3)',
    borderRadius: '12px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  deniedIcon: {
    fontSize: '3.5rem'
  },
  deniedTitle: {
    fontSize: '1.2rem',
    color: '#ff8080',
    letterSpacing: '1.5px'
  },
  deniedDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },
  deniedBtns: {
    display: 'flex',
    gap: '14px',
    marginTop: '10px'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    textAlign: 'left'
  },
  loginDesc: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },
  loginError: {
    background: 'rgba(122,18,18,0.2)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff8080',
    fontSize: '0.78rem',
    padding: '10px 12px',
    borderRadius: '4px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  loginLabel: {
    fontSize: '0.68rem',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif'
  },
  loginInput: {
    borderRadius: '4px'
  },
  loginBtn: {
    width: '100%',
    padding: '12px',
    fontSize: '0.8rem',
    letterSpacing: '1.5px'
  }
};

export default App;
