const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

router.post('/register', userController.register)
router.post('/signIn', userController.signIn)
router.post('/login', userController.login)
router.get('/:username', userController.findOne)
router.put('/:username', userController.update)
router.patch('/:username', userController.updatePassword)
router.delete('/:username', userController.delete)

module.exports = router