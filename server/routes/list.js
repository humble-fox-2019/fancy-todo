const express = require('express')
const listController = require('../controllers/list')
const { ListAuthorization } = require('../middlewares/authorization')
const Authentication = require('../middlewares/authentication')
const router = express.Router()

router.use(Authentication)
router.get('/', listController.read)
router.post('/', listController.create)
router.get('/:id', ListAuthorization, listController.findById)
router.put('/:id', ListAuthorization, listController.update)
router.delete('/:id', ListAuthorization, listController.delete)

module.exports = router