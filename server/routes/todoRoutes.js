const router = require('express').Router()
const todoController = require('../controllers/todoController')
const todoAuthorization = require('../middleware/todoAuthorization')

router.use(todoAuthorization)
router.post('/', todoController.create)
router.get('/', todoController.getAll)
router.get('/:id', todoController.getOne)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router
