const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../model/User');

module.exports = (passport)=>{
  passport.use(
    new LocalStrategy({usernameField:'email'},(username,password,done)=>{

      User.findOne({email:username})

      .then(user=>{

        if(!user){
          return done(null,false,{message:"Email is not recognised"})
        }else
          bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(!isMatch){
              return done(null,false,{message:"Password is incorrect"})
            }else{
              return done(null,user);
            }
          })
      })
      .catch(err=>console.log(err))
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
