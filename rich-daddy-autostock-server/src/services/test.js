const test2 = async (i) => {
    return i;
}
const testAsync = async (i) => {
    console.log('this is ', i);
    return await test2(i);
};

(async ()=>{
    const pres = Array(10).fill().map((_, i) => {
        return testAsync(i);
    });
    Promise.all(pres).then((v)=>{
        console.log(v);
    })
})();