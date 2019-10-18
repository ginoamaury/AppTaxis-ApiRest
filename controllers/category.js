'use strict'
// importación del modelo
const Category = require('../models/category')
const service = require('../services')

// Funcion que obtiene todas las categorias
function getCategories (req, res){
    Category.find({},(err,categories)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`,state : '01'})
        if(!categories) return res.status(404).send({mesage: `No existen categorias`,state : '01'})
        res.status(200).send({categories,state : '00'})
    })
}

// Funcion que obtiene una categoria por nombre
function getCategory (req, res){
    let name = req.params.name
    Category.findOne({name},(err,category)=>{
        if(err) return res.status(500).send({mesage: `Error al realizar la petición: ${err}`,state : '01'})
        if(!category) return res.status(404).send({mesage: `No existe esta categoria`,state : '01'})
        res.status(200).send({category,state : '00'})
    })
}

// Funcion para registrar una nueva categoria
function newCategory (req,res){
    let category = new Category()
    category.name = req.body.name

    category.save((err,categoryStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`,state : '01'})
        res.status(200).send({category: categoryStored,state : '00'})
    })

}

// Función para actualizar una categoria
function updateCategory (req,res){
    let categoryId = req.params.categoryId
    let update = req.body

    Category.findByIdAndUpdate(categoryId,update,(err,categoryUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar la categoria: ${err}`,state : '01'})
        res.status(200).send({category:categoryUpdate,state : '00'})
    })
}

// Función para eliminar una categoria
function deleteCategory (req,res){
    let categoryId = req.params.categoryId
    Category.findByIdAndRemove(categoryId,(err,categoryDelete)=>{
        if(err) res.status(500).send({message: `Error al intentar borrar la categoria: ${err}`,state : '01'})
        res.status(200).send({message: `Categoria eliminada correctamente`,state : '00'})
    })
}

module.exports = {
getCategories,
getCategory,
newCategory,
updateCategory,
deleteCategory
}