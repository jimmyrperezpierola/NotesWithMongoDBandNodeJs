const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://localhost/notes-db-app", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(db => console.log("DB is Connected"))
  .catch(err => console.error(err));
