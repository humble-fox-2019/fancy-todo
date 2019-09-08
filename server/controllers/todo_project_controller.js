const { Project , User  } = require('../models')
class todo_project_controller {
    static deleteTodo(req,res,next){
        console.log(req.params)
         let { id , todoId } =  req.params
         Project.findById(id)
         .then(data=>{
            console.log(data.Todo , ' BEFORE<<<<<<<<<<')
             data.Todo =  data.Todo.filter(el => el._id != todoId)
             console.log(data.Todo , ' AFTER<<<<<<<<<<')
             data.save()
         })
         .catch(next)
        // res.json({
        //     l : 'm'
        // })
    }

    static completeTodo (req,res,next){
        let { id , todoId } =  req.params
        Project.findById(id)
        .then(data=>{
            data.Todo.forEach(el=>{
                if(el._id == todoId){
                    el.status = true
                }
            })
            data.save()
         })
         .catch(next)
    }

    static uncompleteTodo (req,res,next){
        let { id , todoId } =  req.params
        Project.findById(id)
        .then(data=>{
            data.Todo.forEach(el=>{
                if(el._id == todoId){
                    el.status = false
                }
            })
            data.save()
         })
         .catch(next)
    }

    static addNewMember (req,res,next){
        let project;
        let result;
        Project.findById(id)
        .then(data=>{
            project = data
            return User.find({})
        })
        .then(user=>{
            console.log(project.memberUser.diff(user))
            // user.forEach(el=>{
            //     el.memberUser.forEach(al=>{
                    
            //     })
            // })
            res.json({
                m : 'pppppp'
            })
        })
    }
}

module.exports = todo_project_controller