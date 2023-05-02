
// routes/auth.routes.js
// ... imports and both signup routes stay untouched

//////////// L O G I N ///////////

// GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

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
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          res.render('users/user-profile', { user });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });