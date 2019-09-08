
const Todo = require('../models/todo')
module.exports = (req, res, next)=>{
    Todo.findOne({
        _id: req.params._id
    })
    .then(todo =>{
        if(todo.userId == req.decode.data._id) next()
        else next({status: 401, message: "you don't have the authority to do this action"})
    })
    .catch(err =>{
        next(err)
    })
}