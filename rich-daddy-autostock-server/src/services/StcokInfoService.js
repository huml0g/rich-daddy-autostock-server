// 종목정보 조회 서비스
class StockInfoService {
    constructor() {
        this.stockInfo = require('../models/StockInfo');
    }

    // 종목조회
    async getStockInfo(stockCode) {
        return await this.stockInfo.getStockInfo(stockCode);
    };

    // 코스피, 코스닥 전종목 조회
    async getAllStockList() {
        return await this.stockInfo.getAllStockList();
    };
}

module.exports = new StockInfoService();