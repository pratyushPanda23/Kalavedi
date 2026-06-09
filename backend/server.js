const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, noticeService } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Compile Mongoose models synchronously first
require('./models/Notice');
require('./models/Application');
require('./models/Transaction');

// Initialize Database connection
connectDB().then(() => {
  // Seed default notices if notice board is empty
  seedDefaultNotices();
});

// Import API routes
const noticeRoutes = require('./routes/noticeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Mount API routes
app.use('/api/notices', noticeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/transactions', transactionRoutes);

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Swarajhankar Music & Dance Academy API' });
});

// Port configuration
const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Swarajhankar Backend Server running on port ${PORT}`);
  });
}

module.exports = app;

// Pre-seed default notices if empty
async function seedDefaultNotices() {
  try {
    const existing = await noticeService.find();
    if (existing.length === 0) {
      console.log('🌱 Seeding default notices...');
      const defaults = [
        {
          titleEn: 'Admissions Open for 2025–26 Academic Year',
          titleOr: '2025-26 ଶିକ୍ଷାବର୍ଷ ଭର୍ତ୍ତି ଖୋଲା',
          contentEn: 'Enrollments are currently active for Classical Vocal, Sitar, Flute, Odissi Dance, and Folk Artistry. Apply online to secure your seat.',
          contentOr: 'ଶାସ୍ତ୍ରୀୟ ସ୍ୱର, ସିତାର, ବଂଶୀ, ଓଡ଼ିଶି ନୃତ୍ୟ ଏବଂ ଲୋକ କଳା ପାଇଁ ନାମଲେଖା ଏବେ ଚାଲୁଅଛି | ସୀମିତ ଆସନ ପାଇଁ ଏବେ ଆବେଦନ କରନ୍ତୁ |',
          category: 'admission'
        },
        {
          titleEn: 'June Tuition Fees Due Date Alert',
          titleOr: 'ଜୁନ ମାସିକ ଫି ଦେୟ ବିଜ୍ଞପ୍ତି',
          contentEn: 'Please ensure June month tuition fees are settled on or before 5th June 2025. Payments can be securely made via our online payments desk.',
          contentOr: 'ଦୟାକରି ଜୁନ ମାସର ଶିକ୍ଷା ଦେୟ ୫ ଜୁନ ୨୦୨୫ ସୁଦ୍ଧା ପୈଠ କରନ୍ତୁ | ଆପଣ ଅନଲାଇନ ପେମେଣ୍ଟ ଡେସ୍କ ମାଧ୍ୟମରେ ସୁରକ୍ଷିତ ଦେୟ କରିପାରିବେ |',
          category: 'fees'
        },
        {
          titleEn: 'Annual Practical Recital Exam Schedule',
          titleOr: 'ବାର୍ଷିକ ପ୍ରାୟୋଗିକ ପରୀକ୍ଷା ସୂଚୀ',
          contentEn: 'The annual recital exams are scheduled for 28th June 2025 at Town Hall Auditorium, Balangir. Reach out to the admin desk for slot timings.',
          contentOr: 'ବାର୍ଷିକ ପ୍ରାୟୋଗିକ ପରୀକ୍ଷା ୨୮ ଜୁନ ୨୦୨୫ ରେ ଟାଉନ ହଲ ପ୍ରେକ୍ଷାଳୟ, ବଲାଙ୍ଗୀର ଠାରେ ଅନୁଷ୍ଠିତ ହେବ। ଆପଣଙ୍କ ସମୟ ସୂଚୀ ପାଇଁ ଆଡମିନ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ |',
          category: 'exam'
        },
        {
          titleEn: 'Govt. of Odisha Accreditation Renewed',
          titleOr: 'ଓଡ଼ିଶା ସରକାର ସ୍ୱୀକୃତି ନବୀକରଣ',
          contentEn: 'We are proud to share that Swarajhankar\'s recognition and affiliation under the Department of Culture, Govt. of Odisha has been renewed for 2025–2030.',
          contentOr: 'ଆମେ ଅତ୍ୟନ୍ତ ଆନନ୍ଦିତ ଯେ ଓଡ଼ିଶା ସରକାରଙ୍କ ସଂସ୍କୃତି ବିଭାଗ ଅଧୀନରେ ସ୍ୱରଝଙ୍କାରର ମାନ୍ୟତା ଓ ସ୍ୱୀକୃତିକୁ ୨୦୨୫ ରୁ ୨୦୩୦ ପର୍ଯ୍ୟନ୍ତ ନବୀକରଣ କରାଯାଇଛି |',
          category: 'event'
        }
      ];
      for (const item of defaults) {
        await noticeService.create(item);
      }
      console.log('✅ Notices seeded successfully!');
    }
  } catch (err) {
    console.error('Error seeding notices:', err.message);
  }
}
