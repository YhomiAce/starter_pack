const mongoose = require('mongoose')

// Article schema
let postSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }

})
let Post= module.exports=mongoose.model('Post',postSchema)
