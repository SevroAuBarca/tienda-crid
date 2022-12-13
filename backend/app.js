require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./src/routes/index");
const conn = require("./src/database");
const TiendaAPI = require("./src/routes/tienda");

const app = express();

conn();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

TiendaAPI(app);

module.exports = app;
