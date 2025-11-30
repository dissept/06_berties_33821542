USE berties_books;

CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    price  DECIMAL(5, 2),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
