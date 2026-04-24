const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/users', auth, admin, adminController.getUsers);
router.delete('/users/:userId', auth, admin, adminController.deleteUser);

module.exports = router;
