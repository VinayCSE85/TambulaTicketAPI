const ticketService = require('../services/ticketService');
const authMiddleware = require('../services/authorization');

async function createTicket(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const numberOfTickets = parseInt(req.body.numberOfTickets);
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }
    try{
      const decodedToken = authMiddleware.authorizeUser(token);
    }
    catch(error){
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
    ticketService.createTickets(numberOfTickets)
      .then((tickets) => {
        res.status(201).json({ tickets });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to create tickets.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create tickets.' });
  }
}

async function fetchTicketsByTicketId(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const ticketId = req.query.ticketId;
    console.log("Ticket ID is "+ticketId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }
    try{
      const decodedToken = authMiddleware.authorizeUser(token);
    }
    catch(error){
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
    
    ticketService.fetchTicketsByTicketId(ticketId, page, limit)
      .then((tickets) => {
        res.status(200).json({ tickets });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
}

module.exports = { createTicket, fetchTicketsByTicketId };
