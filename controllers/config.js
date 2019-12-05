'use strict'

const Config = require('../models/config')

// Función que registra una nueva configuracion
function newConfig(req,res){
    let config = new Config()
    config.distance = req.body.distance
    config.frecuency = req.body.frecuency
   
    config.save((err,configStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`,state : '01'})
        res.status(200).send({config: configStored,state : '00'})
    })
}


// Función que actualiza una configuracion
function updateConfig(req,res){
    let configId = req.params.configId
    let update = req.body

    Config.findByIdAndUpdate(configId, update, (err,configUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar la configuracion: ${err}`,state : '01'})
        res.status(200).send({config: configUpdate,state : '00'})         
    })

}


// Función que borra una configuracion
function deleteConfig(req,res){
    let configId = req.params.configId
    Config.findById(configId , (err,config) =>{
        if(err) res.status(500).send({message: `Error al borrar la configuracion: ${err}`,state : '01'})

        config.remove(err=>{
            if(err) res.status(500).send({message: `Error al borrar la configuracion: ${err}`,state : '01'})
            res.status(200).send({message: 'La configuracion ha sido eliminada correctamente',state : '00'})
        })
    })
}

module.exports ={
  newConfig,
  updateConfig,
  deleteConfig,
}