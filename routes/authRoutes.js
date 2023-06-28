const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../services/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.get('/protected', authMiddleware.authenticate, (req, res) => {
  res.json({ message: 'You are authorized to access this route' });
});

// Admin route
router.get('/admin', authMiddleware.authenticate, authMiddleware.authorize, (req, res) => {
  res.json({ message: 'You are authorized as an admin' });
});

module.exports = router;