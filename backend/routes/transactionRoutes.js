const express = require('express');
const router = express.Router();
const { transactionService } = require('../config/db');
const adminAuth = require('../middleware/adminAuth');


// @route   GET /api/transactions
// @desc    Get all transaction logs
router.get('/', adminAuth, async (req, res) => {
  try {
    const txs = await transactionService.find();
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching transactions: ' + err.message });
  }
});

// @route   POST /api/transactions
// @desc    Submit a new transaction log
router.post('/', async (req, res) => {
  const { studentName, course, level, amount, method, transactionId } = req.body;
  if (!studentName || !course || !level || !amount || !method) {
    return res.status(400).json({ error: 'Missing required transaction fields' });
  }
  try {
    const newTx = await transactionService.create({
      studentName,
      course,
      level,
      amount: parseFloat(amount),
      method,
      transactionId: transactionId || 'TXN' + Math.floor(100000 + Math.random() * 900000)
    });
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating transaction: ' + err.message });
  }
});

module.exports = router;
