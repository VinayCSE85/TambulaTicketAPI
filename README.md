# TambulaTicketAPI
Tambula Ticket Management System: API Development for Interactive Bingo Game

Architecture
The application can be divided into two separate services that handle different tasks.
One is the User Authentication Service that takes care of onboarding new users via the /auth/register endpoint amd 

User Guidelines
- The application uses a jwt(JSON web token) authentication and authorization mechanism for login.
- There are two exposed routes related to authentication
    - User Registration(/auth/register)
    - User Login(/auth/login)