const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  level: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  transactionId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
