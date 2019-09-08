const express = require('express');
const authentication = require('../middleware/authentication')
const { authorization }= require('../middleware/authorization')
const UserController = require('../controllers/user')

const router = express.Router();

router.post('/signup', UserController.signup );
router.post('/signin', UserController.signin );
router.post('/googleSignIn' , UserController.googleSignIn )

router.patch('/update/password' , authentication , authorization , UserController.updatePassword )

module.exports = router;