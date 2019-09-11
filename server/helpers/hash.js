const bcrypt = require('bcryptjs');

function encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function compareHash(password, hashPassword){
    const result = bcrypt.compareSync(password,hashPassword);
    return result;
}

module.exports = {
    encrypt,
    compareHash
}