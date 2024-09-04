const {validationResult} = require('express-validator');
const HttpStatus = require('http-status-codes');
const Result = require('../models/Result');

module.exports = (postHandler) => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(new Result(false,
                HttpStatus.BAD_REQUEST,
                errors.array(),
                null)
            );
        } else {
            const handler = postHandler(req, res, next);
            // async function 이면 따로 처리해야함
            if (handler instanceof Promise) {
                handler.catch((error) => next(error));
            }
        }
    };
};