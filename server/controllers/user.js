const User = require('../models/user')
const { generateJWTToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const { hashPassword } = require('../helpers/bcrypt')
class UserController {
    static createUser(req, res, next){
        const { username, email, password } = req.body
        User.create({
            username,
            email, 
            password
        })
        .then(user =>{
            res.status(201).json({message: "Success"})
        })
        .catch(next)
    }

    static loginForm(req, res, next){
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user && comparePassword(password, user.password)){
                let payload = {
                    _id: user._id,
                    email: user.email
                }
                let token = generateJWTToken(payload)
                res.status(200).json({token, username: user.username})
            }
            else if(user){
                next({status: 404, message: "invalid password"})
            }
            else{
                next({status: 404, message: "User does not exist. Please register first!"})
            }
        })
        .catch(next)
    }
    static loginGoogle(req, res, next){
        const client = new OAuth2Client(process.env.GTOKEN)
        let data = null
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GTOKEN
        })
        .then(payload =>{
            data = payload.payload
            return User.findOne({
                email: data.email
            })
        })
        .then(user =>{
            if(user)return user
            else{
                return User.create({
                    username: data.family_name,
                    email: data.email,
                    password: hashPassword('aksjdflaknsldnaldskv')
                })
            }
        })
        .then(user =>{
            let payload = {
                _id: user._id,
                email: user.email
            }
            let token = generateJWTToken(payload)
           
            res.status(200).json({token, username: user.username})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController