const { todo: Todo } = require('../models')

module.exports = (req, res, next) => {
    const todoId = req.params.todoId
    const userId = req.decode.userId
    Todo.findById(todoId)
        .then((todo) => {
            if (todo) {
                if (todo.owner == userId) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this todo')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('Todo does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);
}