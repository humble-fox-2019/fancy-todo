var bcrypt = require('bcryptjs');

function hash(params) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(params, salt);
    return hash
}

function checkHash(inputPass, hashPass) {
    let check = bcrypt.compareSync(inputPass, hashPass)
    return check
}
module.exports = {
    hash,
    checkHash
}