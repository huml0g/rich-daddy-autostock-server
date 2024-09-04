const StockSugup = require('../models/StockSugup');
const SugupInfoVol = require('../models/SugupInfoVol');
const {parentPort, workerData, isMainThread} = require('worker_threads');

function doSomething(workerData) {
        //console.log('starting analyze : ', workerData);
        // setTimeout(() => {
        //     console.log('finish analyzing  : ', workerData);
        // }, 1000);
    return workerData;
}

if (!isMainThread) {
    console.log('workerData received : ', workerData);
    // const queue = new PQueue({concurrency : 10});
    // // queue에 promise 객체를 넣어 순차적으로 실행되게 한다.
    // parentPort.on('message', (value) => {
    //     queue.add(() => doSomething(workerData));
    //     await queue.onIdle();   // 유휴상태까지 대기하지않으면 pqueue is not a constructor 오류남 거지같네.
    // });
    // postMessage로 하면 바로 부모로 메세지 전달이됨. 
    parentPort.postMessage(doSomething(workerData));
}
// class SugupAnalyzer {

//     constructor(){
//         console.log('sugup analyzer');
//         this.successCnt = 0;
//         this.failCnt = 0;
//     }

//     async anaylize(stockCode) {
//         try {
//             //console.log('수급기초데이타 조회 [종목:%s]', stockCode);
//             const sugupInfo = await StockSugup.findOne({
//                 stockCode: stockCode
//             });
//             //console.log('수급기초데이타 분석시작 [종목:%s]', sugupInfo.stockName);
//             // 1. keyset binding
//             const ownerkeys = sugupInfo.getOwner();
//             //const ownerkeys = ['personal'];
//             // 2. 수급데이타 가공
//             const analysis = Object.assign({}, {
//                 'stockCode': sugupInfo.stockCode,
//                 'stockName': sugupInfo.stockName, 
//                 'sugup': await sugupInfo.sugup.reverse().reduce((a,s) => {
//                 let o = Object.assign({}, JSON.parse(JSON.stringify(s)));
//                 const last = a.slice(-1)[0];
//                 //console.log(s);
//                 for (let i=0, len=ownerkeys.length; i < len; i++) {
//                     let key = ownerkeys[i];
//                     // 누적합계
//                     let sumkey = key + '_sum';
//                     o[sumkey] = o[key] + (last ? last[sumkey] : 0);
//                     // 누적최소 : 누적합계중 가장 낮은값
//                     let minkey = key + '_min';
//                     o[minkey] = Math.min(o[sumkey], (last ? last[minkey] : o[sumkey]));
//                     // 매집수량 : 누적합계 - min
//                     let collectKey = key + '_collect';
//                     o[collectKey] = o[sumkey] - o[minkey];
//                     // 매집고점 : 매집수량의 max
//                     let maxKey = key + '_max';
//                     o[maxKey] = Math.max(o[collectKey], (last ? last[maxKey] : o[collectKey]));
//                     // 매집비율(분산비율)
//                     let distKey = key + '_dist';
//                     o[distKey] = Math.floor(o[maxKey] == 0 ? 0 : (o[collectKey] / o[maxKey]) * 100);
//                 }
//                 a.push(o);
//                 return a;
//             },[])});
//             //console.log(analysis);
//             this.successCnt = this.successCnt + 1;
//             //console.log('현재성공건수 : ', this.successCnt);
//             SugupInfoVol.create(analysis);
//             return analysis;
//         } catch(e) {
//             this.failCnt++;
//             console.log(e);
//             console.log('%s[%s] 처리실패', sugupInfo.stockCode, sugupInfo.stockName);
//             console.log('현재실패건수 : ', this.successCnt);
//         }
//     }; 
// }

//module.exports = SugupAnalyzer;