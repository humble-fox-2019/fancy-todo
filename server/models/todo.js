const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: Date
    }
    // ,
    // UserId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
    // ,
    // createdAt: {
    //     type: Date,
    //     required: true
    // },
    // updatedAt: {
    //     type: Date,
    //     required: true
    // }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;