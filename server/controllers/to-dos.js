const ToDos = require('../models/to-dos')

class ToDosController{
    
    static create(req,res){
        let toDos = {
            name : req.body.name,
            description : req.body.description,
            due : req.body.due,
            owner : req.body.owner
        }
        ToDos.create(toDos).then((newTodos)=>{
            res.status(201).json({
                message : "added the to do",
                newTodos
            })
        }).catch ((err)=>{
            res.status(400).json({
                message : "failed to add the to do",
                err
            })
        })
    }

    static findAll(req,res){
        ToDos.find().then((toDos)=>{
            res.status(201).json({
                message: "displaying all to dos",
                toDos
            })
        }).catch((err)=>{
            res.status(400).json({
                message: "failed loading to dos",
                error : err
            })
        })
    }

    static find(req,res){
        ToDos.findOne().then((toDos)=>{
            res.status(201).json({
                message: "displaying all to dos",
                toDos
            })
        }).catch((err)=>{
            res.status(400).json({
                message: "failed loading to dos",
                error : err
            })
        })
    }

    static patch(req,res){
        let condition = {
            "_id" : req.params.id 
        }

        let updateThis = {
            [req.body.where] : req.body.value
        }

        ToDos.findOneAndUpdate(condition,updateThis,{new : true}).then((updated)=>{
            res.status(201).json({
                message : "sucess updating",
                updated
            })
        }).catch((err)=>{
            message : "error updating",
            err
        })
    }

    static replace(req,res){
        let condition = {
            "_id" : req.params.id
        }

        let replacement = {
            name : req.body.name,
            description : req.body.description,
            status : req.body.status,
            due : req.body.due,
            owner : req.body.owner
        }

        ToDos.findOneAndUpdate(condition,replacement,{new : true}).then((updated)=>{
            res.status(201).json({
                message : "sucess updating",
                updated
            })
        }).catch((err)=>{
            message : "error updating",
            err
        })
    }

    static delete(req,res){
        let condition = {
            "_id" : req.params.id
        }
        ToDos.findOneAndRemove(condition).then((deletedToDos)=>{
            res.status(201).json({
                message: "Remove to do success",
                deletedToDos
            })
        }).catch((err)=>{
            res.status(400).json({
                message: "Failed to remove the to do",
                err
            })
        })
    }
}

module.exports = ToDosController;