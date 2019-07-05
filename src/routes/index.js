//const router = require("express").Router(); 1forma
const express = require("express"); //2daforma
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});
//  res.send("about");

module.exports = router;
