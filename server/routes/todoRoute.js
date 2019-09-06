const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();

router.get('/', TodoController.findAll);
router.get('/:id', TodoController.findOne);
router.post('/', TodoController.store);
router.patch('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;