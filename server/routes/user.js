const express = require('express')
const userController = require('../controllers/user')
const route = express.Router()

route.post('/', userController.register)
route.post('/signIn', userController.signIn)
route.post('/login', userController.login)
route.put('/:id', userController.update)
route.patch('/:id', userController.updatePassword)
route.delete('/:id', userController.delete)

module.exports = route