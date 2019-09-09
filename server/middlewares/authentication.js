const helpers = require('../helpers')

module.exports = (req, res, next) => {
    try {
        const decode = helpers.jsonwebtoken.verifyToken(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
};