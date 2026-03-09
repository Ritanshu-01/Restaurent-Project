const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/create', auth, orderController.createOrder);
router.get('/user', auth, orderController.getUserOrders);
router.get('/user/:userId', auth, orderController.getUserOrdersById);

// Admin routes
router.get('/all', auth, admin, orderController.getAllOrders);
router.post('/status', auth, admin, orderController.updateOrderStatus);
router.put('/status/:orderId', auth, admin, orderController.updateOrderStatusById);
router.get('/revenue', auth, admin, orderController.getRevenue);

module.exports = router;
