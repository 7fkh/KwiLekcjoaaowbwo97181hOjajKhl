<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'
import { Autoplay, EffectCards } from 'swiper/modules'

export default {
  name: 'KhaliStore',
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide,
    RouterLink
  },
  data() {
    return {
      modules: [Autoplay, EffectCards],
      isVisible: false,
      isLoading: true,
      currentTestimonial: 0,
      animationObserver: null,
      feedbackList: [
        {
          id: 1,
          username: "عوض الحربي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "10/10 افضل متجر باذن الله مب اخر مره",
          rating: 5,
          date: "2024-12-15"
        },
        {
          id: 2,
          username: "سعد مرتضى",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أنصحكم فيه, ماكان عندي قيمة الطلب كامل ونقص المبلغ الله يسعده",
          rating: 5,
          date: "2024-12-10"
        },
        {
          id: 3,
          username: "عبدالله الغامدي",
          avatar: "https://i.imgur.com/QP1AlsJ.jpeg",
          text: "الافضل ابو خلي و موثوقققق مره انصحكم فيه،",
          rating: 5,
          date: "2024-12-08"
        },
        {
          id: 4,
          username: "ابو زهره",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "خلي ستور امبراطور الساحة ..",
          rating: 5,
          date: "2024-12-05"
        },
        {
          id: 5,
          username: "فهد عبدالله",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو",
          rating: 5,
          date: "2024-11-28"
        },
        {
          id: 6,
          username: "صالح المريسي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "ابو خلي ما يقصر فنان بكل شي تبي بوتات واقعية تبي شوب تبي اي شي بس كلمه وجهز فلوسك",
          rating: 5,
          date: "2024-11-25"
        },
        {
          id: 7,
          username: "سالم التميمي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "متجر جميل وجيد اسعاره مقبوله وسريعين بالخدمه",
          rating: 5,
          date: "2024-11-20"
        }
      ],
      stats: [
        { number: "1000+", label: "عميل راضي", icon: "👥" },
        { number: "500+", label: "مشروع مكتمل", icon: "✅" },
        { number: "24/7", label: "دعم فني", icon: "🔧" },
        { number: "5", label: "سنوات خبرة", icon: "⭐" }
      ],
      features: [
        {
          icon: 'monitor',
          title: "تطوير المواقع",
          description: "مواقع احترافية وسريعة"
        },
        {
          icon: 'wrench',
          title: "الحلول التقنية",
          description: "حلول مبتكرة ومتطورة"
        },
        {
          icon: 'zap',
          title: "خدمة سريعة",
          description: "تسليم في الوقت المحدد"
        },
        {
          icon: 'check-circle',
          title: "دقة عالية",
          description: "جودة مضمونة 100%"
        }
      ]
    }
  },
  computed: {
    averageRating() {
      if (!this.feedbackList.length) return 0
      const total = this.feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0)
      return (total / this.feedbackList.length).toFixed(1)
    },
    totalCustomers() {
      return this.feedbackList.length
    },
    swiperConfig() {
      return {
        modules: this.modules,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: { 
          delay: 4000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        },
        effect: 'cards',
        grabCursor: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            effect: 'slide'
          },
          1024: {
            slidesPerView: 3,
            effect: 'slide'
          }
        }
      }
    }
  },
  mounted() {
    this.initializeComponent()
  },
  beforeUnmount() {
    // تنظيف المراقبين
    if (this.animationObserver) {
      this.animationObserver.disconnect()
    }
  },
  methods: {
    async initializeComponent() {
      try {
        // تأثير التحميل المتدرج
        await this.simulateLoading()
        
        // تحسين الأداء
        await this.optimizePerformance()
        
        this.isLoading = false
        
        // تأخير لضمان عرض DOM
        await this.$nextTick()
        
        this.isVisible = true
      } catch (error) {
        console.error('Error initializing component:', error)
        this.isLoading = false
      }
    },
    
    simulateLoading() {
      return new Promise(resolve => {
        setTimeout(resolve, 300)
      })
    },
    
    async optimizePerformance() {
      // تحسين تحميل الصور
      await this.preloadCriticalImages()
      
      // إضافة مراقب التمرير للتحميل المتدرج
      this.setupScrollObserver()
    },
    
    preloadCriticalImages() {
      return new Promise(resolve => {
        const imageUrls = [...new Set(this.feedbackList.map(feedback => feedback.avatar))]
        const promises = imageUrls.map(url => this.loadImage(url))
        
        Promise.allSettled(promises).then(() => resolve())
      })
    },
    
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    },
    
    setupScrollObserver() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
      }
      
      this.animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            // إلغاء مراقبة العنصر بعد الرسوم المتحركة
            this.animationObserver.unobserve(entry.target)
          }
        })
      }, observerOptions)
      
      // مراقبة العناصر القابلة للرسوم المتحركة
      this.$nextTick(() => {
        const animatableElements = this.$el?.querySelectorAll('.feature-item, .testimonial-card, .stat-item')
        animatableElements?.forEach(el => this.animationObserver.observe(el))
      })
    },
    
    handleImageError(event, fallbackUrl = "https://i.imgur.com/COjYjpR.png") {
      if (event.target.src !== fallbackUrl) {
        event.target.src = fallbackUrl
      }
    },
    
    formatDate(dateString) {
      try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
          return 'تاريخ غير صحيح'
        }
        return date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return 'تاريخ غير صحيح'
      }
    },
    
    getFeatureIcon(iconName) {
      const icons = {
        monitor: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                   <line x1="8" y1="21" x2="16" y2="21"/>
                   <line x1="12" y1="17" x2="12" y2="21"/>
                 </svg>`,
        wrench: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                 </svg>`,
        zap: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                 </svg>`,
        'check-circle': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <circle cx="12" cy="12" r="10"/>
                   <path d="m9 12 2 2 4-4"/>
                 </svg>`
      }
      return icons[iconName] || icons.monitor
    },
    
    // دالة لتحسين الوصولية
    announceToScreenReader(message) {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = message
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }
  }
}
</script>

