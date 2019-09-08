const router = require('express').Router()
const { TodoController } = require('../controllers')
const userAuthentication = require('../middlewares/userAuthentication')
const userAuthorization = require('../middlewares/userAuthorization')

router.use(userAuthentication)
router.get('/', TodoController.getAll)
router.post('/', TodoController.create)

router.use('/:id', userAuthorization)
router.get('/:id', TodoController.getOne)
router.put('/:id', TodoController.update)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.delete)

module.exports = router