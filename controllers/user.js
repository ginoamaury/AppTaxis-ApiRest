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
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`,state : '01'})
        res.status(200).send({state:'00',user: userStored})
    })

}

// Función que actualiza un usuario
function updateUser(req,res){
    let clientId = req.params.documentId
    let update = req.body

    User.findByIdAndUpdate(clientId, update, (err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        res.status(200).send({client: clientUpdate,state : '00'})         
    })

}

// Función que actualiza un usuario
function updatePictureUser(req,res){
    let clientId = req.params.documentId
    let picture = req.file.path
    console.log(`Storage location is ${req.hostname}/${req.file.path}`)

    User.findByIdAndUpdate(clientId, {'picture':picture}, (err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        res.status(200).send({client: clientUpdate,file: req.file,state : '00'})         
    })

}


// Función que borra un usuario
function deleteUser(req,res){
    let clientId = req.params.documentId
    User.findById(clientId , (err,client) =>{
        if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`,state : '01'})

        client.remove(err=>{
            if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`,state : '01'})
            res.status(200).send({message: 'El usuario ha sido eliminado correctamente',state : '00'})
        })
    })
}

// Función que obtiene todos los productos favoritos de un usuario
function getFavoriteProducts(req,res){
    let clientId = req.params.documentId
    User.findById(clientId,(err,client)=>{
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
          if(!client) return res.status(404).send({message: `El usuario no existe`,state : '01'})
          res.status(200).send({products : client.favProducts,state : '00'})
    })
}

// Función que agrega un producto favorito al usuario
function addFavoriteProduct(req,res){
    let clientId = req.params.documentId
    let productId = req.body.productId
    User.findByIdAndUpdate(clientId,{$push: {favProducts: productId}},(err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        res.status(200).send({client: clientUpdate,state : '00'}) 
    })
}

module.exports ={
    getUser,
    getUsers,
    updateUser,
    updatePictureUser,
    newUser,
    deleteUser,
    getFavoriteProducts,
    addFavoriteProduct
}