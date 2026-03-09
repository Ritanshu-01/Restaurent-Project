const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  content: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Update', schema, 'legacy_updates');
