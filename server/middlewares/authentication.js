const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next) {
  if (req.headers.token) {
    req.decoded = verifyToken(req.headers.token)
    User.findOne({ email: req.decoded.email })
      .then(isFound => {
        if (!isFound) {
          next({ status: 404, message: "Not Found" })
        } else {
          next()
        }
      })
      .catch(()=>{
        next({
          status : 500,
          message : 'Error Internal Server'
        })
      })
  } else {
    // console.log(req.decoded);
    next({ status: 403, message: "Forbidden Page" })
  }
}

module.exports = authentication