const { verifyToken } = require('../helpers/jwt');

function authentication(req,res,next){
    try{
        const decode = verifyToken(req.headers.token);
        req.decode = decode;
        next();
    } catch(err) {
        res.status(401).json({
            error : err
        })
    }
}

module.exports = authentication;