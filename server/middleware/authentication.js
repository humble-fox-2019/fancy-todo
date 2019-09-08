const { decodeToken } = require('../helpers/jwt');

function authentication ( req, res ,next ) {
    try {
        const decoded = decodeToken( req.headers.token ) 
        req.decode = decoded;
        next()
    } catch ( err ) {
        next({ status : 401 , message : "You must Login First"})
    }
}

module.exports = authentication;