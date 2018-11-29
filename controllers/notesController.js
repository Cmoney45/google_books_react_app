const db = require("../models");

// Defining methods for the booksController
module.exports = {
  remove: function (req, res) {
    const noteid = req.params.id;

    db.Note
      .findById({ _id: noteid })
      .then(dbnote => {

        db.Book
          .findByIdAndUpdate(
            dbnote.book,
            { $pull: { note: noteid } },
            { new: true }
          )
          .then(dbBookWithRemovedNote => {
            
            db.Note
              .findByIdAndRemove(noteid, (error, removedNote) => {
                if (error) {
                  console.log(error);
                  res.status(500).send(error);
                } else {
                  console.log(`The following has been removed: ${removedNote}`);
                  res.status(200).send(removedNote);
                };
              });
          });
      })
      .catch(err => res.status(422).json(err));
  }
};
