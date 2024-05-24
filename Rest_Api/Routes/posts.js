const express = require('express');
const router = express.Router()

let Post = require('../Model/Post');

router.get('/', (req,res)=>{

     Post.find()
     .then(posts=>{
       res.render('posts/index',{posts:posts})
     })
     .catch(err=>console.log(err))


})
router.get('/create',(req,res)=>{
  res.render('posts/create')
})

router.post('/create',(req,res)=>{
  let posts = new Post()
  posts.title = req.body.title
  posts.body = req.body.body
  posts.author= req.body.author

  posts.save((err)=>{
    if (err) throw err;
    res.redirect('/posts')
  })
})

router.get('/show/:postId', (req,res)=>{
  Post.findById({_id:req.params.postId},(err,post)=>{
    if (err) throw err;
    res.render('posts/show',{post:post})
  })
})

router.get('/edit/:postId',(req,res)=>{
  Post.findById({_id:req.params.postId},(err,post)=>{
    if(err) throw err;
    res.render('posts/edit',{post:post})
  })
})

router.post('/update/:postId',(req,res)=>{
    Post.updateOne(
      {_id:req.params.postId},
      {$set:{title:req.body.title,body:req.body.body,author:req.body.author}},err=>{
        if(err) throw err;
        res.redirect('/posts')
      })

})

router.delete('/delete/:postId',(req,res)=>{
  Post.remove({_id:req.params.postId},err=>{
    if(err) throw err;
    res.send('success')
  })
})

module.exports=router
