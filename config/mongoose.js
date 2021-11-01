const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant-list'


// Initialize Mongoose ODM connection to MongoDB
mongoose.connect(MONGODB_URI)
const db = mongoose.connection


// Report the result status once connection is attempted
db.on('error', () => console.error('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))


module.exports = db