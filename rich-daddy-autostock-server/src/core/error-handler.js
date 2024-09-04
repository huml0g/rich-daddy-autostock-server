const BusinessError = require('../models/BusinessError');
const Result = require('../models/Result');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const logger = require('../config/logger');

module.exports = (error, req, res, next) => {
    if (error instanceof BusinessError) {
        logger.error(error.ex ? error.ex : error);
        res.json(new Result(false, error.code, error.message, null));
    } else {
        logger.error(error.stack);
        res.status(INTERNAL_SERVER_ERROR)
            .json(new Result(false, INTERNAL_SERVER_ERROR, '서버 오류', null));
    }
};