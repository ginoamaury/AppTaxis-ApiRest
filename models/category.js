'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const CategorySchema = Schema({
    name: {type:String, unique: true},
})

module.exports = mongoose.model('Category', CategorySchema)