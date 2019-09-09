const node = require('../node')
const salt = node.bcryptjs.genSaltSync(5)

function generateHash(string) {
    return node.bcryptjs.hashSync(string, salt)
}

function compareHash(string, hash) {
    return node.bcryptjs.compareSync(string, hash)
}

module.exports = {
    generateHash,
    compareHash
}