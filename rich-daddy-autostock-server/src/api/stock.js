const express = require('express');
const router = express.Router();
const stockInfoService = require('../services/StcokInfoService');
const sugupService = require('../services/SugupService');

// 종목정보조회
router.get('/info/:stockCode', async (req, res) => {
    res.json(await stockInfoService.getStockInfo(req.params.stockCode));
});

// 종목 수급 기초데이터 가공
router.post('/sugup/analysis', async (req, res) => {
    sugupService.analyzeDistributionRate();
    res.end();
});

module.exports = router;
