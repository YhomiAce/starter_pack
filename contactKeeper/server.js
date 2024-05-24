const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

connectDB();

const app = express();

//init middleware
app.use(express.json({extended:false}));

const PORT = process.env.PORT || 5000;
const contactRoutes = require('./routes/contact');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use('/api/contact',contactRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/auth',authRoutes);

if(process.env.NODE_ENV ==='production'){
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}



app.listen(PORT,()=>console.log(`Server started on port: ${PORT}`));
