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
    google_map: String,
    phone: defaultSetup,
    description: defaultSetup,
    image: defaultSetup,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    }
  },
  { timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})


module.exports = mongoose.model('Restaurant', restaurantSchema)