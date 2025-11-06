const express = require("express");
const router = express.Router();
const books = require("../data/books");

// Task 1: Get all books
router.get("/", (req, res) => res.status(200).json(books));

// Task 2: Get book by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  return books[isbn]
    ? res.status(200).json(books[isbn])
    : res.status(404).json({ message: "Book not found" });
});

// Task 3: Get books by Author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filtered = Object.values(books).filter(
    (b) => b.author.toLowerCase() === author
  );
  return res.status(200).json(filtered);
});

// Task 4: Get books by Title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filtered = Object.values(books).filter(
    (b) => b.title.toLowerCase().includes(title)
  );
  return res.status(200).json(filtered);
});

// Task 5: Get book review
router.get("/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(book.reviews);
});

module.exports = router;
