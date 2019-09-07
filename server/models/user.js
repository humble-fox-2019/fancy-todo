const mongoose = require('mongoose')
const {hashPassword} = require('../helpers/bycrptjs')

const userSechema = mongoose.Schema({
  name: {
    type: String,
    require : [true, 'Name is required'],
  },
  email: {
    type: String,
    require : [true,'Email is required'],
    validate : {
      validator :
        function (value){
          return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
        },
        message: 'Email must include @ and .' 
    },
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
    minlength : [8, 'Password length minimum 8'],
    validate : {
      validator :
      function(value){
        return (/^(?=.*[0-9])(?=.*[A-Z])/).test(value)
      },
      message : 'Password must include number and uppercase character'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSechema.pre('save', function(){
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSechema)

module.exports = User