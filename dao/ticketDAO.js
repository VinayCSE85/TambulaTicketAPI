const Ticket = require('../models/ticket');

class TicketDao {
  async createTicket(ticketData) {
    const tickets = new Ticket(ticketData);
    await tickets.save();
    return tickets;
  }

  async fetchTicketsByTicketId(ticketId, page = 1, limit = 10) {
    console.log("Data Retrieval Parameters: ticketID: "+ticketId+" Page: "+page+" Limit: "+limit);
    const skip = (page - 1) * limit;
    const tickets = await Ticket.find({ ticketId }).skip(skip).limit(limit);
    return tickets;
  }
}

module.exports = TicketDao;
