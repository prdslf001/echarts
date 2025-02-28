<template>
    <div class="screenPageContainer">
        <header>
            <div class="logo">
                <img src="../../public/static/img/logo_dark.png" alt="" />
            </div>
            <div class="title">
                <span>电商平台实时监测系统</span>
            </div>
            <div class="tel" @click="handleThemeStore">
                <img src="../../public/static/img/qiehuan_dark.png" alt="" />
            </div>
        </header>
        <main>
            <section class="trend">
                <div
                    class="trendContainer"
                    :class="[fullScreenStatus['trend'] ? 'fullScreenShow' : '']"
                >
                    <Trend ref="trend"></Trend>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['trend']"
                            @click="zoomIn('trend')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('trend')"
                            v-show="fullScreenStatus['trend']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section class="map">
                <div
                    class="mapContainer"
                    :class="[fullScreenStatus['map'] ? 'fullScreenShow' : '']"
                >
                    <Map ref="map"></Map>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['map']"
                            @click="zoomIn('map')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('map')"
                            v-show="fullScreenStatus['map']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section class="hot">
                <div
                    class="hotContainer"
                    :class="[fullScreenStatus['hot'] ? 'fullScreenShow' : '']"
                >
                    <Hot ref="hot"></Hot>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['hot']"
                            @click="zoomIn('hot')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('hot')"
                            v-show="fullScreenStatus['hot']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section class="seller">
                <div
                    class="sellerContainer"
                    :class="[fullScreenStatus['seller'] ? 'fullScreenShow' : '']"
                >
                    <Seller ref="seller"></Seller>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['seller']"
                            @click="zoomIn('seller')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('seller')"
                            v-show="fullScreenStatus['seller']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section class="rank">
                <div
                    class="rankContainer"
                    :class="[fullScreenStatus['rank'] ? 'fullScreenShow' : '']"
                >
                    <Rank ref="rank"></Rank>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['rank']"
                            @click="zoomIn('rank')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('rank')"
                            v-show="fullScreenStatus['rank']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
            <section class="budget">
                <div
                    class="budgetContainer"
                    :class="[fullScreenStatus['budget'] ? 'fullScreenShow' : '']"
                >
                    <Budget ref="budget"></Budget>
                    <div class="resize">
                        <svg
                            v-show="!fullScreenStatus['budget']"
                            @click="zoomIn('budget')"
                            t="1740569387901"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2919"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
                                fill="#ffffff"
                                p-id="2920"
                            ></path>
                        </svg>
                        <svg
                            @click="zoomOut('budget')"
                            v-show="fullScreenStatus['budget']"
                            t="1740639402554"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2062"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M470.624 553.376a32 32 0 0 1 2.656 42.24l-2.656 3.008L269.28 800l145.984 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H192l-2.4-0.096-4.032-0.544-3.552-0.96-3.552-1.408-3.136-1.664-3.072-2.144-2.88-2.56a32.32 32.32 0 0 1-3.104-3.584l-2.272-3.52-1.728-3.648-1.12-3.36-0.96-4.8L160 832v-224.128a32 32 0 0 1 63.776-3.712l0.224 3.712-0.032 146.848 201.408-201.344a32 32 0 0 1 45.248 0zM608.736 160H832l2.4 0.096 4.032 0.544 3.552 0.96 3.552 1.408 3.136 1.664 3.072 2.144 2.88 2.56c1.152 1.12 2.176 2.336 3.104 3.584l2.272 3.52 1.728 3.648 1.12 3.36 0.96 4.8L864 192v224.128a32 32 0 0 1-63.776 3.712L800 416.128v-146.88l-201.376 201.376a32 32 0 0 1-47.904-42.24l2.656-3.008L754.688 224h-145.92a32 32 0 0 1-31.808-28.256L576.736 192a32 32 0 0 1 28.288-31.776L608.736 160z"
                                fill="#ffffff"
                                p-id="2063"
                            ></path>
                        </svg>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
defineOptions({
    name: 'ScreenPage',
});

import Trend from '@/components/Trend.vue';
import Seller from '@/components/Seller.vue';
import Hot from '@/components/Hot.vue';
import Rank from '@/components/Rank.vue';
import Map from '@/components/Map.vue';
import Budget from '@/components/Budget.vue';
import { inject, nextTick, reactive, ref } from 'vue';

