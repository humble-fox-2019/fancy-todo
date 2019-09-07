const express = require('express')
const router = express()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/create', authentication, TodoController.create)
router.get('/', authentication, TodoController.getAll)
router.get('/:id', authentication, authorization, TodoController.getOne)
router.delete('/:id', authentication, authorization, TodoController.destroy)
router.patch('/:id', authentication, authorization, TodoController.update)
// router.get('/filter', authentication, TodoController.filter)

module.exports = router