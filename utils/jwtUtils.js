const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };

  return jwt.sign(payload, config.secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.secretKey);
};
