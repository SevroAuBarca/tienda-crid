const { model, Schema } = require("mongoose");

const TiendaSchema = new Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  marca: String,
  calidad: Number,
  dateAdd: String,
  dateUpdate: String,
});

module.exports = model("tienda", TiendaSchema);
