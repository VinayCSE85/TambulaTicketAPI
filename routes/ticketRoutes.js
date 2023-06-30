const express = require('express');
const ticketController = require('../controllers/ticketController');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  });

router.post('/create', limiter, ticketController.createTicket);
router.get('/fetchTickets', limiter, ticketController.fetchTicketsByTicketId);

module.exports = router;
