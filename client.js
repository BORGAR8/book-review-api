const axios = require("axios");
const BASE_URL = "http://localhost:5000";

// Task 10: Get all books — Async/Await
async function getAllBooks() {
  const res = await axios.get(BASE_URL + "/");
  console.log("All Books:", res.data);
}

// Task 11: Search by ISBN — Promise
function searchByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((res) => console.log("Book by ISBN:", res.data))
    .catch((err) => console.error(err.response.data));
}

// Task 12: Search by Author
async function searchByAuthor(author) {
  const res = await axios.get(`${BASE_URL}/author/${author}`);
  console.log("Books by Author:", res.data);
}

// Task 13: Search by Title
async function searchByTitle(title) {
  const res = await axios.get(`${BASE_URL}/title/${title}`);
  console.log("Books by Title:", res.data);
}

// Run examples
(async () => {
  await getAllBooks();
  await searchByAuthor("John Smith");
  await searchByTitle("Node");
  searchByISBN("9780001");
})();