<template>
  <main class="khali-store" role="main">
    <!-- Loading State -->
    <div 
      v-if="isLoading" 
      class="loading-overlay"
      role="status"
      aria-label="جاري التحميل"
    >
      <div class="loading-spinner" aria-hidden="true"></div>
      <span class="sr-only">جاري تحميل الصفحة...</span>
    </div>

```
<!-- Hero Section -->
<section class="home" aria-label="القسم الرئيسي">
  <div class="floating-elements" aria-hidden="true">
    <div 
      v-for="n in 8" 
      :key="`floating-${n}`"
      class="floating-element"
      :style="{ animationDelay: `${(n - 1) * 0.5}s` }"
    ></div>
  </div>

  <NavBar />
  
  <div class="hero-content">
    <div class="text" :class="{ 'visible': isVisible }">
      <header class="logo-container">
        <h1 class="main-title">خلي ستور</h1>
        <div class="title-underline" aria-hidden="true"></div>
      </header>
      
      <h2 class="subtitle">
        متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونيه
      </h2>
      
      <div class="features-grid" role="list" aria-label="خدماتنا الرئيسية">
        <div 
          v-for="(feature, index) in features" 
          :key="`feature-${index}`"
          class="feature-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
          role="listitem"
        >
          <div 
            class="feature-icon" 
            v-html="getFeatureIcon(feature.icon)"
            aria-hidden="true"
          ></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
      
      <div class="contact-info" role="complementary" aria-label="معلومات التواصل">
        <div class="contact-item">
          <div class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <span>متاح 24/7</span>
        </div>
        <div class="contact-item">
          <div class="contact-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
          </div>
          <span>جودة مضمونة</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="feedbacks" aria-label="آراء العملاء">
  <div class="section-header">
    <h2 class="section-title">شهادة عملاء خلي ستور</h2>
    <p class="section-subtitle">KhLiStoRe Customer Reviews</p>
    <div class="rating-summary" role="img" :aria-label="`متوسط التقييم ${averageRating} من 5 نجوم`">
      <span class="average-rating">{{ averageRating }}</span>
      <div class="stars" aria-hidden="true">
        <span v-for="n in 5" :key="`header-star-${n}`" class="star filled">★</span>
      </div>
      <span class="total-reviews">({{ totalCustomers }} تقييم)</span>
    </div>
    <div class="section-divider" aria-hidden="true"></div>
  </div>
  
  <div class="testimonials-container">
    <Swiper
      v-bind="swiperConfig"
      class="testimonial-swiper"
      role="region"
      aria-label="عرض آراء العملاء"
    >
      <SwiperSlide v-for="feedback in feedbackList" :key="`feedback-${feedback.id}`">
        <article class="testimonial-card">
          <header class="card-header">
            <img 
              class="user-img" 
              :src="feedback.avatar" 
              :alt="`صورة ${feedback.username}`"
              @error="handleImageError"
              loading="lazy"
            />
            <div class="quote-icon" aria-hidden="true">"</div>
          </header>
          
          <div class="card-body">
            <h3 class="username">{{ feedback.username }}</h3>
            <div 
              class="stars" 
              role="img" 
              :aria-label="`تقييم ${feedback.rating} من 5 نجوم`"
            >
              <span 
                v-for="n in 5" 
                :key="`star-${feedback.id}-${n}`"
                class="star"
                :class="{ 'filled': n <= feedback.rating }"
                aria-hidden="true"
              >★</span>
            </div>
            <blockquote class="feedback-text">{{ feedback.text }}</blockquote>
            <time class="review-date" :datetime="feedback.date">
              {{ formatDate(feedback.date) }}
            </time>
          </div>
          
          <footer class="card-footer">
            <div class="verified-badge">
              <span>✓ عميل محقق</span>
            </div>
          </footer>
        </article>
      </SwiperSlide>
    </Swiper>
  </div>
  
  <!-- Stats Section -->
  <div class="stats-container" role="region" aria-label="إحصائياتنا">
    <div 
      v-for="(stat, index) in stats" 
      :key="`stat-${index}`"
      class="stat-item"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="stat-icon" aria-hidden="true">{{ stat.icon }}</div>
      <div class="stat-number">{{ stat.number }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</section>

<Footer />
```

  </main>
