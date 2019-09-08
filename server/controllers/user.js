const { User } = require('../models')
const { compareHash } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const verifyGoogle = require('../helpers/google')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(created => {
        res.status(201).json({ token: generateToken({ _id: created._id, email: created.email }), created })
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
            res.status(200).json({ token: generateToken({ _id, email }) })
          } else {
            next({ status: 403, message: 'invalid email / password' })
          }
        } else {
          next({ status: 403, message: 'invalid email / password' })
        }
      })
      .catch(next)
  }

  static google(req, res, next) {
    let payload
    verifyGoogle(req.headers.id_token)
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            email: payload.email,
            password: 'bogasari'
          })
        }
      })
      .then(user => {
        const token = generateToken({ _id: user._id, email: user.email })
        res.status(200).json({ token })
      })
      .catch(next)
  }
}


module.exports = UserController