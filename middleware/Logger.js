//moment puts a time stamp on your middleware function
const moment = require('moment');

//middleware function
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next();
}

module.exports = logger;