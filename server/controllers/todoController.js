const Todo = require('../models/todo');

class TodoController {
    static getUserTodo(req, res, next) {
        Todo.find({
            createdBy: req.params.createdBy
        }).then(todos => {
            if (todos.length > 0) {
                res.status(200).json(todos);
            } else {
                next({ statusCode: 404 })
            }
        }).catch(next);
    }

    static findOne(req, res, next) {
        Todo.findOne({
            id: req.params.id
        }).then(todo => {
            if (todo.length > 0) {
                res.status(200).json(todo);
            } else {
                next({ statusCode: 404 })
            }
        }).catch(next);
    }

    static store(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static update(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static delete(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static invite(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static accept(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static decline(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static leave(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }
}

module.exports = TodoController