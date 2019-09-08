const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_JWT

function tokenize(payload) {
    return jwt.sign(payload, secret)
}

function verifyUser(token) {
    return jwt.verify(token, secret)
}

module.exports = { tokenize, verifyUser }