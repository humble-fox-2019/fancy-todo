const ProjectTodo = require('../models/projecttodo');

class ProjectTodoController {

    static create(req, res, next) {
        const ProjectId = req.params.id;
        const { title, description } = req.body;
        ProjectTodo.create({
            title,
            description,
            ProjectId,
            status: false
        })
            .then(task => {
                res.status(201).json(task);
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        const ProjectId = req.params.id;
        console.log(ProjectId);
        ProjectTodo.find({
            ProjectId
        })
            .then(tasks => {
                console.log(tasks);
                res.status(200).json(tasks);
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Task.findById(_id)
            .then(task => {
                res.status(200).json(task);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log(req.params);
        const { todoId } = req.params;
        ProjectTodo.findByIdAndDelete({
            _id: todoId
        })
            .then(() => {
                res.status(200).json();
            })
            .catch(next)
    }

    static changeStatus(req, res, next) {
        const _id = req.params.id;
        const { value, todoId } = req.body;
        let status = true;
        if (value === 0) {
            status = false;
        }
        ProjectTodo.findByIdAndUpdate({
            _id: todoId
        },
            {
                status
            },
            {
                new: true
            })
            .then(task => {
                res.status(200).json(task);
            })
            .catch(next)
    }


}

module.exports = ProjectTodoController;