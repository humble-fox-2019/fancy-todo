const { User } = require('../models')
const { compareHash } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(created => {
        res.status(201).json(created)
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user) {
          const { _id, email } = user
          if (compareHash(password, user.password)) {
            res.status(200).json({ user, token: generateToken({ _id, email }) })
          } else {
            next({ status: 400, message: 'invalid email / password' })
          }
        } else {
          next({ status: 400, message: 'invalid email / password' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController