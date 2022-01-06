// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
const routes = require('./routes')
const { serverError } = require('./middleware/errorHandler')


// Initialize Express and designate the port
const app = express()
const PORT = process.env.PORT
require('./config/mongoose')


// Set Handlebars as Express' view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


//////// Routing Section Starts Here ////////
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)
// handling all 500 errors scenario
app.use((err, req, res, next) => {
  console.log(err.stack)
  return serverError(res)
})
//////// Routing Section Ends Here ////////


// Start Express server, and do console log
app.listen(PORT, () => {
  console.log(`Express is listening on 127.0.0.1:${PORT}`)
})