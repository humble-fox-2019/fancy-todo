const router = require('express').Router()
const projectController = require('../controllers/projectController')
const projectAuthorization = require('../middleware/projectAuthorization')

router.post('/', projectController.create)
router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)

router.put('/:id/addMember',projectAuthorization, projectController.addMember)
router.put('/:id',projectController.update)
router.delete('/:id', projectController.delete)


module.exports = router
