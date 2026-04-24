const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  description: String,
  category: {
    type: String,
    enum: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
    default: 'Main Course'
  },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  discountPercent: { type: Number, default: 0, min: 0, max: 80 },
  ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  reviews: [
    {
      userName: String,
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
