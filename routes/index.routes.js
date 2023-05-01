const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET login page */
router.get("/login.ejs", (req, res, next) => {
  res.render("login");
});

/* GET signup page */
router.get("/signup.ejs", (req, res, next) => {
  res.render("signup");
});


/* GET assembly page */
router.get("/assembly", (req, res, next) => {
  res.render("assembly");
});

/* GET profile page */
router.get("/profile", (req, res, next) => {
  res.render("profile");
});
module.exports = router;
