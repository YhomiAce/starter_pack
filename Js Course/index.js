const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./public/Members');


const app = express();



// Initialize middleware
// app.use(logger);

// Middleware for Body Parser

// json
app.use(express.json());

// form data
app.use(express.urlencoded({ extended: false }));

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', { title: "Members App", members });
});
// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));



// app.get('/hello', (req, res) => {
//     res.send('<h1>Hello World</h1>')
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port: ' + PORT));