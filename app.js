// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

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
app.use(express.static('public'))

// Get to index page (Read all items in CRUD)
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Get to show page (Read a specific item in CRUD)
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Search operation (Read all items in CRUD with filtered keyword)
app.get('/search', (req, res) => {
  const keyword = new RegExp(`${req.query.keyword.trim()}`, 'i')

  return Restaurant.find({ name: keyword })
    .lean()
    .then(restaurants => res.render(
      'index', { restaurants, keyword: req.query.keyword.trim() }
    ))
    .catch(error => console.log(error))
})

// Get to edit page (Read a specific item in CRUD)
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//////// Routing Section Ends Here ////////


// Start Express server
app.listen(port, () => {
  console.log(`Express is listening on 127.0.0.1:${port}`)
})