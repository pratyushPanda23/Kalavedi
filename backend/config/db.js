const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isFallbackMode = false;
const isVercel = !!process.env.VERCEL;
const dataFolder = path.join(__dirname, '../data');

// Ensure data folder exists for JSON fallback (only if not on Vercel)
if (!isVercel) {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
  }
}

// Initial JSON file setups
const noticeFile = path.join(dataFolder, 'notices.json');
const appFile = path.join(dataFolder, 'applications.json');
const txFile = path.join(dataFolder, 'transactions.json');

const initJsonFile = (filePath, defaultData) => {
  if (isVercel) return; // Skip on Vercel
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
  }
};

initJsonFile(noticeFile, []);
initJsonFile(appFile, []);
initJsonFile(txFile, []);

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/swarajhankar';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds connection timeout
    });
    console.log('🔮 MongoDB Connected successfully!');
    isFallbackMode = false;
  } catch (error) {
    if (isVercel) {
      console.error('❌ MongoDB Connection failed on Vercel serverless:', error.message);
      isFallbackMode = false; // Always force false on Vercel to allow Mongoose queueing
    } else {
      console.warn('⚠️ MongoDB connection failed. Switching to Local JSON Database Fallback Mode.');
      console.warn('Reason:', error.message);
      isFallbackMode = true;
    }
  }
};

// --- Local JSON CRUD Helper Functions ---
const readJson = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// --- Unified Database Services CRUD API ---

// Notices Service
const noticeService = {
  find: async (query = {}) => {
    if (!isFallbackMode) {
      const Notice = mongoose.model('Notice');
      return await Notice.find(query).sort({ date: -1 });
    } else {
      let items = readJson(noticeFile);
      if (query.category) {
        items = items.filter(n => n.category === query.category);
      }
      // Sort by date descending
      return items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  create: async (data) => {
    if (!isFallbackMode) {
      const Notice = mongoose.model('Notice');
      const doc = new Notice(data);
      return await doc.save();
    } else {
      const items = readJson(noticeFile);
      const newNotice = {
        _id: 'notice_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        titleEn: data.titleEn,
        titleOr: data.titleOr,
        contentEn: data.contentEn,
        contentOr: data.contentOr,
        category: data.category || 'event',
        date: data.date || new Date().toISOString()
      };
      items.push(newNotice);
      writeJson(noticeFile, items);
      return newNotice;
    }
  },
  findByIdAndUpdate: async (id, updateData) => {
    if (!isFallbackMode) {
      const Notice = mongoose.model('Notice');
      return await Notice.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const items = readJson(noticeFile);
      const index = items.findIndex(n => n._id === id);
      if (index === -1) return null;
      items[index] = { ...items[index], ...updateData };
      writeJson(noticeFile, items);
      return items[index];
    }
  },
  findByIdAndDelete: async (id) => {
    if (!isFallbackMode) {
      const Notice = mongoose.model('Notice');
      return await Notice.findByIdAndDelete(id);
    } else {
      const items = readJson(noticeFile);
      const filtered = items.filter(n => n._id !== id);
      writeJson(noticeFile, filtered);
      return { id };
    }
  }
};

// Applications Service
const applicationService = {
  find: async () => {
    if (!isFallbackMode) {
      const Application = mongoose.model('Application');
      return await Application.find({}).sort({ date: -1 });
    } else {
      const items = readJson(appFile);
      return items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  create: async (data) => {
    if (!isFallbackMode) {
      const Application = mongoose.model('Application');
      const doc = new Application(data);
      return await doc.save();
    } else {
      const items = readJson(appFile);
      const newApp = {
        _id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        course: data.course,
        level: data.level || 'Beginner',
        message: data.message || '',
        status: data.status || 'Pending',
        date: new Date().toISOString()
      };
      items.push(newApp);
      writeJson(appFile, items);
      return newApp;
    }
  },
  findByIdAndUpdate: async (id, updateData) => {
    if (!isFallbackMode) {
      const Application = mongoose.model('Application');
      return await Application.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      const items = readJson(appFile);
      const index = items.findIndex(n => n._id === id);
      if (index === -1) return null;
      items[index] = { ...items[index], ...updateData };
      writeJson(appFile, items);
      return items[index];
    }
  },
  findByIdAndDelete: async (id) => {
    if (!isFallbackMode) {
      const Application = mongoose.model('Application');
      return await Application.findByIdAndDelete(id);
    } else {
      const items = readJson(appFile);
      const filtered = items.filter(n => n._id !== id);
      writeJson(appFile, filtered);
      return { id };
    }
  }
};

// Transactions Service
const transactionService = {
  find: async () => {
    if (!isFallbackMode) {
      const Transaction = mongoose.model('Transaction');
      return await Transaction.find({}).sort({ date: -1 });
    } else {
      const items = readJson(txFile);
      return items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  create: async (data) => {
    if (!isFallbackMode) {
      const Transaction = mongoose.model('Transaction');
      const doc = new Transaction(data);
      return await doc.save();
    } else {
      const items = readJson(txFile);
      const newTx = {
        _id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        studentName: data.studentName,
        course: data.course,
        level: data.level,
        amount: data.amount,
        method: data.method,
        transactionId: data.transactionId || 'TXN' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString()
      };
      items.push(newTx);
      writeJson(txFile, items);
      return newTx;
    }
  }
};

module.exports = {
  connectDB,
  isFallback: () => isFallbackMode,
  noticeService,
  applicationService,
  transactionService
};
