const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: false },
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  notes: String
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: Number,
  paymentMethod: String,
  deliveryAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    instructions: String
  },
  orderStatus: { type: String, enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Pending' },
  estimatedDelivery: String,
  coupon: String,
  tracking: [
    {
      status: String,
      timestamp: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
