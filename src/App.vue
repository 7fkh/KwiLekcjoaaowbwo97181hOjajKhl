‏<script setup>
‏import { RouterLink, RouterView } from 'vue-router'
‏import { ref, onMounted } from 'vue'
‏import KhliLoding from '@/components/khliLoding.vue'

// متغيرات التحميل
‏const isPageLoading = ref(true)

// دالة انتهاء التحميل
‏const onLoadingComplete = () => {
‏  isPageLoading.value = false
‏  console.log('انتهى التحميل!')
}


‏onMounted(() => {

})
‏</script>

‏<template>
‏  <KhliLoding 
‏    :isLoading="isPageLoading"
‏    :loadingText="'جاري تحميل المتجر...'"
‏    :duration="5000"
‏    @loading-complete="onLoadingComplete"
  />
  
 
‏  <RouterView />
‏</template>

‏<style scoped>
‏</style>