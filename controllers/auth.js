'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req,res){
  console.log(req.body)
  let user = new User()
  user.idCard = req.body.idCard
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.email = req.body.email
  user.password= req.body.password
  user.birthDay = req.body.birthDay
  user.gender = req.body.gender
  user.number = req.body.number
  user.address = req.body.address
  user.type= req.body.type
  user.picture = user.gravatar()
  user.state = "offline"

  console.log(user)

  User.findOne({email: req.body.email},(err,userR)=>{
    if(err) return res.status(500).send({message:err})
    if(userR) return res.status(404).send({message: 'El usuario ya se registro con ese email',state : '01'})
    User.findOne({idCard: req.body.idCard},(err,userR)=>{
      if(err) return res.status(500).send({message:err})
      if(userR) return res.status(404).send({message: 'El usuario ya se registro con esa cedula',state : '01'})
        user.save((err, userStored)=>{
          if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})
          return res.status(200).send({ token: service.createToken(user),state : '00'})
        })
    })
  })
  
}

function signIn (req,res){
 User.findOne({email: req.body.email},(err,user)=>{
   if(err) return res.status(500).send({message:err})
   if(!user) return res.status(404).send({message: 'No existe el usuario',state : '01'})
    return user.comparePassword(req.body.password, (err,isMatch)=>{
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
      req.user =user
      res.status(200).send({
        message : 'Inicio de sesión correcto',
        state : '00',
        token: service.createToken(user),
        user: user
      })

    })
   
 }).select('_id + email + password + idCard + firstName + lastName + birthDay + gender + number + address + type + picture + state')
}

module.exports = {
  signUp,
  signIn
}
