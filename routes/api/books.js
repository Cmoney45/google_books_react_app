const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  // This route is only to add notes to the page.
  .put(booksController.addNote)
  .delete(booksController.remove);

module.exports = router;
