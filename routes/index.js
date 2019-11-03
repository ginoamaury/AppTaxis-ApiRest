'use strict'

const express = require('express')
const cors = require('cors')

const userController = require('../controllers/user')
const userControl = require('../controllers/auth')
const rideController = require('../controllers/ride')
const categoryControl = require('../controllers/category')
const orderControl = require('../controllers/order')

const auth = require('../middlewares/auth')
//const upload = require('../middlewares/upload')


const path = require ('path')
const multer = require ('multer')

let storage = multer.diskStorage ({
    destination: (req,file,cb)=>{
        cb(null,'./images')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname +"-"+Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage})

const api = express.Router()
api.use(cors())

// PETICIONES USUARIO

// Petición GET para consultar todos los usuarios
api.get('/client',userController.getUsers)
// Petición GET para consultar un usuario especifico
api.get('/client/:documentId',userController.getUser)
// Petición GET para consutlar las coordenadas de un usuario especifico
api.get('/client/coords/:documentId',userController.getCordsUser)
// Petición POST para registrar un nuevo usuario
api.post('/client',userController.newUser)
// Petición PUT para actualizar un usuario especifico
api.put('/client/:documentId',userController.updateUser)
// Petición PUT para actualizar la foto de un usuario especifico
api.put('/client/picture/:documentId',upload.single('file'),userController.updatePictureUser)
// Petición DELETE para eliminar un usuario especifico
api.delete('/client/:documentId',userController.deleteUser)
// Petición GET para obtener todos los carros de un usuario
api.get('/client/car/:documentId',userController.getCars)
// Petición PUT  para agregar un carro a un usuario
api.put('/client/car/:documentId',userController.addCar)
// Petición GET para obtener todos los documentos de un usuario
api.get('/client/document/:documentId',userController.getIdentifications)
// Petición PUT  para agregar un documento a un usuario
api.put('/client/document/:documentId',userController.addIdentify)


/// PETICIONES INICIO DE SESION

//Petición para registrar usuario
api.post('/signup',userControl.signUp)
//Petición para iniciar sesion
api.post('/signin',userControl.signIn)


/// PETICIONES CATEGORIAS

// Peticion GET para obtener todas las categorias
api.get('/category',categoryControl.getCategories)
// Peticion GET para obtener una categoria por nombre
api.get('/category/:name',categoryControl.getCategory)
// Petición POST para crear una nueva categoria
api.post('/category',categoryControl.newCategory)
// Petición PUT para actualizar una categoria
api.put('/category/:categoryId',categoryControl.updateCategory)
// Petición DELETE para eliminar una categoria
api.delete('/category/:categoryId',categoryControl.deleteCategory)


/// PETICIONES DE VIAJE 

// Petición GET para obtener todos los viajes
api.get('/ride',rideController.getRides)
// Petición GET para obtener un viaje
api.get('/ride/:rideId',rideController.getRide)
// Petición GET para obtener todos los productos de una categoria disponibles
api.get('/ride/category/:categoryId',rideController.getRidesbyCategory)
// Petición GET para obtener productos con descuento disponibles
api.get('/ride/offSale/:percent',rideController.getRidesByOffsale)
//Petición GET para obtener los viajes con determinado estado
api.get('/ride/status/:status',rideController.getRidesAvailable)
//Petición GET para obtener los viajes de un conductor
api.get('/ride/driver/:idDriver',rideController.getRidesDriver)
//Petición GET para obtener los viajes de hoy de un conductor
api.get('/ride/driver/today/:idDriver',rideController.getRidesClientToday)
//Petición GET para obtener los viajes de un Cliente
api.get('/ride/client/:idClient',rideController.getRidesClient)
//Petición GET para obtener los viajes de hoy de un Cliente
api.get('/ride/client/today/:idClient',rideController.getRidesClientToday)
// Petición POST para registrar un nuevo viaje
api.post('/ride',rideController.newRide)
// Petición PUT para actualizar un viaje
api.put('/ride/:rideId',rideController.updateRide)
// Petición DELETE para eliminar un viaje
api.delete('/ride/:rideId',rideController.deleteRide)
// Petición PUT para actualizar el conductor de un viaje
api.put('/ride/driver/:rideId',rideController.updateDriverRide)


/// PETICIÓNES ORDENES

// Petición POST para registrar una nueva orden
api.post('/order',orderControl.newOrder)
// Petición GET para obtener todas las ordenes de un cliente
api.get('/order/client/:clientId',orderControl.getOrdersByClient)
// Petición GET para obtener una orden por id
api.get('/order/:orderId',orderControl.getOrderById)
// Petición PUT para actualizar una orden
api.put('/order/:orderId',orderControl.updateStateOrder)
// Petición DELETE para eliminar una orden que no ha sido aprobada
api.delete('/order/:orderId',orderControl.deleteOrder)



module.exports = api
