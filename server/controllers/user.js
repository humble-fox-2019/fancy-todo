const User = require('../models/user')
const List = require('../models/list')
// const transporter = require('../helpers/nodemailer')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static findOne(req, res, next){
        let user;
        User.findOne({
            username : req.params.username
        })
        .then(data => {
            user = data
            return List.find({ user_id : data._id})
        })
        .then(lists => {
            res.status(200).json({user, lists})
        })
        .catch(next)
    }

    static register(req, res, next){
        const { name, username, password, email, phone } = req.body
        //payload
        User.create({
            name,
            username,
            password,
            email,
            phone
        })
        .then(user => {
            const payload = {
                id : user._id,
                username : user.username,
                email : user.email,
                phone : user.phone
            }

           let token = generateToken(payload)
           res.status(201).json({
               message : `SignUp Success`,
               token : token
           })
        })
        .catch(err => {
            next(err)
        })
    }

    static signIn(req, res, next){
        const email = req.body.email
        User.findOne({
            email
        })
        .then(user => {
            if(user){
                if(comparePassword(req.body.password, user.password)){
                    const payload = {
                        id : user._id,
                        username : user.username,
                        email : user.email
                    }
        
                   let token = generateToken(payload)
                   console.log(token)
                   res.status(201).json({
                       message : `SignIn Success`,
                       token : token,
                       username : user.username
                   })
                }
            } else {
                next({
                    status : 401,
                    message : `username/password not found`
                })
            }
        })
    }

    static login(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
        let payload = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID_GOOGLE
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return  User.findOne({
                email : payload.email
            })
        })
        .then(user => {
            if(user){
                return user
            } else {
                return User.create({
                    name : payload.name,
                    username : payload.jti.slice(0, 10),
                    password : process.env.PASSWORD_USER,
                    email : payload.email,
                    phone : null
                })
            }
        })
        .then(user => {
            const token = generateToken({
                id : user._id,
                username : user.username,
                email : user.email
            })
            res.status(201).json({
                token,
                username : user.username,
                id : user._id
            })
        })
        .catch(next)
    }

    static update(req, res, next){
        const { name, username, email, phone } = req.body 
        User.findOne({ username : req.params.username })
        .then(user => {
           return User.updateOne({
                username : req.params.username
            },{
                name, username, email, phone
            }) 
        })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(next)
    }

    static updatePassword(req, res, next){

    }

    static delete(req, res, next){

    }
}

module.exports = UserController