const express = require ('express')
const router = express.Router()
const user = require('./userRouter')
const todo = require('./todoRouter')
const ApiController = require('../controllers/apiController')

router.use('/users', user)
router.use('/todos', todo)
router.post('/api/sendEmail', ApiController.sendEmail)


module.exports = router