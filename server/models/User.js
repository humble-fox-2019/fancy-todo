const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    minlength: [3, 'Username min 3, max 20'],
    maxlength: [20, 'Username min 3, max 20']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid format'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password min 6']
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
})

userSchema.path('email').validate(function(value) {
  return User.findOne({
    email: value
  })
  .then(user => {
    if(user) {
      return false
    }
  })
}, 'Email already registered')

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User  = mongoose.model('User', userSchema)


module.exports = User
