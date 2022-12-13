const { sucessRequest } = require("../middlewares");
const cloudinary = require("cloudinary");
const dayjs = require("dayjs");
const Tienda = require("../models/Tienda");

module.exports = {
  getProductos: async (req, res, next) => {
    const productos = await Tienda.find({});
    sucessRequest(res, 200, "get all Products", productos);
  },
  getProducto: async (req, res, next) => {
    const producto = await Tienda.findById(req.params.id);
    sucessRequest(res, 200, `get ${producto.title} Tienda`, producto);
  },
  postProducto: async (req, res, next) => {
    const date = dayjs().format("DD/MM/YYYY h:mm A");

    req.body.dateAdd = date;
    req.body.dateUpdate = date;

    const producto = await Tienda.create(req.body);
    sucessRequest(res, 200, `Created: ${producto.title} Tienda`, producto);
  },
  putProducto: async (req, res, next) => {
    const date = dayjs().format("DD/MM/YYYY h:mm A");

    const producto = await Tienda.findById(req.params.id);

    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion;
    producto.precio = req.body.precio;
    producto.marca = req.body.marca;
    producto.calidad = req.body.calidad;
    producto.dateUpdate = date;
    producto.save();

    sucessRequest(res, 200, "Tienda", producto);
  },
  deleteProducto: async (req, res, next) => {
    await Tienda.findByIdAndDelete(req.params.id);
    sucessRequest(res, 200, "Book Removed");
  },
};
