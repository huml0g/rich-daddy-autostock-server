class BusinessError extends Error {
    constructor(code, message, ex) {
        super(message);
        this.code = code;
        this.message = message;
        if (ex instanceof Error) this.ex = ex;
        this.name = 'BusinessError'
    }
}

module.exports = BusinessError;