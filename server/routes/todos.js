const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authenticate =  require('../middlewares/authenticate')
const authorizeTodo = require('../middlewares/authorizeTodo')

router.use(authenticate)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.findAll)
router.patch('/:_id', authorizeTodo, TodoController.updateOne)
router.delete('/:_id', authorizeTodo, TodoController.removeOne)

module.exports = router