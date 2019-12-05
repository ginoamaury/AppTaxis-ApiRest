'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ConfigSchema = Schema({
  distance : Number,
  frecuency: Number,
})



module.exports = mongoose.model('Config', ConfigSchema)
