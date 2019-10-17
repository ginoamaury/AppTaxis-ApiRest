'use strict'
//Llamamos el controlador
const userController = require('./controllers/user')
const express = require('express')
//Permite parsear el cuerpo del mensaje y tratarlo como JSON
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes/index')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/',api)


module.exports = app