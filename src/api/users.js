const JwtService = require('../services/JwtService');
const UserSerive = require('../services/UserService');
const {check} = require('express-validator');
const validator = require('../core/express-validator-handler');
const asyncWrap = require('../core/async-error-handler');
const Result = require('../models/Result');
const logger = require('../config/logger');
const express = require('express');
const router = express.Router();

router.post('/', [
        check('email', 'invaild email').isEmail().trim(),
        check('name', 'invaild name').not().isEmpty().trim(),
        check('password', 'invaild password').not().isEmpty().trim(),
    ], validator(async (req, res) => {
        // TODO : message 관리
        await UserSerive.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        });
        res.json(new Result(true, null, '회원가입에 성공하였습니다.', null));
    })
);

router.get('/me', asyncWrap(async (req, res) => {
    const claims = JwtService.claims(req.header('access_token'));
    const findUser = await UserSerive.findByEmail(claims.email, {password: 0, _id: 0});
    res.json(new Result(true, null, null, findUser));
}));

router.put('/me', (req, res) => {
    const claims = JwtService.claims(req.header('access_token'));
    // TODO: 회원 정보 수정 구현
    res.json({});
});

router.delete('/me', (req, res) => {
    const claims = JwtService.claims(req.header('access_token'));
    // TODO: 회원 정보 삭제 구현
    res.json({});
});

module.exports = router;