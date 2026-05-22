const mongoose = require('mongoose');

const excuseSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  scenario: String,
  context: String,
  tone: String,
  language: String,
  text: String,
  apology: String,
  proof: mongoose.Schema.Types.Mixed,
  ranking: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Excuse', excuseSchema);
