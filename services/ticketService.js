const helper = require('../utils/helper');
const TicketDAO = require('../dao/ticketDAO');

const ticketDao = new TicketDAO();

async function createTickets(numberOfTickets) {
    const ticketId = await helper.generateUniqueTicketId();
    var ticketData;
    try{
        ticketData = helper.generateTicketData(numberOfTickets);
    }
    catch(error){
        throw new Error(error);
    }
    const ticketInformation = {ticketId: ticketId, tickets: ticketData};
    // console.log(ticketInformation);
    const tickets = await ticketDao.createTicket(ticketInformation);
    ticketInformation["createdDate"] = tickets.createdAt;
    return ticketInformation;
}

async function fetchTicketsByTicketId(ticketId, page, limit) {
    const tickets = await ticketDao.fetchTicketsByTicketId(ticketId, page, limit);

    return tickets;
  }

module.exports = { createTickets, fetchTicketsByTicketId };
