'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema



const IdSchema = Schema({
  cardNumber : String,
  expirationDate: String
})



module.exports = mongoose.model('identify', IdSchema)
