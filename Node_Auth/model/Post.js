const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  post_image:{
    type:String,
  },
  created_at:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Post',postsSchema);
