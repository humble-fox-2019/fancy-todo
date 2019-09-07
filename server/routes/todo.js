const router = require('express').Router();
const TodoController = require('../controllers/todo');
const { authentication } = require('../middlewares/authentication');
const { isOwner } = require('../middlewares/authorization');

router.use(authentication);

router.get('/', TodoController.findAll);

router.post('/', TodoController.create);

router.put('/:id', isOwner, TodoController.update);

router.patch('/:id/done', isOwner, TodoController.doneUndone);

router.delete('/:id', isOwner, TodoController.delete);

module.exports = router;