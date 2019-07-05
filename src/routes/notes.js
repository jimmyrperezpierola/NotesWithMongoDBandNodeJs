const express = require("express");
const router = express.Router();

//Models
const Note = require("../models/Note");
const { isAuthenticated } = require('../helpers/auth');

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});

// New Note
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  //console.log(req.body);
  const { title, description } = req.body;
  //Express validator
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title" });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save(); //se podria agregar then para asyncrono, pero ya se hace esto en post
    req.flash('success_msg', 'Note added successfully');
    //res.send("ok");
    res.redirect("/notes");
  }
});

// Get All Notes
router.get("/notes", isAuthenticated, async (req, res) => {
  //res.send("notes from database");
  //Node.find({Title: 'Ro'})
  const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" }); //without parametros
  res.render("notes/all-notes", { notes });
});

// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-note", { note });
});


router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note updated successfully');
  res.redirect("/notes");
});

// Delete Notes
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully');
  res.redirect('/notes');
});

module.exports = router;
