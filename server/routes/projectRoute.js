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

// router.post('/accept/:id', isMember, ProjectController.accept);
// router.post('/decline/:id', isMember, ProjectController.decline);

module.exports = router;