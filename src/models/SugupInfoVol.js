const {Schema, model} = require('mongoose');

const SugupInfoVolSchema = new Schema({
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
        domestic_foreigner: Number,
        personal_sum: Number,
        foreigner_sum: Number,
        agency_sum: Number,
        financial_investment_sum: Number,
        insurance_sum: Number,
        investment_trust_sum: Number,
        bank_sum: Number,
        etc_finance_sum: Number,
        pension_funds_sum: Number,
        private_equity_sum: Number,
        country_sum: Number,
        etc_corp_sum: Number,
        domestic_foreigner_sum: Number,
        personal_min: Number,
        foreigner_min: Number,
        agency_min: Number,
        financial_investment_min: Number,
        insurance_min: Number,
        investment_trust_min: Number,
        bank_min: Number,
        etc_finance_min: Number,
        pension_funds_min: Number,
        private_equity_min: Number,
        country_min: Number,
        etc_corp_min: Number,
        domestic_foreigner_min: Number,
        personal_collect: Number,
        foreigner_collect: Number,
        agency_collect: Number,
        financial_investment_collect: Number,
        insurance_collect: Number,
        investment_trust_collect: Number,
        bank_collect: Number,
        etc_finance_collect: Number,
        pension_funds_collect: Number,
        private_equity_collect: Number,
        country_collect: Number,
        etc_corp_collect: Number,
        domestic_foreigner_collect: Number,
        personal_max: Number,
        foreigner_max: Number,
        agency_max: Number,
        financial_investment_max: Number,
        insurance_max: Number,
        investment_trust_max: Number,
        bank_max: Number,
        etc_finance_max: Number,
        pension_funds_max: Number,
        private_equity_max: Number,
        country_max: Number,
        etc_corp_max: Number,
        domestic_foreigner_max: Number,
        personal_dist: Number,
        foreigner_dist: Number,
        agency_dist: Number,
        financial_investment_dist: Number,
        insurance_dist: Number,
        investment_trust_dist: Number,
        bank_dist: Number,
        etc_finance_dist: Number,
        pension_funds_dist: Number,
        private_equity_dist: Number,
        country_dist: Number,
        etc_corp_dist: Number,
        domestic_foreigner_dist: Number
    }]
});

SugupInfoVolSchema.index({ stockCode: 1, date: 1 }, { unique: true });
 
// 스키마의 키셋을 가져온다.
SugupInfoVolSchema.methods.getKeys = function() {
    let ks = [];
    this.schema.eachPath((p) => {
        if (!p.startsWith('_')) ks.push(p);
    });
    return ks;
}

module.exports = model('SugupInfoVol', SugupInfoVolSchema, 'sugupInfoVol');