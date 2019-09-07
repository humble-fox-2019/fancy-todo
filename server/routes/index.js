const express = require ('express')
const router = express.Router()
const user = require('./userRouter')
const todo = require('./todoRouter')

router.use('/users', user)
router.use('/todos', todo)


module.exports = router