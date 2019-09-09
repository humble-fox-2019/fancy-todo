const router = require('express').Router()
const UserController = require('../controllers/user')


console.log('mmmmm');
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/loginOauth', UserController.loginFromOauth)

module.exports = router