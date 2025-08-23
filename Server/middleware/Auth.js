const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema'); // assuming default export is the User model

const CheckAuth = async (req, res, next) => {
  try {
    const token = req.headers.token; // <token>
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized', error: error.message });
  }
};

module.exports = {
  CheckAuth,
};
