const Todo = require('../models/todo');

class TodoController {
    static findAll(req, res, next) {
        Todo.find()
            .then(todos => {
                res.status(200).json(todos);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const { name, description, status, due_date } = req.body;
        Todo.create({
            name, 
            description,
            status,
            due_date
        })
        .then(todo => {
            res.status(201).json(todo);
        })
        .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;

        Todo.deleteOne({_id})
            .then(ok => {
                res.status(200).json(ok);
            })
            .catch(next);
    }

    static update(req, res, next) {
        const _id = req.params.id;
        const { name, description, status, due_date } = req.body;
        Todo.updateOne({
            _id
        }, {
            name, 
            description, 
            status,
            due_date
        })
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(next);
    }

    static doneUndone(req, res, next) {
        const _id = req.params.id;
        
        Todo.findOne({_id})
            .then(todo => {
                if (todo) {
                    if (todo.status === true) {
                        todo.status = false
                    } else {
                        todo.status = true
                    }
                    return todo.save();
                } else {
                    next({status: 404, message: 'todo not found'});
                }
            })
            .then(ok => {
                res.status(200).json(ok);
            })
            .catch(next);
    }
}

module.exports = TodoController;