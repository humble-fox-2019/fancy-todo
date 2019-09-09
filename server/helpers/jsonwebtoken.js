const node = require('../node')
const secret = process.env.JWT_SECRET

function generateToken(payload) {
    return node.jsonwebtoken.sign(payload, secret);
}

function verifyToken(token) {
    return node.jsonwebtoken.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken
}