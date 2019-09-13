'use strict'

const express = require('express')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()
const { UserController } = require('../controllers')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logingoogle', UserController.loginGoogle)

router.use(authentication)
router.get('/', UserController.getAll)
router.get('/:email', UserController.findOne)

module.exports = router
