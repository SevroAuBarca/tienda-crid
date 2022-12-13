const router = require("express").Router();
const multer = require("multer");

const upload = multer();
const {
  getProductos,
  getProducto,
  postProducto,
  putProducto,
  deleteProducto,
} = require("../controllers/tienda");
const { asyncErrorsHandler } = require("../middlewares/");

const TiendaAPI = (app) => {
  router
    .get("/", asyncErrorsHandler(getProductos))
    .get("/:id", asyncErrorsHandler(getProducto))
    .post("/", upload.none(), asyncErrorsHandler(postProducto))
    .put("/:id", upload.none(), asyncErrorsHandler(putProducto))
    .delete("/:id", asyncErrorsHandler(deleteProducto));

  app.use("/api/v1/tienda", router);
};

module.exports = TiendaAPI;
