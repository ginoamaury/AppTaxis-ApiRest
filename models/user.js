'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = Schema ({
    idCard :{type:Number ,unique:true},
    firstName : String,
    lastName : String,
    email : {type:String ,unique:true, lowercase:true},
    password: {type:String, select:false},
    signupDate : {type:Date ,default: Date.now},
    lastLogin : Date,
    birthDay : String,
    gender : { type: String , enum: ['male','female','other']},
    number : Number,
    address : String,
    picture : String,
    type: { type:String ,enum: ['client','driver']},
    state: { type:String ,enum: ['online','offline']},
    cars:[],
    rides:[]
})

// funciones que se ejecutan antes de que el modelo sea almacenado en la base de datos
//encrypt password

UserSchema.pre('save',function (next){
  let user = this
  if(!user.isModified('password')) return next()
  bcrypt.genSalt(10,(err,salt)=>{
    if(err) return next()
    bcrypt.hash(user.password, salt, null,(err,hash)=>{
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

// funcion para el avatar

UserSchema.methods.gravatar = function(size){
  if (!size) { size = 200 }   
  if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { 
         cb(err, isMatch) 
    }); 
}

module.exports = mongoose.model('User', UserSchema)
