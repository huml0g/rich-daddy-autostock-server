const Pool = require('worker-threads-pool');
const path = require('path');
const stockInfoService = require('./StcokInfoService')

// 수급분석서비스
class SugupService {

    constructor(){
        console.log('sugup service');
        this.pool_size = 10;
        this.pool = new Pool({max:this.pool_size});
        this.workerScript = path.join(__dirname, './SugupAnalyzer.js');
    }

    // worker 를 생성한다.
    createWorker(workerScript, workerData) {
        return new Promise((resolve, reject) => {
            this.pool.acquire(workerScript, {workerData: workerData}, (err, worker) => {
                if (err) throw err;
                console.log('started worker (pool size : %s]', this.pool.size);
                worker.once('message', resolve);    // TODO: async로 했을때 resolve객체를 넘겨주려면?
                worker.once('online', () => {
                    console.log('worker execute code');
                });
                worker.once('error', reject);   // TODO: async로 했을때 reject객체를 넘겨주려면?
                worker.once('exit', () => {
                    console.log('worker exit');
                    //console.log('started worker (pool size : %s]', this.pool.size);
                });
            });
        });
    };

    // 종목별 수급데이타 분석
    async analyzeDistributionRate() {
        // 종목조회
        let stockList = await stockInfoService.getAllStockList();
        console.log(`#### 총 분석종목 대상 : ${stockList.length} 종목`);
        stockList = this.arraySliceByN(stockList, Math.floor(stockList.length / this.pool_size) + 1);
        // size 검증용 주석처리
        // let totalCnt = 0;
        // for(let i=0; i < stockList.length; i++) {
        //     totalCnt += stockList[i].length;
        //     console.log(`분할후 size ${stockList[i].length}`);
        // }
        // console.log(`분할후 총 size ${totalCnt}`);
        // TODO. 주의. Array(num)를 먼저 생성해서 하면 promise.all resolve가 waiting하지않고 소스가 흘러버린다.
        // 왜그런지 이유를 모름... 뭔가 잘못이해하고있는듯. 나중에 분석해보자.
        const primisses = Array(this.pool_size).fill().map((_, i) => {
            // 수급기초자료 조회
            const workerData = stockList[i];
            // pool size만큼 worker를 생성한다.
            return this.createWorker(this.workerScript, workerData);
        });
        Promise.all(primisses).then((v)=>{
            //console.log('result : ', v);
        })
    }

    // util
    arraySliceByN(arr, size) {
        console.log(`array 분할 by ${size}`);
        let result = [];
        while (arr.length > 0) {
            result.push(arr.splice(0, size));
        }
        return result;
    }
}

module.exports = new SugupService();

// const stime = moment(new Date());
    // console.log('수급분석을 시작합니다....');
    // //1.전체 종목목록 조회
    // const stockList = await StockInfo.find({
    //     'gubun': req.params.gubun
    // });
    // // 분석기
    // const analyzer = new SugupAnalyzer();
    // let analyserPromises = []; 
    // for (let stockInfo of stockList) {
    //     console.log('수급분석 시작 : %s[%s]', stockInfo.stockCode, stockInfo.stockName);
    //     //analyserPromises.push(analyzer.anaylize(stockInfo.stockCode));
    //     result = await analyzer.anaylize(stockInfo.stockCode);
    //     //console.log(result);
    //     //SugupInfoVol.create(result);
    //     // const sugupInfoVol = new SugupInfoVol(result);
    //     // console.log(sugupInfoVol);
    //     // sugupInfoVol.save((e)=>{
    //     //     if (e) {
    //     //         return console.log('%s 수급분석결과 저장실패 [%s]', stockInfo.stockCode, e);
    //     //     }
    //     //     console.log('%s 수급분석결과 저장성공', stockInfo.stockCode);
    //     // });
    // }
    // //analizeResult = await Promise.all(analyserPromises);
    // //console.log(analizeResult[0].reverse().slice(0,1));
    // const etime = moment(new Date());
    // console.log('분석 소요시간[s] : ', moment.duration(etime.diff(stime)).seconds());
    // console.log('수급분석을 종료합니다.');
    // // 결과출력
    // console.log('------------------------- 처리 결과 ----------------------------');
    // console.log('success : ', analyzer.successCnt);
    // console.log('fail : ', analyzer.failCnt);
    // console.log('--------------------------------------------------------------');

    // for (let stockInfo of stockList) {
    //     const stime = moment(new Date());
    //     console.log('수급기초데이타 조회 [종목:%s]', stockInfo.stockCode);
    //     // 2. 수급기초데이타 조회
    //     const sugupInfo = await StockSugup.find({
    //         stockCode: stockInfo.stockCode
    //     });
    //     const ownerkeys = sugupInfo.getOwner();
    //     //console.log(ownerkeys);
    //     //console.log(sugupInfo.sugup);
    //     // 3. 수급데이타 가공
    //     const analysis = await sugupInfo.sugup.reverse().reduce((a,s) => {
    //         var o = JSON.parse(JSON.stringify(s));
    //         var last = a.slice(-1)[0];
    //         //console.log(s);
    //         for (let i=0, len=ownerkeys.length; i < len; i++) {
    //             let key = ownerkeys[i];
    //             let sumkey = key + '_sum';
    //             o[sumkey] = o[key] + (last ? last[sumkey] : 0);
    //         }
    //         a.push(o);
    //         return a;
    //     },[]);
    //     console.log(analysis);
    //     const etime = moment(new Date());
    //     console.log('소요시간[s] : ', moment.duration(etime.diff(stime)).seconds());
    // }