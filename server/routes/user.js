const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', UserController.findAll);

router.post('/signup', UserController.signup);

router.post('/signup/google', UserController.googleSignUp);

router.post('/signin', UserController.signin);

module.exports = router;