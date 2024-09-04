class Result {
    constructor(success = false, code = null, message = null, data = null) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static setSuccess(success = false) {
        this.success = success;
        return this;
    }
    static setCode(code = null) {
        this.code = code;
        return this;
    }
    static setMessage(message = null) {
        this.message = message;
        return this;
    }
    static setData(data = null) {
        this.data = data;
        return this;
    }
    static build() {
        return new this();
    }
}

module.exports = Result;