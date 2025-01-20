<template>
  <div class="com-page">
    <Seller></Seller>
  </div>
 
</template>
 
<script setup>
  defineOptions({
    name:'SellerPage'
  })
  import { ref,computed } from 'vue';
  import Seller from '@/components/Seller.vue';
 

</script>
<style>
  .chart{
    height: 400px;
  }
</style>
