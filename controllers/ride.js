'user strict'

//importación del modelo
const Ride = require('../models/ride')
const User = require('../models/user')
const moment = require('moment')

// Función que obtiene un viaje por su ID
function getRide(req,res){
    let rideId = req.params.rideId
    Ride.findById(rideId, (err,ride)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!ride) return res.status(404).send({message:`El viaje no existe`,state : '01'})
        res.status(200).send({ride,state : '00'})
    })
}
// Función que obtiene todos los viajes existentes
function getRides(req,res){
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes`,state : '01'})
        res.status(200).send({rides,state : '00'})
    })
}

// Función que obtiene todos los viajes disponibles existentes con determinado estado
function getRidesAvailable(req,res){
    let statusSearch = req.params.status
    console.log(statusSearch)
    Ride.find({status:statusSearch},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes disponibles`,state : '01'})
        if(rides.length == 0) return res.status(404).send({message: `No existen viajes disponibles`,state : '01'})
        res.status(200).send({rides,state : '00'})
    })
}

// Función que obtiene todos los viajes realizados por un conductor
function getRidesDriver(req,res){
    let id = req.params.idDriver
    console.log(id)
    Ride.find({idDriver:id},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes`,state : '01'})
        if(rides.length == 0) return res.status(404).send({message: `No existen viajes`,state : '01'})
        res.status(200).send({rides,state : '00'})
    })
}

// Funcion que obtiene todos los viajes de hoy relizados por un conductor
function getRidesDriverToday(req,res){
    let id = req.params.idDriver
    let day = moment()
    let today = day.startOf('day').utc().toDate()
    let todayE = day.endOf('day').utc().toDate()
    Ride.find({idClient:id,'date':{$gte : today,$lte:todayE}},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes`,state : '01'})
        if(rides.length == 0) return res.status(404).send({message: `No existen viajes`,state : '01'})
        res.status(200).send({rides,count: rides.length,state : '00'})
    })
}

// Función que obtiene todos los viajes realizados por un cliente
function getRidesClient(req,res){
    let id = req.params.idClient
    console.log(id)
    Ride.find({"client.idCard": id},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        console.log("VIAJES : "+rides)
        if(!rides) return res.status(404).send({message: `No existen viajes`,state : '01'})
        if(rides.length == 0) return res.status(404).send({message: `No existen viajes`,state : '01'})
        res.status(200).send({rides,count: rides.length,state : '00'})
    })
}

// Funcion que obtiene todos los viajes de hoy relizados por un cliente
function getRidesClientToday(req,res){
    let id = req.params.idClient
    let day = moment()
    let today = day.startOf('day').utc().toDate()
    let todayE = day.endOf('day').utc().toDate()
    Ride.find({idClient:id,'date':{$gte : today,$lte:todayE}},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes`,state : '01'})
        if(rides.length == 0) return res.status(404).send({message: `No existen viajes`,state : '01'})
        res.status(200).send({rides,count: rides.length,state : '00'})
    })
}


// Función que obtiene todos los producto de una categoria disponibles
function getRidesbyCategory(req,res){
    let categoryId = req.params.categoryId
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message:`No existen productos para esta categoria`,state : '01'})
        res.status(200).send({rides,state : '00'})
    }).where('category').equals(categoryId)
}
// Función que obtiene todos los productos con descuentos disponibles mayores a un porcentaje
function getRidesByOffsale(req,res){
    let percent = req.params.percent
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message:`No existen productos con descuento`,state : '01'})
        res.status(200).send({rides,state : '00'})
    }).where('offSale').gt(percent)
}

// Función que crea un nuevo viaje
function newRide(req, res) {

    console.log('POST /Ride')
    console.log(req.body)

    let ride = new Ride()
    ride.payment = req.body.payment
    ride.pick = req.body.pick
    ride.drop = req.body.drop
    ride.kilometers = ""
    ride.status = "open"
    ride.note = ""
    ride.score = ""
    ride.price = ""

    let idUser = req.body.idClient
    let client = new User()
    User.findById(idUser, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`, state: '01' })
        if (!user) return res.status(404).send({ message: `El usuario no existe`, state: '01' })
        client = user
        ride.save((err, rideStored) => {
            if (err) res.status(500).send({ message: `Error al intentar registrar en la BD: ${err}`, state: '01' })

            Ride.findByIdAndUpdate(rideStored._id,  { client: client } , (err, rideUpdate) => {
                if (err) res.status(500).send({ message: `Error al intentar actualizar el usuario: ${err}`, state: '01' })
                res.status(200).send({ ride: rideUpdate, state: '00' })
            })

        })
    }).select('_id + firstName + lastName + number + picture + idCard')
}

// Función que actualiza un viaje
function updateRide (req,res){
    let rideId = req.params.rideId
    let update = req.body

    Product.findByIdAndUpdate(rideId,body,(err,rideUpdate)=>{
        if(err) return res.status(500).send({message:`Error al intentar actualizar el viaje: ${err}`,state : '01'})
        return res.status(200).send({ride : rideUpdate,state : '00'})
    })
}

// Función que elimina un producto 
function deleteRide (req,res){
    let rideId = req.params.rideId
    Product.findByIdAndDelete(rideId,(err,rideDeleted)=>{
        if(err) return res.status(500).send({message:`Error al intentar eliminar el viaje: ${err}`,state : '01'})
        return res.status(200).send({message: `Viaje eliminado correctamente`,state : '00'})
    })
}

module.exports = {
    getRide,
    getRides,
    getRidesbyCategory,
    getRidesByOffsale,
    newRide,
    updateRide,
    deleteRide,
    getRidesAvailable,
    getRidesDriver,
    getRidesClientToday,
    getRidesDriverToday,
    getRidesClient
}
