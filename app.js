// Includes necessary packages
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Initialize Express and designate the port
const app = express()
const port = 3000

// Set Handlebars as Express' view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


//////// Routing Section Starts Here ////////
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const restaurant = restaurantList.results.find(restaurantItem => restaurantItem.id.toString() === id)

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurantItem => restaurantItem.name.toLowerCase().includes(keyword))
  res.render('index', { restaurants, keyword: req.query.keyword.trim() })
})
//////// Routing Section Ends Here ////////


// Start Express server
app.listen(port, () => {
  console.log(`Express is listening on 127.0.0.1:${port}`)
})