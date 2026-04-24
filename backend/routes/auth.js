const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_replace_in_prod';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const mainAdminEmail = (process.env.MAIN_ADMIN_EMAIL || process.env.ADMIN_EMAIL || '').toLowerCase();
    if (!mainAdminEmail || String(email).toLowerCase().trim() !== mainAdminEmail) {
      return res.status(403).json({ error: 'Only main admin can access panel' });
    }

    const user = await User.findOne({ email: mainAdminEmail });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin account required' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

