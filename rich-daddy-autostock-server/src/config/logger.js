const {logger, appName} = require('./app-properties')
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;

// create logger
module.exports = new createLogger({
    format: combine(
        label({label: appName}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printf(({level, message, label, timestamp}) =>
            `${timestamp} [${label}] [${level}] : ${message}`)
    ),
    transports: [
        new transports[process.env.NODE_ENV === 'production' ? 'File' : 'Console'](logger)
    ]
});