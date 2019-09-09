var bcrypt = require('bcryptjs')

module.exports = {
    hashPassword : (value) => {
        let salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt);
    },
    comparePassword : (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}