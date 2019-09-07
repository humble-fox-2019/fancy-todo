const express = require('express')
const router = express()
const UserController = require('../controllers/userController')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
// router.post('/loginGoogle')

module.exports = router