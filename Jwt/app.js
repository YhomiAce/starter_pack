const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./auth');

const User = require('./model/User');


dotenv.config()



// Connect to db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology: true },()=>{
  console.log('Connected to DB');
})

const app = express();

app.use(express.json())

const postRoute = require('./routes/posts')
const Routes = require('./routes/users')
app.use('/api/user',Routes)
app.use('/api/posts',postRoute)

app.get('/list',auth,async (req,res)=>{
  const allUser = await User.find()
  const sentUser = allUser.splice(0,2) // sends an ampunt of user 
  res.send(sentUser)
})

app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`))
