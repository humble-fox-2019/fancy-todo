const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: Boolean,
    dueDate: Date,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo