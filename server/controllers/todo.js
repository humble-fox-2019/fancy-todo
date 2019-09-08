const Todo = require('../models/todo')

class TodoController {
    static findAll(req, res, next){
        Todo.find({
            userId: req.decode.data._id
        })
        .sort({createdAt: 'asc', todo: 'asc'})
        .then(todos=>{
            res.status(200).json(todos)
        })
        .catch(next)
    }
    static createTodo(req, res, next){
        const { todo, description, tags } = req.body
        const userId = req.decode.data._id
      
        Todo.create({
            todo,
            description,
            tags,
            userId
        })
        .then(todo =>{
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static updateOne(req, res, next){
        const { todo, description, tags } = req.body
        
        Todo.findOneAndUpdate({
            _id: req.params._id
        },{
            todo,
            description,
            tags,
            status: ((req.body.status == 'true')? true:false)
        }, {new: true})
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }
    static removeOne(req, res, next){
        const { _id } = req.params
        Todo.deleteOne({
            _id
        })
        .then(ok => {
            res.status(200).json(ok)
        })
        .catch(next)
    }


}

module.exports = TodoController