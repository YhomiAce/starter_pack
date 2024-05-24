const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  product_name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  brand:{
    type:String,
    required:true,
  },
  code:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now
  }
})
module.exports = mongoose.model('Product',ProductSchema)
