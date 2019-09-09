const models = require('../models')
const helpers = require('../helpers')

class Todo {
    static getAll (req, res, next) {
        
        const decode = helpers.jsonwebtoken.verifyToken(req.headers.token)
        models.Todo.find({
            userId: decode._id
        })
        .sort({createdAt: 'desc'})
        .then(todos=>{
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static postOne(req, res, next) {
        const decode = helpers.jsonwebtoken.verifyToken(req.headers.token)
        const userId = decode._id
        
        const { name, description } = req.body
              
        models.Todo.create({
            name,
            description,
            userId
        })
        .then(todo =>{
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static getOne(req, res, next) {
        models.Todo.findById(req.params.id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static patchOne(req, res, next) {
        const { name, description } = req.body;
        models.Todo.findOneAndUpdate({
            _id: req.params.id
        },{
            name,
            description
        }, { new: true })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
        
    }

    static patchDone(req, res, next) {
        const { isDone } = req.body;
        models.Todo.findOneAndUpdate({
            _id: req.params.id
        },{
            isDone
        }, { new: true })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)        
    }

    static deleteOne(req, res, next) {
        models.Todo.findByIdAndDelete(req.params.id)
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }
 }

module.exports = Todo