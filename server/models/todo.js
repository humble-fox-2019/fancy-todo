const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ObjectId = mongoose.Schema.Types.ObjectId;

const Todo = new Schema({
    name: {
        type: String,
        required: [true, "Todo must have a name"]
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: Date,
    owner: { type: ObjectId, ref: "User" },
    inProject: { type: ObjectId, ref: "Project" }
}, { timestamps: true })

module.exports = mongoose.model('Todo', Todo)