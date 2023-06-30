const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.post('/create', ticketController.createTicket);
router.get('/fetchTickets', ticketController.fetchTicketsByTicketId);

module.exports = router;
