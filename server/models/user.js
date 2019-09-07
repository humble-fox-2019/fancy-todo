const { generateHash } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: { validator: isEmailUnique, msg: 'email already registered' }
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

userSchema.pre('save', function() {
  this.password = generateHash(this.password)
})


module.exports = mongoose.model('User', userSchema)