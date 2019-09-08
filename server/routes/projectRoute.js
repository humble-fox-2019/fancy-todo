const express = require('express');
const ProjectController = require('../controllers/projectController');
const { isMember } = require('../middlewares/authorization');

const router = express.Router();

router.get('/user', ProjectController.getUserProject);
router.post('/', ProjectController.store);

// router.use("/:id", isMember);
router.get('/:id', isMember, ProjectController.findOne);
router.patch('/:id', isMember, ProjectController.update);
router.delete('/:id', isMember, ProjectController.delete);

router.post('/invite/:id', isMember, ProjectController.invite);
router.delete('/leave/:id', isMember, ProjectController.leave);

router.post('/todos/:id', isMember, ProjectController.storeTodo);
router.get('/todos/user/:status/:id', isMember, ProjectController.getUserTodo);
router.get('/todos/:id/:todoId', isMember, ProjectController.findOneTodo);
router.patch('/todos/:id/:todoId', isMember, ProjectController.updateTodo);
router.delete('/todos/:id/:todoId', isMember, ProjectController.deleteTodo);

module.exports = router;