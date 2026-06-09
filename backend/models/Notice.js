const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleOr: { type: String, required: true },
  contentEn: { type: String, required: true },
  contentOr: { type: String, required: true },
  category: {
    type: String,
    enum: ['exam', 'event', 'fees', 'admission'],
    default: 'event'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', NoticeSchema);
