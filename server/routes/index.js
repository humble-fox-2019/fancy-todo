const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')

router.get('/', (req, res) => res.send('Hello World!'))

router.use('/users', user)
router.use('/todos', todo)

module.exports = router