const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Register

router.get('/register', (req, res) => {
    res.render('register');
});

// Register process
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    // check if input field is empty
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // check for password match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // check for password length
    if (password.length < 4) {
        errors.push({ msg: 'Password should be atleat 4 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation pass

        // check if email already exists
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({ msg: 'Email already in registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // hash password
                            newUser.password = hash;
                            // save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Registeration complete')
                                    res.redirect('/users/login')
                                })
                                .catch(err => {
                                    console.log(err);
                                })

                        });
                    });
                }
            })
    }
});


// Handle login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/users/login');
})

module.exports = router;