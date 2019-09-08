const User = require('../models/user');

const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../helpers/jwt');
const { hash, compare } = require('../helpers/bcrypt');
const sendEmail = require('../helpers/mailer')
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const client = new OAuth2Client(GOOGLE_PRIVATE_KEY);



class UserController {
    static signin ( req, res , next ) {
        const { email , password } = req.body 
        User.findOne({ email })
        .then ( user => {
            if ( user ) {
                if ( compare( password , user.password ) ) {
                    let token = generateToken ({
                        id : user._id,
                        email : user.email
                    })
                    res.status(200).json({ status : 200 , message : "Login Success" , token });
                } else {
                    next({ status : 400 , message : "Invalid username / password"})
                }
            } else {
                next({ status : 400 , message : "Invalid username / password"})
            }
        })
        .catch ( next )
    }

    static signup ( req , res , next ){
        let { email , password } = req.body;

        User.create({ email , password })
        .then ( createdUser => {
            let token = generateToken({ 
                id : createdUser._id ,
                email : createdUser.email
            })
            sendEmail( createdUser.email, "Your email has been registered! Enjoy our website!" , function( err) {
                if ( err ) console.log("SEND EMAIL FAILED")
                else console.log("Email sent..")
            } );
            res.status(201).json({ status : 201 , message : "User Created", token });
        })
        .catch ( next );
    }

    static googleSignIn ( req, res ,next ) {
        const token = req.body.idToken;
        let payload = null;
        client.verifyIdToken({
            idToken : token ,
            audience : GOOGLE_PRIVATE_KEY
        })
        .then( ticket => {
            payload = ticket.getPayload();
            return User.findOne({ email : payload.email })
        })
        .then ( foundUser => {
            if ( foundUser )
                return foundUser
            else {
                sendEmail( payload.email , "Your Gmail Account has been registered! Enjoy our website!, If you want to login without gmail you can change your password" , function( err) {
                    if ( err ) console.log("SEND EMAIL FAILED")
                    else console.log("Email sent..")
                });
                return User.create({ email : payload.email , password : process.env.DEFAULT_PASSWORD })
            }
        })
        .then ( user => {
            const token = generateToken ({
                id : user._id,
                email : user.email
            })
            res.status(200).json({ status: 200 , message : "Login Success" , token })
        })
        .catch( next )
    }

    static updatePassword ( req, res , next ) {
        User.findOneAndUpdate(
            { email : req.decode.email } , 
            { $set : { password : req.body.password }},
            { runValidators: true }
        )
        .then( updated =>{ 
            return User.findOneAndUpdate(
                { email : req.decode.email } , 
                { $set : { password : hash ( req.body.password ) }}
            )
        })
        .then ( finalUpdate => {
            res.status(200).json({ status: 200 , message : "Password Updated" })
        })
        .catch ( next );
    }
}

module.exports = UserController;