const Project = require('../models/Project')
const User = require('../models/User')

class ProjectController {

  static create(req, res, next) {
    const { title, description } = req.body
    const owner = req.decode._id

    Project.create({ title, description, owner })
      .then(project => {
        return Project.findById(project._id).populate('owner')
      })
      .then(project => {
        res.json(project)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    const userId = req.decode._id
    Project.find({$or: [{"owner": userId}, {"members._id": userId}]})
    .populate('owner')
      .then(projects => {
        res.json(projects)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Project.findById(req.params.id)
      .then(project => {
        res.json(project)
      })
      .catch(next)
  }

  static delete(req, res, next) {

  }

  static update(req, res, next) {

  }

  static addMember(req, res, next) {
    Project.findById({ _id: req.params.id})
      .then(project => {
        let isAdded = false
        for(let i=0;i<project.members.length;i++) {
          if(project.members[i] == req.body.member) {
            isAdded = true
          }
        }
        if(isAdded){
          return next({
            status: 400,
            message: 'Already added'
          })
        }else {
          return User.findById(req.body.member)
        }
      })
      .then(user => {
        if(user) {
          return Project.findByIdAndUpdate({
            _id: req.params.id
          },{
            $push: {
              members: req.body.member
            }
          },{
            new: true
          })
        }else {
          next({
            status: 404,
            message: 'User not found'
          })
        }
      })
    .then(project => {
      res.json(project)
    })
    .catch(next)
  }
}


module.exports = ProjectController
