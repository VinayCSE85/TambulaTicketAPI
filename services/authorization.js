const jwtUtils = require('../utils/jwtUtils');
const config = require('../config/config');

exports.authorizeUser = (token, callback)  => {
  // Verify the token
  jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // Token verification failed
      callback(err);
      // return res.status(401).json({ message: 'Invalid token' });
    }

    // Token verification successful, extract the user ID
    const userId = decoded.userId;

    callback(null, userId);
  });
}

exports.authorize = (req, res, next) => {
  // Check if the user has the necessary role/permissions
  // You can implement your own logic here based on your requirements

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Authorization failed: Insufficient privileges' });
  }

  next();
};
