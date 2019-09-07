const User = require('../models/user');

class UserController {
    static findAll(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const {name, email, password} = req.body;
        User.create({
            name,
            email,
            password
        })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next);
    }

    
}

module.exports = UserController;