const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const db = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        });
        console.log('Database conncted')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = db;