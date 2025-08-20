const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  try {
    // 1) Get token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }
    
    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3) Check user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ error: 'User no longer exists' });
    }
    
    // 4) Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

module.exports = { protect };