const Project = require('../models/Project')

function todoAuthorization(req, res, next) {
  let projectid = req.headers.projectid
  if(!projectid) {
    return next({
      status: 400,
      message: 'Required Project Id'
    })
  }else {
    Project.findById(req.headers.projectid)
      .then(project => {
        let isMember = false
        for(let i=0;i<project.members.length;i++) {
          if(project.members[i] == req.decode._id) {
            isMember = true
          }
        }
        if(isMember) {
          next()
        }else if(project.owner == req.decode._id) {
          next()
        }else {
          next({
            status: 401,
            message: 'Unauthorized action'
          })
        }
      })
  }
}


module.exports = todoAuthorization
