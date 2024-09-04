const config = require('../config/app-properties');
const {saltRounds} = config.bcrypt;
const bcrypt = require('bcrypt');

class SecurityService {
    constructor() {

    }
    encode(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, saltRounds);
    }
    matches(plainTextPassword, hashPassword) {
        return bcrypt.compareSync(plainTextPassword, hashPassword);
    }
}

module.exports = new SecurityService();