const router = require('express').Router()
const controller = require('../controllers/todo')
const authentication = require('../middlewares/authToken')

router.use(authentication)
router.post('/create', controller.createTodo)
router.get('/gettodo', controller.findTodo)
router.get('/getbyid/:id', controller.findOne)
router.patch('/updatetodo/:id', controller.updateTodo)
router.delete('/delete/:id', controller.deleteTodo)

module.exports = router