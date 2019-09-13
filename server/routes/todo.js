'use strict'

const express = require('express')
const { TodoController } = require('../controllers')
const { authorization } = require('../middlewares/authorization')
const router = express.Router()

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.patch('/:id', authorization, TodoController.edit)
router.delete('/:id', authorization, TodoController.remove)

module.exports = router
