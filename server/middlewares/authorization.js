const ToDos = require('../models/to-dos')

function authorization(req,res,next){
    ToDos.findById(req.params.id).then((todo)=>{
        if(todo){
            if(todo.owner === req.decode.id){
                next()
            } else {
                res.status(401).json({
                    message: "You do not have access to do this action"
                })
            }
        } else {
            res.status(400).json({
                message: "The to do by the id does not exist"
            })
        }
    }).catch((err)=>{
        res.status(400).json({
            error : err
        })
    })
}

module.exports = authorization;