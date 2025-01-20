const path = require('path')
const fileUtils = require('../utils/fileUtils')
module.exports = async (ctx, next) => {
    let url = ctx.request.url;    //api/seller         ../data/seller.json
    // console.log(__dirname)
    let filePath = url.replace('/api', '');
    filePath = '../data' + filePath + '.json'
    filePath = path.join(__dirname, filePath);

    // console.log(filePath)

    let res = await fileUtils.getFlieJsonData(filePath);
    ctx.response.body = res;
    await next()
}