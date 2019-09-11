const User = require('../models/user')
const { generateToken } = require('../helpers/jwt');
const { compareHash } = require('../helpers/hash')

class UserController {
    static register(req,res){
        let newUser = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(newUser).then((user) =>{
            const payload = {
                id : user._id,
                email : user.email
            };
            const token = generateToken(payload);
            res.status(201).json({
                message: "registered",
                token
            })
        }).catch ((err)=>{
            res.status(400).json({
                message : "failed to add a new user",
                err
            })
        })
    }

    static findAll(req,res){
        User.find().then((users)=>{
            res.status(200).json({
                message: "displaying all users",
                users
            })
        }).catch((err)=>{
            res.status(400).json({
                message: "failed loading users",
                error : err
            })
        })
    }

    static login(req,res){
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email}).then((user) =>{
            if (user){
                if(compareHash(password,user.password)){
                    const payload = {
                        id : user._id,
                        email : user.email
                    };
                    const token = generateToken(payload);
                    res.status(201).json({
                        message: "logged in",
                        token
                    })
                } else{
                        throw "invalid username/password"
                }
            } else {
                    throw 'invalid username/password'
            }
        })
        .catch ((message)=>{
            res.status(400).json({
                message
            })
        })
    }
}

module.exports = UserController;