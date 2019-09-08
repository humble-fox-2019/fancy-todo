const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SALT

function generateToken(input) {
    let token = jwt.sign(input, secret);
    return token
}

function verToken(token) {
    let data = jwt.verify(token, secret);
    return data
}

module.exports = {
    generateToken,
    verToken
}