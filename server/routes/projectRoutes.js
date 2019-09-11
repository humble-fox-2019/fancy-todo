const router = require('express').Router();
const ProjectController = require('../controllers/projectController');
const { Authentication, AuthorizationOwner, AuthorizationMember } = require('../middlewares/authentication');

router.use(Authentication);
router.post('/', ProjectController.create);
router.get('/', ProjectController.readAll);
router.get('/:id', AuthorizationMember, ProjectController.readOne);
router.patch('/:id', AuthorizationMember, ProjectController.addMember);
router.delete('/:id', AuthorizationOwner, ProjectController.delete);

module.exports = router;