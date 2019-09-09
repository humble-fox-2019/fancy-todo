const Project = require('../models/project');
const User = require('../models/user');
const Todo = require('../models/todo');

class ProjectController {
    static getUserProject(req, res, next) {
        Project.find(
            { 'members': req.decode.id }
        )
            .populate('todos')
            .populate('members')
            .then(projects => {
                if (projects.length > 0) {
                    res.status(200).json(projects);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static store(req, res, next) {
        const { name, description } = req.body;
        let members = [req.decode.id];
        let createdBy = req.decode.id;
        Project.create(
            { name, description, members, createdBy }
        ).then(project => {
            res.status(201).json(project)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Project.findOne({
            _id: req.params.id
        })
            .populate('todos')
            .populate('members')
            .then(project => {
                if (project) {
                    res.status(200).json(project);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static update(req, res, next) {
        const { name, description } = req.body;
        const data = { name, description };

        Project.updateOne({ _id: req.params.id }, data, { omitUndefined: true })
            .then((info) => {
                res.status(201).json({ message: 'successfully updated', data: info });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Project.findByIdAndDelete(req.params.id)
            .populate('todos')
            .populate('members')
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }

    static invite(req, res, next) {

        let userData;

        User.findOne({
            email: req.body.email
        }
        ).then(user => {
            if (user) {
                userData = user;
                return Project.findOne({
                    _id: req.params.id,
                    'members': user._id
                });
            } else {
                throw next({ statusCode: 404, msg: 'The user no longer exists.' });
            }
        }).then(member => {
            if (member) {
                throw next({ statusCode: 401, msg: 'The user has been join this project.' });
            } else {
                return Project.updateOne({ _id: req.params.id }, { $push: { members: userData._id } }, { omitUndefined: true });
            }
        }).then((info) => {
            res.status(201).json({ message: 'Invite user successfully', data: info });
        }).catch(next);
    }

    static leave(req, res, next) {
        Project.findOne(
            {
                _id: req.params.id,
                'members': req.decode.id
            }
        ).then(member => {
            if (member) {
                return Project.updateOne({ _id: req.params.id }, { $pull: { members: req.decode.id } }, { omitUndefined: true });
            } else {
                throw next({ statusCode: 401, msg: 'The user not in this project' });
            }
        }).then((info) => {
            res.status(200).json({ message: 'successfully leave project', data: info });
        }).catch(next);
    }

    // TODO
    static getUserTodo(req, res, next) {
        let where = {
            project: req.params.id
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

    static findOneTodo(req, res, next) {
        Todo.findOne({
            _id: req.params.todoId
        }).then(todo => {
            if (todo) {
                res.status(200).json(todo);
            } else {
                next({ statusCode: 404 });
            }
        }).catch(next);
    }

    static storeTodo(req, res, next) {
        const { name, description, dueDate } = req.body;
        let createdBy = req.decode.id;
        let project = req.params.id;

        Todo.create(
            { name, description, dueDate, createdBy, project }
        ).then(todo => {
            res.status(201).json(todo)
        }).catch(next);
    }

    static updateTodo(req, res, next) {
        const { name, description, status, dueDate } = req.body;
        const data = { name, description, status, dueDate };

        Todo.updateOne({ _id: req.params.todoId }, data, { omitUndefined: true })
            .then((info) => {
                res.status(201).json({ message: 'successfully updated', data: info });
            })
            .catch(next)
    }

    static deleteTodo(req, res, next) {
        Todo.findByIdAndDelete(req.params.todoId)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = ProjectController