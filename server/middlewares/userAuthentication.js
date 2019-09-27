const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.token)
    User.findOne({ email: decode.email })
      .then(user => {
        if (user) {
          req.decode = decode
          next()
        } else {
          next({ status: 400, message: 'Bad request' })
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}