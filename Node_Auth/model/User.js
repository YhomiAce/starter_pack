const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  created_at:{
    type: Date,
    default:Date.now
  }
});

const User = mongoose.model('User',userSchema);
module.exports = User;
