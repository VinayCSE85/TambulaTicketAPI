const Ticket = require('../models/ticket');
const { generateTicket, generateTicketId } = require('../utils/helper');

async function createTicket(userId) {
  const ticketId = generateTicketId();
  const ticketData = generateTicket();
  
  const ticket = new Ticket({
    ticketId,
    ticketData
  });

  await ticket.save();

  return ticketId;
}

module.exports = { createTicket };
