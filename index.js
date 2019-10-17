'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
mongoose.connect(config.db,{useNewUrlParser:true},(err,res)=>{
    if(err)throw err
    console.log('Conexión a la base de datos establecida...')
    app.listen(config.port,()=>{
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })    
})
