const express = require('express');
const logger = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const User = require('./model/User');

dotenv.config();
const app = express();

const conn = mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology: true },()=>{
  console.log('mongo db connected');
});

// passport config
require('./config/passport')(passport);

// set view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


// session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//global variables
app.use((req,res,next)=>{
  res.locals.error = req.flash('error')
  res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
  next()
});

app.get('*',(req,res,next)=>{
  res.locals.user = req.user || null;

  next();
})

const getUserId = (id)=>{
  User.findById({_id:id},(err,userData)=>{
    if(err) throw errr;
    return userData.name
  })
  
}

const config = {
  pug:{
    locals:{
      getUserId
    }
  }
}


// set routes
const routes = require('./routes/pages/index');
const user = require('./routes/auth/auth');
app.use('/',routes);
app.use('/auth',user);
app.use('/posts',require('./routes/post/post'));

const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));
