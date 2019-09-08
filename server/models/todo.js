const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        maxlength: [30 , 'Max(30) Character']
    },
    description : {
        type : String,
        default : ''
    },
    completed : {
        type: Boolean,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    dueDate : {
        type: Date,
        required: true
    }
}, { timestamps: { createdAt: true }})

const Todo = mongoose.model("Todo" , todoSchema );
module.exports = Todo;