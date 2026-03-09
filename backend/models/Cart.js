const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

cartSchema.methods.recalculateTotal = function recalculateTotal() {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
};

module.exports = mongoose.model('Cart', cartSchema);
