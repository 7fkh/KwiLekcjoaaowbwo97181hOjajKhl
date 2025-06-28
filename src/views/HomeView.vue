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
          icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                   <line x1="8" y1="21" x2="16" y2="21"/>
                   <line x1="12" y1="17" x2="12" y2="21"/>
                 </svg>`,
          title: "تطوير المواقع",
          description: "مواقع احترافية وسريعة"
        },
        {
          icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                 </svg>`,
          title: "الحلول التقنية",
          description: "حلول مبتكرة ومتطورة"
        },
        {
          icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                 </svg>`,
          title: "خدمة سريعة",
          description: "تسليم في الوقت المحدد"
        },
        {
          icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <circle cx="12" cy="12" r="10"/>
                   <path d="m9 12 2 2 4-4"/>
                 </svg>`,
          title: "دقة عالية",
          description: "جودة مضمونة 100%"
        }
      ]
    }
  },
  computed: {
    averageRating() {
      const total = this.feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0)
      return (total / this.feedbackList.length).toFixed(1)
    },
    totalCustomers() {
      return this.feedbackList.length
    }
  },
  mounted() {
    this.initializeComponent()
  },
  methods: {
    initializeComponent() {
      // تأثير التحميل المتدرج
      setTimeout(() => {
        this.isLoading = false
        this.isVisible = true
      }, 300)
      
      // تحسين الأداء - تأجيل التحميل للعناصر الثقيلة
      this.optimizePerformance()
    },
    
    optimizePerformance() {
      // تحسين تحميل الصور
      this.preloadImages()
      
      // إضافة مراقب التمرير للتحميل المتدرج
      this.setupScrollObserver()
    },
    
    preloadImages() {
      const imageUrls = this.feedbackList.map(feedback => feedback.avatar)
      imageUrls.forEach(url => {
        const img = new Image()
        img.src = url
      })
    },
    
    setupScrollObserver() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)
      
      // مراقبة العناصر القابلة للرسوم المتحركة
      this.$nextTick(() => {
        const animatableElements = this.$el.querySelectorAll('.feature-item, .testimonial-card, .stat-item')
        animatableElements.forEach(el => observer.observe(el))
      })
    },
    
    handleImageError(event, fallbackUrl = "https://i.imgur.com/COjYjpR.png") {
      event.target.src = fallbackUrl
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<template>
  <main class="khali-store">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

```
<!-- Hero Section -->
<section class="home">
  <div class="floating-elements">
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
      <div class="logo-container">
        <h1 class="main-title">خلي ستور</h1>
        <div class="title-underline"></div>
      </div>
      
      <h2 class="subtitle">
        متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونيه
      </h2>
      
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="`feature-${index}`"
          class="feature-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon" v-html="feature.icon"></div>
          <span class="feature-title">{{ feature.title }}</span>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
      
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <span>متاح 24/7</span>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
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
<section class="feedbacks">
  <div class="section-header">
    <h2 class="section-title">شهادة عملاء خلي ستور</h2>
    <p class="section-subtitle">KhLiStoRe Customer Reviews</p>
    <div class="rating-summary">
      <span class="average-rating">{{ averageRating }}</span>
      <div class="stars">
        <span v-for="n in 5" :key="`header-star-${n}`" class="star filled">★</span>
      </div>
      <span class="total-reviews">({{ totalCustomers }} تقييم)</span>
    </div>
    <div class="section-divider"></div>
  </div>
  
  <div class="testimonials-container">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :autoplay="{ 
        delay: 4000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true 
      }"
      :effect="'cards'"
      :grab-cursor="true"
      class="testimonial-swiper"
      :breakpoints="{
        768: {
          slidesPerView: 2,
          effect: 'slide'
        },
        1024: {
          slidesPerView: 3,
          effect: 'slide'
        }
      }"
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
            <div class="stars" :aria-label="`تقييم ${feedback.rating} من 5 نجوم`">
              <span 
                v-for="n in 5" 
                :key="`star-${feedback.id}-${n}`"
                class="star"
                :class="{ 'filled': n <= feedback.rating }"
                :aria-hidden="true"
              >★</span>
            </div>
            <blockquote class="feedback-text">{{ feedback.text }}</blockquote>
            <time class="review-date">{{ formatDate(feedback.date) }}</time>
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
  <div class="stats-container">
    <div 
      v-for="(stat, index) in stats" 
      :key="`stat-${index}`"
      class="stat-item"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="stat-icon">{{ stat.icon }}</div>
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

/* حالة التحميل */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
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

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-strong);
  border-color: var(--light-blue);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  color: var(--text-primary);
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.feature-item:hover .feature-icon {
  color: var(--light-blue);
  transform: scale(1.1);
}

.feature-title {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.feature-description {
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
}

/* معلومات الاتصال المحسنة */
.contact-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 25px;
  color: var(--text-primary);
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.1);
}

/* قسم الشهادات المحسن */
.feedbacks {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary-color) 50%, var(--secondary-color) 100%);
  position: relative;
}

.feedbacks::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="80" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.15"/><circle cx="10" cy="70" r="0.8" fill="%23ffffff" opacity="0.1"/></svg>') repeat;
  animation: backgroundFloat 20s linear infinite;
}

@keyframes backgroundFloat {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-100px) translateY(-100px); }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.section-title {
  color: var(--text-primary);
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ffffff, #dbeafe, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.rating-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.average-