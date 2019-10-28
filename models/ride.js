'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RideSchema = Schema({
    driver: Object,
    client: Object,
    payment: { type: String , enum: ['cash','card']},
    price: Number,
    pick: String,
    drop: String,
    kilometers: Number,
    status : { type: String , enum: ['open','closed','travel']},
    note : String,
    score: Number,
    date: {type:Date ,default: Date.now}
})

module.exports = mongoose.model('Ride',RideSchema)