import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Analytics } from "@vercel/analytics/next"

library.add(fas)

// إنشاء التطبيق
const app = createApp(App)

// استخدام Router
app.use(router)

// تكوين الخصائص العامة
app.config.globalProperties.$formatPrice = function(price) {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0
  }).format(price)
}

// معالج الأخطاء العام
app.config.errorHandler = (error, instance, info) => {
  console.error('خطأ في التطبيق:', error)
  console.error('معلومات الخطأ:', info)
}

// تحسينات الأداء
app.config.performance = true

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
