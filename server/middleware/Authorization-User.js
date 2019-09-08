const { todo: Todo } = require('../models')

module.exports = (req, res, next) => {
    const todoId = req.params.todoId
    Todo.findOne({ _id: req.decode.todoId }).populate('User')
        .then((user) => {
            if (user) {
                next()
            } else {
                // next({ status: 403, message: "You have no authorization on this Todo" })
            }
        }).catch(next);
}