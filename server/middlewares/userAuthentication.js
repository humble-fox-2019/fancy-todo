const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.token)
    req.decode = decode
    next()
  }
  catch (err) {
    next({ status: 403, message: err })
  }
}