const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

router.post('/register', limiter, authController.register);
router.post('/login', limiter, authController.login);
router.post('/registerAdmin', limiter, authController.registerAdmin);

module.exports = router;
