const mongoose = require('mongoose')
const {
    hash
} = require('../helper/hashpass')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Mohon Maaf Nama Harus Diisi']
    },
    email: {
        type: String,
        required: [true, 'Mohon Maaf Email Harus Diisi']
    },
    password: {
        type: String,
        required: [true, 'Mohon Maaf Password Harus Diisi']
    }
}, {
    timestamps: true,
    versionKey: false
})



// ENCRYPT PASSWORD 
userSchema.pre('save', function () {
    console.log('masuk')
    let password = hash(this.password)
    this.password = password
    console.log(password)
})

userSchema.pre('save', function (next) {
    return user.findOne({
            email: this.email
        })
        .then(user => {
            if (user) {
                throw new Error('Email Regitered')
            } else {
                next()
            }
        })
})

const user = mongoose.model('User', userSchema)

module.exports = user