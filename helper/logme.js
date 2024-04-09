const winston = require('winston');
const { format } = winston;

// log file name should be dd_mm_yyyy.log
const date = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const logFileName = date.getDate() + '_' + months[date.getMonth()] + '_' + date.getFullYear() + '.log';

const logme = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: '../logs/myapp.log',
            maxsize: 5242880, // 5MB
            tailable: true, // archive old logs
            zippedArchive: true,
            maxFiles: 10,
            handleExceptions: true
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

module.exports = logme;