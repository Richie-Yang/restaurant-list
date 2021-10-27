const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const dummyData = require('../../restaurant.json')


// Initialize Mongoose ODM connection to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

// Report the result status once connection is attempted
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  console.log('mongodb connected!')

  // Import dummy data if connection is successful
  dummyData.results.forEach(data => {
    const { 
      name, category, image, location, 
      phone, google_map, rating, description 
    } = data

    Restaurant.create({
      name, category, image, location,
      phone, google_map, rating, description
    })
  })

  console.log('done!')
})