const User = require('../models/user')
const { comparePassword } = require('../helpers/bycrptjs')
const { getToken, verifyToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)
const defaultPas = process.env.DEFAULT_PS

class UserController {
  static create(req, res) {
    console.log('hei');
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
    console.log('rawrrrr');
    const { email, password } = req.body
    console.log(password);
    console.log('ada dsisi');
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
        // console.log(user);
        let password = defaultPas
        let { email, name } = user.payload
        console.log(email, name);
        User.findOne({ email })
        .then(isFound => {
        //   // console.log(email);
          if (isFound) {
        //     console.log(user, '<<<<<<<<');
              return isFound
            }
            else {
        //       console.log('please ini user', user);
              console.log('heyooo');
              User.create({
                name : name,
                email : email,
                password
              })
                .then(newUser => {
                  console.log('herreeee');
                  return newUser
                })
            }
          })
          .then(userLogin => {
            console.log(userLogin);
            let payload = {
              id: userLogin._id,
              email: userLogin.email
            }
            let token = getToken(payload)
            console.log('dari login>>>>', userLogin);
            res.status(200).json({
              token
            })
          })
      })
      .catch(err => {
        console.log('here');
        res.status(500).json({
          message: 'Error Internal Server'
        })
      })
  }
}

module.exports = UserController