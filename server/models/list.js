const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
    name : { 
        type : String,
        required : true
    },
    user_id :[{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const List = mongoose.model('List', listSchema)
module.exports = List