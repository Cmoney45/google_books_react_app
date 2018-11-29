import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get(`/api/books/${id}`);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete(`/api/books/${id}`);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  // Saves a note to the book
  saveBookNote: function (id, noteData) {
    return axios.put(`/api/books/${id}`, noteData);
  },
  // Deletes the note from the note database and book
  deleteNote: function (id) {
    return axios.delete(`/api/notes/${id}`);
  }
};
