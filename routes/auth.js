const express = require('express');
const router = express.Router();
const User = require('../models/user');  // ← Fix path (../ not ./)

router.post('/register', async (req, res) => {
  console.log('Registration request received', req.body);
  try {
    const { email, password } = req.body;  // ← Use { } not ( )
    const user = new User({ email, password });  // ← Use { } not ( )
    await user.save();
    res.status(201).send("User registered!");
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).send(err.message);
  }
});

module.exports = router;