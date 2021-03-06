'use strict'

//Importamos el modelo
const User = require('../models/user')
const Car = require('../models/car')
const Identify = require('../models/identify')

// Función que obtiene un usuario por su id
function getUser(req,res){
      //Variable tipo Cliente
      let clientId = req.params.documentId
      User.findById(clientId,(err,client)=>{
          // si hay un error en la petición
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
          // si no encuenta el cliente por su id
          if(!client) return res.status(404).send({message: `El usuario no existe`,state : '01'})
          // si encuenta el cliente muestra la informacion del cliente
          res.status(200).send({client,state : '00'})
      })
}

// Funcion que obtiene las coordenadas de un usuario en especifico
function getCordsUser (req, res){
    let userId = req.params.documentId
    User.findById(userId,(err,user)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!user) return res.status(404).send({message: `No existen usuarios`,state : '01'})
        res.status(200).send({user,state:'00'})
    }).select('_id + coords')
}

// Función que obtiene todos los usuarios registrados
function getUsers(req,res){
    User.find({},(err,clients)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`,state : '01'})
        if(!clients) return res.status(404).send({message: `No existen usuarios`,state : '01'})

         //Para enviar una respuesta OK cod 200
         res.status(200).send({clients,state : '00'})
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
    console.log('DATA USER',update)
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
function getCars(req,res){
    let clientId = req.params.documentId
    User.findById(clientId,(err,client)=>{
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
          if(!client) return res.status(404).send({message: `El usuario no existe`,state : '01'})
          res.status(200).send({cars : client.cars,state : '00'})
    })
}

// Función que agrega un carro al usuario
function addCar(req,res){
    let clientId = req.params.documentId
    console.log(req.body)
    let car = new Car()
    let licensePlate =  req.body.licensePlate
    let brand =  req.body.brand
    let model =  req.body.model
    let year =  req.body.year
    let color =  req.body.color

    User.findByIdAndUpdate(clientId,{$push: {cars: {licensePlate:licensePlate,brand:brand,model:model,year:year,color:color}}},{new: true},(err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        if(!clientUpdate) return res.status(404).send({message: `El usuario no existe`,state : '01'})
        res.status(200).send({client: clientUpdate,state : '00'}) 
    })
}

// Función que obtiene todos las identificaciones de un usuairo
function getIdentifications(req,res){
    let clientId = req.params.documentId
    User.findById(clientId,(err,client)=>{
          if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
          if(!client) return res.status(404).send({message: `El usuario no existe`,state : '01'})
          res.status(200).send({identify : client.identify,state : '00'})
    })
}

// Función que agrega un documento de identidad a un usario
function addIdentify(req,res){
    let clientId = req.params.documentId

    let identify = new Identify()
    let cardNumber =  req.body.cardNumber
    let expirationDate =  req.body.expirationDate

    User.findByIdAndUpdate(clientId,{$push: {identify: {cardNumber:cardNumber,expirationDate:expirationDate}}},{new: true},(err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        res.status(200).send({client: clientUpdate,state : '00'}) 
    })
}

//Funcion que modifica una identificacion de un usuario
function modifyIdentify (req,res){
let idUser = req.params.documentId
let cardId = req.body.cardId
let cardNumberN = req.body.cardNumber
let expirationDate = req.body.expirationDate
User.findOneAndUpdate({'_id':idUser,'identify._id':cardId},{$set:{'identify.$.cardNumber':cardNumberN,'identify.$.expirationDate':expirationDate}},{new: true}, (err,clientUpdate)=>{
    if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
    if(!clientUpdate) return res.status(404).send({message: `El usuario no existe`,state : '01'})
    res.status(200).send({client: clientUpdate,state : '00'}) 
})
}

//Funcion que modifica una carro de un usuario
function modifyCar (req,res){
    let idUser = req.params.documentId
    let carId = req.body.carId
    let licensePlate = req.body.licensePlate
    let brand = req.body.brand
    let model = req.body.model
    let year = req.body.year
    let color = req.body.color
    User.findOneAndUpdate({'_id':idUser,'cars._id':carId},{$set:{'cars.$.licensePlate':licensePlate,'cars.$.brand':brand,'cars.$.model':model,'cars.$.year':year,'cars.$.color':color}},{new: true}, (err,clientUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar el usuario: ${err}`,state : '01'})
        if(!clientUpdate) return res.status(404).send({message: `El usuario no existe`,state : '01'})
        res.status(200).send({client: clientUpdate,state : '00'}) 
    })


}

