const { generateHash } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [{ validator: isEmailUnique, msg: 'email already registered' }, { validator: isEmail, msg: 'not a valid email' }]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'password length must be between 6 and 12'],
    maxlength: [12, 'password length must be between 6 and 12'],
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

function isEmailUnique(value) {
  return mongoose.models['User'].findOne({ email: value })
    .then(found => {
      if (found) return false
      else return true
    })
}

function isEmail(value) {
  let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(value)
}

userSchema.pre('save', function () {
  this.password = generateHash(this.password)
})


module.exports = mongoose.model('User', userSchema)