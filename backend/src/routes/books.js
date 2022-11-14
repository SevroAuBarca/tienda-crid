/* 
  book routes:
  get books -> get all books
  get book -> get one book
  post book -> post a book
  put book -> update the book
  delete book -> delete the book
*/

const router = require("express").Router();
const multer = require("multer");

const upload = multer({ dest: "upload/" });
var type = upload.single("recfile");

const {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
} = require("../controllers/books");
const { asyncErrorsHandler } = require("../middlewares/");

const BooksAPI = (app) => {
  router
    .get("/", asyncErrorsHandler(getBooks))
    .get("/:id", asyncErrorsHandler(getBook))
    .post("/", upload.single("coverImage"), asyncErrorsHandler(postBook))
    .put("/:id", upload.single("coverImage"), asyncErrorsHandler(putBook))
    .delete("/:id", asyncErrorsHandler(deleteBook));

  app.use("/api/v1/books", router);
};

module.exports = BooksAPI;
