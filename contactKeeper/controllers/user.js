const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

exports.register = async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {name,email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if(user){
      return  res.status(400).json({msg:"Email is already registered"});
    }

    user =  new User({
      name,
      email,
      password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    await user.save();
    const payload = {
      user:{
        id:user.id
      }
    };
    const token = await jwt.sign(payload,config.get('jwtSecret'),{
      expiresIn:3600
    });

    res.status(202).json({msg:'User Registered',token:token});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({msg:"Server error"});
  }
}
