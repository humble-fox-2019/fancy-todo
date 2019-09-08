const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'userId required']
    },
    todo: {
        type: String,
        required: [true, 'Todo Name Required']
    },
    status: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: [true, 'Due Date Required']

    }
}, {
    timestamps: true,
    versionKey: false
})




const todo = mongoose.model('Todo', todoSchema)

module.exports = todo