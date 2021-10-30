// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
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
  const keyword = req.query.keyword.trim()
  const regexKeyword = new RegExp(`${keyword}`, 'i')

  // Restaurant.find({ name: keyword }) <== find with filtered condition
  // Restaurant.find({$or:[{ name: keyword }, { category: keyword }]) <== find with filtered OR-condition
  return Restaurant.find({ $or: [{ name: regexKeyword }, { category: regexKeyword }]})
    .lean()
    .then(restaurants => res.render(
      'index', { restaurants, keyword }
    ))
    .catch(error => console.log(error))
})

// GET to new page (No action in CRUD)
app.get('/restaurants/new', (req, res) => res.render('new'))

// POST in new page (Create a specific item in CRUD)
app.post('/restaurants/new', (req, res) => {
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

// PUT in edit page (Update a specific item in CRUD)
app.put('/restaurants/:restaurant_id', (req, res) => {
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


// Start Express server, and do console log
app.listen(port, () => {
  console.log(`Express is listening on 127.0.0.1:${port}`)
})