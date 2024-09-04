const HttpStatus = require('http-status-codes');
const ExpressInterceptor = require('./core/ExpressInterceptor');

const DefaultInterceptor = new ExpressInterceptor();

DefaultInterceptor.preHandle((req, res) => {
    return false;
});

module.exports = DefaultInterceptor;