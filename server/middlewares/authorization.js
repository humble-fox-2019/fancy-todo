const Todo = require('../models/todo')

function authorization(req, res, next){
  Todo.findById(req.params.id)
  .then(isFound =>{
      if (isFound.UserId === req.decoded._id){
        next()
      }
      else {
        res.send({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    res.send({
      status: 404,
      message: 'Not Found'
    })
  })
}

module.exports = authorization