const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('../helpers/uniqueValidator')
const { hash } = require('../helpers/bcryptjs')

const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty.'],
        validate: {
            validator: (username) => uniqueValidator(username, User),
            message: "username is already taken."
        }
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty.'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please use proper email format."],
        validate: {
            validator: (email) => uniqueValidator(email, User),
            message: "Email is already taken."
        }
    },
    password: {
        type: String,
        min: [8, 'Minimum password length is 8 characters.']
    },
    todo: [{ type: ObjectId, ref: "Todo" }],
    inProject: [{ type: ObjectId, ref: "Project" }],
    ownProject: { type: ObjectId, ref: "Project" }
})

User.pre('save', next => {
    User.password = hash(User.password);
    next();
})

module.exports = mongoose.model('User', User);