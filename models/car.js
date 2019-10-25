'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema



const CarSchema = Schema({
  licensePlate : String,
  brand: String,
  model: String,
  year: Number,
  color: String,
})



module.exports = mongoose.model('Car', CarSchema)
