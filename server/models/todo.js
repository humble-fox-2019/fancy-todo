const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Todo = new Schema({
    name: {
        type: String,
        required: [true, "Todo must have a name"]
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Todo', Todo)