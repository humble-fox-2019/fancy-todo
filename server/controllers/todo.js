const { todo: Todo } = require('../models');

class TodoController {
    static read(req, res, next) {
        const { userId } = req.decode
        Todo.find({ owner: userId })
            .sort([['dueDate', -1], ['updatedAt', -1]])
            .populate("owner").populate("inProject")
            .then((Todos) => {
                res.status(200).json(Todos)
            })
            .catch(next);
    };

    static createForUser(req, res, next) {
        const { userId } = req.decode
        if (!userId) return next({ status: 500, message: "failed to gain userId" })
        const { name, description, dueDate } = req.body
        Todo.create({ name, description, dueDate, owner: userId })
            .then((newTodo) => {
                res.status(201).json(newTodo)
            })
            .catch(next);
    };

    static createForProject(req, res, next) {
        const { projectId } = req.params
        const { name, description, dueDate } = req.body
        Todo.create({ name, description, dueDate, inProject: projectId })
            .then((newTodo) => {
                res.status(201).json(newTodo)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { todoId } = req.params
        const { name, description, dueDate } = req.body
        Todo.updateOne({ _id: todoId }, { $set: { name, description, dueDate } }, { runValidators: true })
            .then((updatedTodo) => {
                res.status(200).json(updatedTodo)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        const { todoId } = req.params
        Todo.deleteOne({ _id: todoId })
            .then((deletedTodo) => {
                res.status(200).json(deletedTodo)
            })
            .catch(next);
    };

}

module.exports = TodoController