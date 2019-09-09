const { verify } = require('../helpers/jwt')

function todoAuthentication(req, res, next) {
  const token = req.headers.token
  if(token){
    try{
      const decode = verify(token)
      req.decode = decode
      next()
    }catch(err) {
      next(err)
    }
  }else{
    next({
      status: 401,
      message: 'You must login first'
    })
  }
}


module.exports = todoAuthentication
