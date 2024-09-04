const {Schema, model} = require('mongoose');

const StockInfoScheme = new Schema({
    gubun: String,
    stockCode: String,
    stockName: String
});

StockInfoScheme.index({ stockCode: 1 }, { unique: true });

StockInfoScheme.statics.getStockInfo = function(stockCode) {
    return this.find({
        stockCode: stockCode
    });
};

StockInfoScheme.statics.getAllStockList = function() {
    return this.find();
};

module.exports = model('StockInfo', StockInfoScheme, 'stockinfo');