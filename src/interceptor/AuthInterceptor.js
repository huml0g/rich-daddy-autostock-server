const JwtService = require('../services/JwtService');
const HttpStatus = require('http-status-codes');
const ExpressInterceptor = require('./core/ExpressInterceptor');

const AuthInterceptor = new ExpressInterceptor();

AuthInterceptor.preHandle((req, res) => {
    // TODO : header 방법 바꾸기
    const accessToken = req.header('access_token');
    if (!accessToken) {
        // TODO : 처리 구현
        res.status(HttpStatus.UNAUTHORIZED).send();
        return false;
    }
    if (JwtService.validateToken(accessToken)) {
        // TODO : Cors 구현
        return true;
    }
    return false;
});

module.exports = AuthInterceptor;