const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')

const userAuthentication = require('../middlewares/userAuthentication')

router.get('/', (req, res) => res.send('Hello World!'))

router.use('/user', user)
router.use(userAuthentication)
router.use('/user/todo', todo)

module.exports = router