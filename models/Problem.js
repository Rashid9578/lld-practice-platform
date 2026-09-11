const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  description: { type: String, required: true },
  requirements: [{ type: String }] // list of functional requirements shown to the user
});

module.exports = mongoose.model('Problem', problemSchema);
