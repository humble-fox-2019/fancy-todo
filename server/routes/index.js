const express = require('express')
const userRouter = require('./user')
const todoRouter = require('./todo')
const router = express.Router()

router.use('/users', userRouter )
router.use('/todos', todoRouter)

module.exports = router