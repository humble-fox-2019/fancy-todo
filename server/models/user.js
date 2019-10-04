const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: function(email) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
                message: 'Email format is invalid'
            }, 
            {
                validator: function(email) {
                    return mongoose.models.User.findOne({email})
                        .then(found => {
                            if (found) return false;
                            else return true;
                        })
                        .catch(err => {
                            return true;
                        })
                }, 
                message: 'Email is already used'
            }
        ]
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function(next) {
    this.password = hashPassword(this.password);
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;