const Todo = require('../models/todo')
const List = require('../models/list')
const User = require('../models/user')

class TodoController{
    static create(req, res, next){
        const { name, descriprion, due_date } = req.body
        console.log(req.params)
        Todo.create({
            name,
            descriprion,
            status : false,
            due_date : new Date(due_date),
            list_id : req.params.listId,
            user_id : req.decode.id
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static read(req, res, next){
        Todo.find()
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static findById(req, res, next){
        Todo.findById(req.params.id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static update(req, res, next){
        const { name, descriprion, status, due_date } = req.body
        Todo.findByIdAndUpdat({
            _id : req.params.id
        },{
            name, descriprion, status, due_date
        })
        .then(todo => {
            res.status(201).json({
                message : `Update Todo success`
            })
        })
        .catch(next)
    }

    static delete(req, res, next){
        Todo.findByIdAndDelete({
            _id : req.params.id
        })
        .then(success => {
            res.status(200).json({
                message : `Delete Todo Success`
            })
        })
        .catch(next)
    }
}

module.exports = TodoController
