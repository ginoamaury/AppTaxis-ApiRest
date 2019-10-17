'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderScheema = new Schema ({
    client: String,
    deliver: String,
    date: {type:Date ,default: Date.now},
    products: [],
    shippingAddrees: String,
    currentLocation: String,
    price: Number,
    status: {type:String,enum: ['inCart','toBeApproved','approved','onWay','delivered','return']},
    shippingWay: {type:String,enum: ['paymentGateway','againsDelivery']}
})

module.exports = mongoose.model('Order',OrderScheema)