const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("../data/books");
const router = express.Router();
const SECRET = "jwtsecretkey";

// Middleware to verify token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Task 8: Add/Modify review
router.post("/:isbn", authenticate, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  books[isbn].reviews[username] = review;
  res.status(200).json({ message: "Review added/modified", book: books[isbn] });
});

// Task 9: Delete review by that user
router.delete("/:isbn", authenticate, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  if (!books[isbn].reviews[username])
    return res.status(404).json({ message: "No review found for this user" });

  delete books[isbn].reviews[username];
  res.status(200).json({ message: "Review deleted", book: books[isbn] });
});

module.exports = router;
