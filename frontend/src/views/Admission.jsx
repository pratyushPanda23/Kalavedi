import React, { useState, useEffect } from 'react';
import GlassCard from '../components/UI/GlassCard';
import GlowingButton from '../components/UI/GlowingButton';

const Admission = ({ language, autoSelectCourse, setAutoSelectCourse }) => {
  const courses = [
    'Hindustani Classical Vocal',
    'Odissi Classical Vocal',
    'Sitar Artistry',
    'Classical Bamboo Flute',
    'Tabla & Percussion Desk',
    'Odissi Classical Dance',
    'Sambalpuri Folk Arts'
  ];

  const levels = [
    { id: 'Beginner', en: 'Prarambhika (Beginner)', or: 'ପ୍ରାରମ୍ଭିକ (Beginner)' },
    { id: 'Intermediate', en: 'Madhayama (Intermediate)', or: 'ମାଧ୍ୟମିକ (Intermediate)' },
    { id: 'Advanced', en: 'Kovida (Advanced)', or: 'କୋବିଦ (Advanced)' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    course: '',
    level: 'Beginner',
    message: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (autoSelectCourse) {
      setFormData(prev => ({ ...prev, course: autoSelectCourse }));
      // Clean up after reading
      setAutoSelectCourse('');
    }
  }, [autoSelectCourse, setAutoSelectCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, age, course } = formData;

    if (!name || !email || !phone || !age || !course) {
      setError(language === 'or' ? 'ଦୟାକରି ସମସ୍ତ ବାଧ୍ୟତାମୂଳକ ଫିଲ୍ଡ ପୂରଣ କରନ୍ତୁ।' : 'Please fill in all required fields.');
      return;
    }

    if (phone.length < 10) {
      setError(language === 'or' ? 'ଦୟାକରି ଏକ ବୈଧ ୧୦-ଅଙ୍କ ବିଶିଷ୍ଟ ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରଦାନ କରନ୍ତୁ।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          course: '',
          level: 'Beginner',
          message: ''
        });
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError(language === 'or' ? 'ସର୍ଭର ସଂଯୋଗ ବିଫଳ ହେଲା। ଦୟାକରି ପରେ ଚେଷ୍ଟା କରନ୍ତୁ।' : 'Failed to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="section-header">
        <span className="section-label">{language === 'or' ? 'ଅନଲାଇନ୍ ଆବେଦନ' : 'ENROLLMENT'}</span>
        <h2 className="section-title">
          {language === 'or' ? 'ଭର୍ତ୍ତି ଫର୍ମ' : 'Online Admission'} <span>{language === 'or' ? 'ଖୋଲାଅଛି' : 'Desk'}</span>
        </h2>
      </div>

      <div style={styles.layout}>
        {/* Left Side: Step guides */}
        <div style={styles.infoCol}>
          <h3 className="display-font" style={styles.infoTitle}>
            {language === 'or' ? '୩ଟି ସରଳ ପଦ୍ଧତିରେ ଆବେଦନ' : 'Simple 3-Step Process'}
          </h3>
          <p style={styles.infoDesc}>
            {language === 'or'
              ? 'ସ୍ୱରଝଙ୍କାର ସଙ୍ଗୀତ ଅନୁଷ୍ଠାନରେ ଯୋଗ ଦେଇ ନିଜ କଳା ପ୍ରତିଭାକୁ ବିକଶିତ କରନ୍ତୁ |'
              : 'Join Swarajhankar to embark on a structured performance arts curriculum. Submit your details to secure slot allotments.'}
          </p>

          <div style={styles.steps}>
            <div style={styles.step}>
              <span style={styles.stepNum}>1</span>
              <div style={styles.stepText}>
                <strong className="heading-font">{language === 'or' ? 'ଫର୍ମ ସବ୍‌ମିଟ୍ କରନ୍ତୁ' : 'Submit Application'}</strong>
                <p>{language === 'or' ? 'ଆପଣଙ୍କ ପ୍ରାଥମିକ ବିବରଣୀ ଏବଂ ପାଠ୍ୟକ୍ରମ ଚୟନ କରି ଫର୍ମ ପୂରଣ କରନ୍ତୁ |' : 'Fill in student details, select level standard, and hit submit.'}</p>
              </div>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>2</span>
              <div style={styles.stepText}>
                <strong className="heading-font">{language === 'or' ? 'ଗୁରୁଙ୍କ ସହ କଥା ହୁଅନ୍ତୁ' : 'Guru Evaluation'}</strong>
                <p>{language === 'or' ? 'ଆମର ପ୍ରଶାସକ ଆପଣଙ୍କୁ ଯୋଗାଯୋଗ କରି ବ୍ୟାଚ୍ ସମୟ ସ୍ଥିର କରିବେ |' : 'Our academic counselors will evaluate age requirements and allot batches.'}</p>
              </div>
            </div>
            <div style={styles.step}>
              <span style={styles.stepNum}>3</span>
              <div style={styles.stepText}>
                <strong className="heading-font">{language === 'or' ? 'ଶ୍ରେଣୀରେ ଯୋଗ ଦିଅନ୍ତୁ' : 'Start Training'}</strong>
                <p>{language === 'or' ? 'ଶିକ୍ଷା ଦେୟ ପୈଠ କରି ନିଜ କଳା ସାଧନା ଆରମ୍ଭ କରନ୍ତୁ |' : 'Settle initial admission fees and begin learning under expert guidance.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <GlassCard style={styles.formCol}>
          {success ? (
            <div style={styles.successBox} className="admission-success-fade">
              <span style={styles.successIcon}>🎉</span>
              <h3 className="heading-font" style={styles.successTitle}>
                {language === 'or' ? 'ଆବେଦନ ସଫଳ ହେଲା!' : 'Application Submitted Successfully!'}
              </h3>
              <p style={styles.successDesc}>
                {language === 'or'
                  ? 'ଆପଣଙ୍କ ଆବେଦନ ପଞ୍ଜୀକୃତ ହୋଇଛି | ଆମର କର୍ମଚାରୀ ଖୁବ ଶୀଘ୍ର ଆପଣଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବେ। ଧନ୍ୟବାଦ।'
                  : 'We have received your admission application request. Our administrative office will contact you shortly via email or phone to confirm slot allotments.'}
              </p>
              <GlowingButton variant="primary" onClick={() => setSuccess(false)} style={{ marginTop: '20px' }}>
                {language === 'or' ? 'ନୂଆ ଆବେଦନ କରନ୍ତୁ' : 'Apply Another'}
              </GlowingButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <h4 className="heading-font" style={styles.formTitle}>
                ✏️ {language === 'or' ? 'ଛାତ୍ରଛାତ୍ରୀ ପଞ୍ଜୀକରଣ' : 'Student Enrollment Sheet'}
              </h4>

              {error && (
                <div style={styles.errorBox}>
                  ⚠️ {error}
                </div>
              )}

              <div style={styles.formGrid}>
                {/* Name */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ଛାତ୍ର/ଛାତ୍ରୀଙ୍କ ନାମ *' : 'Full Name *'}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder={language === 'or' ? 'ନାମ ଲେଖନ୍ତୁ' : 'e.g. Ramesh Mohanty'}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ଇମେଲ୍ ଠିକଣା *' : 'Email Address *'}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g. name@example.com"
                    className="form-input"
                  />
                </div>

                {/* Phone */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ମୋବାଇଲ୍ ନମ୍ବର *' : 'Mobile Number *'}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g. 9876543210"
                    className="form-input"
                  />
                </div>

                {/* Age */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ବୟସ *' : 'Age prerequisite *'}</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="e.g. 12"
                    min="4"
                    className="form-input"
                  />
                </div>

                {/* Course Selection */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଚୟନ *' : 'Select Program *'}</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    style={styles.select}
                    className="form-select"
                  >
                    <option value="">{language === 'or' ? '-- ପାଠ୍ୟକ୍ରମ ବାଛନ୍ତୁ --' : '-- Choose Program --'}</option>
                    {courses.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Level Selection */}
                <div style={styles.group}>
                  <label style={styles.label}>{language === 'or' ? 'ଶିକ୍ଷା ସ୍ତର *' : 'Allotment Level *'}</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    style={styles.select}
                    className="form-select"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl.id} value={lvl.id}>
                        {language === 'or' ? lvl.or : lvl.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Message */}
                <div style={{ ...styles.group, gridColumn: 'span 2' }}>
                  <label style={styles.label}>{language === 'or' ? 'ଅତିରିକ୍ତ ବାର୍ତ୍ତା' : 'Special message / Note'}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...styles.input, ...styles.textarea }}
                    placeholder={language === 'or' ? 'ନିଜର ବିବରଣୀ ବା ଜଣାଇବାକୁ ଚାହୁଁଥିବା କଥା ଲେଖନ୍ତୁ...' : 'Details about past musical experience, preferred batch timings, etc...'}
                    className="form-input form-textarea"
                  ></textarea>
                </div>
              </div>

              <div style={styles.submitWrapper}>
                <GlowingButton 
                  type="submit" 
                  variant="primary" 
                  disabled={loading}
                  style={styles.submitBtn}
                >
                  {loading 
                    ? (language === 'or' ? 'ସବ୍‌ମିଟ୍ ହେଉଛି...' : 'Submitting Sheet...')
                    : (language === 'or' ? 'ଆବେଦନ ପତ୍ର ପ୍ରେରଣ କରନ୍ତୁ' : 'Submit Admission Sheet')
                  }
                </GlowingButton>
              </div>
            </form>
          )}
        </GlassCard>
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
    gridTemplateColumns: '0.8fr 1.2fr',
    gap: '40px',
    alignItems: 'start'
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  infoTitle: {
    fontSize: '1.25rem',
    color: 'var(--gold)',
    letterSpacing: '1.5px',
    lineHeight: '1.4',
    marginBottom: '14px'
  },
  infoDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    marginBottom: '30px',
    fontFamily: 'Noto Serif, serif',
    fontStyle: 'italic'
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  step: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start'
  },
  stepNum: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, var(--maroon), var(--deepmaroon))',
    border: '1px solid rgba(201,150,12,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Cinzel Decorative, serif',
    fontSize: '0.82rem',
    color: 'var(--gold)',
    borderRadius: '4px',
    flexShrink: 0
  },
  stepText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  stepTextTitle: {
    fontSize: '0.85rem',
    color: 'var(--parchment)',
    letterSpacing: '1px'
  },
  stepTextDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    marginTop: '2px'
  },
  formCol: {
    padding: '36px',
    background: 'rgba(10, 4, 0, 0.7)'
  },
  formTitle: {
    fontSize: '1rem',
    color: 'var(--parchment)',
    letterSpacing: '2px',
    textAlign: 'left',
    marginBottom: '24px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(201,150,12,0.15)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  errorBox: {
    background: 'rgba(122,18,18,0.2)',
    border: '1px solid rgba(255,80,80,0.3)',
    color: '#ff8080',
    fontSize: '0.8rem',
    padding: '12px',
    borderRadius: '4px',
    textAlign: 'left'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
  input: {
    borderRadius: '4px'
  },
  select: {
    borderRadius: '4px'
  },
  textarea: {
    borderRadius: '4px',
    gridColumn: 'span 2'
  },
  submitWrapper: {
    marginTop: '12px'
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '0.82rem',
    letterSpacing: '1.5px'
  },
  successBox: {
    padding: '30px 10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px'
  },
  successIcon: {
    fontSize: '3.5rem'
  },
  successTitle: {
    fontSize: '1.1rem',
    color: '#80ffcc',
    letterSpacing: '1px'
  },
  successDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    maxWidth: '460px'
  }
};

// Injection to ensure proper responsive flex grid collapse
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .admission-success-fade {
      animation: successFadeIn 0.5s ease forwards;
    }
    @keyframes successFadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @media (max-width: 900px) {
      div[style*="grid-template-columns: 0.8fr 1.2fr"] {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }
      div[style*="grid-template-columns: 1fr 1fr"] {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }
      textarea[style*="grid-column: span 2"] {
        grid-column: span 1 !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Admission;