</template>

<style scoped>
/* جذر المتغيرات - نظام الألوان المحسن */
:root {
  --primary-color: #5870f6;
  --secondary-color: #5c6074;
  --accent-color: #5870f6;
  --dark-blue: #5c6074;
  --light-blue: #5870f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.2);
  --shadow-strong: 0 20px 40px rgba(0, 0, 0, 0.3);
  --border-radius: 20px;
  --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* إعادة تعيين عامة محسنة */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.khali-store {
  width: 100%;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
  overflow-x: hidden;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* حالة التحميل */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: 1rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--text-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* القسم الرئيسي المحسن */
.home {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 25%, var(--dark-blue) 50%, var(--accent-color) 75%, var(--light-blue) 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
}

/* العناصر العائمة المحسنة */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  width: 15px;
  height: 15px;
  background: var(--glass-bg);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  opacity: 0.7;
}

.floating-element:nth-child(1) { top: 15%; left: 10%; }
.floating-element:nth-child(2) { top: 25%; left: 80%; }
.floating-element:nth-child(3) { top: 45%; left: 15%; }
.floating-element:nth-child(4) { top: 60%; left: 85%; }
.floating-element:nth-child(5) { top: 75%; left: 20%; }
.floating-element:nth-child(6) { top: 35%; left: 75%; }
.floating-element:nth-child(7) { top: 10%; left: 50%; }
.floating-element:nth-child(8) { top: 80%; left: 60%; }

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.7; 
  }
  50% { 
    transform: translateY(-30px) scale(1.2); 
    opacity: 1; 
  }
}

/* محتوى البطل المحسن */
.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.text {
  text-align: center;
  max-width: 900px;
  opacity: 0;
  transform: translateY(50px);
  transition: var(--transition-smooth);
}

.text.visible {
  opacity: 1;
  transform: translateY(0);
}

.logo-container {
  margin-bottom: 2rem;
}

.main-title {
  color: var(--text-primary);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #e0e6ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: textShimmer 3s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.title-underline {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--light-blue));
  margin: 1.5rem auto;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50% { transform: scaleX(1.1); opacity: 0.8; }
}

.subtitle {
  color: var(--text-secondary);
  font-weight: 300;
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  line-height: 1.7;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* شبكة الميزات المحسنة */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  transition: var(--transition-smooth);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease-out forwards;
}

...
@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* أيقونة الميزة */
.feature-icon svg {
  stroke: var(--text-primary);
}

/* عنوان الميزة */
.feature-title {
  font-size: 1.2rem;
  color: var(--text-primary);
  font-weight: bold;
}

/* وصف الميزة */
.feature-description {
  font-size: 0.95rem;
  color: var(--text-muted);
  text-align: center;
}

/* معلومات التواصل */
.contact-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
}

.contact-icon svg {
  stroke: var(--text-primary);
}

/* قسم الآراء */
.feedbacks {
  padding: 5rem 1rem;
  background: #111927;
  color: var(--text-primary);
  text-align: center;
}

/* عنوان القسم */
.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.section-subtitle {
  color: var(--text-muted);
  margin-top: 0.5rem;
  font-size: 1rem;
}

/* ملخص التقييم */
.rating-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.average-rating {
  font-size: 1.5rem;
  font-weight: bold;
}

.stars .star {
  font-size: 1.2rem;
  color: #ccc;
}

.stars .star.filled {
  color: gold;
}

.total-reviews {
  color: var(--text-muted);
}

/* خط الفصل */
.section-divider {
  height: 4px;
  width: 100px;
  margin: 1rem auto;
  background: var(--accent-color);
  border-radius: 2px;
}

/* سلايدر الآراء */
.testimonials-container {
  margin-top: 3rem;
}

.testimonial-card {
  background: var(--glass-bg);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.card-header {
  position: relative;
}

.user-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.quote-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 2rem;
  color: var(--accent-color);
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
}

.feedback-text {
  font-style: italic;
  color: var(--text-secondary);
}

.review-date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ختم التحقق */
.verified-badge {
  background: var(--success-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

/* إحصائيات */
.stats-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4rem;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(10px);
  min-width: 120px;
  transition: var(--transition-smooth);
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease-out forwards;
}

.stat-icon {
  font-size: 2rem;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>