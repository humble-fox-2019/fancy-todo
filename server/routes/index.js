const router = require('express').Router()
const userRoutes = require('./userRoutes')
const todoRoutes = require('./todoRoutes')
const projectRoutes = require('./projectRoutes')
const userAuthentication = require('../middleware/userAuthentication')

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

router.use('/user', userRoutes)
router.use(userAuthentication)
router.use('/project', projectRoutes)
router.use('/todo', todoRoutes)


module.exports = router
