const Todo = require('../models/Todo')
const Project = require('../models/Project')

class TodoController {

  static create(req, res, next) {
    const { title, description, dueDate } = req.body
    const projectId = req.headers.projectid

    Todo.create({ title, description, dueDate, project: projectId })
      .then(todo => {
        return Project.findByIdAndUpdate({
          _id: projectId
        },{
          $push: {
            todos: todo._id
          }
        },{
          new: true
        })
      })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(next)
  }

  static getAll(req, res, next) {

  }

  static getOne(req, res, next) {

  }

  static update(req, res, next) {

  }
  
  static delete(req, res, next) {
    
  }

}

module.exports = TodoController