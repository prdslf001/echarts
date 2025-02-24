const path = require('path');
const fileUtils = require('../utils/fileUtils');
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 9999,
});

module.exports.listen = () => {
    wss.on('connection', (client) => {
        console.log('有客户端链接成功了');

        client.on('message', async (msg) => {
            console.log('客户端的信息' + msg);
            let payload = JSON.parse(msg);
            const action = payload.action;
            if (action === 'getData') {
                let filePath = '../data/' + payload.chartName + '.json';
                filePath = path.join(__dirname, filePath);
                let ret = await fileUtils.getFlieJsonData(filePath);
                payload.data = ret;
                client.send(JSON.stringify(payload));
                // client.send('hello word')
            } else {
                wss.clients.forEach((client) => {
                    client.send(msg);
                });
            }

            // client.send('服务器发给客户端的信息')
        });
    });
};
