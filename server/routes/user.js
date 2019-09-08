const router = require('express').Router()
const UserController = require('../controllers/user')
router.post('/register', UserController.createUser)
router.post('/loginform', UserController.loginForm)
router.post('/logingoogle', UserController.loginGoogle)

module.exports = router