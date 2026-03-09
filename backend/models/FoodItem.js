const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  description: String,
  category: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
