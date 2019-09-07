const Todo = require('../models/todo')

class TodoController {
  static create(req, res) {
    const UserId = req.decoded._id
    const { name, description, dueDate } = req.body
    Todo.create({
      name,
      description,
      dueDate,
      UserId
    })
      .then(newTodo => {
        res.status(200).json({
          message: 'Success create new todo',
          newTodo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
  static getAll(req, res) {
    Todo.find({
      UserId: req.decoded._id
    })
      .sort({ 'dueDate': -1 }).exec()
      .then(todos => {
        if (todos) {
          res.status(200).json({
            message: 'Here is your todo :',
            todos
          })
        }
        else {
          res.status(200).json({
            message: `There's no todo`
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
  static getOne(req, res) {
    Todo.findById(req.params.id)
      .then(isFound => {
        res.status(200).json({
          message: `Here's your todo`,
          todo: isFound
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
  static destroy(req, res) {
    ;
    Todo.deleteOne({ _id: req.params.id })
      .then(deleted => {
        console.log(deleted);
        res.status(200).json({
          message: `Success deleted`
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
  static update(req, res) {
    let change = {}
    for (let k in req.body) {
      change[k] = req.body[k]
    }
    Todo.updateOne(change, {
      _id: req.params.id
    })
      .then(changed => {
        res.status(200).json({
          message: 'Success updated'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
}

module.exports = TodoController