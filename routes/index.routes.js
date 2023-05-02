const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("login");
});

/* GET signup page */
router.get("/signup", (req, res, next) => {
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

router.get('/userProfile', (req, res) => res.render('users/user-profile'));


module.exports = router;
