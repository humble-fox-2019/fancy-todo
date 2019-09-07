const User = require('../models/user')
const { comparePassword } = require('../helpers/bycrptjs')
const { getToken, verifyToken } = require('../helpers/jwt')

class UserController {
  static create(req, res) {
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password,
    })
      .then(data => {
        res.status(200).json({
          message: 'Your account success created',
          data
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static login(req, res) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(isFound => {
        if (isFound) {
          const {_id, name, email} = isFound
          if (comparePassword(password, isFound.password)) {
            let payload = {
              _id,
              name,
              email,
            }
            res.status(200).json({
              token: getToken(payload)
            })
          }
          else {
            res.status(400).json({
              message: 'Wrong email/password'
            })
          }
        }
        else {
          res.status(400).json({
            message: 'Wrong email/password'
          })
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = UserController