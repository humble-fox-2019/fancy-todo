const models = require('../models')
module.exports = (req, res, next)=>{
    models.Todo.findOne({
        _id: req.params.id
    })
    .then(todo =>{
        if(todo.userId == req.decode._id) next()
        else next({status: 401, message: "you don't have the authority to do this action"})
    })
    .catch(err =>{
        next(err)
    })
}