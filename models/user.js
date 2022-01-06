const mongoose = require('mongoose')
const { Schema } = mongoose

const defaultSetup = {
  type: String,
  required: true
}


const userSchema = new Schema({
  name: defaultSetup,
  email: defaultSetup,
  password: defaultSetup,
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('User', userSchema)