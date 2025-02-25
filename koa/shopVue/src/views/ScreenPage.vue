<template>
    <div class="screenPageContainer">
        <header>
            <div class="logo">
                <img src="../../public/static/img/logo_dark.png" alt="" />
            </div>
            <div class="title">
                <span>电商平台实时监测系统</span>
            </div>
            <div class="tel">
                <img src="../../public/static/img/logo2.png" alt="" />
            </div>
        </header>
        <main>
            <section class="trend"><Trend /></section>
            <section class="seller">222</section>
            <section class="hot">3444</section>
            <section class="rank">5555</section>
            <section class="map">777</section>
            <section class="budget">8888</section>
        </main>
    </div>
</template>

<script setup>
defineOptions({
    name: 'ScreenPage',
});

import Trend from '@/components/Trend.vue';
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
    grid-template-columns: 1fr 1.8fr 1fr;
    gap: 20px;
}

.screenPageContainer main section {
    background-color: #111;
    height: 300px;
    border-radius: 3%;
    padding: 15px;
}
</style>
