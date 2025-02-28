<template>
    <div class="com-container">
        <div class="com-Echarts" ref="echartsRef" id="main"></div>
    </div>
</template>
<script setup>
defineOptions({
    name: 'Rank',
});
import { ref, onMounted, onUnmounted, inject, watch } from 'vue';
import requestAxios from '@/axios/axios';
import Chart from 'vue-echarts';

let myEcharts = null;
let rankData = null;
const seriesData = ref(null);
const xAxisData = ref(null);
const echartsRef = ref();
// let fontTitle = 16;
//初始展示范围:
const start = ref(0);
const end = ref(9);

//设置定时器；
let timer = null;

//注入scoket实例
const socket = inject('socket');

const initEcharts = () => {
    myEcharts = echarts.init(echartsRef.value, themeStore.theme);
    const initOption = {
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'bar',
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#5052EE', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#AB6EE5', // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
            },
        ],
        title: {
            text: '| 地区销售排行',
            top: 20,
            left: 20,
        },
        grid: {
            left: '5%',
            top: '40%',
            right: '5%',
            bottom: '5%',
            containLabel: true,
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
    };
    myEcharts.setOption(initOption);
    myEcharts.on('mouseover', () => {
        clearInterval(timer);
    });
    myEcharts.on('mouseout', () => {
        startInterval();
    });
};

//通过axios获取数据的方法;
// const getData = async()=>{
//     try {
//         rankData = await requestAxios.get('rank');
//         rankData.data.sort((a,b)=>b.value - a.value)
//         seriesData.value = rankData.data.map(items =>items.value)
//         xAxisData.value = rankData.data.map(items =>items.name)
//     } catch (error) {
//         console.log(error.message)
//     }
//     updataOption();
//     startInterval();
// }

//通过webscoket获取数据的方法;

const getData = (ret) => {
    rankData = ret;
    rankData.sort((a, b) => b.value - a.value);
    seriesData.value = rankData.map((items) => items.value);
    xAxisData.value = rankData.map((items) => items.name);
    updataOption();
    startInterval();
};

//注册函数，等待websocket服务端发回数据后，调用被注册的函数；
if (socket) {
    socket.registerCallback('RankData', getData);
}

const updataOption = () => {
    const dataOption = {
        xAxis: {
            data: xAxisData.value,
        },
        series: {
            data: seriesData.value,
        },
        dataZoom: {
            type: 'inside',
            startValue: start.value,
            endValue: end.value,
        },
    };
    myEcharts.setOption(dataOption);
};

const adapterChange = () => {
    let fontTitle = (echartsRef.value.offsetWidth / 100) * 3.6;
    console.log(fontTitle);
    const adapterOption = {
        title: {
            textStyle: {
                fontSize: fontTitle,
            },
        },
        series: [
            {
                barWidth: fontTitle,
                itemStyle: {
                    // color: '#37a2da',  // 设置柱子颜色
                    borderRadius: [fontTitle / 2, fontTitle / 2, 0, 0],
                },
            },
        ],
    };
    myEcharts.setOption(adapterOption);
    myEcharts.resize();
};

const startInterval = () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        start.value++;
        end.value++;
        if (end.value == xAxisData.value.length) {
            start.value = 0;
            end.value = 9;
        }
        updataOption();
    }, 2000);
};

onMounted(() => {
    initEcharts();
    // getData()   axios请求的时候使用
    socket.send({
        action: 'getData',
        socketType: 'RankData',
        chartName: 'rank',
        value: '',
    });
    window.addEventListener('resize', adapterChange);
    adapterChange();
});

onUnmounted(() => {
    window.removeEventListener('resize', adapterChange);
    clearInterval(timer);
    socket.unregisterCallback('RankData'); //只有在websocket方法的时候使用；
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
        initEcharts();
        adapterChange();
        updataOption();
    },
);
</script>
<style scoped></style>
