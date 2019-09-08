const mongoose = require('mongoose');
const { hash } = require('../helpers/bcrypt');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : true,
        minlength : [5 , "Min (5) Character"]
    }
    
})

userSchema.pre( 'save' , function( next ) {
    this.password = hash( this.password );
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;