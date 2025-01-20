<template>
    <div class="com-container">
        <div class="com-Echarts" ref="echartsRef" id="main">99999</div>
    </div>
</template>
<script setup>
defineOptions({
    name:'Budget'
})

import { ref,onMounted,onUnmounted } from "vue";
import requestAxios from "@/axios/axios";

const echartsRef = ref();
const requestData = ref(null);
const currentPage = ref(0);
let myEcharts = null;
let timer = null;
let titileFontSizt = null;

const initEcharts = ()=>{
    myEcharts = echarts.init(echartsRef.value,'chalk');
    const initOption = {
        title:{
            text:'| 销售数据占比',
            top:20,
            left:20,
        },

    }
    myEcharts.setOption(initOption);
    myEcharts.on('mouseover',()=>{
        clearInterval(timer)
    })
    myEcharts.on('mouseout',()=>{
        startInterval()
    })
}

const getData = async()=>{

    try {
        requestData.value = await requestAxios.get('stock');
        console.log(requestData.value)
    } catch (error) {
        console.log(error.message)
    }
    updateEcharts()
    startInterval()
}

const updateEcharts = ()=>{
    const centerArr = [
        ['18%','40%'],
        ['50%','40%'],
        ['82%','40%'],
        ['34%','75%'],
        ['66%','75%'],
    ]
    let start = currentPage.value * 5;
    let end = (currentPage.value +1) * 5;
    const seriesData = requestData.value?.data.slice(start,end).map((item,index)=>{
        return {
            type:'pie',
            center:centerArr[index],
            radius:[110,100],
            hoverAnimation:false,
            labelLine:{
                show:false,
            },
            label: {
                offset:[-140,0],
            },
            data:[
                {value:item.sales,
                 name: item.name + '\n' + item.stock
                },
                {value:item.stock}
            ]
        }
    })
    const updataOption = {
        series:seriesData
    }
    myEcharts.setOption(updataOption)
}

const adapterChange = ()=>{
    titileFontSizt = (echartsRef.value.offsetWidth)/100*3.6
    const adapterOption = {
        title:{
            textStyle:{
                fontSize:titileFontSizt
            }
        }
    }
    myEcharts.setOption(adapterOption)
    myEcharts.resize()
}

const startInterval = ()=>{
    if(timer) clearInterval(timer);
    timer = setInterval(()=>{
        currentPage.value++;
        if(currentPage.value > 1){
            currentPage.value = 0;
        }
        updateEcharts()    
    },2000)
}


onMounted(()=>{
    initEcharts()
    getData()
    window.addEventListener('resize',adapterChange)
    adapterChange()
})


onUnmounted(()=>{
    window.removeEventListener('resize',adapterChange)
    clearInterval(timer);
})

</script>
<style scoped>
</style>

