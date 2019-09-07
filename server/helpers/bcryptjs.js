const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    hashPassword(password) {
        return bcrypt.hashSync(password, salt);
    },

    comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}