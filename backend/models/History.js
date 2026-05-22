const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: String, default: null },
  excuseText: String,
  medium: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
