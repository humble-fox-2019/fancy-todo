const { user: User } = require('../models');

class UserController {
    static read(req, res, next) {
        User.find({})
            .then((Users) => {
                res.status(200).json(Users)
            })
            .catch(next);
    };

    static create(req, res, next) {
        const { _id: userId } = req.decode
        const { fields } = req.body
        User.create({ fields })
            .then((newUser) => {
                res.status(201).json(newUser)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { fields, id } = req.body
        User.updateOne({ _id: id }, { fields }, { runValidators: true })
            .then((updatedUser) => {
                res.status(200).json(updatedUser)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        const { id } = req.body
        User.delete({
            _id: id
        })
            .then((deletedUser) => {
                res.status(200).json(deletedUser)
            })
            .catch(next);
    };

}

module.exports = UserController