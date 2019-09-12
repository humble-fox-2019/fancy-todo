const moongose = require('mongoose')
const {Schema} = moongose

const todoSchema = Schema({
  name : {
    type : String,
    required : [true, 'Title is required']
  },
  description : {
    type : String,
    required : [true, 'Description is required']
  },
  status : {
    type: Boolean,
    default: false
  },
  dueDate : {
    type : Date,
    required: [true, 'Due date is required']
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  UserId : {
    type : String,
    ref : 'User'
  }
})

// todoSchema.methods.getDaysLeft = function(){
//   let day = 24 * 3600 * 1000
//   let today = new Date().getTime()
//   let dueDate = this.dueDate.getTime()
//   let difference = Math.floor((dueDate - today) / day)
//   if (difference < 0) {
//     return `It's already pass ${Math.abs(difference)} days`
//   }
//   else if (difference === 0) {
//     return 'Today'
//   }
//   else {
//     return `${difference} days left`
//   }
// }

const Todo  = moongose.model('Todo',todoSchema)

module.exports = Todo

