<template>
    <div class="com-container">
        <div class="com-Echarts" ref="echartsRef" id="main" @dblclick="restoreChinaMap"></div>
    </div>
</template>

<script setup>
defineOptions({
    name: 'Map',
});

import { ref, onMounted, onUnmounted, inject, watch } from 'vue';
import { getProvinceMapInfo } from '@/utils/mapUtils';
import requestAxios from '@/axios/axios';
import axios from 'axios';
import { color } from 'echarts';
const echartsRef = ref();
let chinaMap = null;
let myEcharts = null;
const scatterData = ref(null);
let ProvinceMapData = {};

const socket = inject('socket');

const initEcharts = async () => {
    myEcharts = echarts.init(echartsRef.value, themeStore.theme);
    //从本地获取中国地图数据;
    try {
        chinaMap = await axios.get('http://localhost:8888/static/map/china.json');
    } catch (error) {
        console.log(error.message);
    }

    echarts.registerMap('china', chinaMap.data); // 这个是全局的，是echarts；不是myecharts；

    const initOption = {
        title: {
            text: '| 商家分布',
            left: 20,
            top: 20,
        },

        geo: {
            map: 'china',
            roam: true,
            top: '5%',
            bottom: '5%',
            itemStyle: {
                areaColor: '#2E72BF',
                borderColor: '#333',
            },
        },
    };
    myEcharts.setOption(initOption);
    myEcharts.on('click', async (arg) => {
        const ProvinceMap = getProvinceMapInfo(arg.name);
        console.log(ProvinceMap);
        if (!ProvinceMapData[ProvinceMap.key]) {
            try {
                ProvinceMapData = await axios.get('http://localhost:8888/' + ProvinceMap.path);
                ProvinceMapData[ProvinceMap.key] = ProvinceMapData.data;
            } catch (error) {
                console.log(error.message);
            }
        }

        echarts.registerMap(ProvinceMap.key, ProvinceMapData.data);
        const changeMapOption = {
            geo: {
                type: 'map',
                map: ProvinceMap.key,
            },
        };
        myEcharts.setOption(changeMapOption);
    });
};

//获取后台/后端数据(axios方法);

// const getData = async()=>{
//    try {
//       scatterData.value = await requestAxios.get('map');
//    } catch (error) {
//       console.log(error.message)
//    }

//    updateEcharts();
// }

//websocket获取数据;

const getData = (ret) => {
    scatterData.value = ret;
    updateEcharts();
};

// 注册函数；

if (socket) {
    socket.registerCallback('mapData', getData);
}

//获取数据后，更新Echarts；
const updateEcharts = () => {
    const seriesData = scatterData.value?.map((item) => {
        return {
            type: 'effectScatter',
            rippleEffect: {
                scale: 10,
                brushType: 'stroke',
            },
            coordinateSystem: 'geo',
            name: item.name,
            data: item.children,
        };
    });
    const legendData = scatterData.value?.map((item) => item.name);
    const updataOption = {
        series: seriesData,
        legend: {
            left: '5%',
            bottom: '5%',
            orient: 'vertical',
            data: legendData,
        },
    };
    myEcharts.setOption(updataOption);
};

const adapterChange = () => {
    const fontSize = (echartsRef.value.offsetWidth / 100) * 3.6;
    const adapterOption = {
        title: {
            textStyle: {
                fontSize: fontSize,
            },
        },
        legend: {
            itemWidth: fontSize,
            itemHeight: fontSize,
            textStyle: {
                fontSize: fontSize / 2,
            },
        },
    };
    myEcharts.setOption(adapterOption);
    myEcharts.resize();
};

const restoreChinaMap = () => {
    // echarts.registerMap('china',chinaMap.data);
    const restoreChinaOption = {
        geo: {
            map: 'china',
        },
    };
    myEcharts.setOption(restoreChinaOption);
};
onMounted(() => {
    initEcharts();
    // getData(); axios调用

    socket.send({
        action: 'getData',
        socketType: 'mapData',
        chartName: 'map',
        value: '',
    });
    window.addEventListener('resize', adapterChange);
    adapterChange();
});

onUnmounted(() => {
    window.removeEventListener('resize', adapterChange);
    socket.unregisterCallback('mapData');
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

<style scoped></style>
