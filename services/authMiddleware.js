const jwtUtils = require('../utils/jwtUtils');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Missing token' });
  }

  try {
    const decodedToken = jwtUtils.verifyToken(token);

    // Attach the user to the request object
    req.user = decodedToken.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

exports.authorize = (req, res, next) => {
  // Check if the user has the necessary role/permissions
  // You can implement your own logic here based on your requirements

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Authorization failed: Insufficient privileges' });
  }

  next();
};
