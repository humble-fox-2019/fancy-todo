const Todo = require('../models/todo')

class TodoController {
    static findTodo(req, res, next) {
        const { id } = req.decode
        Todo.find({ owner: id })
            .then(data => {
                let groupDate = {};
                for (let i = 0; i < data.length; i++) {
                    if (groupDate[data[i].date] == undefined) {
                        groupDate[data[i].date] = []
                    }
                    const { id, title, description, status } = data[i]
                    groupDate[data[i].date].push({ id, title, description, status })
                }
                res.status(200).json(groupDate)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        const { id } = req.params
        Todo.findById(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ Message: "Not Found" })
                }

            })
            .catch(err => {
                next(err)
            })
    }

    static createTodo(req, res, next) {
        const { id } = req.decode
        const { title, description, date } = req.body
        Todo.create({ title, description, date, owner: id })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodo(req, res, next) {
        const { id } = req.params
        let input = {};
        req.body.title && (input.title = req.body.title)
        req.body.description && (input.description = req.body.description)
        req.body.status && (input.status = req.body.status)
        Todo.findOneAndUpdate({ _id: id }, input, { new: true })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo(req, res, next) {
        const { id } = req.params;
        Todo.findByIdAndDelete(id)
            .then(data => {
                res.status(200).json({ Message: "Succesfully deleted" })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController