const Task = require('../models/task.js');

class TaskController {

    static create(req, res, next) {
        const UserId = req.decode.id;
        const { title, description } = req.body;
        Task.create({
            title,
            description,
            UserId,
            status: false
        })
            .then(task => {
                res.status(201).json(task);
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        const UserId = req.decode.id;
        Task.find({
            UserId
        })
            .populate('UserId')
            .then(tasks => {
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
        const _id = req.params.id;
        Task.findByIdAndDelete({
            _id
        })
            .then(() => {
                res.status(200).json()
            })
    }

    static changeStatus(req, res, next) {
        const _id = req.params.id;
        const { value } = req.body;
        let status = true;
        if (value === 0) {
            status = false;
        }
        Task.findByIdAndUpdate({
            _id
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

    static edit(req, res, next) {
        const _id = req.params.id;
        const { title, description } = req.body;
        Task.findByIdAndUpdate({
            _id
        }, {
                title,
                description
            }, {
                new: true
            })
            .then(task => {
                res.status(200).json(task);
            })
            .catch(next)
    }

}

module.exports = TaskController;