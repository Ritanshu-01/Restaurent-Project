const User = require('../models/User');

exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const targetId = req.params.userId;
    if (!targetId) {
      return res.status(400).json({ error: 'User id is required' });
    }
    if (String(req.user._id) === String(targetId)) {
      return res.status(400).json({ error: 'Main admin cannot delete own account' });
    }
    const deleted = await User.findByIdAndDelete(targetId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
