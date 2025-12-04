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
Lab 9: Calling APIs & Providing APIs
-----------------------------------------------------------

Part A – Consuming External APIs (OpenWeatherMap)
--------------------------------------------------

A new /weather feature was added to the application:

Routes:
- GET /weather – displays a form where users can enter any city name;  
  the application calls the OpenWeatherMap API and displays the result in a
  human-friendly format (temperature, humidity, conditions, wind, etc).
- GET /weather/now – a simpler route returning today's London weather as a formatted string.

Implementation:
- API calls are made using the request package.
- The API key is stored securely in .env (OWM_API_KEY).
- Weather results are displayed using an EJS view (weather.ejs).
- Error handling was added so invalid cities do not crash the application.

This completes Lab 9 Part A: Consuming APIs.

Part B – Providing Our Own API
------------------------------

An API was created for external developers to access the bookshop data.

Routes:
- GET /api/books  
  Returns a JSON array of all books in the database.

Example response:

[
  { "id": 1, "name": "The Hobbit", "price": 9.99 },
  { "id": 2, "name": "1984", "price": 8.50 }
]

This route mirrors /books/list but returns JSON instead of HTML, making it machine-readable.

Part C – API Extensions
-----------------------

The /api/books endpoint supports several optional query parameters:

1. Search for a keyword

   /api/books?search=world

   Returns all books whose names contain "world".

2. Filter by price range

   /api/books?minprice=5&max_price=10

3. Sort results

   /api/books?sort=name
   /api/books?sort=price

Only specific columns are allowed for sorting (name or price) to prevent SQL injection.

Part D – Optional Extensions (Ungraded)
---------------------------------------

The API structure could be extended in future to include:

- Rate limiting  
- Pagination  
- Authentication and API keys  
- Versioning (for example, /api/v1/books vs /api/v2/books)

-----------------------------------------------------------
Author
-----------------------------------------------------------

Student ID: 33821542  
Module: Dynamic Web Applications  
Goldsmiths, University of London.
