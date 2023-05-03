const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model')
const Message = require('../models/message');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*Mesggae routes*/

router.get('/assembly', async (req, res)  => {
try {
  const allMessages = await Message.find().populate('author')
  res.render('assembly',{allMessages});
}
catch (error) {
  console.log(error)
}
});

router.post('/assembly', async (req, res) => {
  try {
    const message = await Message.create({
      author: req.session.currentUser.username,
      content: req.body.message  });
      /* await message.save();*/
  res.redirect('/assembly');
  } catch (error) {
    console.log(error)
  }
});


/* GET assembly page */
router.get('/assembly', isLoggedIn, (req, res) => {
  const { currentUser } = req.session;
  if (!currentUser) {
    return res.render('messages', { errorMessage: 'Still no logged in user, sorry!' });
  }
  res.render('messages', { username: currentUser });
});


/* GET profile page */
router.get('/:username', async (req, res) => {
  console.log(req.session)
  try{
    const user = await User.findOne({username:req.params.username})
    res.render('users/user-profile',{user});
  }
  catch(error) {
    console.log(error)
  }
  })


module.exports = router;
