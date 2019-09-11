const router = require('express').Router();
const UserController = require('../controllers/userController');
const { Authentication } = require('../middlewares/authentication');

router.post('/sign-up', UserController.create);
router.post('/sign-in', UserController.login);
router.post('/g-signin', UserController.google);
router.get('/', Authentication, UserController.readAll);

module.exports = router;