const {
    verToken
} = require('../helper/jwt')
module.exports =
    function authenticate(req, res, next) {
        // console.log('halooo broooo')
        // console.log(req.headers, '<<<<<< INI HEADERSNYA')
        // console.log(req.headers.token, '<<<<<< INI HEADERS TOKENNYA')
        try {
            req.payload = verToken(req.headers.token)
            next()
        } catch {
            next({
                code: 401,
                message: 'Unauthenticate User'
            })
        }
    }