const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/authentication')
const { authorizationTodo } = require('../middleware/authorization')
const sendIncompletedTodo = require("../helpers/incompletedTodo")
const CronJob = require("cron").CronJob


router.use(authentication)

// router.get('/extra/uncompleted', UncompletedTodo)
router.get('/', TodoController.getAll)
router.get('/projects/:id', TodoController.getByProject)
router.get('/:id', TodoController.getOne)
router.post('/', TodoController.create)
router.patch('/:id', authorizationTodo, TodoController.update)
router.delete('/:id', authorizationTodo, TodoController.delete)


new CronJob(' 0 8 * * 1', function () {

    sendIncompletedTodo()

}, null, true, 'Asia/Jakarta');

module.exports = router
