const router = require('express').Router()


const user = require('../controller/user')

router.post('/signInGoogle', user.signInGoogle)
router.post('/signin', user.signIn)
router.post('/signup', user.signUp)

module.exports = router 