const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../Model/User')

module.exports=function(passport){
  passport.use(
    new LocalStrategy({usernameField:'email'},(username,password,done)=>{
      // match user
      User.findOne({email:username})
        .then(user=>{
          if(!user){
            return done(null,false,{message:"Email is not registered"})
          }
          // Match password
          bcrypt.compare(password,user.password,(err,ismatch)=>{
            if(err) throw err;
            if(ismatch){
              return done(null,user,{message:"Login Successful"})
            }else{
              return done(null,false,{message:"Password is incorrect"})
            }
          })
        })
        .catch(err=>console.log(err))
    })
  )
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
