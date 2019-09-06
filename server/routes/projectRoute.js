const express = require('express');
const ProjectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', ProjectController.findAll);
router.get('/:id', ProjectController.findOne);
router.post('/', ProjectController.store);
router.patch('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);
router.post('/:id/invite', ProjectController.invite);
router.post('/:id/accept', ProjectController.accept);
router.post('/:id/decline', ProjectController.decline);
router.post('/:id/leave', ProjectController.leave);

module.exports = router;