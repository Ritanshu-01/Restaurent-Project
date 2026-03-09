const express = require('express');
const router = express.Router();

const cartRoutes = require('./cart');
const orderRoutes = require('./orders');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
