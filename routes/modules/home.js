const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// GET to index page (Read all items in CRUD)
router.get('/', (req, res) => {
  const userId = req.user._id

  return Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Search operation (Read all items in CRUD with filtered keyword)
router.get('/search', (req, res) => {
  // extract data from request message body
  const sort = req.query.sort
  const userInputKeyword = req.query.keyword.trim()

  // extract user ID from HTTP request
  const userId = req.user._id

  // filter out all symbols from user-input (for webSec purpose)
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/\\'
  const processedKeyword = [...userInputKeyword].filter(
    arrayItem => !symbols.includes(arrayItem)
  ).join('')

  // create regular expression object for DB query use
  const regexKeyword = new RegExp(`${processedKeyword}`, 'i')
  // create sortCondition object for DB sort use
  const sortCondition = {}
  // create sortOptions array for template rendering use
  const sortOptions = [
    { name: 'A -> Z', value: 'asc'},
    { name: 'Z -> A', value: 'desc'},
    { name: '類別', value: 'category'},
    { name: '地區', value: 'location'},
  ]

  // process for sort option display
  sortOptions.forEach((item, index) => {
    sortOptions[index]['isSelected'] = sort === item.value
  })

  // process for MongoDB sort input
  switch (true) {
    case sort === 'asc' || sort === 'desc':
      sortCondition['name'] = sort
      break
    case sort === 'category' || sort === 'location':
      sortCondition[sort] = 'asc'
      break
    default:
      sortCondition['_id'] = 'asc'
  }

  // Restaurant.find({ name: keyword }) <== find with filtered condition
  // Restaurant.find({$or:[{ name: keyword }, { category: keyword }]) <== find with filtered OR-condition
  return Restaurant.find({ 
      $or: [{ name: regexKeyword }, { category: regexKeyword }],
      $and: [{ userId }]
    })
    .lean()
    .sort(sortCondition)
    .then(restaurants => res.render(
      'index', { restaurants, keyword: userInputKeyword, sortOptions }
    ))
    .catch(error => console.log(error))
})


module.exports = router