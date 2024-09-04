const {Schema, model} = require('mongoose');

const StockSugupScheme = new Schema({
    stockCode: String,
    stockName: String,
    sugup: [{
        date: String,
        close: Number,
        day_before: Number,
        rate: Number,
        volume: Number,
        personal: Number,
        foreigner: Number,
        agency: Number,
        financial_investment: Number,
        insurance: Number,
        investment_trust: Number,
        bank: Number,
        etc_finance: Number,
        pension_funds: Number,
        private_equity: Number,
        country: Number,
        etc_corp: Number,
        domestic_foreigner: Number
    }]
});
 
StockSugupScheme.index({ stockCode: 1 }, { unique: true });

// 수급 owner keys
StockSugupScheme.methods.getOwner = function() {
    return ['personal',
    'foreigner',
    'agency',
    'financial_investment',
    'insurance',
    'investment_trust',
    'bank',
    'etc_finance',
    'pension_funds',
    'private_equity',
    'country',
    'etc_corp',
    'domestic_foreigner' ];
}

module.exports = model('StockSugup', StockSugupScheme, 'stocksugup');