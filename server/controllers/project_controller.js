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


    static getInvitaion (req,res,next) {
        Project.find({

        }).populate('memberUser').populate('Invitation.invited').populate('Invitation.inviter')
        .then(data=>{
            let result = []
                data.forEach(el=>{
                el.Invitation.forEach(al=>{
                    if(al.invited._id == req.decode.data._id){
                        result.push({
                            ProjectName : el.name,
                            inviter : al.inviter.name,
                            _id : el._id
                        })
                    }
                })
            })
            res.json(result)
        })
        .catch(next)
    }


    static confirmProject (req,res,next) {
        let { id } = req.params
        // console.log(id , ' - LOL -')
        Project.findOne({
            _id : id
        }).populate('memberUser').populate('Invitation.invited').populate('Invitation.inviter')
        .then(data=>{
            console.log( JSON.stringify(data.Invitation , null ,  2), ' RESULT <<<<')
            data.Invitation =  data.Invitation.filter(el => el.invited._id != req.decode.data._id)
            console.log(JSON.stringify(data.Invitation , null ,  2) , ' SECOND')
            data.memberUser.push(req.decode.data._id)
            res.json(data )
            data.save()
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
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
            name , description : des , due_date : date , memberUser : req.decode.data._id , Invitation : dataResult , owner : req.decode.data._id
        })
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }

    static findOneProject (req,res,next){
        Project.findOne({
            _id : req.params.id,

        }).populate('Invitation.invited').populate('Invitation.inviter').populate('Todo.maker')
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

    static addTodo(req,res,next) {
        let {name , des , date } = req.body
        let result = { name , description : des , due_date : date , maker : req.decode.data._id }
        Project.findOne({
            _id : req.params.id
        })
        .then(data=>{
            // res.json
            console.log(result , '  <<<<<<<<<<<< ini data , MASUK YAAA !!!!')
            // console.log(req.body.name)
            res.json({
                m : 's'
            })
            data.Todo.push(result)
            data.save()
        })
        .catch(next)
    }
}

module.exports = project_controller;