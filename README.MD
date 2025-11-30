# Bertie's Books

A Node.js web application built using Express.js, EJS and MySQL2.
The application allows users to register, log in, view books, search the catalogue,
and (when logged in) add, edit or delete books. Authorisation is handled using
express-session and password hashing via bcrypt.

-----------------------------------------------------------
Technologies Used
-----------------------------------------------------------

- Node.js          – server environment
- Express.js       – routing and HTTP handling
- EJS              – dynamic views
- MySQL2           – database connection
- bcrypt           – password hashing
- express-session  – login sessions
- PM2              – keeping the app running on the server
- CSS              – styling

-----------------------------------------------------------
Main Routes
-----------------------------------------------------------

PUBLIC ROUTES:
  /                     Home page
  /about                About the shop
  /books/search         Book search form
  /books/search-result  Search results
  /books/bargainbooks   Books priced under £20
  /users/register       Registration form
  /users/login          Login page

PROTECTED ROUTES (requires login):
  /users/list           List all users
  /books/list           View all books
  /books/add            Add a new book (GET/POST)
  /books/edit/:id       Edit an existing book (GET/POST)
  /books/delete/:id     Delete a book

Logging out:
  /logout               Ends the session and redirects to login

-----------------------------------------------------------
How to Install and Run Locally
-----------------------------------------------------------

1. Clone the repository:

   git clone https://github.com/dissept/berties-books.git
   cd berties-books

2. Install dependencies:

   npm install

3. Create a .env file in the project folder and add:

   BB_HOST=localhost
   BB_USER=berties_books_app
   BB_PASSWORD=yourpasswordhere
   BB_DATABASE=berties_books

4. Start the application:

   node index.js

5. Open in your browser:

   http://localhost:8000

-----------------------------------------------------------
Deploying on the University Server (DOC Server)
-----------------------------------------------------------

1. SSH into the DOC server:

   ssh aberj003@doc.gold.ac.uk

2. Navigate to your project directory:

   cd ~/06_berties_338215425

3. Pull latest changes from GitHub (if needed):

   git pull

4. Restart the application using PM2:

   pm2 restart berties_app

5. Check that the app is running:

   pm2 status

PM2 commands:
   pm2 list             Show all running apps
   pm2 restart <name>   Restart an app
   pm2 delete <name>    Stop and remove an app

-----------------------------------------------------------
links.txt (required for deployment)
-----------------------------------------------------------

Create a file called links.txt in the main project directory.
It must contain exactly one line:

   home=http://www.doc.gold.ac.uk/usr/232/

This tells Apache to route requests to your Node application.

-----------------------------------------------------------
Live Application URL
-----------------------------------------------------------

   http://www.doc.gold.ac.uk/usr/232/

-----------------------------------------------------------
Author
-----------------------------------------------------------

Student ID: 33821542
Module: Dynamic Web Applications
Goldsmiths, University of London
