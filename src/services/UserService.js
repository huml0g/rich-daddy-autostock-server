const BusinessError = require('../models/BusinessError');
const passwordEnocder = require('./SecurityService');

//TODO : message 관리
class UserService {

    #User = require('../models/User');

    verifyUser(user, plainTextPassword) {
        // TODO: 메세지 프로퍼티에 옮기기
        if (!user || (plainTextPassword && user && !passwordEnocder.matches(plainTextPassword, user.password))) {
            throw new BusinessError('U0000', '아이디 또는 패스워드가 일치하지 않습니다.');
        }
    }
    async create(user) {
        try {
            user.password = passwordEnocder.encode(user.password);
            await this.#User.createUser(user);
        } catch (error) {
            throw new BusinessError('U0001', '회원가입에 실패하였습니다.', error);
        }
    }
    async findByEmail(email, options) {
        try {
            return await this.#User.getUser({email}, options);
        } catch (error) {
            throw new BusinessError('U0002', '회원정보 읽기 실패', error);
        }
    }
}

module.exports = new UserService();