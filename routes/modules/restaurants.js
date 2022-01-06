const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const GOOGLE_MAP_URL = 'https://www.google.com/maps/search/?api=1'


// GET to new page (No action in CRUD)
router.get('/new', (req, res) => res.render('new'))

// POST in new page (Create a specific item in CRUD)
router.post('/new', (req, res, next) => {
  const {
    name, rating, category, location,
    phone, description, image
  } = req.body
  const userId = req.user._id

  const google_map = req.body.google_map ||
    `${GOOGLE_MAP_URL}&query=${name}+${location}`

  return Restaurant.create({
    name, category, image, location, phone, 
    google_map, rating, description, userId
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

// GET to show page (Read a specific item in CRUD)
router.get('/:restaurant_id', (req, res, next) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => next(err))
})

// GET to edit page (Read a specific item in CRUD)
router.get('/:restaurant_id/edit', (req, res, next) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => next(err))
})

// PUT in edit page (Update a specific item in CRUD)
router.put('/:restaurant_id', (req, res, next) => {
  const _id = req.params.restaurant_id
  const {
    name, rating, category, location,
    phone, description, image
  } = req.body
  const userId = req.user._id

  const google_map = req.body.google_map || 
    `${GOOGLE_MAP_URL}&query=${name}+${location}`

  return Restaurant.findOne({ _id, userId })
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
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => next(err))
})

// DELETE in both index and edit page (Deletee a specific item in CRUD)
router.delete('/:restaurant_id', (req, res, next) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
})


module.exports = router