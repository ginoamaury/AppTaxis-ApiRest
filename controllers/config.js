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

function findFirst (req,res){
    Config.findOne((err,config)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!config) return res.status(404).send({message: `No existe configuracion`,state : '01'})
        res.status(200).send({config :config,state : '00'})
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

// FUNCION PRUEBA PARA GELSA
function gelsa(req,res){
    res.status(200).send({
        codProveedor:"RM",
        codPostal:"540001",
        consecutivo:"070049897",
        pin:"1731060018012071",
        factura:"MGSS070049897",
        conceptos:[
           {
              codigo:"3",
              nombre:"FLETE",
              valor:4700
           },
           {
              codigo:"2",
              nombre:"ENVIO",
              valor:5000
           }
        ],
        agenciaOrigen:{
           codigo:"2530705",
           nombre:"GELSA CVS CUCUTA|GRUPO EMPRESARIAL EN LINEA SA",
           direccion:"GELSA CVS CUCUTA|GRUPO EMPRESARIAL EN LINEA SA"
        },
        agenciaDestino:{
           codigo:"9755",
           nombre:"PAGATODO PR BARRANCAS  Calle 156 No 7 B-50"
        },
        clienteOrigen:{
           tipoIdentificacion:"CC",
           identificacion:"111111",
           primerNombre:"ASTEBIAS",
           primerApellido:"RAMOS",
           segundoApellido:"RAMOS",
           direccion:"CAR 45",
           email:"astebias.ramos@dcsas.com",
           telefono:"5148369",
           celular:"3192399787",
           enrolado:true,
           exoneradoHuella:true,
           huella:"EXONERATE",
           remitente:false
        },
        clienteDestino:{
           tipoIdentificacion:"CC",
           identificacion:"222222",
           primerNombre:"NOMBRE",
           primerApellido:"APELLIDO",
           segundoApellido:"APELLIDO",
           direccion:"CALLE 12 15 1533",
           email:"cesar.criales@dcsas.com.co",
           telefono:"4064465",
           celular:"3191234567",
           enrolado:false,
           exoneradoHuella:false,
           remitente:false
        },
        consultarPromocionRespuestaDTO:{
           isGanador:false,
           codigoRespuesta:"0",
           exito:true,
           fechaTransaccion:"15052020",
           horaTransaccion:"17:31:10",
           idTransaccionRespuesta:6247330050884,
           idTransaccionSolicitud:70049897,
           mensaje:"Exito",
           mensajes:[]
        },
        codigoRespuesta:"0",
        exito:true,
        fechaTransaccion:"15052020",
        horaTransaccion:"17:31:10",
        idTransaccionRespuesta:5065240050883,
        mensaje:"Exito",
        mensajes:[]
     })
}

module.exports ={
  newConfig,
  updateConfig,
  deleteConfig,
  findFirst,
  gelsa
}