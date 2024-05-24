const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const User = require('../models/User');
const config = require('config');


//login controller
exports.login = async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if(!user){
      return res.status(400).json({msg:"Email does not exist"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({msg:"Password is incorrect"});
    }

    const payload = {
      user:{
        id:user._id
      }
    };
    const token = await jwt.sign(payload,config.get('jwtSecret'),{
      expiresIn:3600
    });
    res.status(200).json({msg:"User logged in",token});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:'Server error'});
  }
}


// get logged in user
exports.getUser = async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:'Server Error'});
  }
}
