const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const { jwt } = require('../helpers');
const { bcrypt } = require('../helpers');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
        const { email, password } = req.body;
        if (email === undefined || email === '') {
            return next({ statusCode: 403, msg: 'email is required' })
        }

        if (password === undefined || password === '') {
            return next({ statusCode: 403, msg: 'password is required' })
        }
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    // Note: gak bisa digabung dengan error yang dibawah karena balikan dari user jika gak ketemu null
                    next({ statusCode: 400, msg: "email/password not found" });
                } else {

                    if (bcrypt.compare(password, user.password)) {
                        let userData = {
                            'name': user.name,
                            'id': user._id,
                            'email': user.email
                        }

                        let token = jwt.generateToken(userData);
                        res.status(200).json({ token, name: user.name })
                    } else {
                        next({ statusCode: 400, msg: "email/password not found" });
                    }
                }
            })
            .catch(next)
    }

    static Gsignin(req, res, next) {

        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: GOOGLE_CLIENT_ID
        }).then(ticket => {
            const { email } = ticket.getPayload()
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return User.create({
                            "email": email,
                            "password": process.env.DEFAULT_PASSWORD
                        })
                    } else {
                        return user
                    }
                }).then(user => {

                    let userData = {
                        'name': user.name,
                        "id": user._id,
                        "email": user.email
                    }

                    let token = jwt.generateToken(userData);
                    res.status(200).json({ token, name: user.name });
                })
                .catch(next)
        }).catch(next)
    }
}

module.exports = UserController