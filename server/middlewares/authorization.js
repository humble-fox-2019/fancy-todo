const Todo = require('../models/todo')

function authorization(req, res, next){
  Todo.findById(req.params.id)
  .then(isFound =>{
     console.log('test');
      if (isFound.UserId === req.decoded._id){
        // console.log('here hello authorix');
        // console.log(req.body);
        next()
      }
      else {
        console.log('here!!!!!!');
        res.send({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    console.log(req.params);
    res.send({
      status: 404,
      message: 'Not Found'
    })
  })
}

module.exports = authorization