const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//View engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.get('/contact', (req, res) => {
    res.render('contact', { layout: false })
})

app.post('/send', async(req, res) => {
    // console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    // step 1: transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email@address.com',
            pass: 'password'
        }
    });

    // step 2: mail options
    let mailOptions = {
        from: "kareemyomi91@gmail.com",
        to: 'yhomi1996@gmail.com',
        subject: "Test nodemailer",
        text: "",
        html: output
    }

    //step 3;send mail
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            res.render('contact', { layout: false, msg: "Fail to send email" })
        } else {
            console.log('Email Sent: ', data);
            res.render('contact', { layout: false, msg: "Email Sent!" })
        }
    })

    // create reusable transporter object using the default SMTP transport
    //    let transporter = nodemailer.createTransport({
    //      service:'gmail',
    //      auth: {
    //        user: 'email', // generated ethereal user
    //        pass: 'password', // generated ethereal password
    //      },
    //
    //    });
    //
    //    // send mail with defined transport object
    //    let info = await transporter.sendMail({
    //      from: '"Yhomi Ace Nodemailer Contact" <kareemyomi91@gmail.com>', // sender address
    //      to: "yhomi1996@gmail.com,yhomiace18@gmail.com", // list of receivers
    //      subject: "Hello ✔", // Subject line
    //      text: "Hello world?", // plain text body
    //      html: output, // html body
    //    });
    //    if(info){
    //      res.render('contact',{layout:false,msg:"Email Sent"})
    //    }else {
    //      res.render('contact',{layout:false,msg:"Failed to send"})
    //    }
    //
    //    console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou.


})

app.listen(5000, () => console.log('Server Started'));