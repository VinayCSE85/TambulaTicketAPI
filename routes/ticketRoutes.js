const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.post('/create', ticketController.createTicket);
router.get('/', )

module.exports = router;
