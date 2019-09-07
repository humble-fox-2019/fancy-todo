const User = require('../models/user');
const { generateToken, verifyToken }  = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcryptjs');

class UserController {
    static findAll(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(next);
    }

    static signup(req, res, next) {
        const {name, email, password} = req.body;
        User.create({
            name,
            email,
            password
        })
        .then(user => {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            let token = generateToken(payload);

            res.status(201).json({
                id: user.id,
                name: user.name,
                token
            });
        })
        .catch(next);
    }

    static signin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({email})
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        };

                        let token = generateToken(payload);

                        res.status(200).json({
                            id: user.id,
                            name: user.name,
                            token
                        })
                    } else {
                        next({status: 404, message: 'Wrong email/password'});
                    }
                } else{
                    next({status: 404, message: 'Wrong email/password'});
                }
            })
    }

    
}

module.exports = UserController;