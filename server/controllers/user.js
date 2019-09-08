const { user: User } = require('../models');
const { tokenize } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((newUser) => {
                let token = tokenize({ userId: newUser._id, })
                res.status(201).json({ username: newUser.username, token })
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { userId } = req.params
        const { username } = req.body
        User.updateOne({ _id: userId }, { username }, { runValidators: true })
            .then((updatedUser) => {
                res.status(200).json(updatedUser)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        const { userId } = req.params
        User.delete({
            _id: userId
        })
            .then((deletedUser) => {
                res.status(200).json(deletedUser)
            })
            .catch(next);
    };

    static login(req, res, next) {
        const { identifier, password } = req.body
        User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
            .then((user) => {
                if (!user) {
                    let err = new Error('Wrong Username / Email / Password')
                    err.name = "AuthenthicationError"
                    next(err)
                } else {
                    if (compare(password, user.password)) {
                        let token = tokenize({ userId: user._id })
                        res.status(200).json({ username: user.username, token })
                    } else {
                        let err = new Error('Wrong Username / Email / Password')
                        err.name = "AuthenthicationError"
                        next(err)
                    }
                }
            }).catch(next);
    }

    static googleSignIn(req, res, next) {
        const { token } = req.body
        let data;
        client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID })
            .then((ticket) => {
                data = ticket.payload
                const { email } = data
                return User.findOne({ user })
            })
            .then(user => {
                if (user) return user
                else {
                    return User.create({
                        username: data.family_name,
                        email: data.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                let payload = {
                    _id: user._id,
                    email: user.email
                }
                let token = tokenize(payload)

                res.status(200).json({ token, username: user.username })
            })
            .catch(next);
    };
}

module.exports = UserController