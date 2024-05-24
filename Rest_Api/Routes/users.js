const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router()

const User = require('../Model/User')

router.get('/register',(req,res)=>{
  res.render('User/register')
})

router.get('/login',(req,res)=>{
  res.render('User/login')
})

router.post('/register',(req,res)=>{
  const {first_name,last_name,email,username,password,password2} = req.body
  let errors = []

  // check all field
  if(!first_name || !last_name || !email || !username || !password || !password2){
    errors.push({msg:"Please fill in all fields"})
    res.render('User/register',{
      errors,
      first_name,
      last_name,
      email,
      username,
    })
  }else{
    // check password match
    if(password !== password2){
        errors.push({msg:"Passwords do not match"})
        res.render('User/register',{
          errors,
          first_name,
          last_name,
          email,
          username,
        })
    }else{

        // check password length
      if(password.length < 5){
        errors.push({msg:"Password is weak. Password should be atleat 5 character"})
        res.render('User/register',{
          errors,
          first_name,
          last_name,
          email,
          username,
        })
      }else{
        // check if a user alreday exist
        User.findOne({email:email})
        .then(user=>{
          console.log(user);
          if(user){
            errors.push({msg:"Email already exissts"})
            res.render('User/register',{
              errors,
              first_name,
              last_name,
              email,
              username,
            })
          }else{
            const newUser = new User({
              first_name:first_name,
              last_name:last_name,
              email:email,
              username:username,
              password:password
            })
            bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password = hash
                newUser.save()
                  .then((user)=>{
                    res.redirect('/users/login')
                  })
                  .catch(err=>{
                    console.log(err);
                  })
              })
            })
          }

        })
      }

    }
  }
})

// gets all users
router.get('/all', async (req,res)=>{
  const allUser= await User.find({})
  res.status(200).json({users:allUser})
})

//login

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash:true

  })(req,res,next)
})

// logout
router.get('/logout',(req,res)=>{
  req.logout()
  req.flash('success_msg','You are logged out')
  res.redirect('/users/login')
})


module.exports = router;
