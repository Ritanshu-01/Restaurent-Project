const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.get('/:userId', auth, cartController.getCartByUserId);
router.post('/add', auth, cartController.addToCart);
router.post('/remove', auth, cartController.removeFromCart);
router.post('/update', auth, cartController.updateQuantity);
router.delete('/clear', auth, cartController.clearCart);

module.exports = router;
