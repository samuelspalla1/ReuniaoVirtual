const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const roomSchema = new mongoose.Schema({
  jd: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'O nome da sala é obrigatório']
  },
  description: {
    type: String,
    default: ''
  },
  capacity: {
    type: Number,
    required: [true, 'A capacidade é obrigatória']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Room', roomSchema)
