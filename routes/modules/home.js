const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// GET to index page (Read all items in CRUD)
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Search operation (Read all items in CRUD with filtered keyword)
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const regexKeyword = new RegExp(`${keyword}`, 'i')

  // Restaurant.find({ name: keyword }) <== find with filtered condition
  // Restaurant.find({$or:[{ name: keyword }, { category: keyword }]) <== find with filtered OR-condition
  return Restaurant.find({ $or: [{ name: regexKeyword }, { category: regexKeyword }] })
    .lean()
    .then(restaurants => res.render(
      'index', { restaurants, keyword }
    ))
    .catch(error => console.log(error))
})


module.exports = router