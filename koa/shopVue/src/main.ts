import '@/assets/css/global.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import SocketService from '@/utils/webSocket_front';

// 获取实例
const socket = SocketService.getInstance();

// 建立连接
socket.connect();

// 挂载到全局

// 引入echarts
// import Echarts from 'vue-echarts'

const app = createApp(App);

// app.config.globalProperties.$socket = socket

// 通过 provide 提供
app.provide('socket', socket);

// 处理应用关闭
window.addEventListener('beforeunload', () => {
    socket.close();
});

// 使用组件
// app.component('e-charts', Echarts)
// 全局挂载 echarts
// app.config.globalProperties.$echarts = echarts
// import * as echarts from 'echarts'

import { createPinia } from 'pinia';

app.use(createPinia());

import * as echarts from 'echarts';

window.echarts = echarts; /**加上这一句，并在js文件中，this改为window* */

//使用import()异步加载文件

// import("../public/static/theme/chalk.js");

//引入pinia

app.use(router);

app.mount('#app');
