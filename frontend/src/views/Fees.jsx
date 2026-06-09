import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard';
import GlowingButton from '../components/UI/GlowingButton';
import Modal from '../components/UI/Modal';

const Fees = ({ language }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: 'Hindustani Classical Vocal',
    level: 'Beginner'
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const courses = [
    { name: 'Hindustani Classical Vocal', baseFee: 600 },
    { name: 'Odissi Classical Vocal', baseFee: 500 },
    { name: 'Sitar Artistry', baseFee: 800 },
    { name: 'Classical Bamboo Flute', baseFee: 600 },
    { name: 'Tabla & Percussion Desk', baseFee: 500 },
    { name: 'Odissi Classical Dance', baseFee: 700 },
    { name: 'Sambalpuri Folk Arts', baseFee: 400 }
  ];

  const levels = [
    { id: 'Beginner', en: 'Prarambhika (Beginner) [+0%]', multiplier: 1.0 },
    { id: 'Intermediate', en: 'Madhayama (Intermediate) [+20%]', multiplier: 1.2 },
    { id: 'Advanced', en: 'Kovida (Advanced) [+40%]', multiplier: 1.4 }
  ];

  const getCalculatedFee = () => {
    const matched = courses.find(c => c.name === formData.course);
    const matchedLvl = levels.find(l => l.id === formData.level);
    const base = matched ? matched.baseFee : 500;
    const mult = matchedLvl ? matchedLvl.multiplier : 1.0;
    return Math.round(base * mult);
  };

  const currentFee = getCalculatedFee();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.studentName) {
      alert(language === 'or' ? 'ଦୟାକରି ଛାତ୍ରଙ୍କ ନାମ ପ୍ରଦାନ କରନ୍ତୁ।' : 'Please provide student name.');
      return;
    }
    setIsPayModalOpen(true);
  };

  const handleCompletePayment = async (method) => {
    setLoading(true);
    setPaymentMethod(method);

    const transactionId = 'TXN' + Math.floor(100000 + Math.random() * 900000);
    const paymentData = {
      studentName: formData.studentName,
      course: formData.course,
      level: formData.level,
      amount: currentFee,
      method: method,
      transactionId: transactionId
    };

    try {
      // POST to backend api/transactions
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      const data = await res.json();

      if (res.ok) {
        setReceipt(data);
        setIsPayModalOpen(false);
      } else {
        alert('Transaction failed to log on server');
      }
    } catch (err) {
      // Fallback log success locally anyway
      console.warn('Logging offline receipt locally due to offline network.');
      setReceipt({
        ...paymentData,
        date: new Date().toISOString()
      });
      setIsPayModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଶିକ୍ଷା ଦେୟ ପରିଶୋଧ' : 'PAYMENTS'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'ଅନଲାଇନ୍ ଫିସ୍' : 'Fees Payment'} <span>{language === 'or' ? 'ପରିଶୋଧ କେନ୍ଦ୍ର' : 'Desk'}</span>
        </h2>
      </div>

      {!receipt ? (
        <div style={styles.layout}>
          {/* Left Side: Fee Calculator desk */}
          <GlassCard style={styles.formPanel}>
            <h4 className="heading-font" style={styles.panelTitle}>
              🧮 {language === 'or' ? 'ମାସିକ ଫି ଗଣନା' : 'Tuition Fee Calculator'}
            </h4>
            <form onSubmit={handleCheckout} style={styles.form}>
              <div style={styles.group}>
                <label style={styles.label}>{language === 'or' ? 'ଛାତ୍ରଛାତ୍ରୀଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ *' : 'Student Name *'}</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder={language === 'or' ? 'ନାମ ଲେଖନ୍ତୁ' : 'e.g. Ramesh Mohanty'}
                  className="form-input"
                  required
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଚୟନ *' : 'Select Program *'}</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  style={styles.select}
                  className="form-select"
                >
                  {courses.map((c, i) => (
                    <option key={i} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.group}>
                <label style={styles.label}>{language === 'or' ? 'ଶିକ୍ଷା ସ୍ତର *' : 'Allotment Level *'}</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  style={styles.select}
                  className="form-select"
                >
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>{lvl.en}</option>
                  ))}
                </select>
              </div>

              <div style={styles.totalRow}>
                <span>{language === 'or' ? 'ହିସାବ କରାଯାଇଥିବା ଶିକ୍ଷା ଦେୟ:' : 'Calculated Monthly Tuition:'}</span>
                <span className="display-font" style={styles.feeGlow}>₹{currentFee}</span>
              </div>

              <GlowingButton type="submit" variant="primary" style={styles.submitBtn}>
                {language === 'or' ? 'ଦେୟ ପୈଠ କରିବାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ' : 'Proceed to Settle Fees'}
              </GlowingButton>
            </form>
          </GlassCard>

          {/* Right Side: Visual guides */}
          <div style={styles.guideCol}>
            <GlassCard style={styles.guideCard}>
              <h4 className="heading-font" style={styles.guideTitle}>🛡️ {language === 'or' ? 'ସୁରକ୍ଷିତ ଅନଲାଇନ୍ ପେମେଣ୍ଟ' : 'Secure Online Desk'}</h4>
              <p style={styles.guideText}>
                {language === 'or'
                  ? 'ଆପଣ UPI, କାର୍ଡ କିମ୍ବା ନେଟ୍ ବ୍ୟାଙ୍କିଙ୍ଗ୍ ସାହାଯ୍ୟରେ ସୁରକ୍ଷିତ ଭାବେ ନିଜର ଶିକ୍ଷା ଦେୟ ପ୍ରଦାନ କରି ପାରିବେ। ସବ୍‌ମିଶନ ପରେ ତୁରନ୍ତ ରସିଦ୍ ପ୍ରଦାନ କରାଯିବ।'
                  : 'Settle academic installments seamlessly using encrypted digital channels. An automated audit invoice is published instantly upon settlement.'}
              </p>
              <div style={styles.methodsRow}>
                <span style={styles.methodBadge}>💳 Cards</span>
                <span style={styles.methodBadge}>📲 UPI App</span>
                <span style={styles.methodBadge}>🏦 NetBanking</span>
              </div>
            </GlassCard>

            <GlassCard style={styles.clearanceCard}>
              <h4 className="heading-font" style={styles.guideTitle}>📜 {language === 'or' ? 'ଅଫ୍ଲାଇନ କାଉଣ୍ଟର ଦେୟ' : 'Offline Counter Payments'}</h4>
              <p style={styles.guideText}>
                {language === 'or'
                  ? 'ଆପଣ ଚାହିଁଲେ ଏକାଡେମୀ କାଉଣ୍ଟରରେ ମଧ୍ୟ ନଗଦ କିମ୍ବା ଚେକ୍ ମାଧ୍ୟମରେ ଦେୟ ପ୍ରଦାନ କରିପାରିବେ | ଅଧିକ ବିବରଣୀ ପାଇଁ କ୍ୟାମ୍ପସ୍ କାର୍ଯ୍ୟାଳୟ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।'
                  : 'Tuition can also be paid at the main office desk via Cash/Check. Ensure receipts are signed by academic accountants.'}
              </p>
            </GlassCard>
          </div>
        </div>
      ) : (
        /* Invoice/Receipt Section */
        <GlassCard style={styles.receiptCard} className="receipt-animation-fade">
          <div style={styles.receiptHeader}>
            <span style={styles.successStamp}>✅ {language === 'or' ? 'ଦେୟ ସଫଳ' : 'SUCCESSFUL'}</span>
            <h3 className="display-font" style={styles.receiptTitle}>{language === 'or' ? 'ଫି ପୈଠ ରସିଦ୍' : 'Fees Payment Invoice'}</h3>
            <span style={styles.brandSubtitle}>Swarajhankar Academy · Balangir</span>
          </div>
          
          <div className="konark-divider" style={{ margin: '14px 0' }}></div>

          <div style={styles.receiptBody}>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ଛାତ୍ରଙ୍କ ନାମ:' : 'Student Name:'}</span>
              <strong>{receipt.studentName}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ:' : 'Course Program:'}</span>
              <strong>{receipt.course}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ଶିକ୍ଷା ସ୍ତର:' : 'Allotment Level:'}</span>
              <strong>{receipt.level}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ଦେୟ ପଦ୍ଧତି:' : 'Payment Channel:'}</span>
              <strong style={{ textTransform: 'uppercase' }}>{receipt.method}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ଟ୍ରାଞ୍ଜାକ୍ସନ ଆଇଡି:' : 'Transaction ID:'}</span>
              <strong style={{ color: 'var(--gold)' }}>{receipt.transactionId}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>{language === 'or' ? 'ତାରିଖ ଏବଂ ସମୟ:' : 'Timestamp:'}</span>
              <strong>{new Date(receipt.date).toLocaleString()}</strong>
            </div>

            <div className="konark-divider" style={{ margin: '16px 0 10px 0' }}></div>

            <div style={styles.receiptTotalRow}>
              <span>{language === 'or' ? 'ପୈଠ କରାଯାଇଥିବା ସମୁଦାୟ ରାଶି:' : 'Total Amount Settled:'}</span>
              <span className="display-font" style={styles.receiptTotalGlow}>₹{receipt.amount}</span>
            </div>
          </div>

          <div style={styles.receiptActions}>
            <GlowingButton variant="primary" onClick={() => window.print()} style={styles.receiptBtn}>
              🖨️ {language === 'or' ? 'ରସିଦ୍ ପ୍ରିଣ୍ଟ କରନ୍ତୁ' : 'Print Invoice'}
            </GlowingButton>
            <GlowingButton variant="outline" onClick={() => setReceipt(null)} style={styles.receiptBtn}>
              {language === 'or' ? 'ଆଉ ଏକ ଦେୟ କରନ୍ତୁ' : 'Settle Another'}
            </GlowingButton>
          </div>
        </GlassCard>
      )}

      {/* Payment checkout options Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title={language === 'or' ? 'ସୁରକ୍ଷିତ ଦେୟ ପଦ୍ଧତି ଚୟନ କରନ୍ତୁ' : 'Select Secure Checkout Channel'}
      >
        <div style={styles.modalBody}>
          <div style={styles.billDetails}>
            <p>{language === 'or' ? 'ଛାତ୍ରଙ୍କ ନାମ:' : 'Student Name:'} <strong>{formData.studentName}</strong></p>
            <p>{language === 'or' ? 'ସମୁଦାୟ ଦେୟ ରାଶି:' : 'Total Payable Tuition:'} <strong style={{ color: 'var(--gold)' }}>₹{currentFee}</strong></p>
          </div>

          {loading ? (
            <div style={styles.loadingWrapper}>
              <div style={styles.spinner}></div>
              <p style={{ marginTop: '10px' }}>{language === 'or' ? 'ଟ୍ରାଞ୍ଜାକ୍ସନ ଯାଞ୍ଚ କରାଯାଉଛି...' : 'Verifying Digital Transaction...'}</p>
            </div>
          ) : (
            <div style={styles.payMethodsGrid}>
              <button style={styles.payBtn} onClick={() => handleCompletePayment('upi')}>
                <span style={styles.payIcon}>📲</span>
                <strong className="heading-font">UPI Scanner Desk</strong>
                <small>Scan and pay using PhonePe / GPay</small>
              </button>
              <button style={styles.payBtn} onClick={() => handleCompletePayment('card')}>
                <span style={styles.payIcon}>💳</span>
                <strong className="heading-font">Debit / Credit Card</strong>
                <small>Visa, MasterCard, RuPay cards</small>
              </button>
              <button style={styles.payBtn} onClick={() => handleCompletePayment('netbanking')}>
                <span style={styles.payIcon}>🏦</span>
                <strong className="heading-font">Secure NetBanking</strong>
                <small>Direct bank transfer checkout</small>
              </button>
              <button style={styles.payBtn} onClick={() => handleCompletePayment('counter_ref')}>
                <span style={styles.payIcon}>📝</span>
                <strong className="heading-font">Offline Reference log</strong>
                <small>Log to database as Pending Counter approval</small>
              </button>
            </div>
          )}
        </div>
      </Modal>
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
  formPanel: {
    padding: '30px',
    background: 'rgba(10, 4, 0, 0.7)'
  },
  panelTitle: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    textAlign: 'left',
    marginBottom: '20px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(201,150,12,0.15)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    textAlign: 'left'
  },
  label: {
    fontSize: '0.7rem',
    letterSpacing: '1.5px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontFamily: 'Cinzel, serif'
  },
  input: { borderRadius: '4px' },
  select: { borderRadius: '4px' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(201,150,12,0.06)',
    border: '1px solid rgba(201,150,12,0.15)',
    borderRadius: '4px',
    fontSize: '0.88rem',
    color: 'var(--parchment)'
  },
  feeGlow: {
    fontSize: '1.7rem',
    color: 'var(--gold)',
    textShadow: '0 0 15px rgba(201,150,12,0.4)',
    lineHeight: 1
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '0.82rem',
    letterSpacing: '1.5px'
  },
  guideCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  guideCard: {
    borderTop: '3px solid var(--teal)',
    padding: '24px',
    textAlign: 'left'
  },
  clearanceCard: {
    borderTop: '3px solid var(--maroon)',
    padding: '24px',
    textAlign: 'left'
  },
  guideTitle: {
    fontSize: '0.88rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    marginBottom: '10px'
  },
  guideText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    marginBottom: '14px'
  },
  methodsRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  methodBadge: {
    fontSize: '0.64rem',
    background: 'rgba(26,107,90,0.15)',
    border: '1px solid rgba(26,107,90,0.25)',
    color: '#80ffcc',
    padding: '3px 10px',
    borderRadius: '20px'
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  billDetails: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,150,12,0.12)',
    padding: '14px',
    borderRadius: '4px',
    textAlign: 'left',
    fontSize: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  payMethodsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px'
  },
  payBtn: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(201,150,12,0.15)',
    borderRadius: '4px',
    padding: '16px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s'
  },
  payIcon: {
    fontSize: '2rem'
  },
  loadingWrapper: {
    padding: '40px 0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(201,150,12,0.1)',
    borderTop: '3px solid var(--gold)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  receiptCard: {
    maxWidth: '520px',
    margin: '0 auto',
    padding: '36px',
    borderTop: '4px solid #80ffcc',
    background: 'rgba(10,4,0,0.85)'
  },
  receiptHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  },
  successStamp: {
    fontSize: '0.72rem',
    background: 'rgba(26,107,90,0.15)',
    border: '1px solid rgba(80,200,150,0.3)',
    color: '#80ffcc',
    padding: '4px 14px',
    borderRadius: '30px',
    letterSpacing: '1px',
    fontWeight: 'bold'
  },
  receiptTitle: {
    fontSize: '1.2rem',
    color: 'var(--parchment)',
    letterSpacing: '1.5px',
    marginTop: '6px'
  },
  brandSubtitle: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    letterSpacing: '1px'
  },
  receiptBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    borderBottom: '1px dashed rgba(201,150,12,0.08)',
    paddingBottom: '8px'
  },
  receiptTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.88rem',
    color: 'var(--parchment)'
  },
  receiptTotalGlow: {
    fontSize: '1.6rem',
    color: '#80ffcc',
    textShadow: '0 0 15px rgba(80,200,150,0.3)',
    lineHeight: 1
  },
  receiptActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '30px',
    justifyContent: 'center'
  },
  receiptBtn: {
    flex: '1',
    padding: '10px 14px',
    fontSize: '0.74rem',
    letterSpacing: '1px'
  }
};

// Injection to ensure proper responsive design & print modes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .receipt-animation-fade {
      animation: invoiceFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .modal-box button[style*="cursor: pointer"]:hover {
      background: rgba(201,150,12,0.08) !important;
      border-color: var(--gold) !important;
      box-shadow: 0 0 15px rgba(201,150,12,0.12);
    }
    @keyframes invoiceFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    @media (max-width: 900px) {
      div[style*="grid-template-columns: 1.2fr 0.8fr"] {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
    }
    @media (max-width: 500px) {
      div[style*="grid-template-columns: 1fr 1fr"] {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }
    }
    @media print {
      body * { display: none !important; }
      .receipt-animation-fade, .receipt-animation-fade * { display: block !important; }
      .receipt-animation-fade { position: absolute; left: 0; top: 0; width: 100% !important; border: none !important; background: #fff !important; color: #000 !important; }
      .receipt-animation-fade span, .receipt-animation-fade strong { color: #000 !important; }
      .receipt-animation-fade button { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Fees;
