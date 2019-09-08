const { user: User } = require('../models');
const { tokenize } = require('../helpers/jwt')
const { compare } = require('../helpers/bcryptjs')


class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((newUser) => {
                let token = tokenize({
                    userId: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                })
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
                    let err = new Error('Wrong Username / Password')
                    err.name = "AuthenthicationError"
                    next(err)
                } else {
                    if (compare(password, user.password)) {
                        let token = tokenize({
                            userId: user._id,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                        })
                        res.status(200).json({ username: user.username, token })
                    } else {
                        let err = new Error('Wrong Username / Password')
                        err.name = "AuthenthicationError"
                        next(err)
                    }
                }
            }).catch(next);
    }

}

module.exports = UserController