const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.JWT
module.exports = (req, res, next) =>{
    try {
        const decode = jwt.verify(req.headers.token, SECRET_JWT)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}
