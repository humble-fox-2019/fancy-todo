var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name : {
      type : String,
      required : true
  },
  description : {
    type : String
  },
  status : {
    type : Boolean,
    default : false
  },
  due_date : {
    type : Date,
    default : new Date(),
    required : true
  },
  memberUser : [{
    type : Schema.Types.ObjectId ,  ref : 'User',
    default : []
  }],
  Invitation : [{
    invited : {
      type : Schema.Types.ObjectId ,  ref : 'User'
    },
    inviter : {
      type : Schema.Types.ObjectId ,  ref : 'User'
    }
  }]
},{
    timestamps : { createdAt : 'created_at' }
});

let Project = mongoose.model('Project' , ProjectSchema)


module.exports = Project