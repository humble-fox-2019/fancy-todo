const { todo: Todo } = require('../models');

class TodoController {
    static read(req, res, next) {
        const { }
        Todo.find({ owner }).populate("User").populate("Project")
            .then((Todos) => {
                res.status(200).json(Todos)
            })
            .catch(next);
    };

    static create(req, res, next) {
        const { _id: userId } = req.decode
        const { fields } = req.body
        Todo.create({ fields })
            .then((newTodo) => {
                res.status(201).json(newTodo)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { fields, id } = req.body
        Todo.updateOne({ _id: id }, { fields }, { runValidators: true })
            .then((updatedTodo) => {
                res.status(200).json(updatedTodo)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        const { id } = req.body
        Todo.delete({
            _id: id
        })
            .then((deletedTodo) => {
                res.status(200).json(deletedTodo)
            })
            .catch(next);
    };

}

module.exports = TodoController