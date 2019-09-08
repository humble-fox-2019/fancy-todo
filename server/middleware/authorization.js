const Todo = require('../models/todo')
function authorization ( req ,res ,next ) {
    if ( req.decode ) {
        next()
    } else {
        next({ status : 401 , message : "Not Authorized"})
    }
}

// Check if the Todo's is owned by user
function updateDeleteAuthorization ( req, res ,next ){
    Todo.findOne({ _id : req.body.todoId , userId : req.decode.id })
    .then( found => {
        if ( found ) {
            next()
        } else {
            next({ status : 401 , message : "Not Authorized"})
        }
    })
    .catch ( next )
}

module.exports = { 
    authorization,
    updateDeleteAuthorization
};