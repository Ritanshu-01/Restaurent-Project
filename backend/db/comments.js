const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  comment: String,
  content: String,
  updateId: String,
  userId: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', schema, 'legacy_comments');
