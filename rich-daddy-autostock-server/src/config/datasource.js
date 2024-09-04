const {mongodb} = require('./app-properties');
const mongoose = require('mongoose');

class RichDataSource {
    constructor() {

    }

    async connection() {
        return await mongoose.connect(mongodb.url, mongodb.options);
    }

    isConnected() {
        return mongoose.connection.readyState === 1;
    }
}

module.exports = new RichDataSource();