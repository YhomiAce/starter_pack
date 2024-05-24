const fs = require('fs');
const path = require('path');

// Make directory
// fs.mkdir(path.join(__dirname, 'test'), {}, (err) => {
//     if (err) throw err;
//     console.log('File created');
// });

// create and write to file
// fs.writeFile(path.join(__dirname, 'test', 'write.txt'), 'Hello from node js', err => {
//     if (err) throw err;
//     console.log('File Written to...');
//     fs.appendFile(path.join(__dirname, 'test', 'write.txt'), 'I love node js', err => {
//         if (err) throw err;
//         console.log('File written to again');
//     });
// })

// Read file

// fs.readFile(path.join(__dirname, 'test', 'write.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Rename File name

// fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'write.txt'), err => {
//     if (err) throw err;
//     console.log('File name changed...');
//     // append to file
//     fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), ' Writing in a file', err => {
//         if (err) throw err;
//         console.log('File written to...');
//         // read file
//         fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf8', (err, data) => {
//             if (err) throw err;
//             console.log(data);
//         })
//     })
// })