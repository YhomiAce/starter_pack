const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config()
const db = require('./config/connection');
db();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log('Server Started on port: ' + PORT);
})