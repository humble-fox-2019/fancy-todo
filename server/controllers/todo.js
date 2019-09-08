const User = require('../models/user')
const Todo = require('../models/todo')
class TodoController {
    static getAll ( req, res ,next ) {
        const userId = req.decode.id;

        if ( req.query.search ) {
            const query = req.query.search;
            let result = []
            Todo.find({ userId }).populate('userId')
            .then( response => {
                response.forEach( el => {
                    if ( el.title.includes( query ) || el.description.includes(query) ) {
                        result.push( el );
                    }
                })
                res.status(200).json({ status : 200 , message : "Search Complete", result })
            })
            .catch ( next )
        } else {

            Todo.find({ userId }).populate('userId')
            .then ( todos => {
                res.status(200).json({ status : 200 , todos });
            })
            .catch ( next )
        }
    }
    static getOne ( req, res ,next ) {
        Todo.findById( req.params.id )
        .then( todo => {
            if ( todo ) {
                res.status(200).json({ status: 200 , todo })
            } else {
                res.status(404).json({ status: 404 , message: "Not Found" })
            }
        } )
        .catch( next )
    }
    static getByCompleted( req ,res ,next ) {
        const userId = req.decode.id;
        const completed = req.params.completed;
        Todo.find({ userId , completed })
        .then( todos => {
            res.status(200).json({ status : 200 , todos });
        })
        .catch ( next )

    }

    static insert ( req, res , next ) {
        const userId = req.decode.id;
        const { title , description , dueDate } = req.body;
        Todo.create({ title , description , dueDate , userId })
        .then ( created => {
            res.status(200).json({ status: 200 , message: "OK" , created } )
        })
        .catch( next );
    }

    static update ( req ,res , next ){
        
        const { title , description , dueDate , todoId } = req.body;
        Todo.findByIdAndUpdate(
            { _id : todoId },
            { $set :{ title , description , dueDate} },
            { useFindAndModify : true , runValidators : true }
        )
        .then( updatedTodoBefore => {
            res.status(200).json( updatedTodoBefore );
        })
        .catch( next );
    }

    static updateCompleted ( req , res , next ) {
        const { todoId } = req.body;
        Todo.findById( todoId )
        .then ( todo => {
            if ( todo.completed ) {
                return Todo.findByIdAndUpdate(
                    { _id : todoId },
                    { completed : false }
                )
            } else {
                return Todo.findByIdAndUpdate(
                    { _id : todoId },
                    { completed : true }
                )
            }
        })
        .then( updatedTodoBefore => {
            res.status(200).json ( updatedTodoBefore )
        })
        .catch( next )
    }
    static delete ( req, res ,next ) {
        const todoId = req.body.todoId;
        Todo.deleteOne({ _id : todoId })
        .then( deleted => {
            res.status(200).json({ status :200 , message : "OK" , deletedCount : deleted.n })
        })
        .catch( next )
    }
    static search ( req , res , next ) {
        const userId = req.decode.id;

        const query = req.query.search;
        let result = []
        Todo.find({ userId }).populate('userId')
        .then( response => {
            response.forEach( el => {
                if ( response.title.includes( query ) || response.description.includes(query) ) {
                    result.push( el );
                }
            })
            res.status(200).json({ status : 200 , message : "Search Complete", result })
        })
        .catch ( next )
    }
}

module.exports = TodoController