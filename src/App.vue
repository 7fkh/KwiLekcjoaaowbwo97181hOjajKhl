<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const route = useRoute();
</script>

<template>
  <!-- إظهار NavBar في كل الصفحات ما عدا ProductsPlace -->
  <NavBar v-if="route.name !== 'ProductsPlace'" />
  <RouterView />
</template>

<style scoped>
/* يمكنك إضافة تنسيقات عامة هنا إذا أردت */
</style>