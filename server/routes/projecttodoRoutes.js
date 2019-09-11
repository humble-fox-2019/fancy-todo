const router = require('express').Router();
const ProjectTodoController = require('../controllers/projecttodoController');
const { Authentication, AuthorizationMember } = require('../middlewares/authentication');

router.use(Authentication)
router.get('/:id', AuthorizationMember, ProjectTodoController.readAll);
router.post('/:id', AuthorizationMember, ProjectTodoController.create);
router.patch('/:id', AuthorizationMember, ProjectTodoController.changeStatus);
router.delete('/:id/:todoId', AuthorizationMember, ProjectTodoController.delete);


module.exports = router;