const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  googleID: { type: String },
  title: { type: String, required: true },
  authors: [
    { type: String, required: true }
  ],
  synopsis  : String,
  image: String,
  link: String,
  date: { type: Date, default: Date.now },
  notes: [
    {
    type: Schema.Types.ObjectId,
    ref: "Note"
    }
  ]
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
 