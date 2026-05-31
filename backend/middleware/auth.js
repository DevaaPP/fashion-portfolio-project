// middleware/auth.js
const User = require('../models/User');
const { signToken, verifyToken } = require('../config/jwt');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Admin-only middleware
const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('isAdmin');
    if (!user?.isAdmin) return res.status(403).json({ message: 'Admin access required' });

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Keep legacy export name for compatibility
const generateToken = (id) => signToken(id);

module.exports = { auth, adminAuth, generateToken };