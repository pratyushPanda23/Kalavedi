import React, { useEffect, useState } from 'react';
import GlassCard from '../components/UI/GlassCard';
import GlowingButton from '../components/UI/GlowingButton';
import Modal from '../components/UI/Modal';

const AdminDesk = ({ language, onLogout }) => {
  const [subTab, setSubTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [notices, setNotices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null); // null means "Create" mode
  
  const adminPasscode = sessionStorage.getItem('swarajhankar_admin_passcode') || '';

  // Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    titleEn: '',
    titleOr: '',
    contentEn: '',
    contentOr: '',
    category: 'event'
  });

  const categories = [
    { id: 'exam', label: 'Exam Notification' },
    { id: 'event', label: 'Cultural Event' },
    { id: 'fees', label: 'Fees Schedule' },
    { id: 'admission', label: 'Admission Announcement' }
  ];

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const headers = { 'x-admin-passcode': adminPasscode };
      
      const [appRes, noticeRes, txRes] = await Promise.all([
        fetch('/api/applications', { headers }),
        fetch('/api/notices', { headers }),
        fetch('/api/transactions', { headers })
      ]);
      
      const [appsData, noticesData, txData] = await Promise.all([
        appRes.json(),
        noticeRes.json(),
        txRes.json()
      ]);
      
      if (Array.isArray(appsData)) setApplications(appsData);
      if (Array.isArray(noticesData)) setNotices(noticesData);
      if (Array.isArray(txData)) setTransactions(txData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    
    // Auto-refresh every 15 seconds to fetch latest updates
    const interval = setInterval(() => {
      fetchData(false);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // --- Admission Application Actions ---
  const handleAppStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-passcode': adminPasscode
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAppDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application record?')) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { 
        method: 'DELETE',
        headers: { 'x-admin-passcode': adminPasscode }
      });
      if (res.ok) {
        setApplications(prev => prev.filter(a => a._id !== id));
      }
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  // --- Notice Actions ---
  const handleOpenNoticeModal = (notice = null) => {
    if (notice) {
      setSelectedNotice(notice);
      setNoticeForm({
        titleEn: notice.titleEn,
        titleOr: notice.titleOr,
        contentEn: notice.contentEn,
        contentOr: notice.contentOr,
        category: notice.category
      });
    } else {
      setSelectedNotice(null);
      setNoticeForm({
        titleEn: '',
        titleOr: '',
        contentEn: '',
        contentOr: '',
        category: 'event'
      });
    }
    setIsNoticeModalOpen(true);
  };

  const handleNoticeFormChange = (e) => {
    const { name, value } = e.target;
    setNoticeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    const { titleEn, titleOr, contentEn, contentOr } = noticeForm;
    if (!titleEn || !titleOr || !contentEn || !contentOr) {
      alert('Please fill in all notice fields in both English and Odia.');
      return;
    }

    const method = selectedNotice ? 'PUT' : 'POST';
    const url = selectedNotice ? `/api/notices/${selectedNotice._id}` : '/api/notices';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-passcode': adminPasscode
        },
        body: JSON.stringify(noticeForm)
      });
      if (res.ok) {
        setIsNoticeModalOpen(false);
        fetchData(false); // reload silently
      }
    } catch (err) {
      console.error('Error saving notice:', err);
    }
  };

  const handleNoticeDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice bulletin?')) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { 
        method: 'DELETE',
        headers: { 'x-admin-passcode': adminPasscode }
      });
      if (res.ok) {
        setNotices(prev => prev.filter(n => n._id !== id));
      }
    } catch (err) {
      console.error('Error deleting notice:', err);
    }
  };

  const getRecentActivities = () => {
    const activities = [];
    
    applications.forEach(app => {
      activities.push({
        id: app._id,
        type: 'application',
        title: `New application submitted by ${app.name}`,
        desc: `${app.course} (${app.level})`,
        date: new Date(app.date),
        status: app.status
      });
    });
    
    notices.forEach(n => {
      activities.push({
        id: n._id,
        type: 'notice',
        title: `Notice published: "${n.titleEn}"`,
        desc: `Category: ${n.category.toUpperCase()}`,
        date: new Date(n.date)
      });
    });
    
    transactions.forEach(tx => {
      activities.push({
        id: tx._id,
        type: 'transaction',
        title: `Payment receipt of ₹${tx.amount} by ${tx.studentName}`,
        desc: `TXID: ${tx.transactionId} (${tx.method.toUpperCase()})`,
        date: new Date(tx.date)
      });
    });
    
    return activities
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs === 1) return '1 hour ago';
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return date.toLocaleDateString();
  };

  const recentActivities = getRecentActivities();
  const pendingCount = applications.filter(a => a.status === 'Pending').length;

  return (
    <div style={styles.container}>
      {/* Header Toolbar */}
      <div style={styles.adminHeaderRow}>
        <div className="section-header" style={{ margin: 0 }}>
          <span className="section-label">{language === 'or' ? 'ଅନୁଷ୍ଠାନ ପରିଚାଳନା' : 'ADMINISTRATOR'}</span>
          <h2 className="section-title" style={{ margin: 0 }}>
            {language === 'or' ? 'ପ୍ରଶାସକ' : 'Administrative'} <span>{language === 'or' ? 'କାର୍ଯ୍ୟାଳୟ' : 'Desk'}</span>
          </h2>
        </div>
        <button onClick={onLogout} style={styles.logoutBtn} className="heading-font">
          🔒 Logout
        </button>
      </div>

      {/* Live Updates Summary Panel */}
      <div style={styles.dashboardSummaryRow}>
        {/* Quick Stats Summary */}
        <GlassCard style={styles.summaryCard}>
          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <span style={styles.statVal}>{applications.length}</span>
              <span style={styles.statLbl}>Total Applications</span>
            </div>
            <div style={styles.statBox}>
              <span style={{ ...styles.statVal, color: 'var(--gold)' }}>
                {pendingCount}
              </span>
              <span style={styles.statLbl}>Pending Review</span>
            </div>
            <div style={styles.statBox}>
              <span style={{ ...styles.statVal, color: '#80ffcc' }}>
                ₹{transactions.reduce((acc, tx) => acc + tx.amount, 0)}
              </span>
              <span style={styles.statLbl}>Fees Audited</span>
            </div>
          </div>
        </GlassCard>

        {/* Live Activity Feed */}
        <GlassCard style={styles.activityFeedCard}>
          <div style={styles.feedHeaderRow}>
            <h4 style={styles.feedHeading} className="heading-font">🔔 Live Updates Log</h4>
            <div style={styles.liveIndicator}>
              <span className="live-dot" style={styles.liveDot}></span>
              <span style={styles.liveText}>Live Sync Active</span>
            </div>
          </div>
          <div style={styles.feedList}>
            {recentActivities.length === 0 ? (
              <p style={styles.feedEmpty}>Waiting for activities...</p>
            ) : (
              recentActivities.map(act => (
                <div key={act.id} style={styles.feedItem}>
                  <span style={styles.feedIcon}>
                    {act.type === 'application' ? '🎓' : act.type === 'notice' ? '📢' : '💳'}
                  </span>
                  <div style={styles.feedContent}>
                    <strong style={styles.feedTitle}>{act.title}</strong>
                    <span style={styles.feedDesc}>
                      {act.desc} · <span style={styles.feedTime}>{formatRelativeTime(act.date)}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* Admin Panel sub-tabs */}
      <div style={styles.subTabs}>
        <button 
          onClick={() => setSubTab('applications')}
          style={{ ...styles.subTabBtn, borderBottom: subTab === 'applications' ? '2px solid var(--gold)' : '2px solid transparent', color: subTab === 'applications' ? 'var(--gold)' : 'var(--text-muted)' }}
          className="heading-font"
        >
          🎓 Admissions ({applications.length})
          {pendingCount > 0 && (
            <span style={styles.badgePending} className="pulse-badge">
              {pendingCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setSubTab('notices')}
          style={{ ...styles.subTabBtn, borderBottom: subTab === 'notices' ? '2px solid var(--gold)' : '2px solid transparent', color: subTab === 'notices' ? 'var(--gold)' : 'var(--text-muted)' }}
          className="heading-font"
        >
          📢 Notice CRUD ({notices.length})
        </button>
        <button 
          onClick={() => setSubTab('transactions')}
          style={{ ...styles.subTabBtn, borderBottom: subTab === 'transactions' ? '2px solid var(--gold)' : '2px solid transparent', color: subTab === 'transactions' ? 'var(--gold)' : 'var(--text-muted)' }}
          className="heading-font"
        >
          💳 Audit Payments ({transactions.length})
        </button>
      </div>

      {/* Primary Workspace Panels */}
      <GlassCard style={styles.panel}>
        {loading ? (
          <div style={styles.loading}>{language === 'or' ? 'ଡାଟା ଲୋଡ୍ ହେଉଛି...' : 'Verifying registers & databases...'}</div>
        ) : (
          <div>
            {/* View 1: Admission Applications Review Panel */}
            {subTab === 'applications' && (
              <div style={styles.admissionsContainer}>
                <h4 style={styles.panelHeading} className="heading-font">📋 Student Applications Queue</h4>
                {applications.length === 0 ? (
                  <p style={styles.empty}>{language === 'or' ? 'କୌଣସି ଆବେଦନ ପତ୍ର ମିଳିଲା ନାହିଁ।' : 'No admission sheets registered.'}</p>
                ) : (
                  <div style={styles.studentGrid}>
                    {applications.map((app) => (
                      <GlassCard key={app._id} style={styles.studentCard} className="student-card-hover">
                        {/* Card Header */}
                        <div style={styles.studentHeader}>
                          <div style={styles.studentAvatar}>
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div style={styles.studentInfo}>
                            <h5 style={styles.studentName} className="heading-font">{app.name}</h5>
                            <span style={styles.studentMeta}>
                              Age: {app.age} · Submitted {new Date(app.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="konark-divider" style={{ margin: '12px 0 10px 0' }}></div>

                        {/* Card Body */}
                        <div style={styles.studentDetails}>
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>Selected Course</span>
                            <span style={styles.detailValCourse}>{app.course}</span>
                          </div>
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>Standard/Level</span>
                            <span style={{
                              ...styles.detailValLevel,
                              background: app.level === 'Advanced' ? 'rgba(201,150,12,0.15)' : app.level === 'Intermediate' ? 'rgba(0,188,212,0.12)' : 'rgba(255,255,255,0.05)',
                              color: app.level === 'Advanced' ? 'var(--gold)' : app.level === 'Intermediate' ? '#00bcd4' : 'var(--text-light)',
                              border: app.level === 'Advanced' ? '1px solid rgba(201,150,12,0.3)' : app.level === 'Intermediate' ? '1px solid rgba(0,188,212,0.25)' : '1px solid rgba(255,255,255,0.1)'
                            }}>{app.level}</span>
                          </div>
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>Email Address</span>
                            <a href={`mailto:${app.email}`} style={styles.detailValLink} className="detailValLink-hover">{app.email}</a>
                          </div>
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>Contact Phone</span>
                            <a href={`tel:${app.phone}`} style={styles.detailValLink} className="detailValLink-hover">{app.phone}</a>
                          </div>
                        </div>

                        {/* Student personal message notes */}
                        {app.message && (
                          <div style={styles.studentMsgBox}>
                            <span style={styles.quoteIcon}>💬</span>
                            <p style={styles.studentMsgText}>{app.message}</p>
                          </div>
                        )}

                        <div className="konark-divider" style={{ margin: '14px 0 12px 0' }}></div>

                        {/* Card Footer */}
                        <div style={styles.studentFooter}>
                          <div style={styles.statusCol}>
                            <span style={styles.statusLabel}>Status</span>
                            <span style={{
                              ...styles.statusBadge,
                              background: app.status === 'Approved' ? 'rgba(26,107,90,0.15)' : app.status === 'Rejected' ? 'rgba(122,18,18,0.2)' : 'rgba(201,150,12,0.15)',
                              color: app.status === 'Approved' ? '#80ffcc' : app.status === 'Rejected' ? '#ff8080' : 'var(--gold)',
                              border: app.status === 'Approved' ? '1px solid rgba(80,200,150,0.2)' : app.status === 'Rejected' ? '1px solid rgba(255,80,80,0.2)' : '1px solid rgba(201,150,12,0.25)'
                            }} className="heading-font">
                              {app.status}
                            </span>
                          </div>

                          <div style={styles.actionButtons}>
                            <button 
                              style={styles.btnApproveCard} 
                              onClick={() => handleAppStatus(app._id, 'Approved')}
                              className="btn-approve-hover"
                            >
                              ✓ Approve
                            </button>
                            <button 
                              style={styles.btnRejectCard} 
                              onClick={() => handleAppStatus(app._id, 'Rejected')}
                              className="btn-reject-hover"
                            >
                              ✗ Reject
                            </button>
                            <button 
                              style={styles.btnDeleteCard} 
                              onClick={() => handleAppDelete(app._id)}
                              className="btn-delete-hover"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 2: Notice CRUD Board Builder Desk */}
            {subTab === 'notices' && (
              <div style={styles.noticesSection}>
                <div style={styles.panelHeadingRow}>
                  <h4 style={styles.panelHeading} className="heading-font">📢 Published Notice bulletins</h4>
                  <GlowingButton variant="primary" onClick={() => handleOpenNoticeModal()} style={styles.createBtn}>
                    + Publish Notice
                  </GlowingButton>
                </div>

                {notices.length === 0 ? (
                  <p style={styles.empty}>{language === 'or' ? 'କୌଣସି ସୂଚନା ମିଳିଲା ନାହିଁ।' : 'No notice bulletins published.'}</p>
                ) : (
                  <div style={styles.noticesGrid}>
                    {notices.map((n) => (
                      <GlassCard key={n._id} style={styles.noticeCard}>
                        <div style={styles.noticeCardHeader}>
                          <span style={styles.categoryTag} className="heading-font">{n.category}</span>
                          <span style={styles.noticeCardDate}>{new Date(n.date).toLocaleDateString()}</span>
                        </div>
                        
                        <strong style={styles.noticeCardTitle}>{n.titleEn}</strong>
                        <p style={styles.noticeCardDesc}>{n.contentEn}</p>
                        
                        <div className="konark-divider" style={{ margin: '10px 0' }}></div>
                        
                        <div style={styles.noticeCardActions}>
                          <button style={styles.noticeCardEdit} onClick={() => handleOpenNoticeModal(n)}>✏️ Edit</button>
                          <button style={styles.noticeCardDel} onClick={() => handleNoticeDelete(n._id)}>🗑️ Remove</button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 3: Transaction Logs Auditor */}
            {subTab === 'transactions' && (
              <div style={styles.tableWrapper}>
                <h4 style={styles.panelHeading} className="heading-font">💳 Secure Fee Clearance Registry</h4>
                {transactions.length === 0 ? (
                  <p style={styles.empty}>{language === 'or' ? 'କୌଣସି ଦେୟ ବିବରଣୀ ମିଳିଲା ନାହିଁ।' : 'No fee transaction logs reported.'}</p>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Level</th>
                        <th>Payment Method</th>
                        <th>Transaction ID</th>
                        <th>Settled Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx._id}>
                          <td>{new Date(tx.date).toLocaleString()}</td>
                          <td><strong>{tx.studentName}</strong></td>
                          <td>{tx.course}</td>
                          <td>{tx.level}</td>
                          <td style={{ textTransform: 'uppercase' }}>{tx.method}</td>
                          <td style={{ color: 'var(--gold)' }}>{tx.transactionId}</td>
                          <td style={{ color: '#80ffcc', fontWeight: 'bold' }}>₹{tx.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* CRUD Form Dialog Modal */}
      <Modal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        title={selectedNotice ? 'Edit Academy Notice bulletin' : 'Publish New Notice bulletin'}
      >
        <form onSubmit={handleNoticeSubmit} style={styles.modalForm}>
          {/* Category */}
          <div style={styles.group}>
            <label style={styles.label}>Notice Category</label>
            <select
              name="category"
              value={noticeForm.category}
              onChange={handleNoticeFormChange}
              className="form-select"
              style={{ borderRadius: '4px' }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="konark-divider" style={{ margin: '10px 0' }}></div>

          {/* ENGLISH FIELDS */}
          <h5 className="heading-font" style={styles.langTitle}>🇬🇧 English Metadata</h5>
          
          <div style={styles.group}>
            <label style={styles.label}>Notice Title *</label>
            <input
              type="text"
              name="titleEn"
              value={noticeForm.titleEn}
              onChange={handleNoticeFormChange}
              className="form-input"
              style={{ borderRadius: '4px' }}
              placeholder="e.g. Annual Exams Schedule"
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Announcement Body *</label>
            <textarea
              name="contentEn"
              value={noticeForm.contentEn}
              onChange={handleNoticeFormChange}
              className="form-input form-textarea"
              style={{ borderRadius: '4px' }}
              placeholder="Detailed announcement details..."
              required
            ></textarea>
          </div>

          <div className="konark-divider" style={{ margin: '10px 0' }}></div>

          {/* ODIA FIELDS */}
          <h5 className="odia" style={{ ...styles.langTitle, color: 'var(--gold)' }}>🇮🇳 ଓଡ଼ିଆ ଭାଷା ବିବରଣୀ</h5>

          <div style={styles.group}>
            <label style={styles.label}>ଶୀର୍ଷକ (Odia Title) *</label>
            <input
              type="text"
              name="titleOr"
              value={noticeForm.titleOr}
              onChange={handleNoticeFormChange}
              className="form-input odia"
              style={{ borderRadius: '4px' }}
              placeholder="ସୂଚନା ଶୀର୍ଷକ ଲେଖନ୍ତୁ"
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>ସୂଚନା ବିଷୟବସ୍ତୁ (Odia Content) *</label>
            <textarea
              name="contentOr"
              value={noticeForm.contentOr}
              onChange={handleNoticeFormChange}
              className="form-input form-textarea odia"
              style={{ borderRadius: '4px' }}
              placeholder="ସୂଚନାର ସମ୍ପୂର୍ଣ୍ଣ ବିଷୟବସ୍ତୁ ଲେଖନ୍ତୁ..."
              required
            ></textarea>
          </div>

          <div style={styles.modalActions}>
            <GlowingButton type="submit" variant="primary" style={styles.modalBtn}>
              {selectedNotice ? 'Save Updates' : 'Publish Announcement'}
            </GlowingButton>
            <GlowingButton variant="outline" onClick={() => setIsNoticeModalOpen(false)} style={styles.modalBtn}>
              Cancel
            </GlowingButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  subTabs: {
    display: 'flex',
    gap: '20px',
    borderBottom: '1px solid rgba(201,150,12,0.15)',
    paddingBottom: '2px',
    justifyContent: 'flex-start'
  },
  subTabBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    padding: '8px 12px',
    transition: 'all 0.3s',
    outline: 'none'
  },
  panel: {
    padding: '30px',
    background: 'rgba(10,4,0,0.6)',
    minHeight: '340px'
  },
  loading: {
    padding: '80px 0',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  panelHeading: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    textAlign: 'left',
    marginBottom: '20px'
  },
  panelHeadingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%'
  },
  empty: {
    padding: '40px 0',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  subText: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
    marginTop: '2px'
  },
  statusBadge: {
    display: 'inline-block',
    fontSize: '0.66rem',
    letterSpacing: '0.5px',
    padding: '2px 8px',
    borderRadius: '2px',
    textTransform: 'uppercase'
  },
  actionsCell: {
    display: 'flex',
    gap: '6px'
  },
  btnApprove: {
    background: 'rgba(26,107,90,0.15)',
    border: '1px solid rgba(80,200,150,0.3)',
    color: '#80ffcc',
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  btnReject: {
    background: 'rgba(122,18,18,0.2)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff8080',
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  btnDelete: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-muted)',
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.78rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  noticesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  createBtn: {
    padding: '8px 20px',
    fontSize: '0.74rem',
    letterSpacing: '1px'
  },
  noticesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  noticeCard: {
    padding: '24px',
    background: 'rgba(9, 3, 0, 0.4)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  },
  noticeCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px'
  },
  categoryTag: {
    fontSize: '0.58rem',
    background: 'rgba(201,150,12,0.12)',
    border: '1px solid rgba(201,150,12,0.3)',
    color: 'var(--gold)',
    padding: '2px 8px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  noticeCardDate: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)'
  },
  noticeCardTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    lineHeight: '1.4'
  },
  noticeCardDesc: {
    fontSize: '0.76rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    flex: '1'
  },
  noticeCardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '6px'
  },
  noticeCardEdit: {
    background: 'transparent',
    border: 'none',
    color: 'var(--gold)',
    fontSize: '0.74rem',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  },
  noticeCardDel: {
    background: 'transparent',
    border: 'none',
    color: '#ff8080',
    fontSize: '0.74rem',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    textAlign: 'left'
  },
  label: {
    fontSize: '0.68rem',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif'
  },
  langTitle: {
    fontSize: '0.76rem',
    color: 'var(--parchment)',
    letterSpacing: '1px',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px'
  },
  modalBtn: {
    flex: '1',
    padding: '10px 14px',
    fontSize: '0.76rem',
    letterSpacing: '1.5px'
  },
  adminHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(201,150,12,0.15)',
    paddingBottom: '14px'
  },
  logoutBtn: {
    background: 'rgba(122,18,18,0.2)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff8080',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    letterSpacing: '1px',
    transition: 'all 0.3s',
    textTransform: 'uppercase'
  },
  dashboardSummaryRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px',
    width: '100%'
  },
  summaryCard: {
    padding: '24px',
    background: 'rgba(10,4,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '100%',
    textAlign: 'center'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  statVal: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'var(--parchment)',
    fontFamily: 'Cinzel, serif'
  },
  statLbl: {
    fontSize: '0.66rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  activityFeedCard: {
    padding: '20px 24px',
    background: 'rgba(10,4,0,0.4)',
    textAlign: 'left'
  },
  feedHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
    borderBottom: '1px solid rgba(201,150,12,0.1)',
    paddingBottom: '8px'
  },
  feedHeading: {
    fontSize: '0.85rem',
    color: 'var(--parchment)',
    letterSpacing: '1px',
    margin: 0
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#80ffcc',
    display: 'inline-block',
    boxShadow: '0 0 8px #80ffcc'
  },
  liveText: {
    fontSize: '0.62rem',
    color: '#80ffcc',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  feedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  feedItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255,255,255,0.03)'
  },
  feedIcon: {
    fontSize: '1rem',
    marginTop: '2px'
  },
  feedContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  feedTitle: {
    fontSize: '0.78rem',
    color: 'var(--text-light)',
    fontWeight: '500'
  },
  feedDesc: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)'
  },
  feedTime: {
    color: 'var(--gold)',
    fontSize: '0.68rem'
  },
  feedEmpty: {
    fontSize: '0.74rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px 0'
  },
  badgePending: {
    background: 'rgba(255,80,80,0.9)',
    color: '#fff',
    fontSize: '0.6rem',
    padding: '1px 6px',
    borderRadius: '10px',
    marginLeft: '6px',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  admissionsContainer: {
    width: '100%'
  },
  studentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    width: '100%',
    textAlign: 'left'
  },
  studentCard: {
    padding: '24px',
    background: 'rgba(12, 5, 0, 0.45)',
    border: '1px solid rgba(201,150,12,0.15)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '380px'
  },
  studentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    width: '100%'
  },
  studentAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--maroon), var(--deepmaroon))',
    border: '1px solid var(--gold)',
    color: 'var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    fontFamily: 'Cinzel, serif'
  },
  studentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left'
  },
  studentName: {
    fontSize: '0.95rem',
    color: 'var(--parchment)',
    margin: 0,
    letterSpacing: '1px'
  },
  studentMeta: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px'
  },
  studentDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.78rem'
  },
  detailLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.74rem'
  },
  detailValCourse: {
    color: 'var(--parchment)',
    fontWeight: 'bold'
  },
  detailValLevel: {
    fontSize: '0.62rem',
    padding: '2px 8px',
    borderRadius: '3px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 'bold'
  },
  detailValLink: {
    color: 'var(--text-light)',
    textDecoration: 'none',
    borderBottom: '1px dashed rgba(255,255,255,0.2)',
    transition: 'all 0.3s'
  },
  studentMsgBox: {
    background: 'rgba(18, 6, 0, 0.35)',
    borderLeft: '2px solid var(--gold)',
    padding: '10px 12px',
    borderRadius: '0 6px 6px 0',
    marginTop: '12px',
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  quoteIcon: {
    fontSize: '0.9rem',
    color: 'var(--gold)',
    marginTop: '-2px'
  },
  studentMsgText: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    margin: 0,
    fontStyle: 'italic'
  },
  studentFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto'
  },
  statusCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-start'
  },
  statusLabel: {
    fontSize: '0.62rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  actionButtons: {
    display: 'flex',
    gap: '6px'
  },
  btnApproveCard: {
    background: 'rgba(26,107,90,0.15)',
    border: '1px solid rgba(80,200,150,0.3)',
    color: '#80ffcc',
    padding: '5px 10px',
    fontSize: '0.68rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: 'bold'
  },
  btnRejectCard: {
    background: 'rgba(122,18,18,0.2)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff8080',
    padding: '5px 10px',
    fontSize: '0.68rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: 'bold'
  },
  btnDeleteCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-muted)',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.74rem'
  }
};

// CSS Injection for tables, row highlights, and mobile responsive collapses
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .tableWrapper table th {
      background: linear-gradient(135deg, var(--maroon), var(--deepmaroon));
      color: var(--gold);
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      letter-spacing: 1px;
      padding: 10px 14px;
      text-transform: uppercase;
      border: 1px solid rgba(201,150,12,0.15);
    }
    .tableWrapper table td {
      padding: 10px 14px;
      font-size: 0.8rem;
      color: var(--text-light);
      border: 1px solid rgba(201,150,12,0.12);
      background: rgba(18,6,0,0.3);
    }
    .tableWrapper table tr:hover td {
      background: rgba(201,150,12,0.06);
    }
    .actionsCell button:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 10px rgba(255,255,255,0.05);
    }
    
    /* Live Sync Dot Pulsing */
    @keyframes pulseLive {
      0% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 10px #80ffcc; }
      100% { transform: scale(0.9); opacity: 0.6; }
    }
    .live-dot {
      animation: pulseLive 2s infinite ease-in-out;
    }

    /* Pending Badge Pulsing */
    @keyframes pulseBadge {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,80,80,0.7); }
      70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(255,80,80,0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,80,80,0); }
    }
    .pulse-badge {
      animation: pulseBadge 1.8s infinite ease-in-out;
    }

    /* Logout Button Hover styling */
    button[style*="background: rgba(122, 18, 18"]:hover {
      background: rgba(180, 20, 20, 0.45) !important;
      border: 1px solid rgba(255, 100, 100, 0.5) !important;
      color: #fff !important;
      box-shadow: 0 0 12px rgba(255, 80, 80, 0.25) !important;
    }

    /* Student Profile Card Custom Hover Classes */
    .student-card-hover {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    }
    .student-card-hover:hover {
      transform: translateY(-4px);
      border-color: rgba(201, 150, 12, 0.6) !important;
      box-shadow: 0 8px 30px rgba(201, 150, 12, 0.18) !important;
      background: rgba(20, 8, 2, 0.6) !important;
    }
    .detailValLink-hover:hover {
      color: var(--gold) !important;
      border-color: var(--gold) !important;
    }
    .btn-approve-hover:hover {
      background: rgba(26, 107, 90, 0.4) !important;
      border-color: rgba(80, 200, 150, 0.6) !important;
      color: #fff !important;
      box-shadow: 0 0 8px rgba(80, 200, 150, 0.25) !important;
    }
    .btn-reject-hover:hover {
      background: rgba(122, 18, 18, 0.45) !important;
      border-color: rgba(255, 80, 80, 0.5) !important;
      color: #fff !important;
      box-shadow: 0 0 8px rgba(255, 80, 80, 0.25) !important;
    }
    .btn-delete-hover:hover {
      background: rgba(255, 255, 255, 0.08) !important;
      border-color: rgba(255, 80, 80, 0.4) !important;
      color: #ff8080 !important;
    }

    @media (max-width: 900px) {
      /* Stack stats summary and activity log on mid-range and small screens */
      div[style*="display: grid"][style*="grid-template-columns: 1fr 1fr"] {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }
    }

    @media (max-width: 768px) {
      /* Collapse administrative subtabs on thin devices */
      div[style*="justify-content: flex-start"] {
        flex-direction: column !important;
        gap: 6px !important;
        align-items: stretch !important;
      }
      div[style*="justify-content: flex-start"] button {
        text-align: center !important;
        border-bottom: 1px solid rgba(201,150,12,0.1) !important;
        border-left: 2px solid transparent !important;
      }
      div[style*="justify-content: flex-start"] button[style*="border-bottom: 2px solid var(--gold)"] {
        border-left: 2px solid var(--gold) !important;
        border-bottom: 1px solid rgba(201,150,12,0.1) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default AdminDesk;
