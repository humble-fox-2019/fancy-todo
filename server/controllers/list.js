const Todo = require('../models/todo')
const List = require('../models/list')
const User = require('../models/user')

class ListController{
    static create(req, res, next){
        const { name } = req.body
        List.create({
            name,
            user_id : req.decode.id
        })
        .then(list => {
            res.status(201).json(list)
        })
        .catch(next)
    }

    static read(req, res, next){
        List.find()
            .then(lists => {
                res.status(200).json(lists)
            })
            .catch(next)
    }

    static findById(req, res, next){
        let list;
        List.findById(req.params.id)
            .then(data => {
                list = data
                return Todo.find({ list_id : data._id})
            })
            .then(todos => {
                res.status(200).json({list, todos})

            })
            .catch(next)
    }

    static update(req, res, next){
        const { name } = req.body
        List.findByIdAndUpdate({
            _id : req.params.id
        },{
            name : name
        })
        .then(list => {
            res.status(201).json({
                message : `Update List success`
            })
        })
        .catch(next)
    }   

    static delete(req, res, next){
        List.findByIdAndDelete({
            _id : req.params.id
        })
        .then(success => {
            res.status(200).json({
                message : `Delete List Success`
            })
        })
        .catch(next)
    }
}

module.exports = ListController