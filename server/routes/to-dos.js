const express = require('express')
const router = express.Router()
const ToDosController = require('../controllers/to-dos')
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
router.use(authentication)

router.get('/', ToDosController.findAll)
router.post('/', ToDosController.create)
router.patch('/:id', authorization, ToDosController.patch)
router.put('/:id', authorization, ToDosController.replace)
router.delete('/:id', authorization, ToDosController.delete)

module.exports = router;