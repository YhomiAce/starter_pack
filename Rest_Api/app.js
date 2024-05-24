const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/database')
const bodyParser =require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const {ensureAuth} = require('./config/auth');

require('./config/passport')(passport)

mongoose.connect(config.database,{useUnifiedTopology:true,useNewUrlParser:true})
  .then(()=>console.log('Connected to mongodb'))
  .catch(err=>console.log(err))


const app =express();
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/site')))
app.use(express.static(path.join(__dirname,'Views')))
// app.use(express.static(path.join(__dirname,'Views/User')))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(session({
    secret: 'anything',
    resave: true,
    saveUninitialized: true
}));

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use(passport.initialize());
app.use(passport.session())

app.set('views',path.join(__dirname,'Views'))
app.set('view engine','ejs')
// Routes

app.use('/posts',require('./Routes/posts'));
app.use('/products',require('./Routes/product'))
app.use('/users',require('./Routes/users'))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/site/index'))
})
app.get('/home',(req,res)=>{
  res.render('index')
})
app.get('/welcome',(req,res)=>{
  res.render('User/welcome')
})

app.get('/dashboard',ensureAuth, (req,res)=>{
  // when a user is logged in we have access to the user object with the req.user
  let user = req.user
  res.render('User/dashboard',{user})
})

const PORT=5000
app.listen(process.env.PORT||PORT,()=>console.log("Listening on Port "+PORT));
