const Cart = require('../models/Cart');
const FoodItem = require('../models/FoodItem');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid product or quantity' });
    }
    const food = await FoodItem.findById(productId);
    if (!food) return res.status(404).json({ error: 'Food item not found' });
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    const itemIndex = cart.items.findIndex(i => i.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: food.name,
        image: food.image,
        price: food.price,
        quantity
      });
    }
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product id is required' });
    }
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(i => !i.productId.equals(productId));
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid product or quantity' });
    }
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const item = cart.items.find(i => i.productId.equals(productId));
    if (!item) return res.status(404).json({ error: 'Item not found' });
    item.quantity = quantity;
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }
    cart.items = [];
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
    } else {
      cart.totalAmount = 0;
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User id is required' });
    }
    // Allow users to see their own cart and admins to see any cart
    if (!req.user || (req.user.id !== userId && !req.user.isAdmin)) {
      return res.status(403).json({ error: 'Not authorized to view this cart' });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }
    if (typeof cart.recalculateTotal === 'function') {
      cart.recalculateTotal();
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
