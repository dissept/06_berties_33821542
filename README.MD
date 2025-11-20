# Bertie's Books

A Node.js web application built using Express.js, EJS and MySQL2.  
The application displays books from a MySQL database, allows users to register, add new books, and search the catalogue.

---

## Technologies Used

- **Node.js** – runs the server environment  
- **Express.js** – handles routing and HTTP requests  
- **EJS** – renders dynamic HTML pages  
- **MySQL2** – connects the app to the MySQL database  
- **CSS** – provides styling

---

## Main Routes

| Route               | Purpose |
|---------------------|---------|
| `/`                 | Home page showing shop name |
| `/about`            | About page for Bertie’s Books |
| `/list`             | Shows all books from the database |
| `/addbook`          | Form to add a new book |
| `/bookadded`        | Confirms a new book has been added |
| `/search`           | Search form for books (GET form) |
| `/search-result`    | Shows search results |
| `/users/register`   | Registration form (POST form) |
| `/users/registered` | Displays confirmation after registration |

---

## How to Install and Run Locally

### 1. Clone the repository
git clone https://github.com/dissept/berties-books.git
cd berties-books

---

### 2. Install dependencies

npm install

---

### 3. Set environment variables

Create a `.env` file in the project root with:

BB_USER=berties_books_app
BB_PASSWORD=BertiesApp@2024
BB_DATABASE=berties_books

---

### 4. Start the application

node index.js

---

### 5. Open in your browser

http://localhost:8000

---

## How to Run on the University Server

ssh aberj003@doc.gold.ac.uk
cd ~/public_html/berties-books
forever start index.js

To view running apps:
forever list

To stop the app:
forever stop <id>

---

## Live Application URL

http://www.doc.gold.ac.uk/usr/232/

---

## Author

Student ID: 33821542  
Dynamic Web Applications – Goldsmiths, University of London
