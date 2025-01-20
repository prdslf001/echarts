module.exports = async (ctx, next) => {
    const contentType = 'application/json; charset-utf-8';
    ctx.set('content-Type', contentType);
    // ctx.response.body = 'chengging';
    //跨域设置
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', "PUT,POST,DELETE,GET,OPTIONS")
    await next()
}