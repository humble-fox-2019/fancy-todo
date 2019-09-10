const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectTodoSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title cannot be empty`]
    },
    description: {
        type: String,
        required: [true, `Description cannot be empty`]
    },
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    status: {
        type: Boolean,
        required: [true, `Status cannot be empty`]
    }
}, {
        timestamps: true,
        versionKey: false
    });


const ProjectTodo = mongoose.model('ProjectTodo', ProjectTodoSchema);

module.exports = ProjectTodo;