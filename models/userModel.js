// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Coloque o Nome']
  },
  email: {
    type: String,
    required: [true, 'Coloque o email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)+@\w+([.-]?\w+)(.\w{2,3})+$/,
      'Coloque um email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Coloque a senha'],
    minlength: 6
  }
})

module.exports = mongoose.model('User', userSchema)
