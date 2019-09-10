const { verifyToken } = require('../helpers/jwt');
const Task = require('../models/task');
const Project = require('../models/project');

module.exports = {
    Authentication: (req, res, next) => {
        if (req.headers.token) {
            try {
                let decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            }
            catch{
                throw new Error({ status: 401, message: "invalid token", err: err })
            }
        }
        else {
            throw new Error({ status: 401, message: "please login first" })
        }
    }
    ,
    Authorization: (req, res, next) => {
        const _id = req.params.id;
        const UserId = req.decode.id;
        Task.findById({
            _id
        })
            .then(function (task) {
                if (task.UserId == UserId) {
                    next()
                } else {
                    next({ status: 401, message: "Unauthorized action!" })
                }
            })
            .catch(next)
    },
    AuthorizationOwner: (req, res, next) => {
        const _id = req.params.id;
        const member = req.decode._id || req.decode.id;
        Project.findById({
            _id
        })
            .then(function (project) {
                if (project.members[0] == member) {
                    next()
                } else {
                    next({ status: 401, message: "Unauthorized action!" })
                }
            })
            .catch(next)
    },
    AuthorizationMember: (req, res, next) => {
        const _id = req.params.id;
        const check = req.decode._id || req.decode.id;
        Project.findById({
            _id
        })
            .then(function (project) {
                let action = false;
                project.members.forEach(member => {
                    if (member._id == check) {
                        action = true
                    }
                })
                if (action) {
                    console.log(`loslsolssoso`);
                    next()
                } else {
                    next({ status: 401, message: "Unauthorized action!" })
                }
            })
            .catch(next)
    }

}