const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {ensureAuth} = require('../../config/auth');

const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + '-'+ Math.random(1000)/1000 + '-' + Date.now() + file.originalname)
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
});


const Category = require('../../model/Category');
const Post = require('../../model/Post');
const User = require('../../model/User')

router.get('/',(req,res)=>{
  Post.find()
  .then(posts=>{
    res.render('posts/index',{title:"Post",posts})
  })
  .catch(err=>{
    console.log(err);
  })

});

router.get('/add',ensureAuth,(req,res)=>{
  Category.find()
    .then(data=>{
      res.render('posts/addPost',{title:"Add Post",categories:data})
    })
    .catch(err=>{
      console.log(err);
    })

});

// Create posts
router.post('/add',uploads.single('postImg'),(req,res)=>{
  let errors = [];
  let image
  if(req.file){
    image = req.file.filename;
  }else{
    image = 'noimage.jpg';
  }

  const {title,content,category} = req.body

  if (!title || !category || !content) {
    errors.push("Empty Field. Please fill all neccessary fields")
    res.render('posts/addPost',{title:"Add Post",errors})
  }else {
    const posts = new Post({
      title:title,
      body:content,
      category:category,
      author:req.user._id,
      post_image:image
    });
    posts.save()
      .then(data=>{
        req.flash('success_msg',"Post created!")
        res.redirect('/posts')
      })
      .catch(err=>{
        res.render('posts/addPost',{msg:err})
        console.log(err);
      })

  }

})

router.get('/category',(req,res)=>{
  res.render('posts/categories',{title:'Add Category'})
});

router.post('/category',(req,res)=>{
  const name = req.body.category;
  let errors =[];
  if(!name){
    errors.push("Compulsory Field");
    res.render('posts/categories',{title:'Add Category',errors})
  }else{
    Category.findOne({name},(err,category)=>{
      if(err) throw err;
      if(category){
        errors.push("This category already exist");
        res.render('posts/categories',{title:'Add Category',errors})
      }else {
        const newCat = new Category({
          name
        })
        newCat.save()
          .then(cat=>{
            req.flash('success_msg',"Category Added");
            res.redirect('/')
          })
          .then(err=>{
            console.log(err);
          })
      }
    })
  }

});

router.get('/show/:id',(req,res)=>{
  const id = req.params.id
  Post.findById({_id:id},(err,post)=>{
    if (err) throw err;
    console.log(post);
    User.findById({_id:post.author},(err,user)=>{
      console.log(user);
      if (err) throw err;
      res.render('posts/show',{post:post,username:user})
    })

  })

})


module.exports = router;
