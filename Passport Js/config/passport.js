const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'This Email is not yet registered' });
                    } else {
                        // User matched then match password

                        // compare input password with db password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (!isMatch) {
                                return done(null, false, { message: 'Password is incorrect' });
                            } else {
                                return done(null, user);
                            }
                        })
                    }
                })
                .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}