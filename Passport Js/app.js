const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Passport config
require('./config/passport')(passport);

// Middleware
 
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: true
}));

// Passport init and session
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port: ' + PORT));