const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bycrptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password length minimum 8'],
    validate: {
      validator:
        function (value) {
          return (/^(?=.*[0-9])(?=.*[A-Z])/).test(value)
        },
      message: 'Password must include number and uppercase character'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


userSchema.pre('save', function () {
  console.log('aaaaaaaaaaaaaaaaaaaaa');

    this.password = hashPassword(this.password)

  next()
})

userSchema.path('email').validate(function (value) {
  return User.findOne({ email: value })
      .then(isFound => {
          if (isFound) return false
      })
      .catch(err => {
          throw err;
      })
}, 'Email already exist')

const User = mongoose.model('User', userSchema)

module.exports = User