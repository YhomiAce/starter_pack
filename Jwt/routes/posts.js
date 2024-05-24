const express = require('express');
const router = express.Router();
const auth = require('../auth');
 const User = require('../model/User');

router.get('/',auth, async (req,res)=>{
  const id =req.user.id
  const user = await User.findOne({_id:id})
  // res.send(user)
  res.json({
    "title":"Post One",
    "body" : "Body of post one",
    "author":{"name":user.name,email:user.email}
  })
})

module.exports = router;
