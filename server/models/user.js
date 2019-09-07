const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcryptjs')

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty.'],
        validate: {
            validator: (username) => User.findOne({ username }).then(result => result ? false : true),
            message: "username is already taken."
        }
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty.'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please use proper email format."],
        validate: {
            validator: (email) => User.findOne({ email }).then(result => result ? false : true),
            message: "Email is already taken."
        }
    },
    password: {
        type: String,
        min: [8, 'Minimum password length is 8 characters.']
    },
    todo: [{ type: ObjectId, ref: "Todo" }],
    inProjects: [{ type: ObjectId, ref: "Project" }],
    ownProjects: [{ type: ObjectId, ref: "Project" }]
})

userSchema.pre('save', function (next) {
    console.log(this)
    console.log('============  Masuk ============');
    console.log(this.password)
    this.password = hash(this.password);
    next();
})



let User = mongoose.model('User', userSchema);



module.exports = User