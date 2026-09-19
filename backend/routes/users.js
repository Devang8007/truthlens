const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users/profile
// @desc    Get current user profile & settings
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile & preferences
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { username, organization, role, preferences } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (organization) user.organization = organization;
    if (role) user.role = role;
    if (preferences) {
      user.preferences = {
        ...user.preferences,
        ...preferences
      };
    }

    await user.save();
    const updated = await User.findById(req.user.id).select('-password');
    res.json(updated);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST api/users/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST api/users/regenerate-api-key
// @desc    Regenerate API key
// @access  Private
router.post('/regenerate-api-key', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.apiKey = 'tl_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await user.save();

    res.json({ apiKey: user.apiKey });
  } catch (err) {
    console.error('API key regeneration error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
