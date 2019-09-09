const bcryptjs = require('bcryptjs')

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(5)
  return bcryptjs.hashSync(password, salt)
}

function comparePassword(password, hash) {
  return bcryptjs.compareSync(password, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}
