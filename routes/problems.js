const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const generateFeedback = require('../utils/generateFeedback');

// GET /problems - list all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.render('list', { problems });
  } catch (err) {
    res.status(500).send('Error loading problems: ' + err.message);
  }
});

// GET /problems/:id - show a single problem + submission form
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).send('Problem not found');
    res.render('submit', { problem });
  } catch (err) {
    res.status(500).send('Error loading problem: ' + err.message);
  }
});

// POST /problems/:id/submit - save submission, get AI feedback, redirect to feedback page
router.post('/:id/submit', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).send('Problem not found');

    const submission = await Submission.create({
      problem: problem._id,
      designText: req.body.designText
    });

    try {
      const feedback = await generateFeedback(problem, req.body.designText);
      submission.feedback = feedback;
      submission.status = 'evaluated';
    } catch (aiErr) {
      console.error('AI feedback failed:', aiErr.message);
      submission.feedback = 'Feedback generation failed. Please try again later.';
      submission.status = 'failed';
    }

    await submission.save();
    res.redirect(`/submissions/${submission._id}`);
  } catch (err) {
    res.status(500).send('Error creating submission: ' + err.message);
  }
});

module.exports = router;
