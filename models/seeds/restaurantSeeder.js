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
  try {
    ////////////////// Remove Exist Seed Data In DB //////////////////
    console.log('\nstart removing exist seed data in database')

    // find exist both seed-users and seed-restaurants, then remove all
    // create email array for conditional search
    const emailArray = SEED_USERS.map(item => ({ email: item.email }))
    const users = await User.find({ $or: emailArray })

    // if seed-user found, then proceed to find any associated restaurants
    if (users.length) {
      // create userId array for conditional search
      const userIdArray = users.map(item => ({ userId: item._id }))
      const restaurants = await Restaurant.find({ $or: userIdArray })

      await Promise.all([
        ...users.map(user => user.remove()),
        ...restaurants.map(restaurant => restaurant.remove())
      ])
    }

    console.log('finish removing exist seed data in database')
    ////////////////// Remove Exist Seed Data In DB //////////////////



    ////////////////// Generate New Seed Data In DB //////////////////
    console.log('start generating new seed data in database')

    // create two seed users and return their data for later use
    const SEED_USERS_ARRAY = await Promise.all(
      Array.from(Array(SEED_USERS.length), (_, i) => {
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
          // append userId field to seedRestaurant
          seedRestaurant.userId = SEED_USERS_ARRAY[x]._id

          // push back to restaurantData array
          SEED_USERS[x].restaurantData.push(seedRestaurant)
        }
      }
    })

    // create all restaurants with previously designated userId
    await Promise.all(
      Array.from({ length: SEED_USERS.length }, (_, i) => {
        return Restaurant.create(SEED_USERS[i].restaurantData)
      })
    )

    console.log('finish generating new seed data in database\n')
    ////////////////// Generate New Seed Data In DB //////////////////



    console.log('done!')  
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})