const User = require('../models/user');
const { jwt } = require('../helpers');
const { bcrypt } = require('../helpers');

class UserController {
    static signup(req, res, next) {
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {

                if (!user) {
                    next({ statusCode: 404, msg: "you haven't registered yet" })
                }
                else if (bcrypt.compare(password, user.password)) {

                    let userData = {
                        'name': user.name,
                        'id': user._id,
                        'email': user.email
                    }

                    let token = jwt.generateToken(userData);
                    res.status(200).json({ token })
                }

                else {
                    next({ statusCode: 400, msg: "email/password not found" })
                }
            })
            .catch(next)
    }
}

module.exports = UserController