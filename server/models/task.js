const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskShcema = new Schema({
    title: {
        type: String,
        required: [true, `Title cannot be empty`]
    },
    description: {
        type: String,
        required: [true, `Description cannot be empty`]
    },
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Boolean,
        required: [true, `Status cannot be empty`]
    }
}, {
    timestamps: true,
        versionKey: false
});


const Task = mongoose.model('Task', taskShcema);

module.exports = Task;