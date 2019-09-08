const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT
function generateToken ( dataObj ) {
    return jwt.sign( dataObj , PRIVATE_KEY )
}

function decodeToken ( token ) {
    return jwt.verify( token , PRIVATE_KEY )
}

module.exports = {
    generateToken ,
    decodeToken 
}