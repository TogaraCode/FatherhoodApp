
// routes/auth.routes.js
// ... imports and both signup routes stay untouched
const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express')
//////////// L O G I N ///////////
router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
     console.log("The form data: ", req.body);
   
    const { username, email, password } = req.body;
   
    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          // username: username
          username,
          email,
          // passwordHash => this is the key from the User model
          //     ^
          //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
          password: hashedPassword
        });
      })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
        res.redirect('/auth/login');
      })
      .catch(error => next(error));
  });
  

 
// GET route ==> to display the login form to users
router.get('/login',isLoggedOut, (req, res) => res.render('auth/login'));

// userProfile route and the module export stay unchanged
router.post('/login', (req, res, next) => {
    console.log('SESSION =====> ', req.session);
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
  

    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcrypt.compareSync(password, user.password)) {
            req.session.user = user.username
          res.redirect(`/${user.username}`);
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));

  });
  router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

  module.exports = router;