const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : { 
        type : String,
        required : true
    },
    username : {
        type : String,
        required : [true, `Username must be filled`],
        minlength : [6, `Phone Number must be between 11 and 13 characters`],
        maxlength : [10, `Phone Number must be between 11 and 13 characters`],
        validate : {
            validator : function(username){
                return this.model('User').findOne({username})
                        .then(user => {
                            if(user) return false
                            else return true
                        })
            },
            message: `Username has Registered`
        }
        
    },
    password : {
        type : String,
        required : [true, `Password must be Filled`],
        minlength : [8, `Password minimum 8 character`],
        validate : [
            {
                validator : function(password){
                    return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])").test(password)
                },
                message: `Password must contain at least 1 lowercase, 1 lowercase and 1 numeric`
            }
        ]
    }, 
    email : {
        type : String,
        required : [true, `email must be filled`],
        validate : [
            {
                validator: function(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email)
                },
                message:`Email format is not valid`
            },
            {
                validator: function(email) {
                    return this.model('User').findOne({email})
                        .then(user => {
                            if(user) return false
                            else return true
                        })
                },
                message: `Email has Registered`
            }
        ]
    },
    phone : {
        type : String,
        minlength : [11, `Phone Number must be between 11 and 13 characters`],
        maxlength : [13,  `Phone Number must be between 11 and 13 characters`],
        validate : [
            {
                validator: function(phone) {
                    return this.model('User').findOne({phone})
                        .then(user => {
                            if(user) return false
                            else return true
                        })
                },
                message: `Email has Registered`
            }
        ]

    } 
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User