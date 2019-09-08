const user = require('../model/user')
const {
    generateToken,
    verToken
} = require('../helper/jwt')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {
    checkHash
} = require('../helper/hashpass')

// const axios = require('axios')

class UserController {

    static signInGoogle(req, res, next) {
        // console.log('masuk')
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            .then(profile => {
                // console.log('tahap1')
                let payload = profile.payload
                let userOne = user.findOne({
                    email: payload.email
                })
                return Promise.all([payload, userOne])
            })
            .then(arr => {
                // console.log('tahap2')
                if (!arr[1]) {
                    return user.create({
                        name: arr[0].name,
                        email: arr[0].email,
                        password: process.env.PASSWORD
                    })
                } else {
                    return arr[1]
                }
            })
            .then(data => {
                // console.log('tahap3')
                let obj = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                res.status(201).json({
                    token: generateToken(obj)
                })
            })
            .catch(next)

    }

    static signIn(req, res, next) {
        user.findOne({
                email: req.body.email
            })
            .then(data => {
                // console.log(req.body.password, '<<<<< INI PASSNYA')
                // console.log(data.password.)
                // console.log(data.password)
                if (checkHash(req.body.password, data.password)) {
                    res.status(200).json({
                        token: generateToken({
                            _id: data._id,
                            name: data.name,
                            email: data.email
                        })
                    })
                } else {
                    next({
                        code: 401,
                        message: 'Mohon Maaf Password Salah'
                    })
                }
            })
            .catch(next)
    }

    static signUp(req, res, next) {
        // console.log
        const {
            name,
            email,
            password
        } = req.body
        // console.log(req.body)

        user.create({
                name,
                email,
                password
            })
            .then(_ => {

                res.status(201).json({
                    code: 201,
                    message: 'Berhasil SignUp'
                })
            })
            .catch(next)
    }

}

module.exports = UserController