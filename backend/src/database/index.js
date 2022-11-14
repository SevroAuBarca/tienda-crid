const mongoose = require("mongoose");
const { MONGO_URL } = require("../utils/config");
const conn = () => {
  mongoose.connect(MONGO_URL);
  mongoose.connection.on("error", (err) => {
    console.log("Error de conexion!!: " + err);
  });
  mongoose.connection.on("open", () => {
    console.log("Conexion establecida!!");
  });
};

module.exports = conn;
