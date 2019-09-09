const Project = require('../models/Project')

function projectAuthorization(req, res, next) {
  const id = req.params.id
  Project.findById(id)
    .then(project => {
      if(project) {
        if(project.owner == req.decode._id) {
          next()
        }else{
          next({
            status: 401,
            message: 'You are not authorized'
          })
        }
      }else{
        next({
          status: 404,
          message: 'Project not found'
        })
      }
    })
    .catch(next)
}


module.exports = projectAuthorization
