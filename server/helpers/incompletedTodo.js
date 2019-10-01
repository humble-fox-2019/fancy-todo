const Todo = require('../models/Todo')
const User = require('../models/User')
const CronJob = require("cron").CronJob
const moment = require('moment')
const sendEmail = require('./sendEmail')


function includeManual(arrayOfObject, value) {
    let array = arrayOfObject
    let keyword = value

    for (let user of array ){
        // console.log(user)
        if (user._id === keyword){
            return true
        }
    }

    return false
}


function sendIncompletedTodo(){
    // console.log("masuk ke uncompleted todo")

    let users = []
    
    Todo.find({
        status : false,
        ProjectId : null
    })
    .populate({
        path : "UserId",
        select : "_id username email"
    })
    .then(alltodo=>{

        // res.status(200).json(alltodo)
        for(let todo of alltodo){

            let objtodo = {
                name : todo.name,
                description : todo.description,
                due_date : todo.due_date
            }
            
            let userid = todo.UserId._id
            let userDetail = {
                _id : todo.UserId._id,
                username : todo.UserId.username,
                email : todo.UserId.email,
                todos : []
            } 
            
            // console.log(userDetail)
            if(!includeManual(users,userid)){
                users.push(userDetail)
            }
            for (let user of users){
                if (user._id===todo.UserId._id){
           
                    user.todos.push(objtodo)
                }
            }            
        }
        
        for(let user of users){
            let message = "List of incompleted todo"
            let num=1
            for (let todo of user.todos){
                message += "\n"
                message += `${num}.  Project Name : ${todo.name}\n`
                message += `Project Description : ${todo.description}`
                message +="\n"
                num+=1
            }
            sendEmail(user.email, message)
        }

        // res.status(200).json("successfully sent message")
    })
    .catch(err=>{
        // next(err)
        console.log(err)
    })

}

module.exports = sendIncompletedTodo