function getUsersWposs (req,res){
    res.status(200).send([{
        id: "1",
        nombre: "Juan",
        username: "Juan2020",
        email: "juan@gmail.com",
        address: {
            street: "1",
            suite: "2",
            city: "Bogota",
            zipcode: "54004",
            geo: {
                lat: "1000002",
                lng: "9999998"
            }
        },
        phone: "3212222222",
        website: "juan.com",
        company :{
            name: "juanCompany",
            catchPhrase: "Phrase Company",
            bs: "1"
        }
    },
    {
        id: "2",
        nombre: "maria",
        username: "maria2020",
        email: "maria@gmail.com",
        address: {
            street: "1",
            suite: "2",
            city: "Bogota",
            zipcode: "54004",
            geo: {
                lat: "1000002",
                lng: "9999998"
            }
        },
        phone: "3212222222",
        website: "maria.com",
        company :{
            name: "mariaCompany",
            catchPhrase: "Phrase Company",
            bs: "1"
        }
    },
    {
        id: "3",
        nombre: "jose",
        username: "jose2020",
        email: "jose@gmail.com",
        address: {
            street: "1",
            suite: "2",
            city: "Bogota",
            zipcode: "54004",
            geo: {
                lat: "1000002",
                lng: "9999998"
            }
        },
        phone: "3212222222",
        website: "jose.com",
        company :{
            name: "joseCompany",
            catchPhrase: "Phrase Company",
            bs: "1"
        }
    },
    {
        id: "4",
        nombre: "ruperta",
        username: "ruperta2020",
        email: "ruperta@gmail.com",
        address: {
            street: "1",
            suite: "2",
            city: "Bogota",
            zipcode: "54004",
            geo: {
                lat: "1000002",
                lng: "9999998"
            }
        },
        phone: "3212222222",
        website: "ruperta.com",
        company :{
            name: "rupertaCompany",
            catchPhrase: "Phrase Company",
            bs: "1"
        }
    }])
}

function getPostUserWposs (req,res){
    let idUser = req.params.userId
    if (idUser === "1"){
        res.status(200).send([{
            id: "1",
            title: "Restaurante",
            body: "Este es el cuerpo del mensaje",
            
        },
        {
            id: "2",
            title: "Comida",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "3",
            title: "Deporte",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "4",
            title: "Baile",
            body: "Este es el cuerpo del mensaje",
        }])
    }else if (idUser === "2"){
        res.status(200).send([{
            id: "1",
            title: "Baloncesto",
            body: "Este es el cuerpo del mensaje",
            
        },
        {
            id: "2",
            title: "Futbol",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "3",
            title: "Natacion",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "4",
            title: "Ciclismo",
            body: "Este es el cuerpo del mensaje",
        }])

    }else if (idUser === "3"){
        res.status(200).send([{
            id: "1",
            title: "Pizza",
            body: "Este es el cuerpo del mensaje",
            
        },
        {
            id: "2",
            title: "Hamburguesa",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "3",
            title: "Picada",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "4",
            title: "Shawarma",
            body: "Este es el cuerpo del mensaje",
        }])
        
    }else if (idUser === "4"){
        res.status(200).send([{
            id: "1",
            title: "Plato fuert",
            body: "Este es el cuerpo del mensaje",
            
        },
        {
            id: "2",
            title: "Entrada",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "3",
            title: "Snaks",
            body: "Este es el cuerpo del mensaje",
        },
        {
            id: "4",
            title: "Ensalada",
            body: "Este es el cuerpo del mensaje",
        }])
    }else{
        res.status(404).send({message: `El usuario no existe`,state : '01'})
    }
    
}

module.exports ={
    getUser,
    getUsers,
    updateUser,
    updatePictureUser,
    newUser,
    deleteUser,
    getCars,
    getIdentifications,
    addIdentify,
    addCar,
    getCordsUser,
    modifyIdentify,
    modifyCar,
    getUsersWposs,
    getPostUserWposs
}