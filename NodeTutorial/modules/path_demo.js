const path = require('path');

// console.log(__filename);
// BaseName
console.log(path.basename(__filename));

// directory name
console.log(path.dirname(__filename));

// file extension
console.log(path.extname(__filename));

// create object of file
console.log(path.parse(__filename));
// access property of the object
console.log(path.parse(__filename).name);

// concatenate paths
console.log(path.join(__dirname, 'test', 'index.html'));