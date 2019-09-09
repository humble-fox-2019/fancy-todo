const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDosSchema = new Schema({
    name : {
        type : String,
        required : true 
    },
    description : {
        type : String
    },
    status : {
        type : String,
        default : 'Not done'
    },
    due : {
        type : Date,
        required : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const ToDos = mongoose.model('ToDos', ToDosSchema);

module.exports = ToDos;
