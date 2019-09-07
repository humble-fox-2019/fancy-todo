const router = require('express').Router();
const projectRoute = require('./projectRoute');
const todoRoute = require('./todoRoute');
const userRoute = require('./userRoute');

const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

router.use('/projects', projectRoute)
router.use('/todos', todoRoute)
router.use('/users', userRoute)

module.exports = router
