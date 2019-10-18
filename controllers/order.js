'use strict'

const Order = require('../models/order')

// Función que registra una nueva orden
function newOrder(req,res){
    let order = new Order()
    order.client = req.body.client
    order.deliver = req.body.deliver
    order.products = req.body.products
    order.shippingAddres = req.body.shippingAddres
    order.currentLocation = req.body.currentLocation
    order.price = req.body.price
    order.status = req.body.status
    order.shippingWay = req.body.shippingWay
    order.save((err,orderStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`,state : '01'})
        res.status(200).send({oreder: orderStored,state : '00'})
    })
}

// Función que consulta las ordenes de un cliente ordenadas por fecha
function getOrdersByClient (req,res){
    let clientId = req.params.clientId
    Order.find({},(err,orders)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`,state : '01'})
        if(!orders) return res.status(404).send({mesage: `No existen ordenes para este usuario`,state : '01'})
        res.status(200).send({orders,state : '00'})
    }).where('client').equals(clientId)
}

// Función que consulta una orden especifia por id
function getOrderById(req,res){
    let orderId = req.params.orderId
    Order.findById(orderId,(err,order)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!order) return res.status(404).send({message:`La orden no existe`,state : '01'})
        res.status(200).send({order,state : '00'})
    })
}
// Función que actualiza el estado de una orden
function updateStateOrder(req,res){
    let orderId = req.params.orderId
    let update = req.body
    Order.findByIdAndUpdate(orderId,update,(err,orderUpdate)=>{
        if(err) return res.status(500).send({message:`Error al intentar actualizar la orden: ${err}`,state : '01'})
        return res.status(200).send({order : orderUpdate,state : '00'})
    })
}

// Función que elimina una orden si el estado esta por ser aprovado
function deleteOrder(req,res){
    let orderId = req.params.orderId
    Order.findById(orderId,(err,order)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`,state : '01'})
        if(!order) return res.status(404).send({message:`La orden no existe`,state : '01'})

        if(order.status === 'inCart' || order.status === 'toBeApproved'){
            order.remove(err=>{
                if(err) res.status(500).send({message: `Error al borrar la orden: ${err}`,state : '01'})
                res.status(200).send({message: 'La orden ha sido eliminada correctamente',state : '00'})
            })
        }else{
            res.status(200).send({message: 'La orden no puede ser eliminada por que ya fue aprobada',state : '00'})
        }
        
    })
}

module.exports ={
    newOrder,
    getOrderById,
    updateStateOrder,
    deleteOrder,
    getOrdersByClient
}