const express = require('express');

const foodController = require('../controllers/foodController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', foodController.getAllFoodItems);
router.post('/', auth, admin, upload.single('image'), foodController.createFoodItem);
router.put('/:id', auth, admin, upload.single('image'), foodController.updateFoodItem);
router.delete('/:id', auth, admin, foodController.deleteFoodItem);
router.post('/:id/reviews', auth, foodController.addFoodReview);

module.exports = router;
