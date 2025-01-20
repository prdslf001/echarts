//读取文件的方法；
const fs = require('fs')
module.exports.getFlieJsonData = (filePath) => {
    // return 'hhah';
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
    // let tempData;
    // fs.readFileSync(filePath, 'utf-8', (error, data) => {
    //     if (error) {
    //         throw new Error('cuox');
    //     } else {
    //         tempData = data;
    //     }
    // });
    // return tempData;
    //这段代码为什么错误，还需要再问?//
}