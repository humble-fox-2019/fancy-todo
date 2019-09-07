const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name : { 
        type : String,
        required : true
    },
    description : String,
    status : Boolean,
    due_date : Date,
    list_id : [{ type: Schema.Types.ObjectId, ref: 'List' }],
    user_id : [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo