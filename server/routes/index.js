const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')

router.get('/', (req, res) => res.send('Hello World!'))

router.use('/user', user)
router.use('/user/todo', todo)

module.exports = router