// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()


// ℹ️ Connects to the database
require('./db')
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config/session.config')(app);

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'Fatherhood'

app.locals.appTitle = `${capitalize(projectName)} created by Togara`

// 👇 Start handling routes here

const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
