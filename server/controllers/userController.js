const User = require('../models/user');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    static google(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        }).then(ticket => {
            const payload = ticket.payload;
            return User.findOne({
                email: payload.email
            }).then(result => {
                if (!result) {
                    return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                } else {
                    return result
                }
            }).then(user => {
                let dataUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const token = generateToken(dataUser)
                res.status(200).json({
                    token,
                    name: user.name
                })
            })
        })
            .catch(next)
    }

    static create(req, res, next) {
        const { name, email, password } = req.body;
        User.create({
            name,
            email,
            password
        })
            .then(function (user) {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }
                        const token = generateToken(payload)
                        res.status(200).json({
                            token,
                            name: user.name
                        })
                    }
                    else {
                        throw { code: 404, message: "wrong email/password" }
                    }
                }
                else {
                    throw { code: 404, message: "wrong email/password" }
                }
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(next)
    }


}

module.exports = UserController;