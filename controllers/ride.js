'user strict'

//importación del modelo
const Ride = require('../models/ride')

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

// Función que obtiene todos los viajes disponibles existentes
function getRidesAvailable(req,res){
    let status = req.params.status
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!rides) return res.status(404).send({message: `No existen viajes disponibles`,state : '01'})
        res.status(200).send({rides,state : '00'})
    }).where('status').equals(status)
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
function newRide(req,res){
    let ride = new Ride()
    ride.idClient = req.body.idClient
    ride.payment = req.body.payment
    ride.pick = req.body.pick
    ride.drop = req.body.drop
    ride.kilometers = ""
    ride.status = "open"
    ride.note = ""
    ride.score = ""
    ride.idDriver = ""
    ride.price = ""

    ride.save((err,rideStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`,state : '01'})
        res.status(200).send({ride: rideStored,state : '00'})
    })
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
    getRidesAvailable
}
