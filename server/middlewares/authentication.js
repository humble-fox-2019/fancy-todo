const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.token
        const decode = verifyToken(token)
    
        req.decode = decode
        User.findById(req.decode.id)
            .then(user => {
                if(user) next()
                else {
                    next({
                        status : 403,
                        message : `You must Logged In first`
                    })
                }
            })
            .catch(next)
    }
    catch{
        next({
            status : 403,
            message : `You must Logged In first`
        })
    }
}