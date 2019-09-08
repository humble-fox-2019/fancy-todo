const Todo = require('../models/todo');

class TodoController {
    static getUserTodo(req, res, next) {
        let where = {
            createdBy: req.decode.id,
            project: null
        };

        let status = req.params.status;

        if (status === 'active') {
            where['status'] = false;
        } else if (status === 'completed') {
            where['status'] = true;
        } else if (status === 'all') {

        } else {
            return next({ statusCode: 400, msg: 'Status must be active, completed or all' })
        }

        Todo.find(where).sort({ dueDate: -1 })
            .then(todos => {
                if (todos != null) {
                    res.status(200).json(todos);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static findOne(req, res, next) {
        Todo.findOne({
            _id: req.params.id
        }).then(todo => {
            if (todo != null) {
                res.status(200).json(todo);
            } else {
                next({ statusCode: 404 });
            }
        }).catch(next);
    }

    static store(req, res, next) {
        const { name, description, dueDate, project } = req.body;
        let createdBy = req.decode.id;

        Todo.create(
            { name, description, dueDate, createdBy, project }
        ).then(todo => {
            res.status(201).json(todo)
        }).catch(next);
    }

    static update(req, res, next) {
        const { name, description, status, dueDate } = req.body;
        const data = { name, description, status, dueDate };

        Todo.updateOne({ _id: req.params.id }, data, { omitUndefined: true })
            .then((info) => {
                res.status(201).json({ message: 'successfully updated', data: info });
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Todo.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = TodoController