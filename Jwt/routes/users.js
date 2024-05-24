const express = require('express');
const router = express.Router();
const {registerValidation,loginValidation} = require('../config/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');



router.get('/',(req,res)=>{
  res.json('Hello World')
})

router.post('/register', async (req,res)=>{
  //check validation
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message);

      // check if user already exist
      const emailExist = await User.findOne({email:req.body.email})

      if(emailExist) return res.status(400).send('Email already exist');

      // encrypt password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt)

  const user = new User({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:hashedPassword
  })

  try {
    const savedUser =await user.save()
    res.send(savedUser)
  } catch (e) {
    res.send(e)
  }
})

// login

router.post('/login', async (req,res)=>{
  //check validation

  const {error} = loginValidation(req.body)
  if(error) return  res.status(400).send(error.details[0].message);

  // check if user exist

  const userExist = await User.findOne({email:req.body.email})
  if(!userExist) return res.status(404).send("Email doesn't exist");

  // compare password with the stored password
  const validPassword = await bcrypt.compare(req.body.password,userExist.password)
  if(!validPassword) return res.status(400).send("Password is incorrect")
  //Create jsonwebtoken
  const token = jwt.sign({id:userExist._id},process.env.SECRET_TOKEN)
  res.header('auth-token',token).send({msg:"Login Successful",secret:token})

})


module.exports = router;
