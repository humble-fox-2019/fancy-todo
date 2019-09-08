const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports = {
    todoAuthorization: (req, res, next) => {
        Todo.findOne({
            _id: req.params.id,
            createdBy: req.decode.id
        }).then((todo) => {
            // console.log(req.params);
            if (!todo) {
                next({ statusCode: 401, msg: `Invalid authorization` })
            } else {
                next();
            }
        }).catch(next);
    },

    isMember: (req, res, next) => {
        Project.findOne(
            {
                _id: req.params.id,
                'members': req.decode.id
            }
        ).then(project => {
            if (!project) {
                next({ statusCode: 401, msg: `Invalid authorization` })
            } else {
                next();
            }
        }).catch(next);
    }
};