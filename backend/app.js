require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const BooksAPI = require("./src/routes/books");
const conn = require("./src/database");

const app = express();

conn();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist/frontend")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
BooksAPI(app);
module.exports = app;
