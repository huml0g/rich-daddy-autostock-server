const {check} = require('express-validator');
const JwtService = require('../services/JwtService');
const UserSerive = require('../services/UserService');
const validator = require('../core/express-validator-handler');
const Result = require('../models/Result');
const express = require('express');
const router = express.Router();

router.post('/login', [
        check('email', 'Invalid email').isEmail().trim(),
        check('password', 'Invalid password').not().isEmpty() //.custom((value)=>{}) 가능
    ], validator(async (req, res) => {
        const email = req.body.email;
        const findUser = await UserSerive.findByEmail(email);
        // 사용자 검증
        UserSerive.verifyUser(findUser, req.body.password);
        res.json(new Result(true, null, null, JwtService.accessToken({email})));
    })
);

module.exports = router;