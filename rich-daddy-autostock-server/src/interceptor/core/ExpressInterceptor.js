const HttpStatus = require('http-status-codes');
const UrlPattern = require('url-pattern');

class ExpressInterceptor {
    #preHandle;
    #excludePathPatterns;

    constructor() {

    }

    excludePathPatterns(...paths) {
        for (let i = 0, n = paths.length; i < n; ++i) {
            let path = paths[i];
            this.#excludePathPatterns = this.#excludePathPatterns || [];
            this.#excludePathPatterns.push(new UrlPattern(path));
        }
        return this;
    }

    preHandle(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('preHandle not is function');
        }
        this.#preHandle = handler;
        return this;
    }

    build() {
        return (req, res, next) => {
            if (this.#excludePathPatterns && this.#excludePathPatterns.length > 0) {
                for (let i = 0, n = this.#excludePathPatterns.length; i < n; ++i) {
                    if (this.#excludePathPatterns[i].match(req.url)) {
                        next();
                        return false;
                    }
                }
            }
            if (this.#preHandle && !this.#preHandle(req, res)) {
                res.setTimeout(3000, () => {
                    res.status(HttpStatus.NOT_FOUND).send();
                });
                return false;
            }
            next();
            return true;
        }
    }
}

module.exports = ExpressInterceptor;