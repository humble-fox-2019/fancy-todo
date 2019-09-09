const User = require('../models/User')
const { sign } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static register(req, res, next) {
    const { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        const result = {
          _id: user._id,
          username: user.username,
          email: user.email
        }
        res.status(201).json(result)
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body

    if(!email || !password) {
      const errors = []
      if(!email) {
        errors.push('Email required')
      }
      if(!password) {
        errors.push('Password required')
      }
      res.status(400).json(errors)
    }else{
      User.findOne({ email })
        .then(user => {
          if(user) {
            if(comparePassword(password, user.password)) {
              const payload = {
                username: user.username,
                email: user.email,
                _id: user._id
              }
              const token = sign(payload)
              res.json({
                token,
                user : {
                  username: user.username
                }
              })
            }else {
              next({
                status: 401,
                message: ['Wrong Email/Password']
              })
            }
          }else {
            next({
              status: 401,
              message: ['Wrong Email/Password']
            })
          }
        })
    }
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null
    client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload()
      return User.findOne({
        email: payload.email
      })
    })
    .then(user => {
      if(user) {
        return user
      }else {
        return User.create({
          username: payload.given_name,
          email: payload.email,
          password: 'josprimassdsdsdihombing'
        })
      }
    })
    .then(user => {
      const payload = {
        username: user.username,
        email: user.email,
        _id: user._id
      }
      const token = sign(payload)
      res.json(token)
    })
    .catch(next)
  }

}


module.exports = UserController