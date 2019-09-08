const { Project , User } = require('../models')

class project_controller {

    static getAll(req, res, next) {
        Project.find({
            memberUser : req.decode.data._id
        }).populate('memberUser').populate('Invitation.invited').populate('Invitation.inviter')
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }

    static createProject(req,res,next) {
        let { name , des , date , member } = req.body
        let dataResult = JSON.parse(member).map(el=>{
            return {
                invited : el.id,
                inviter : req.decode.data._id
            }
        })
        console.log( JSON.parse(member) , name  , des , date)
        console.log(dataResult)
        // res.json(req.body)
        Project.create({
            name , description : des , due_date : date , memberUser : req.decode.data._id , Invitation : dataResult
        })
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }

    static deleteProject (req,res,next){
        Project.deleteOne({
            _id : req.params.id
        })
        .then(data=>{
            res.status.json(data)
        })
        .catch(next)
    }

    static getUser (req,res,next){
        console.log(req.decode.data._id , ' ini penting yaaaa')
        User.find({  _id : { $ne : req.decode.data._id }  })
        .then(data=>{
            // let temp = []
            // let tempId = []
            // data.forEach(el=>{
            //     temp.push(el.name)
            //     tempId.push(el._id)
            // })
            // res.json({
            //     data , 
            //     listUserName : temp,
            //     listId : tempId
            // })
            res.json(data)
        })
        .catch(next)
    }
}

module.exports = project_controller;