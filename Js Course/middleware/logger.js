const moment = require('moment');

// Middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalURL}: ${moment().format()}`);
    next();
}

module.exports = logger;