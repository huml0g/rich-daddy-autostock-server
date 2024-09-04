const logger = require('./config/logger');
const {server} = require('./config/app-properties');
const express = require('express');
const helmet = require('helmet');
const app = express();

// server
const hostname = process.env.API_HOST || server.hostname;
const port = process.env.API_PORT || server.port;

// api root path
const apiVersionUrl = '/api/v1';

// http header security(csp, hidePoweredBy, hpkp, hsts, ieNoOpen, noCache, noSniff, frameGuard, xssFilter)
app.use(helmet());

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// add interceptor
app.use('/', require('./interceptor/DefaultInterceptor')
    .excludePathPatterns(`${apiVersionUrl}/**`)
    .build());
app.use(apiVersionUrl, require('./interceptor/AuthInterceptor')
    .excludePathPatterns('/auth/login', '/users')
    .build());

// router
app.use(`${apiVersionUrl}/auth`, require('./api/auth'));
app.use(`${apiVersionUrl}/users`, require('./api/users'));
app.use(`${apiVersionUrl}/stock`, require('./api/stock'));

// error handler (라우트 순서 맨 밑에 위치 해야함)
app.use(require('./core/error-handler'));

// start server
(async () => {
    try {
        const mongoDB = require('./config/datasource');
        // mongodb connection
        await mongoDB.connection();
        // start express server
        app.listen(port, hostname, async () => {
            logger.info(`MongoDB is Connection : ${mongoDB.isConnected()}`);
            logger.info(`Server listening, Port : ${port}`);
        });
    } catch (error) {
        // error log
        logger.error(error.stack);
        // kill process
        process.exit(-1);
    }
})();