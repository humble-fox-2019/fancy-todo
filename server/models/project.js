const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, `Name can not be empty`]
    },
    members: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    description: {
        type: String,
        required: [true, `Name can not be empty`]
    }
}
    , {
        timestamps: true,
        versionKey: false
    });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;