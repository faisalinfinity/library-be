const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  postBooks,
  deleteBooks,
  updateBooks,
} = require("../controller/bookController");
const {
  authorizationMiddleware,
} = require("../middlewares/authorizationMiddleware");
const bookRoute = express.Router();

bookRoute.get("/books", getAllBooks);
bookRoute.get("/books/:id", getSingleBook);
bookRoute.post("/books", authorizationMiddleware, postBooks);
bookRoute.delete("/books/:id", authorizationMiddleware, deleteBooks);
bookRoute.patch("/books/:id", authorizationMiddleware, updateBooks);
bookRoute.put("/books/:id", authorizationMiddleware, updateBooks);

module.exports = {
  bookRoute,
};
