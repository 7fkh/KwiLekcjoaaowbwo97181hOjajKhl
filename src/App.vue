‏<script setup>
‏import { RouterView } from 'vue-router'
‏import { ref } from 'vue'

// بدلاً من استيراد KhliLoding، سنجربه بدون loading أولاً
‏const isPageLoading = ref(false) // مؤقتاً لا نظهر loading
‏</script>

‏<template>
  <!-- معلق مؤقتاً -->
‏  <!-- <KhliLoding 
‏    :isLoading="isPageLoading"
‏    :loadingText="'جاري تحميل المتجر...'"
‏    :duration="5000"
  /> -->
  
‏  <RouterView />
‏</template>

‏<style scoped>
‏</style>