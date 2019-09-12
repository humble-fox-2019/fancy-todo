const User = require('../models/user')
const { comparePassword } = require('../helpers/bycrptjs')
const { getToken, verifyToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)
const defaultPas = process.env.DEFAULT_PS

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
  static login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email/Password is required'
      })
    }
    else {
      User.findOne({ email })
        .then(isFound => {
          if (isFound) {
            const { _id, name, email } = isFound
            if (comparePassword(password, isFound.password)) {
              let payload = {
                _id,
                name,
                email,
              }
              res.status(200).json({
                coba: 'coba',
                token: getToken(payload),
                _id
              })
            }
            else {
              next({
                status: 400,
                message: 'Wrong email/password'
              })
            }
          }
          else {
            next({
              status: 400,
              message: 'Wrong email/password'
            })
          }
        })
        .catch(err => {
          next()
        })
    }

  }
  static signInGoogle(req, res) {
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: clientID
    })
      .then(user => {
        console.log('1 disini')
        let password = defaultPas
        let { email, name } = user.payload
        User.findOne({ email })
        .then(isFound => {
          console.log('cek found and not');
          if (isFound) {
            console.log('is found <<<<<<<<');
              return isFound
            }
            else {
              console.log('ke create');
              return User.create({
                name : name,
                email : email,
                password
              })
            }
          })
          .then(userLogin => {
            console.log(userLogin);
            let payload = {
              id: userLogin._id,
              email: userLogin.email
            }
            console.log('buat token');
            let token = getToken(payload)
            console.log(token);
            res.status(200).json({
              token
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
}

module.exports = UserController