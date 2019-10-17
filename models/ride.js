'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RideSchema = Schema({
    idDriver: String,
    idClient: String,
    payment: { type: String , enum: ['cash','card']},
    price: Number,
    pick: String,
    drop: String,
    kilometers: Number,
    note : String,
    score: Number,
    date: {type:Date ,default: Date.now}
})

module.exports = mongoose.model('Ride',RideSchema)