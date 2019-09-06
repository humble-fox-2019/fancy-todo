const { User } = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs');

class UserController {
    static signup(req, res, next) {

    }

    static signin(req, res, next) {

    }
}

module.exports = UserController