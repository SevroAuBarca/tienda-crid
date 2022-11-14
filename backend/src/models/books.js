/* 
  book model has

  title 
  author
  editorial
  pages
  dateRelease
  dateAdd
  rating
  coverImage

*/
const { model, Schema } = require("mongoose");

const BookSchema = new Schema({
  title: String,
  author: String,
  editorial: String,
  pages: Number,
  sinopsis: String,
  rating: Number,
  dateAdd: String,
  dateUpdate: String,
  coverImage: { url: String, public_id: String },
});

module.exports = model("Book", BookSchema);
