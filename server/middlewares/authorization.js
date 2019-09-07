const { jwt } = require('../helpers');
const Todo = require('../models/todo');

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
    }
};