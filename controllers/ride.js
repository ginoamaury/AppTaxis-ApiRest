'user strict'

//importación del modelo
const Ride = require('../models/ride')

// Función que obtiene un viaje por su ID
function getRide(req,res){
    let rideId = req.params.rideId
    Ride.findById(rideId, (err,ride)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ride) return res.status(404).send({message:`El viaje no existe`})
        res.status(200).send({ride})
    })
}
// Función que obtiene todos los viajes existentes
function getRides(req,res){
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!rides) return res.status(404).send({message: `No existen viajes`})
        res.status(200).send({rides})
    })
}
// Función que obtiene todos los producto de una categoria disponibles
function getRidesbyCategory(req,res){
    let categoryId = req.params.categoryId
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!rides) return res.status(404).send({message:`No existen productos para esta categoria`})
        res.status(200).send({rides})
    }).where('category').equals(categoryId)
}
// Función que obtiene todos los productos con descuentos disponibles mayores a un porcentaje
function getRidesByOffsale(req,res){
    let percent = req.params.percent
    Ride.find({},(err,rides)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!rides) return res.status(404).send({message:`No existen productos con descuento`})
        res.status(200).send({rides})
    }).where('offSale').gt(percent)
}

// Función que crea un nuevo producto
function newRide(req,res){
    let ride = new Ride()
    ride.idClient = req.body.idClient
    ride.payment = req.body.payment

    ride.save((err,rideStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`})
        res.status(200).send({ride: rideStored})
    })
}

// Función que actualiza un producto
function updateRide (req,res){
    let rideId = req.params.rideId
    let update = req.body

    Product.findByIdAndUpdate(rideId,body,(err,rideUpdate)=>{
        if(err) return res.status(500).send({message:`Error al intentar actualizar el viaje: ${err}`})
        return res.status(200).send({ride : rideUpdate})
    })
}

// Función que elimina un producto 
function deleteRide (req,res){
    let rideId = req.params.rideId
    Product.findByIdAndDelete(rideId,(err,rideDeleted)=>{
        if(err) return res.status(500).send({message:`Error al intentar eliminar el viaje: ${err}`})
        return res.status(200).send({message: `Viaje eliminado correctamente`})
    })
}

module.exports = {
    getRide,
    getRides,
    getRidesbyCategory,
    getRidesByOffsale,
    newRide,
    updateRide,
    deleteRide
}
