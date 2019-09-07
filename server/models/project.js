const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project name is required']
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    pendings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project