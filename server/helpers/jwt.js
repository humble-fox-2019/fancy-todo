const jwt = require('jsonwebtoken');

const screet = process.env.JWT_SCREET

function generateToken(payload) {
    return jwt.sign(payload, screet);
}

function decodeToken(token) {
    return jwt.verify(token, screet);
}

module.exports = {
    generateToken,
    decodeToken
}