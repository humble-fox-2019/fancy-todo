const { User, Todo } = require('../models')

class TodoController {
  static getAll(req, res, next) {
    const { _id } = req.decode
    User.findById(_id).populate('todos')
      .then(list => {
        res.status(200).json(list.todos)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const { id } = req.params // todo ID
    Todo.findById(id)
      .then(todo => {
        if (todo) {
          res.status(200).json({ todo })
        }
      })
      .catch(next({ status: 402, message: `todo's not found` }))
  }

  static create(req, res, next) {
    const { _id } = req.decode
    // const { name, description, due_date } = req.body
    // const dueDate = new Date(due_date)
    const { name } = req.body
    Todo.create({ name, userId: _id })
      .then(created => {
        return User.findByIdAndUpdate(_id, { $push: { todos: created._id } })
      })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params // todo ID
    const { name, description, due_date } = req.body
    const dueDate = new Date(due_date)
    Todo.findByIdAndUpdate(id, { name, description })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static updateStatus(req, res, next) {
    const { id } = req.params // todo ID
    // const { status } = req.body
    const status = true
    Todo.findByIdAndUpdate(id, { status })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params // todo ID
    const { _id } = req.decode
    Todo.findByIdAndDelete(id)
      .then(updated => {
        return User.findByIdAndUpdate(_id, { $pull: { todos: id } })
      })
      .then(_ => {
        res.status(200).json(_)
      })
      .catch(next)
  }
}

module.exports = TodoController