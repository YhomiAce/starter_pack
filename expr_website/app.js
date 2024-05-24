const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pug = require('pug');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
  res.render('index',{title:"Your Tech Guy Info"});
})
app.get('/about',(req,res)=>{
  res.render('about')
})
app.get('/services',(req,res)=>{
  res.render('services')
})
app.get('/contact',(req,res)=>{
  res.render("contact")
})
app.post('/send-message',(req,res)=>{
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'kareemyomi91@gmail.com',
      pass:'18081995'
    }
  });

  const output = `
      <h4>You have a new contact request from Xpress server</h4>
      <h2>Contact Details</h2>
      <ul>
          <li>Name: ${req.body.name}<li>
          <li>Email: ${req.body.email}<li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.msg}</p>
  `;

  const  mailOptios = {
    from:"Yhomi Ace <yourtechguy@info.com>",
    to: "yhomi1996@gmail.com",
    subject: "Contact request from Xpress server",
    text:"",
    html:output
  }

  transporter.sendMail(mailOptios,(err,data)=>{
    if(err){
      console.log(err);
      res.redirect('/contact',{Msg:"Failed to send request"})
    }else{
      console.log('Request Sent');
      res.redirect('/contact',{Msg:"Message Sent"})
    }
  })
})

const Port = 5000;
app.listen(Port,()=>console.log(`Server is runnning on port ${Port}`));
