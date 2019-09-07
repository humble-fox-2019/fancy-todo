const router = require('express').Router();
const TodoController = require('../controllers/todo');

router.get('/', TodoController.findAll);

router.post('/', TodoController.create);

router.put('/:id', TodoController.update);

router.patch('/:id/done', TodoController.doneUndone);

router.delete('/:id', TodoController.delete);

module.exports = router;