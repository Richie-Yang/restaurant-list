const db = require('../../config/mongoose')
const Restaurant = require('../restaurant.js')
const dummyData = require('../../restaurant.json')


// Report the result status once connection is attempted
db.once('open', () => {
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