const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { encrypt } = require('../helpers/hash')
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

let UserSchema = new Schema({
    email : {
        type : String,
        unique : [true, "email already reigstered"],
        required : [true,"email is compulsory"],
        match : [emailRegex, "email format is invalid"]
    },
    password : {
        type : String,
        required : [true, "password is compulsory"],
        minlength : [6, "password number length must be more than 5 and less than 14"],
        maxlength : [13, 'telephone number length must be more than 10 and less than 14']
    }
})

UserSchema.pre('save', function() {
    this.password = encrypt(this.password)
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;