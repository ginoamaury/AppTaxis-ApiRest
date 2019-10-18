'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req,res){
  console.log(req.body)
  let user = new User({
    idCard : req.body.idCard,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    password: req.body.password,
    birthDay : req.body.birthDay,
    gender : req.body.gender,
    number : req.body.number,
    address : req.body.address,
    type: req.body.type
  })

  user.picture = user.gravatar()

  User.findOne({email: req.body.email},(err,user)=>{
    if(err) return res.status(500).send({message:err})
    if(user) return res.status(404).send({message: 'El usuario ya se registro con ese email'})
    User.findOne({idCard: req.body.idCard},(err,user)=>{
      if(err) return res.status(500).send({message:err})
      if(user) return res.status(404).send({message: 'El usuario ya se registro con esa cedula'})
        user.save((err, userStored)=>{
          if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
          return res.status(200).send({ token: service.createToken(user), user: userStored})
        })
    })
  })
  
}

function signIn (req,res){
 User.findOne({email: req.body.email},(err,user)=>{
   if(err) return res.status(500).send({message:err})
   if(!user) return res.status(404).send({message: 'No existe el usuario'})
    return user.comparePassword(req.body.password, (err,isMatch)=>{
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
      req.user =user
      res.status(200).send({
        message : 'Inicio de sesión correcto',
        token: service.createToken(user),
        user: user
      })

    })
   
 }).select('_id + email + password + idCard + firstName + lastName + birthDay + gender + number + address + type + picture')
}

module.exports = {
  signUp,
  signIn
}
