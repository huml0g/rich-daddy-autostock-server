const config = require('../config/app-properties');
const BusinessError = require('../models/BusinessError');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Jwt SecretKey, Registered
const {registered} = config.jwt;
const secretKey = crypto.createHash('sha256').update(crypto.randomBytes(512)).digest('base64');

class JwtService {
    constructor() {

    }

    claims(token) {
        try {
            return jwt.verify(token, secretKey, registered);
        } catch (error) {
            const {name} = error;
            if (name !== 'JsonWebTokenError'
                && name !== 'TokenExpiredError') {
                throw error;
            }
            throw new BusinessError('T0002', '유효하지 않은 토큰', error);
        }
    }

    accessToken(payload) {
        try {
            return jwt.sign({
                ...payload,
            }, seacretKey, {
                ...config.jwt.registered,
                expiresIn: config.jwt.expiresIn,
                // algorithm default : HS256
            });
        } catch (error) {
            throw new BusinessError('T0001', '토큰 발급 오류', error);
        }
    }

    refreshToken() {

    }

    validateToken(token) {
        const claims = this.claims(token);
        return claims && claims.email;
    }
}

module.exports = new JwtService();