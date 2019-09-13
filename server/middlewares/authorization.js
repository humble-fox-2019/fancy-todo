'use strict'

const { Todo } = require('../models')

module.exports = {
  authorization (req, res, next) {
    Todo.findOne({ _id: req.params.id, UserId: req.decoded.id })
      .then((todo) => {
        if (todo) {
          if (String(todo.UserId) === String(req.decoded.id)) {
            next()
          } else {
            next({ status: 401, message: 'Unauthorized process!' })
          }
        } else {
          next({ status: 404, message: 'Todo is not found' })
        }
      }).catch(next)
  }
}
