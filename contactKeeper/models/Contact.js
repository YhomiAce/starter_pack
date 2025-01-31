const mongoose = require('mongoose');

 const contactSchema = mongoose.Schema({
   user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'users'
   },
   name:{
     type:String,
     required:true
   },
   email:{
     type:String,
     required:true,
   },
   phone:{
     type:String,
   },
   type:{
     type:String,
     default:'personal'
   },
   created_at:{
     type:Date,
     default:Date.now
   }
 })

 module.exports = mongoose.model('Contact',contactSchema);
