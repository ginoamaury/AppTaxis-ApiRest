'use strict'

//Manejo de archivos

const path = require ('path')
const multer = require ('multer')

let storage = multer.diskStorage ({
    destination: (req,file,cb)=>{
        cb(null,'/images')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname +"-"+Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage})

module.exports = upload

