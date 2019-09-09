const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  status: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date required']
  }
},{
  timestamps: true
})

todoSchema.path('dueDate').validate(function(value) {
  let now = new Date().getTime()
  let time = new Date(value).getTime()
  if(time < now) {
    return false
  }
}, 'Invalid date')


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
