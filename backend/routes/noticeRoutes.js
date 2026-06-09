const express = require('express');
const router = express.Router();
const { noticeService } = require('../config/db');
const adminAuth = require('../middleware/adminAuth');


// @route   GET /api/notices
// @desc    Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await noticeService.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching notices: ' + err.message });
  }
});

// @route   POST /api/notices
// @desc    Create a new notice
router.post('/', adminAuth, async (req, res) => {
  const { titleEn, titleOr, contentEn, contentOr, category } = req.body;
  if (!titleEn || !titleOr || !contentEn || !contentOr) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
  try {
    const newNotice = await noticeService.create({
      titleEn,
      titleOr,
      contentEn,
      contentOr,
      category: category || 'event',
      date: new Date().toISOString()
    });
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: 'Server error creating notice: ' + err.message });
  }
});

// @route   PUT /api/notices/:id
// @desc    Update an existing notice
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await noticeService.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error updating notice: ' + err.message });
  }
});

// @route   DELETE /api/notices/:id
// @desc    Delete a notice
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await noticeService.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting notice: ' + err.message });
  }
});

module.exports = router;
