// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const routes = require('./routes')

// Initialize Express and designate the port
const app = express()
const port = 3000


// Initialize Mongoose ODM connection to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

// Report the result status once connection is attempted
db.on('error', () => console.error('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))


// Set Handlebars as Express' view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


//////// Routing Section Starts Here ////////
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)
//////// Routing Section Ends Here ////////


// Start Express server, and do console log
app.listen(port, () => {
  console.log(`Express is listening on 127.0.0.1:${port}`)
})