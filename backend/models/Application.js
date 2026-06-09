const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
