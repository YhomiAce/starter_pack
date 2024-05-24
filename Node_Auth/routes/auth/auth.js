const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');

const User = require('../../model/User');

const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename:(req,file,cb)=>{
    return cb(null,file.originalname + '-'+ Date.now()+path.extname(file.originalname) )
  }
});

const filter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype ==='image/gif'){
    return cb(null,true);
  }else{
    return cb('Error: You can not upload this type of file',false)
  }
}

const uploads = multer({
  storage:storage,
  limits:{
    fileSize:1000000
  },
  fileFilter:filter
})


router.get('/signup',(req,res)=>{
  res.render('signup',{title:'Register'});
});

router.get('/login',(req,res)=>{
  res.render('login',{title:'Login'});
});

router.post('/signup',uploads.single('profileimage'),(req,res)=>{

  const {name,email,username,password,password2} = req.body;
  let image
  if (req.file) {
     image = req.file.filename
    console.log('image');
  }else {
    image= 'noimage.jpeg'
    console.log('no image');
  }
  console.log(req.file);

  let errors = [];
  if(!name || !email || !username || !password || !password2){
    errors.push("Field empty. Please fill in all field")
  }else if (password.length < 5) {
    errors.push('Password is too short')
  }else if (password !== password2) {
    errors.push("Passwords do not match");
  }
  if (errors.length > 0) {
    res.render('signup',{errors,name,email,username})
}else {
    User.findOne({email},(err,user)=>{
      if(err) throw err;
      if(user){
        errors.push(`This email is already taken: ${user.email} `)
        res.render('signup',{errors,name,email,username})
        console.log(`This email is already taken: ${user.email} `);
      }else {
        const newUser = new User({
          name,email,username,password,image
        })
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash
            newUser.save()
              .then(user=>{
                req.flash('success_msg',"Registration Complete");
                res.redirect('/')
              })
              .catch(err=>{
                console.log(err);

              })
          })

        })
      }
    })
}
});

// Login
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req,res,next)
});

// logout
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('error_msg',"You are logged out");
  res.redirect('/auth/login');
})

module.exports = router;
