const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// GET to index page (Read all items in CRUD)
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Search operation (Read all items in CRUD with filtered keyword)
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const sort = req.query.sort
  const regexKeyword = new RegExp(`${keyword}`, 'i')
  const sortCondition = {}
  const sortOptions = [
    { name: 'A -> Z', value: 'asc', isSelected: false },
    { name: 'Z -> A', value: 'desc', isSelected: false },
    { name: '類別', value: 'category', isSelected: false },
    { name: '地區', value: 'location', isSelected: false },
  ]

  // process for sort option display
  sortOptions.forEach((item, index) => {
    if (sort === item.value) {
      sortOptions[index].isSelected = true
    }
  })

  // process for MongoDB sort input
  switch (true) {
    case sort === 'asc' || sort === 'desc':
      sortCondition['name'] = sort
      break
    case sort === 'category' || sort === 'location':
      sortCondition[sort] = 'asc'
  }

  // Restaurant.find({ name: keyword }) <== find with filtered condition
  // Restaurant.find({$or:[{ name: keyword }, { category: keyword }]) <== find with filtered OR-condition
  return Restaurant.find({ $or: [{ name: regexKeyword }, { category: regexKeyword }] })
    .lean()
    .sort(sortCondition)
    .then(restaurants => res.render(
      'index', { restaurants, keyword, sortOptions }
    ))
    .catch(error => console.log(error))
})


module.exports = router