const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req, res, next) {
  if (req.headers.token) {
    req.decoded = verifyToken(req.headers.token)
    // console.log(req.decoded.email);
    User.findOne({ email: req.decoded.email })
      .then(isFound => {
        if (!isFound) {
          console.log('here <<<<');
          next({ status: 404, message: "Not Found" })
        } else {
          next()
        }
      })
      .catch(()=>{
        console.log('maybe');
        next({
          status : 500,
          message : 'Error Internal Server'
        })
      })
  } else {
    console.log('omg');
    next({ status: 403, message: "Forbidden Page" })
  }
}

module.exports = authentication