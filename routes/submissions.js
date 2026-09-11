const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// GET /submissions/:id - show feedback for a submission
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('problem');
    if (!submission) return res.status(404).send('Submission not found');
    res.render('feedback', { submission });
  } catch (err) {
    res.status(500).send('Error loading submission: ' + err.message);
  }
});

module.exports = router;
