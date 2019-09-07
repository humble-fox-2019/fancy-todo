const { Todo } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  const { _id } = req.decode
  Todo.findById(id)
    .then(todo => {
      if (todo) {
        if (todo.userId == _id) next()
        else next({ status: 403, message: `you'are not authorized` })
      } else {
        next({ status: 404, message: `todo's not found` })
      }
    })
    .catch(next)
}