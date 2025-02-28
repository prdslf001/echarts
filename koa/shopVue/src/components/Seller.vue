<template>
    <div class="com-container">
        <div class="com-Echarts" ref="echartsRef" id="main"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, inject, watch } from 'vue';
import * as echarts from 'echarts';

import requestAxios from '@/axios/axios';

const echartsRef = ref(null);
let myEcharts = null;
let dataResult = null;
let currentPage = 1;
let totalPage = null;
let timer = null;
//引入socket；
const socket = inject('socket');
const echartsInit = () => {
    myEcharts = echarts.init(echartsRef.value, themeStore.theme);
    //  myEcharts = (echarts.init(document.getElementById("main"),'chalk'));

    const initOption = {
        title: {
            text: '| 商家销售统计',
            top: 20,
            left: 20,
        },
        grid: {
            left: '3%',
            top: '20%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                barWidth: 66,
                label: {
                    show: true,
                    position: 'right',
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#5052EE' },
                        // { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#AB6EE5' },
                    ]),
                },
            },
        ],
    };
    myEcharts.setOption(initOption);

    myEcharts.on('mouseover', () => {
        clearInterval(timer);
    });
    myEcharts.on('mouseout', () => {
        startTimer();
    });
};
//通过axios获取数据的方法
// const getData = async()=>{
//   try{
//     dataResult = await requestAxios.get('seller');
//     dataResult.data.sort((a,b)=>a.value-b.value);
//     totalPage = dataResult.data.length%5? dataResult.data.length/5+1:dataResult.data.length/5;
//   }catch(error){
//     console.log(error.message)
//   }
//   //
//   updateEcharts();
//   startTimer();    //开启定时器01
// }

// 通过websocket获取数据的方法

const getData = (ret) => {
    dataResult = ret;
    dataResult.sort((a, b) => a.value - b.value);
    totalPage = dataResult.length % 5 ? dataResult.length / 5 + 1 : dataResult.length / 5;
    updateEcharts();
    startTimer(); //开启定时器01
};

const updateEcharts = () => {
    let start = (currentPage - 1) * 5;
    let end = currentPage * 5;
    let showData = dataResult.slice(start, end);
    const sellerNames = showData.map((item) => item.name);
    const sellerValues = showData.map((item) => item.value);
    const dataOption = {
        yAxis: {
            data: sellerNames,
        },
        series: [
            {
                data: sellerValues,
            },
        ],
    };
    myEcharts.setOption(dataOption);
};

//控制定时器执行函数；

const startTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        currentPage++;
        if (currentPage > totalPage) {
            currentPage = 1;
        }
        updateEcharts();
    }, 3000);
};

const adapterChange = () => {
    let titleFontSize = (echartsRef.value.offsetWidth * 3.6) / 100;
    // console.log(titleFontSize)
    const adapterOption = {
        title: {
            textStyle: {
                fontSize: titleFontSize * 1.5,
            },
        },
        series: [
            {
                barWidth: titleFontSize,
                itemStyle: {
                    borderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
                },
            },
        ],
    };
    myEcharts.setOption(adapterOption);
    myEcharts.resize();
};

if (socket) {
    socket.registerCallback('sellerData', getData);
}

onMounted(() => {
    echartsInit();
    // getData();  通过axios请求的时候用对应的函数
    socket.send({
        action: 'getData',
        socketType: 'sellerData',
        chartName: 'seller',
        value: '',
    });
    window.addEventListener('resize', adapterChange);
    adapterChange();
});

//卸载后，vue3最后一个生命周期钩子
onUnmounted(() => {
    clearInterval(timer);
    window.removeEventListener('resize', adapterChange);
    socket.unregisterCallback('sellerData'); //只有在websocket方法的时候使用；
});

// 暴露方法给父组件
defineExpose({
    adapterChange,
});

//主题改变；
import { themeChangeStore } from '@/store/themeStore';
const themeStore = themeChangeStore();

watch(
    () => themeStore.theme,
    () => {
        myEcharts.dispose();
        echartsInit();
        adapterChange();
        updateEcharts();
    },
);
</script>

<style scoped></style>
