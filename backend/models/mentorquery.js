const mongoose = require('mongoose');

const mentorQuerySchema = new mongoose.Schema({
  email: { type: String, required: true },
  mentorName: { type: String, required: true },
  mentorEmail: { type: String, required: true },
  query: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', mentorQuerySchema);