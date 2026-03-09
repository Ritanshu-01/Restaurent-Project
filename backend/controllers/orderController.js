const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  try {
    const { paymentMethod, deliveryAddress, notes, coupon, items: bodyItems } = req.body;

    if (!paymentMethod || !['COD', 'UPI', 'Card'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid or missing payment method' });
    }
    if (!deliveryAddress || !deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
      return res.status(400).json({ error: 'Delivery address is incomplete' });
    }

    let orderItems;
    let subtotal;

    if (Array.isArray(bodyItems) && bodyItems.length > 0) {
      orderItems = bodyItems.map((i) => ({
        productId: null,
        name: i.name,
        image: i.image || '',
        price: Number(i.price),
        quantity: Number(i.quantity) || 1,
        notes: i.notes || ''
      }));
      subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    } else {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
      orderItems = cart.items.map((i) => ({
        ...i.toObject(),
        notes: notes && i.productId ? (notes[i.productId] || '') : ''
      }));
      subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      cart.items = [];
      if (typeof cart.recalculateTotal === 'function') {
        cart.recalculateTotal();
      } else {
        cart.totalAmount = 0;
      }
      await cart.save();
    }

    const deliveryFee = subtotal > 0 ? 30 : 0;
    const tax = subtotal * 0.05;
    let discount = 0;
    if (coupon && coupon.trim().toUpperCase() === 'WELCOME10') {
      discount = subtotal * 0.1;
    }
    const totalAmount = Math.max(0, subtotal + deliveryFee + tax - discount);

    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      orderStatus: 'Preparing',
      estimatedDelivery: '30-40 min',
      coupon
    });
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrdersById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User id is required' });
    }
    if (!req.user || (req.user.id !== userId && !req.user.isAdmin)) {
      return res.status(403).json({ error: 'Not authorized to view these orders' });
    }
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Order id and status are required' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.orderStatus = status;
    order.tracking.push({ status, timestamp: new Date() });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateOrderStatusById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Order id and status are required' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.orderStatus = status;
    order.tracking.push({ status, timestamp: new Date() });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: 'Delivered' });
    const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    res.json({ revenue });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
