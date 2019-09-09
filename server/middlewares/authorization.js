const List = require('../models/list')
const Todo = require('../models/todo')

module.exports = {
    ListAuthorization : (req, res, next) => {
        List.findOne({
            _id : req.params.id,
            user_id : req.decode.id
        })
        .then( list => {
            if(list) next()
            else{
                next({
                    status : 401,
                    message : `invalid Authorization`
                })
            }
        })
        .catch( err => {
            next(err)
        })
    },
    TodoAuthorization : (req, res, next) => {
        Todo.findOne({
            _id : req.params.id,
            user_id : req.decode.id
        })
        .then( todo => {
            if(todo) next()
            else{
                next({
                    status : 401,
                    message : `invalid Authorization`
                })
            }
        })
        .catch( err => {
            next(err)
        })
    }
}