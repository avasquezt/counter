const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;

const CounterSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    default: 1
  },
  data: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Counter', CounterSchema, 'data')