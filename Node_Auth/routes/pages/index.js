const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../../config/auth');
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename: (req,file,cb)=>{
    cb(null,file.fieldname + '-' + Math.random().toString(36).substring(2,10000)+Date.now() +'-' + Date.now() + path.extname(file.originalname))
  }
});

// check file type
const checkFileType = (file,cb)=>{
  // allowed extensons
  const fileTypes =/jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

  // check mimeType
  const mimeType = fileTypes.test(file.mimetype)

  // check if test are true
  if(mimeType && extname){
    return cb(null,true)
  }else{
    cb('Error: Images only!')
  }
}

const upload = multer({
  storage:storage,
  limits:{
    fileSize: 1000000
  },
  fileFilter:(req,file,cb)=>{
    checkFileType(file,cb)
  }
}).single('myFile')


router.get('/',ensureAuth,(req,res)=>{
  res.render('index',{title:"Members",name:req.user.name});
});

router.get('/upload',(req,res)=>{
  res.render('upload',{title:"Upload"})
});

router.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if(err) {
      res.render('upload',{msg:err})
    }else{
      if (req.file == undefined) {
          res.render('upload',{msg:"No file selected"})
      }else {
        console.log(req.file);
        res.render('upload',{msg:"Image uploaded",file:`/uploads/${req.file.filename}`})
      }
    }

  })
})

module.exports = router;
