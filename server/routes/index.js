const express = require('express');
const router = express.Router();
const userRoute = require('../routes/user');
const toDosRoute = require('../routes/to-dos')
router.use('/user', userRoute )
router.use('/todos', toDosRoute )


module.exports = router;