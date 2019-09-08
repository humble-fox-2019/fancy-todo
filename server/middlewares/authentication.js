'use strict'

const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authentication (req, res, next) {
    try {
      const decoded = verifyToken(req.headers.token)
      req.decoded = decoded
      next()
    } catch (err) {
      next({ status: 403, message: 'You must sign in first!' })
    }
  }
}
