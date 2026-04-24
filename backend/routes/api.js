const express = require('express');
const router = express.Router();

const cartRoutes = require('./cart');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');
const foodRoutes = require('./food');
const adminRoutes = require('./admin');

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/foods', foodRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
