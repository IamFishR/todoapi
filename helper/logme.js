const winston = require('winston');
const { format } = winston;

// log file name should be dd_mm_yyyy.log
const date = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const logFileName = date.getDate() + '_' + months[date.getMonth()] + '_' + date.getFullYear() + '.log';
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'grey'
};



winston.addColors(colors);

const logme = winston.createLogger({
    level: 'info',
    levels: levels,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        // new winston.transports.Console({
        //     format: format.combine(
        //         format.colorize({ all: true })
        //     )
        // }),
        new winston.transports.File({
            filename: `./logs/${logFileName}`,
            format: format.combine(
                format.uncolorize()
            )
        })
    ]
});


module.exports = logme;
