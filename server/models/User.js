const node = require('../node')
const helpers = require('../helpers')

const mongoose = node.mongoose
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), { useNewUrlParser : true });
}


const userSchema = new Schema({
  
  'name': { 
    type: String,
    required: true
   },
  'email': { 
    type: String,
    required: true,
    unique: true
  },
  'password': { 
    type: String,
    required: true
   },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

userSchema.pre('save', function(next){
  this.password = helpers.bcryptjs.generateHash(this.password)
  this.updatedAt = Date.now();
  next();
});

userSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

userSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

userSchema.plugin(node.mongoose_unique_validator)

module.exports = mongoose.model('User', userSchema);
