const express = require('express');
const router = express.Router();
const User = require('../models/User.model')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




/* GET assembly page */
router.get("/assembly", (req, res, next) => {
  res.render("assembly");
});

/* GET profile page */
router.get('/:username', async (req, res) => {
  try{
    const user = await User.findOne({username:req.params.username})
    res.render('users/user-profile',{user});
  }
  catch(error) {
    console.log(error)
  }
  })


module.exports = router;
