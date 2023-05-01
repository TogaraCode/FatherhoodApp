// routes/auth.routes.js
// ... imports and both signup routes stay untouched

//////////// L O G I N ///////////

// GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// userProfile route and the module export stay unchanged
