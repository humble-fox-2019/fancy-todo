'use strict'

const express = require('express')
const userRouter = require('./user')
const todoRouter = require('./todo')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Connected to Fancy Todo Apps!'
  })
})

// Routing
router.use('/users', userRouter)
router.use(authentication)
router.use('/todos', todoRouter)

module.exports = router
