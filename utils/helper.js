const User = require('../models/userModel');
const UserDAO = require('../dao/userDAO');
const userDAO = new UserDAO();

// Generate a unique user id
async function generateUniqueUserId(){
    var userId = generateRandomId(10);
    var user = await userDAO.getUserById(userId);
    // Retry until a unique user id is generated
    while(user){
        userId = generateRandomId(10);
        user = await userDAO.getUserById(userId);
    }
    return userId;
}

// Generate a unique ticket id
async function generateUniqueTicketId(){
    var ticketId = generateRandomId(10);
    var user = await userDAO.getUserById(userId);
    // Retry until a unique user id is generated
    while(user){
        userId = generateRandomId(10);
        user = await userDAO.getUserById(userId);
    }
    return userId;
}

// Generates a random ID of given length
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
    return randomId;
  }
  
  // Generates a random Tambula ticket
  function generateTicket() {
    const ticket = [];
    for (let i = 0; i < 3; i++) {
      const column = [];
      for (let j = 0; j < 9; j++) {
        if (i === 0 && j === 0) {
          column.push(0); // Add a blank cell in the first column of the ticket
        } else {
          const randomNumber = Math.floor(Math.random() * 90) + 1;
          column.push(randomNumber);
        }
      }
      ticket.push(column);
    }
    return ticket;
  }
  
  module.exports = {
    generateTicketId,
    generateTicket
  };
  