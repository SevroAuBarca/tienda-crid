const { sucessRequest } = require("../middlewares");
const Book = require("../models/books");
const cloudinary = require("cloudinary");
const dayjs = require("dayjs");

cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  getBooks: async (req, res, next) => {
    const books = await Book.find({});
    sucessRequest(res, 200, "get all Books", books);
  },
  getBook: async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    sucessRequest(res, 200, `get ${book.title} Book`, book);
  },
  postBook: async (req, res, next) => {
    const date = dayjs().format("DD/MM/YYYY h:mm A");
    if (req.file) {
      const { secure_url: url, public_id } =
        await cloudinary.v2.uploader.upload(req.file.path);
      req.body.coverImage = { url, public_id };
    }
    req.body.dateAdd = date;
    req.body.dateUpdate = date;

    const book = await Book.create(req.body);
    sucessRequest(res, 200, `Created: ${book.title} Book`, book);
  },
  putBook: async (req, res, next) => {
    const date = dayjs().format("DD/MM/YYYY h:mm A");

    const book = await Book.findById(req.params.id);
    if (req.file && req.body.checkbox === "true") {
      await cloudinary.v2.uploader.destroy(book.coverImage.public_id);
      const { secure_url: url, public_id } =
        await cloudinary.v2.uploader.upload(req.file.path);
      book.coverImage = { url, public_id };
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.editorial = req.body.editorial;
    book.pages = req.body.pages;
    book.sinopsis = req.body.sinopsis;
    book.rating = req.body.rating;
    book.dateUpdate = date;
    book.save();

    sucessRequest(res, 200, "Book", book);
  },
  deleteBook: async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (book.coverImage.length >= 0)
      await cloudinary.v2.uploader.destroy(book.coverImage.public_id);
    await Book.findByIdAndDelete(req.params.id);
    sucessRequest(res, 200, "Book Removed");
  },
};
