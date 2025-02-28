<template>
    <div class="com-container">
        <div class="com-Echarts" ref="echartsRef" id="main" @dblclick="restoreChinaMap"></div>
        <div class="arrow">
            <span class="left" @click="changePieDataTypeLeft">＜</span>
            <span class="right" @click="changePieDataTypeRight">＞</span>
            <span class="showTitile" :style="titleTypeSize">{{ titleType }}</span>
        </div>
    </div>
</template>
<script setup>
defineOptions({
    name: 'Hot',
});

import { ref, onMounted, onUnmounted, computed, inject, watch } from 'vue';
import requestAxios from '@/axios/axios';

const echartsRef = ref();
let myEcharts = null;
const requestData = ref(null);
const index = ref(0);
const titleFontSize = ref();

const titleType = computed(() => requestData.value?.[index.value]?.name);
const titleTypeSize = computed(() => {
    return {
        fontSize: titleFontSize.value + 'px',
    };
});

const initEcharts = () => {
    myEcharts = echarts.init(echartsRef.value, themeStore.theme);
    const initOption = {
        series: [
            {
                type: 'pie',
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                    labelLine: {
                        show: false,
                    },
                },
            },
        ],
        title: {
            text: '| 热销商品占比',
            top: 20,
            left: 20,
        },
    };
    myEcharts.setOption(initOption);
};

//引入socket实例

const socket = inject('socket');

//axios请求的方法
// const getData = async()=>{
//     requestData.value = await requestAxios.get('hot');
//     console.log(requestData.value);
//     updateEcharts();
// }

//websocket request

const getData = (ret) => {
    requestData.value = ret;
    updateEcharts();
};

if (socket) {
    socket.registerCallback('hotData', getData);
}

const updateEcharts = () => {
    const pieData = requestData.value?.[index.value].children.map((items) => {
        return {
            name: items.name,
            value: items.value,
            children: items.children,
        };
    });

    const legendData = requestData.value?.[index.value].children.map((items) => {
        return items.name;
    });

    const updataOption = {
        series: [
            {
                data: pieData,
            },
        ],
        legend: {
            data: legendData,
            icon: 'circle',
            top: 50,
        },
        tooltip: {
            show: true,
            formatter: (arg) => {
                const thirdCategoryData = arg.data.children;
                console.log(thirdCategoryData);
                const total = thirdCategoryData.reduce((pre, itme) => pre + itme.value, 0);
                let str = '';
                thirdCategoryData.forEach((items) => {
                    str += `${items.name}:  ${parseInt((items.value / total) * 100) + '%'}<br/>`;
                });
                return str;
            },
        },
    };
    myEcharts.setOption(updataOption);
};

const adapterChange = () => {
    titleFontSize.value = (echartsRef.value.offsetWidth * 3.6) / 100;
    const adapterOption = {
        title: {
            textStyle: {
                fontSize: titleFontSize.value * 1.5,
            },
        },
        series: [
            {
                center: ['50%', '50%'],
                radius: titleFontSize.value * 5.5,
                //单个值表示一个饼圆；数组构成的两个值，表示空心圆环，内外半径；
            },
        ],
        legend: {
            itemWidth: titleFontSize.value / 1.1,
            itemHeight: titleFontSize.value / 1.1,
            textStyle: {
                fontSize: titleFontSize.value / 1.1,
            },
        },
    };
    myEcharts.setOption(adapterOption);
    myEcharts.resize();
};

//点击左右箭头，改变pie数据类型

const changePieDataTypeLeft = () => {
    index.value--;
    if (index.value < 0) {
        index.value = requestData.value?.length - 1;
    }
    console.log(index.value);
    updateEcharts();
};

const changePieDataTypeRight = () => {
    index.value++;
    if (index.value > requestData.value?.length - 1) {
        index.value = 0;
    }
    console.log(index.value);
    updateEcharts();
};

onMounted(() => {
    initEcharts();
    // getData()

    socket.send({
        action: 'getData',
        socketType: 'hotData',
        chartName: 'hot',
        value: '',
    });
    window.addEventListener('resize', adapterChange);
    adapterChange();
});

onUnmounted(() => {
    window.removeEventListener('resize', adapterChange);
    socket.unregisterCallback('hotData');
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
        updateEcharts();
    },
);
</script>
<style scoped>
.com-container {
    position: relative;
}
.left,
.right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #fff;
}

.left {
    left: 5%;
}

.right {
    right: 5%;
}

.showTitile {
    position: absolute;
    right: 5%;
    bottom: 5%;
    color: #fff;
}
</style>
