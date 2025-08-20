const express = require('express');
const User = require('../models/user');
const { signToken } = require('../utils/jwt');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    
    const token = signToken(user._id);
    res.status(201).json({
      status: 'success',
      token,
      data: { user: { email: user.email } }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1) Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // 2) Check password
    const isCorrect = await user.correctPassword(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // 3) Generate token
    const token = signToken(user._id);
    
    res.json({
      status: 'success',
      token,
      data: { user: { email: user.email } }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;