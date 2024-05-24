// // const human = require('./person');
// // const Person = require('./person');
// const stuff = require('./person');

// console.log('Hello from node js')
// console.log(stuff.human);
// console.log(stuff.human.name);
// const person1 = new stuff.Person('Jon Snow', 25);
// person1.greeting();

// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('message', (data) => {
//     console.log('Called Listener', data);
// });
// logger.log('Hello World');
// logger.log('Hi ');
// logger.log('Yo');

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname,'public','home.html'),(err,content)=>{
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })

    // }else 
    // if(req.url==='/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })
    // }else
    // if(req.url==='/api/users'){
    //     const users=[{'name':'Zoro','age':23},{'name':'Sanji','age':23},{'name':'Ussop','age':20},{'name':'Nami','age':20}];
    //     res.writeHead(200,{'Content-Type':'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : req.url);
    // console.log(filePath);

    // set content type
    let extname = path.extname(filePath);
    // check for the extension path to determine content type

    // set initial content type
    let contentType = 'text/html';

    // check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/js';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                })
            } else {
                // Server problem
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });


});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Serever Running on port:' + PORT));