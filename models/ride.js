'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RideSchema = Schema({
    driver: Object,
    idDriver: String,
    client: Object,
    idClient: String,
    socketClient: String,
    socketDriver: String,
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


RideSchema.methods.getDistance = function(lat1,lon1,lat2,lon2)
{
var rad = function(x) {return x*Math.PI/180;}
var R = 6378.137; //Radio de la tierra en km
var dLat = rad( lat2 - lat1 );
var dLong = rad( lon2 - lon1 );
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
return d.toFixed(0); //Retorna tres decimales
}

module.exports = mongoose.model('Ride',RideSchema)