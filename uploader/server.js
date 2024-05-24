const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.post('/upload',(req,res)=>{
  if(req.files === null){
     return res.status(400).json({msg:"No file uploaded"});
  }else{
    const file = req.files['upload'];
    console.log(file.name);
    file.mv(`${__dirname}/client/public/uploads/${file.name}`,(err)=>{
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({fileName:file.name,filePath:`/uploads/${file.name}`});
  })
  }
})

app.listen(5000,()=>console.log('Server started on port 5000'));
