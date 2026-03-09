const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  people: Number,
  dish: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Reservation', schema, 'legacy_orders');
