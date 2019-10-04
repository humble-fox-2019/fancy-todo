const User = require('../models/user');
const { generateToken, verifyToken }  = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_RANDOM_PWD = process.env.GOOGLE_RANDOM_PWD;

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
                UserId: user.id,
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
    
    static googleSignUp(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        let payload;
        
        client.verifyIdToken({
            idToken: id_token,
            audience: GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            console.log(ticket)

            return User.findOne({email: payload.email})
        })
        .then(user => {
            if (user) {
                return user
            } else {
                return User.create({
                    name : payload.name,
                    email : payload.email,
                    password: GOOGLE_RANDOM_PWD
                })
            }
        })
        .then(user => {
            const payload = {
                UserId: user.id,
                name: user.name,
                email: user.email
            }
            let token = generateToken(payload);
            
            res.status(201).json({
                UserId: user.id,
                name: user.name,
                token
            });
        })
        .catch(next)
    }
    
    static signin(req, res, next) {
        const { email, password } = req.body;
        
        User.findOne({email})
        .then(user => {
            if (user) {
                if (comparePassword(password, user.password)) {
                    const payload = {
                        UserId: user.id,
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