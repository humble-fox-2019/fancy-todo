const todo = require('../model/todos')
module.exports =
    function authorized(req, res, next) {
        console.log('masuk authorized')
        console.log(req.params.id, '<<<<< ini idnya')
        todo.findById(req.params.id)
            .then(data => {
                console.log('authorized jalan bro')
                console.log(data, '<<< INI DATANYA')
                // console.log(data.userId, '<<<<<<<<< userIdnya ini')
                // console.log(req.payload._id, '<<<<<<<<<< payload')
                if (data.userId == req.payload._id) {
                    console.log('lancar kok')
                    next()
                } else {
                    console.log('authorizednya error')
                    next({
                        code: 401,
                        message: 'UnAuthorized User'
                    })
                }

            })
            .catch(next)

    }