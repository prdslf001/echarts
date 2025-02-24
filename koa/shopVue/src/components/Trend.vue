<template>
<div class="com-container">
    <div class="title" :style="fontTitleStyle">
        <span @click="showList = !showList">{{ currentSelected }}</span>
        <svg  @click="showList = !showList" t="1735988435988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4236" :width="fontTitle" :height="fontTitle" ><path d="M520.4992 797.696l467.456-459.776c7.2704-7.168 7.3728-18.8416 0.2048-26.0096-7.168-7.2704-18.8416-7.3728-26.0096-0.2048L507.6992 758.6816 54.8864 305.8688c-7.168-7.168-18.8416-7.168-26.0096 0-3.584 3.584-5.4272 8.2944-5.4272 13.0048 0 4.7104 1.8432 9.4208 5.4272 13.0048L494.592 797.5936C501.6576 804.7616 513.2288 804.7616 520.4992 797.696z" fill="#ffffff" p-id="4237"></path></svg>
        <ul v-show="showList">
            <li v-for="(items,index) in listDataType" :key="index" v-show="showList" @click="changeSlected(items.key)">{{ items.text }}</li>
        </ul>
    </div>
    <div class="com-Echarts" ref="echartsRef" id="main"></div>
</div>
</template>
<script setup>
defineOptions({
    name:'Trend',
})
import requestAxios from "@/axios/axios";
import axios from "axios";
import { ref,onMounted,onUnmounted,computed, inject} from "vue";
const socket = inject('socket')

const echartsRef = ref(null);
let myEcharts = null;
let dataResult = ref();
let showList = ref(false);
let selectType = ref('commodity');
const fontTitle = ref(10);
//计算属性             
const listDataType = computed(()=>dataResult.value?.type.filter(items => items.text !=currentSelected.value ))
const currentSelected = computed(()=>dataResult.value?.[selectType.value]?.title);
const fontTitleStyle = computed(()=> ({fontSize: fontTitle.value + 'px'})) //这里返回的对象需要注意加上()；否则js将会把{}当做函数体，而非对象了；

// 点击不同的类型，展现不同的图表
const changeSlected = (currentSlected)=>{
    selectType.value = currentSlected;
    // console.log(selectType.value);
    updateEcharts()  //点击后，对应的echarts数据表更新；
    showList.value = false;  //点击后，列表隐藏； 
}


const initEcharts = ()=>{
   myEcharts = echarts.init(echartsRef.value,'chalk');
   const initOption ={
    xAxis:{type:'category',boundaryGap:false},
    yAxis:{type:'value'},
    grid:{
        left:'3%',
        top:'35%',
        right:'4%',
        bottom:'1%',
        containLabel:true
    },
    tooltip:{
      trigger:'axis'
    },
    legend:{
      left:20,
      top:'15%',
      icon:'circle',
    },
    // series:[{
    //     label:{
    //         show:true,
    //     },
    // }],
    
   }
   myEcharts.setOption(initOption)
}

//原axios请求时候用的getData方法；
// const getData = async()=>{
//     try{
//         const Result  = await requestAxios.get('trend');
//         dataResult.value = Result.data;
//         console.log(dataResult.value)
//     }catch(error){
//         console.log(error.message)
//     }
//     updateEcharts()
// }



// webScoket注册调用的getData方法；
const getData = (ret)=>{
    console.log(ret)
    dataResult.value = ret;
    updateEcharts()
}

const updateEcharts = ()=>{
   //半透明颜色值
   const colorArr1 = [
     'rgba(11,168,44,0.5)',
     'rgba(44,110,255,0.5)',
     'rgba(22,242,217,0.5)',
     'rgba(254,33,30,0.5)',
     'rgba(150,105,0,0.5)',
   ]
    //全透明颜色值

    const colorArr2 = [
     'rgba(11,168,44,1)',
     'rgba(44,110,255,1)',
     'rgba(22,242,217,1)',
     'rgba(254,33,30,1)',
     'rgba(150,105,0,1)',
   ]
   const monthData = dataResult.value.common.month
   const commodityData = dataResult.value[selectType.value].data;
   const seriescommodityData = commodityData.map((items,index)=>{
    return {type:'line',
            data:items.data,
            stack:selectType.value,
            name:items.name,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorArr1[index]},
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: colorArr2[index] }
                ]),
            }
    }
   })

   const legendData = commodityData.map((items)=>items.name)
   console.log(commodityData)
   const dataOption = {
    xAxis:{data:monthData},
    series:seriescommodityData,
    legend:{
        show:true,  
        data:legendData,  
    }
   }
   myEcharts.setOption(dataOption)
}

const adapterChange = ()=>{
    fontTitle.value = (echartsRef.value.offsetWidth)/100 *3.6;
    const adapterOption = {
        legend:{
            itemWidth:fontTitle.value,
            itemHeight:fontTitle.value,
            textStyle:{
                fontSize:fontTitle.value/2
            }
        }
    }
    myEcharts.setOption(adapterOption);
    myEcharts.resize();
}


// 注册函数，socket后端服务器返回数据的时候直接被调用
if (socket) {
        // 注册回调
        // 这里的（getData方法中） this 指向组件实例（由于箭头函数的词法作用域）
    socket.registerCallback('trendData',  getData)
    console.log(socket)
}


onMounted(()=>{
    initEcharts();
    
    socket.send({
    action:'getData',
    socketType:'trendData',
    chartName:'trend',
    value:''
    })
    
    // getData();  axios请求的时候调用这个对应的getData的函数
    window.addEventListener('resize',adapterChange)
    adapterChange()
})

onUnmounted(()=>{
    window.removeEventListener('resize',adapterChange)
    socket.unregisterCallback('trendData')  // 只有在websocket的时候使用
})
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
ul,li{
    list-style: none;
}
.title{
    position: absolute;
    z-index: 1000;
    color: #fff;
}
.title span{
    margin-right: 10px;
}
</style>
