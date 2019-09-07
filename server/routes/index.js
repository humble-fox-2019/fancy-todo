const express = require('express')
const userRouter = require('./user')
const listrouter = require('./list')
const todoRouter = require('./todo')
const router = express.Router()

router.use('/users', userRouter)
router.use('/lists', listrouter)
router.use('/todos', todoRouter)

module.exports = router