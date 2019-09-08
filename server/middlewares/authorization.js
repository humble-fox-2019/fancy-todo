const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports = {
    todoAuthorization: (req, res, next) => {
        Todo.findOne({
            _id: req.params.id,
            createdBy: req.decode.id
        }).then((todo) => {
            console.log(req.params);
            if (!todo) {
                next({ statusCode: 401, msg: `Invalid authorization` })
            } else {
                next();
            }
        }).catch((err) => {
            next(err)
        });
    },

    isMember: (req, res, next) => {
        next();
    }
};