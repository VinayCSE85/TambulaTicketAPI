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
    const ticketObject = await Ticket.findOne({ ticketId });
    const tickets = ticketObject ? ticketObject.tickets : [];
    var paginatedTickets = {};
    for(let i=skip+1; i <= skip+limit; i++){
        var key = "ticket"+i;
        paginatedTickets[key] = tickets[key];
    }
    return {ticketId: ticketId, tickets:paginatedTickets};//Ideally this should be vetted against a data formatter
  }
}

module.exports = TicketDao;
