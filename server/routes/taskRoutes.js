const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const { Authentication, Authorization} = require('../middlewares/authentication');

router.use(Authentication);
router.post('/', TaskController.create);
router.get('/', TaskController.readAll);
router.get('/:id', Authorization, TaskController.readOne);
router.delete('/:id', Authorization, TaskController.delete);
router.patch('/:id', Authorization, TaskController.changeStatus);
router.put('/:id', TaskController.edit);

module.exports = router;