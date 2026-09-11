const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  designText: { type: String, required: true }, // user's pasted design/code
  feedback: { type: String, default: null },     // AI-generated feedback, filled in after submission
  status: { type: String, enum: ['pending', 'evaluated', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
