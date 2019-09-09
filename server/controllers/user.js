const User = require('../models/user')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {
    static register(req, res, next) {
        const { firstname, lastname, email, password } = req.body
        User.create({ firstname, lastname, email, password })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res, next) {
        console.log('log');
        const { email, password } = req.body

        User.findOne({ email })
            .then(data => {
                if (data) {
                    if (verifyPassword(password, data.password)) {

                        let token = createToken(data)
                        const { firstname, id } = data
                        res.status(200).json({ token, firstname, id })
                    } else {

                        res.status(404).json('Email/password not found')
                    }
                } else {
                    res.status(404).json('Email not found')
                }
            })
            .catch(err => {

                res.status(500).json('error')
            })
    }

    static loginFromOauth(req, res) {
        const { token } = req.body;

        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.payload
                return User.findOne({
                    email: payload.email
                })
                    .then(data => {
                        if (data) {
                            return data
                        } else {
                            return User.create({
                                email: payload.email,
                                firstname: payload.given_name,
                                lastname: payload.family_name,
                                password: "uzumymw"
                            })
                        }
                    })
                    .then(data => {
                        console.log('Berhasil Login')
                        let token = createToken(data)
                        const { firstname, id } = data
                        res.status(200).json({ token, firstname, id })
                    })
            })
            .catch(err => {
                res.status(500)({ message: 'Internal Server Error' })
            })
    }

}



module.exports = UserController