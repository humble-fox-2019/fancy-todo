const express = require('express');
const TodoController = require('../controllers/todo')
const { authorization , updateDeleteAuthorization  } = require('../middleware/authorization')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.use( authentication )
router.use( authorization );


router.get('/' , TodoController.getAll )
router.get('/:id' , TodoController.getOne )
router.get('/status/:completed' , TodoController.getByCompleted )
router.post('/' , TodoController.insert )

router.use( updateDeleteAuthorization )
router.put('/' , TodoController.update )
router.patch('/'  , TodoController.updateCompleted )
router.delete('/', TodoController.delete )

module.exports = router;