const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const User = require('../user')
const Restaurant = require('../restaurant.js')
const SEED_RESTAURANTS = require('../../restaurant.json')


// define user data with array structure 
const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3],
    restaurantData: []
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6],
    restaurantData: []
  }
]


// Report the result status once connection is attempted
db.once('open', async () => {

  // create two seed users and return their data for later use
  const SEED_USERS_ID = await Promise.all(
    Array.from(Array(2), (_, i) => {
        const { email, password } = SEED_USERS[i]
        const index = email.indexOf('@')
        const name = email.slice(0, index)

        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            return User.create({ 
              name, email, password: hash 
            })
          })
      })
    )
  
  // classify restaurants to specific users based on SEED_USERS[x].restaurantId
  SEED_RESTAURANTS.results.forEach(seedRestaurant => {
    for (let x = 0; x < SEED_USERS.length; x++) {
      if (SEED_USERS[x].restaurantId.includes(seedRestaurant.id)) {

        // only extract required filed for later use
        const {
          name, category, image, location,
          phone, google_map, rating, description
        } = seedRestaurant

        // append userId from previous SEED_USERS_ID
        const data = {
          name, category, image, location,
          phone, google_map, rating, description,
          userId: SEED_USERS_ID[x]._id
        }

        // push back to restaurantData array
        SEED_USERS[x].restaurantData.push(data)
      }
    }
  })

  // create all restaurants with previously designated userId
  await Promise.all(
    Array.from({ length: SEED_USERS.length }, (_, i) => {
      return Restaurant.create(SEED_USERS[i].restaurantData)
    })
  )

  console.log('done!')
  process.exit()
})