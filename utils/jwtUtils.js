const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (user) => {
  const payload = {
    user: {
      id: user.userId,
      username: user.username,
      role: user.role,
    },
  };

  return jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    try{
        const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);
        return decodedToken;
    }
    catch(error){
        throw new Error('Invalid Token');
    }
};
