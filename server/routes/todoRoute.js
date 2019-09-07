const express = require('express');
const TodoController = require('../controllers/todoController');
const { todoAuthorization } = require('../middlewares/authorization');

const router = express.Router();

router.post('/', TodoController.store);
router.get('/user/:createdBy', TodoController.getUserTodo);

router.use("/:id", todoAuthorization);
router.get('/:id', TodoController.findOne);
router.patch('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;