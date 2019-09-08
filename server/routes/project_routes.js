const express = require('express');
const router = express.Router();

const { project_controller } = require('../controllers')

const { Authenthication } =  require('../middelware');

router.use(Authenthication)

router.get('/'  , project_controller.getAll )
router.get('/AllUser' ,  project_controller.getUser)
router.post('/' ,  project_controller.createProject)


module.exports = router
