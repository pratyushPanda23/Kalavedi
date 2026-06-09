const express = require('express');
const router = express.Router();
const { applicationService } = require('../config/db');
const adminAuth = require('../middleware/adminAuth');


// @route   GET /api/applications
// @desc    Get all student applications
router.get('/', adminAuth, async (req, res) => {
  try {
    const apps = await applicationService.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching applications: ' + err.message });
  }
});

// @route   POST /api/applications
// @desc    Submit a new student application
router.post('/', async (req, res) => {
  const { name, email, phone, age, course, level, message } = req.body;
  if (!name || !email || !phone || !age || !course) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }
  try {
    const newApp = await applicationService.create({
      name,
      email,
      phone,
      age: parseInt(age),
      course,
      level: level || 'Beginner',
      message: message || '',
      status: 'Pending'
    });
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ error: 'Server error submitting application: ' + err.message });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update application status
router.put('/:id', adminAuth, async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Please provide application status' });
  }
  try {
    const updated = await applicationService.findByIdAndUpdate(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error updating application status: ' + err.message });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Delete an application
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await applicationService.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting application: ' + err.message });
  }
});

module.exports = router;
