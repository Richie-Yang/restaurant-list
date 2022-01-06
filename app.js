// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')


// Initialize Express and designate the port
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')


// Set Handlebars as Express' view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


//////// Routing Section Starts Here ////////
app.use(session({
  secret: 'test123',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)
//////// Routing Section Ends Here ////////


// Start Express server, and do console log
app.listen(PORT, () => {
  console.log(`Express is listening on 127.0.0.1:${PORT}`)
})