const ticketService = require('../services/ticketService');
const authMiddleware = require('../services/authorization');

async function createTicket(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }
    authMiddleware.authorizeUser(token, (err, userId) => {
      if(err){
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
      }
      ticketService.createTicket(userId)
        .then((ticket) => {
          res.status(201).json({ ticket });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Failed to create ticket' });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
}

async function fetchTickets(req, res) {
    try {
      const ticketId = await ticketService.createTicket();
      res.status(201).json({ ticketId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create ticket' });
    }
  }

module.exports = { createTicket, fetchTickets };
