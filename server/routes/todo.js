const express = require('express')
const todoController = require('../controllers/todo')
const router = express.Router()
const { TodoAuthorization } = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')

router.use(Authentication)
router.post('/:listId', todoController.create)
router.get('/:listId', todoController.read)
router.put('/:listId/:id', TodoAuthorization, todoController.update)
router.delete('/:listId/:id', TodoAuthorization, todoController.delete)

module.exports = router