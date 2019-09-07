const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const Project = new Schema({
    name: {
        type: String,
        required: [true, "Project must have a name"]
    },
    todo: ObjectId
})

module.exports = mongoose.model('Project', Project)