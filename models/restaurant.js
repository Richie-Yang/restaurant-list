const mongoose = require('mongoose')
const { Schema } = mongoose

const defaultSetup = {
  type: String,
  required: true
}

const restaurantSchema = new Schema({
    name: defaultSetup,
    rating: Number,
    category: defaultSetup,
    location: defaultSetup,
    phone: defaultSetup,
    description: defaultSetup,
    image: defaultSetup
  },
  { timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})


module.exports = mongoose.model('Restaurant', restaurantSchema)