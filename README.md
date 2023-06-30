# Tambula Ticket API
## Tambula Ticket Management System: API Development for Interactive Bingo Game

## Introduction
Tambula Ticket API is a ticket management system developed for an interactive Bingo game. It provides endpoints for user authentication, ticket creation, and ticket retrieval.

## Installation
Before running the application, please ensure that you have the following prerequisites installed on your local machine:

Node.js (version X.X.X or higher)
MongoDB (version X.X.X or higher)
Follow these steps to set up and run the application locally:

1. **Start MongoDB Instance**: Launch a MongoDB instance locally. Ensure that the configuration mentioned in the index.js and package.json files is compatible with your MongoDB database.

2. **Clone the Repository**: Clone this repository to your local machine using the following command:
`git clone https://github.com/VinayCSE85/TambulaTicketAPI.git`

3. **Navigate to the Project Directory**: Change to the project directory by running the following command:
`cd TambulaTicketAPI`

4. **Install Dependencies**: Install the required dependencies by running the following command:
`npm install`

5. **Start the Application**: Once all the dependencies are installed, start the Node.js application using the following command:
`npm start`

6. **Access the Endpoints**: The application is now running locally. You can consume the endpoints using Postman or any other HTTP client.

Please note that this local setup is designed to demonstrate the application's functionality. For deployment to a cloud service provider, additional configurations and steps may be required. Make sure to refer to the relevant documentation for your chosen cloud service provider.


## Architecture
The application can be divided into two separate services that handle different tasks:

**User Authentication Service**: Responsible for onboarding new users and login functionality.

- Endpoint: /auth/register
- Endpoint: /auth/login
- Endpoint: /auth/registerAdmin

**Ticket Service**: Handles ticket creation and retrieval.

- Endpoint: /api/tickets/create
- Endpoint: /api/tickets/fetchTickets

**Configuration**

The API configuration is stored in the config.js file, which includes the admin secret key and JWT secret key. It is recommended to change these keys and store them securely.

## API Endpoints
- POST /auth/register

    Registers a new user.

- POST /auth/login

    Authenticates a user and provides a JWT token.

- POST /api/tickets/create

    Creates tickets with a specified number.

- POST /api/tickets/fetchTickets

    Retrieves tickets based on the ticket ID, page number, and limit.