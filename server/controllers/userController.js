const User = require('../models/user');
const { jwt } = require('../helpers');
const { bcrypt } = require('../helpers');

class UserController {
    static signup(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static signin(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }
}

module.exports = UserController