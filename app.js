// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// GET to index page (Read all items in CRUD)
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
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

// GET to new page (No action in CRUD)
app.get('/restaurant/new', (req, res) => res.render('new'))

// POST in new page (Create a specific item in CRUD)
app.post('/restaurant/new', (req, res) => {
  const {
    name, rating, category, location,
    google_map, phone, description, image
  } = req.body

  return Restaurant.create({
    name, category, image, location,
    phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// GET to show page (Read a specific item in CRUD)
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// GET to edit page (Read a specific item in CRUD)
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// POST in edit page (Update a specific item in CRUD)
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const { 
    name, rating, category, location, 
    google_map, phone, description, image 
  } = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.rating = Number(rating)
      restaurant.category = category
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// DELETE in both index and edit page (Deletee a specific item in CRUD)
app.delete('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.sendStatus(200))
    .catch(error => console.log(error))
})
//////// Routing Section Ends Here ////////


// Start Express server
app.listen(port, () => {
  console.log(`Express is listening on 127.0.0.1:${port}`)
})