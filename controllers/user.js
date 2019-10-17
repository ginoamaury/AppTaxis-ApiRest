'use strict'

//Importamos el modelo
const User = require('../models/user')

// Función que obtiene un usuario por su id
function getUser(req,res){
      //Variable tipo Cliente
      let clientId = req.params.documentId
      User.findById(clientId,(err,client)=>{
          // si hay un error en la petición
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
          // si no encuenta el cliente por su id
          if(!client) return res.status(404).send({message: `El usuario no existe`})
          // si encuenta el cliente muestra la informacion del cliente
          res.status(200).send({client})
      })
}

// Función que obtiene todos los usuarios registrados
function getUsers(req,res){
    User.find({},(err,clients)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!clients) return res.status(404).send({message: `No existen usuarios`})

         //Para enviar una respuesta OK cod 200
         res.status(200).send({clients})
    })
   
}

// Función que registra un nuevo usuario
function newUser(req,res){
    console.log('POST /client')
    console.log(req.body)

    let user = new User()
    user.idCard = req.body.idCard
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.birthDay = req.body.birthDay
    user.gender = req.body.gender
    user.number = req.body.number
    user.address = req.body.address
    user.picture = req.body.picture

    user.save((err,userStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`})
        res.status(200).send({user: userStored})
    })

}

// Función que actualiza un usuario
function updateUser(req,res){
    let clientId = req.params.documentId
    let update = req.body

    User.findByIdAndUpdate(clientId, update, (err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`})
        res.status(200).send({client: clientUpdate})         
    })

}


// Función que borra un usuario
function deleteUser(req,res){
    let clientId = req.params.documentId
    User.findById(clientId , (err,client) =>{
        if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

        client.remove(err=>{
            if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
            res.status(200).send({message: 'El usuario ha sido eliminado correctamente'})
        })
    })
}

// Función que obtiene todos los productos favoritos de un usuario
function getFavoriteProducts(req,res){
    let clientId = req.params.documentId
    User.findById(clientId,(err,client)=>{
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
          if(!client) return res.status(404).send({message: `El usuario no existe`})
          res.status(200).send({products : client.favProducts})
    })
}

// Función que agrega un producto favorito al usuario
function addFavoriteProduct(req,res){
    let clientId = req.params.documentId
    let productId = req.body.productId
    User.findByIdAndUpdate(clientId,{$push: {favProducts: productId}},(err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`})
        res.status(200).send({client: clientUpdate}) 
    })
}

module.exports ={
    getUser,
    getUsers,
    updateUser,
    newUser,
    deleteUser,
    getFavoriteProducts,
    addFavoriteProduct
}