const fullScreenStatus = reactive({
    trend: false,
    map: false,
    hot: false,
    rank: false,
    seller: false,
    budget: false,
});

const socket = inject('socket');

const trend = ref();
const map = ref();
const hot = ref();
const rank = ref();
const seller = ref();
const budget = ref();

const zoomIn = (select) => {
    // fullScreenStatus[select] = !fullScreenStatus[select];
    // nextTick(() => {
    //     // trend.value.adapterChange();
    //     switch (select) {
    //         case 'trend':
    //             trend.value.adapterChange();
    //             break;
    //         case 'map':
    //             map.value.adapterChange();
    //             break;
    //         case 'hot':
    //             hot.value.adapterChange();
    //             break;
    //         case 'rank':
    //             rank.value.adapterChange();
    //             break;
    //         case 'seller':
    //             seller.value.adapterChange();
    //             break;
    //         case 'budget':
    //             budget.value.adapterChange();
    //             break;
    //     }
    // });

    // 以下是socket方法；
    let tagetValue = !fullScreenStatus[select];
    socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: select,
        value: tagetValue,
    });
};

const recvData = (data) => {
    let chartName = data.chartName;
    fullScreenStatus[chartName] = !fullScreenStatus[chartName];
    nextTick(() => {
        // trend.value.adapterChange();
        switch (chartName) {
            case 'trend':
                trend.value.adapterChange();
                break;
            case 'map':
                map.value.adapterChange();
                break;
            case 'hot':
                hot.value.adapterChange();
                break;
            case 'rank':
                rank.value.adapterChange();
                break;
            case 'seller':
                seller.value.adapterChange();
                break;
            case 'budget':
                budget.value.adapterChange();
                break;
        }
    });
};
// recvData要在定义后再注册；
if (socket) {
    socket.registerCallback('fullScreen', recvData);
}
// const zoomOut = (select) => {
//     fullScreenStatus[select] = !fullScreenStatus[select];
//     nextTick(() => {
//         // trend.value.adapterChange();
//         switch (select) {
//             case 'trend':
//                 trend.value.adapterChange();
//                 break;
//             case 'map':
//                 map.value.adapterChange();
//                 break;
//             case 'hot':
//                 hot.value.adapterChange();
//                 break;
//             case 'rank':
//                 rank.value.adapterChange();
//                 break;
//             case 'seller':
//                 seller.value.adapterChange();
//                 break;
//             case 'budget':
//                 budget.value.adapterChange();
//                 break;
//         }
//     });
// };

import { themeChangeStore } from '@/store/themeStore';
const themeStore = themeChangeStore();

const handleThemeStore = () => {
    themeStore.changeTheme();
};
</script>

<style scoped>
.screenPageContainer {
    background-color: black;
    color: #fff;
    padding: 10px 20px;
}

.screenPageContainer header {
    display: flex;
    justify-content: space-between;
    height: 80px;
    background-image: url('../../public/static/img/header_border_dark.png');
    background-repeat: no-repeat;
    background-position: center top;
    position: relative;
    /* overflow: hidden; */
}

.screenPageContainer header .title {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    font-weight: 700;
}

.screenPageContainer main {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(12, 1fr);
    gap: 20px;
    height: calc(100vh - 100px);
}

.screenPageContainer main section {
    background-color: #111;
    border-radius: 3%;
    overflow: hidden;
    /* padding: 15px; */
}

.screenPageContainer main section.trend {
    grid-row: 1/7;
}

.screenPageContainer main section.seller {
    grid-row: 7/13;
}

.screenPageContainer main section.hot {
    grid-row: 1/7;
}

.screenPageContainer main section.rank {
    grid-row: 8/13;
}

.screenPageContainer main section.map {
    grid-row: 1/8;
}

.screenPageContainer main section.budget {
    grid-row: 7/13;
}

.trendContainer,
.mapContainer,
.hotContainer,
.sellerContainer,
.rankContainer,
.budgetContainer {
    position: relative;
    width: 100%;
    height: 100%;
}

.resize {
    position: absolute;
    top: 15px;
    right: 15px;
}

.fullScreenShow {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 1000 !important;
}
</style>
