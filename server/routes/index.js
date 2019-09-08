const router = require('express').Router()
const todoRouter = require('./todos.js')
const userRouter = require('./user')
router.get('/', (req, res, next)=>{
    res.status(200).json({message: "server is on!"})
})

router.use('/todos', todoRouter)
router.use('/users', userRouter)
module.exports = router