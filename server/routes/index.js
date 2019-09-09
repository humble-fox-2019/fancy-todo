const router = require('express').Router();
const todo = require('./todo');
const user = require('./user')

router.use('/todo', todo);
router.use('/user', user)


module.exports = router;