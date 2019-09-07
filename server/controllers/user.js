const { user: User } = require('../models');

class UserController {
    static create(req, res, next) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then((newUser) => {
                res.status(201).json(newUser)
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

}

module.exports = UserController