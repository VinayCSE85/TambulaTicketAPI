const Ticket = require('../models/ticket');

class TicketDao {
  async createTicket(ticketData) {
    const ticket = new Ticket(ticketData);
    await ticket.save();
    return ticket;
  }

  async fetchAllTickets() {
    const tickets = await Ticket.find();
    return tickets;
  }

  async fetchTicketByTicketId(ticketId) {
    const ticket = await Ticket.findOne({ ticketId });
    return ticket;
  }

  async fetchTicketsByUserId(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const tickets = await Ticket.find({ userId }).skip(skip).limit(limit);
    return tickets;
  }
}

module.exports = TicketDao;
