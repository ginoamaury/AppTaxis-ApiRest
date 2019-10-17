'use strict'
// importación del modelo
const Category = require('../models/category')
const service = require('../services')

// Funcion que obtiene todas las categorias
function getCategories (req, res){
    Category.find({},(err,categories)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!categories) return res.status(404).send({mesage: `No existen categorias`})
        res.status(200).send({categories})
    })
}

// Funcion que obtiene una categoria por nombre
function getCategory (req, res){
    let name = req.params.name
    Category.findOne({name},(err,category)=>{
        if(err) return res.status(500).send({mesage: `Error al realizar la petición: ${err}`})
        if(!category) return res.status(404).send({mesage: `No existe esta categoria`})
        res.status(200).send({category})
    })
}

// Funcion para registrar una nueva categoria
function newCategory (req,res){
    let category = new Category()
    category.name = req.body.name

    category.save((err,categoryStored)=>{
        if(err) res.status(500).send({message: `Error al intentar registrar en la BD: ${err}`})
        res.status(200).send({category: categoryStored})
    })

}

// Función para actualizar una categoria
function updateCategory (req,res){
    let categoryId = req.params.categoryId
    let update = req.body

    Category.findByIdAndUpdate(categoryId,update,(err,categoryUpdate)=>{
        if(err) res.status(500).send({message: `Error al intentar actualizar la categoria: ${err}`})
        res.status(200).send({category:categoryUpdate})
    })
}

// Función para eliminar una categoria
function deleteCategory (req,res){
    let categoryId = req.params.categoryId
    Category.findByIdAndRemove(categoryId,(err,categoryDelete)=>{
        if(err) res.status(500).send({message: `Error al intentar borrar la categoria: ${err}`})
        res.status(200).send({message: `Categoria eliminada correctamente`})
    })
}

module.exports = {
getCategories,
getCategory,
newCategory,
updateCategory,
deleteCategory
}