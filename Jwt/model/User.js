const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:5
  },
  email:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    min:5
  },
  password:{
    type:String,
    required:true,
    min:5
  },
  date:{
    type:Date,
    default:Date.now
  }
})

const User = mongoose.model('User',UserSchema)
module.exports = User;
