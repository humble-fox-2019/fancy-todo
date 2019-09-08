const router = require('express').Router()
const authentication = require('../middleware/authentication')
const authorized = require('../middleware/authorized')

const todoController = require('../controller/todos')

// seluruh kegiatan dalam todo hanya bisa diakses apabila sudah signIn 

router.use(authentication)
router.get('/', todoController.findAll)
router.post('/', todoController.create)
router.get('/search', todoController.search)

router.get('/:id', todoController.findById)
router.put('/:id', authorized, todoController.update)
router.delete('/:id', authorized, todoController.delete)

module.exports = router