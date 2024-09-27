const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 2));
});


// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  // Check if the book exists in the books database
  const book = books[isbn];

  if (book) {
    // If the book is found, return the book details
    res.json(book);
  } else {
    // If the book is not found, return a 404 error with a message
    res.status(404).json({ error: `Book with ISBN ${isbn} not found` });
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author;

    // Get all the keys (ISBNs) of the books object
    const bookKeys = Object.keys(books);

    // Initialize an array to store books by the given author
    const booksByAuthor = [];

    // Iterate over the books object to find matching authors
    bookKeys.forEach(isbn => {
        if (books[isbn].author.toLowerCase() === authorName.toLowerCase()) {
            // If the author matches, add the book to the array
            booksByAuthor.push(books[isbn]);
        }
    });

    if (booksByAuthor.length > 0) {
        // If books by the author are found, return them
        res.json(booksByAuthor);
    } else {
        // If no books by the author are found, return a 404 error
        res.status(404).json({ error: `No books found by author ${authorName}` });
    }
});





// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const bookTitle = req.params.title.toLowerCase();

  
  const bookKeys = Object.keys(books);

  // Initialize an array to store books that match the given title
  const booksByTitle = [];

 
  bookKeys.forEach((isbn) => {
    if (books[isbn].title.toLowerCase() === bookTitle) {
      
      booksByTitle.push(books[isbn]);
    }
  });

  if (booksByTitle.length > 0) {
    // If books with the title are found, return them
    res.json(booksByTitle);
  } else {
    // If no books with the title are found, return a 404 error
    res
      .status(404)
      .json({ error: `No books found with title "${req.params.title}"` });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  // Check if the book exists in the books database
  const book = books[isbn];

  if (book && book.reviews) {
    // If the book and its reviews exist, return the reviews
    res.json(book.reviews);
  } else {
    // If the book or reviews are not found, return a 404 error with a message
    res
      .status(404)
      .json({ error: `No reviews found for book with ISBN ${isbn}` });
  }
});

module.exports.general = public_users;
