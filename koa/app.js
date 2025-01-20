const Koa = require('koa');
const app = new Koa();

const middlewareDuration = require('./middleware/responseDuration')
app.use(middlewareDuration)

const middlewareHeader = require('./middleware/responseHeader')
app.use(middlewareHeader)

const middlewareData = require('./middleware/responseData')
app.use(middlewareData)
app.listen(3000);


const WebSocketService = require('./service/webSocket_service')

WebSocketService.listen()



// const WebSocket = require('ws');
// const wss = new WebSocket.Server({
//     port: 9999
// })

// wss.on('connection', client => {
//     console.log('有客户端链接成功了');
//     client.on('message', msg => {
//         console.log('客户端发送给服务器的消息是：' + msg)
//         client.send('服务端发送的数据')
//     })
// })



// const WebSocket = require("ws")
// const wss = new WebSocket.Server({
//     port: 9998,
//     host: '0.0.0.0'  // 允许所有 IP 访问
// })

// wss.on("connection", client => {
//     console.log('有客户端链接成功了');
//     client.on("message", msg => {
//         console.log("客户端发送数据过来了")
//         client.send('hello socket')
//     })
// })

// const WebSocket = require("ws");

// // 添加更详细的服务器配置
// const wss = new WebSocket.Server({
//     port: 9998,
//     host: '0.0.0.0',
//     // 添加心跳检测
//     clientTracking: true,
//     // 添加握手超时时间
//     handshakeTimeout: 10000
// });

// // 监听服务器错误
// wss.on('error', (error) => {
//     console.error('WebSocket服务器错误:', error);
// });

// // // 监听服务器启动
// wss.on('listening', () => {
//     console.log('WebSocket服务器启动成功，监听端口9998');
// });

// // 监听连接请求
// wss.on('connection', (client, req) => {
//     console.log(`新客户端连接，IP: ${req.socket.remoteAddress}`);

//     client.on('message', (msg) => {
//         console.log('收到消息:', msg.toString());
//         client.send('服务器收到消息');
//     });

//     client.on('close', () => {
//         console.log('客户端断开连接');
//     });

//     client.on('error', (error) => {
//         console.error('客户端连接错误:', error);
//     });
// });
