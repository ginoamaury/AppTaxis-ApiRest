'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
var server = require('http').Server(app)
var socket = require('socket.io')(server)





mongoose.connect(config.db,{useNewUrlParser:true},(err,res)=>{
    if(err)throw err
    console.log('Conexión a la base de datos establecida...')
   var serverApi =  app.listen(config.port,()=>{
        console.log(`API REST corriendo en http://localhost:${config.port}`)
        
    })

    var so = socket.listen(serverApi)
    so.sockets.on('connection', function(socket){
        console.log('Alguien se ha conectado')
        socket.on('messages', function(data){
            console.log(data)
        })
    })
    

})
