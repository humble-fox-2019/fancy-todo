const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo:{
        type: String,
        required: [true, "What do you want to do?"]
    },
    status: {
        type: Boolean,
        default: false
    },
    description: String,
    tags: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo