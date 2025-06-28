<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';

export default {
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay, EffectCards],
      isVisible: false,
      feedbackList: [
        {
          id: 1,
          username: "عوض الحربي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "10/10 افضل متجر باذن الله مب اخر مره",
          rating: 5
        },
        {
          id: 2,
          username: "سعد مرتضى",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أنصحكم فيه, ماكان عندي قيمة الطلب كامل ونقص المبلغ الله يسعده",
          rating: 5
        },
        {
          id: 3,
          username: "عبدالله الغامدي",
          avatar: "https://i.imgur.com/QP1AlsJ.jpeg",
          text: "الافضل ابو خلي و موثوقققق مره انصحكم فيه،",
          rating: 5
        },
        {
          id: 4,
          username: "ابو زهره",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "خلي ستور امبراطور الساحة ..",
          rating: 5
        },
        {
          id: 5,
          username: "فهد عبدالله",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو",
          rating: 5
        },
        {
          id: 6,
          username: "صالح المريسي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "ابو خلي ما يقصر فنان بكل شي تبي بوتات واقعية تبي شوب تبي اي شي بس كلمه وجهز فلوسك",
          rating: 5
        },
        {
          id: 7,
          username: "سالم التميمي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "متجر جميل وجيد اسعاره مقبوله وسريعين بالخدمه",
          rating: 5
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
  }
}
</script>


<template>
  <main>
    <!-- Hero Section -->
    <div class="home">
      <!-- الخلفية المتحركة الجديدة -->
      <div class="animated-background">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
          <div class="orb orb-4"></div>
        </div>
      </div>

```
  <div class="floating-elements">
    <div class="floating-element" v-for="n in 8" :key="n"></div>
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
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <span>تطوير المواقع</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <span>الحلول التقنية</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
            </svg>
          </div>
          <span>خدمة سريعة</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span>دقة عالية</span>
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
</div>

<!-- Testimonials Section -->
<div class="feedbacks">
  <!-- خلفية متحركة لقسم الشهادات -->
  <div class="feedback-bg-animation">
    <div class="bg-particle" v-for="n in 12" :key="n"></div>
  </div>

  <div class="section-header">
    <h1 class="section-title">شهادة عملاء خلي ستور</h1>
    <p class="section-subtitle">KhLiStoRe Customer Reviews</p>
    <div class="section-divider"></div>
  </div>
  
  <div class="testimonials-container">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
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
      <SwiperSlide v-for="feedback in feedbackList" :key="feedback.id">
        <div class="testimonial-card">
          <div class="card-header">
            <img class="user-img" :src="feedback.avatar" alt="avatar" />
            <div class="quote-icon">"</div>
          </div>
          
          <div class="card-body">
            <p class="username">{{ feedback.username }}</p>
            <div class="stars">
              <span 
                v-for="n in 5" 
                :key="n" 
                class="star"
                :class="{ 'filled': n <= feedback.rating }"
              >★</span>
            </div>
            <p class="feedback-text">{{ feedback.text }}</p>
          </div>
          
          <div class="card-footer">
            <div class="verified-badge">
              <span>✓ عميل محقق</span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  
  <!-- Stats Section -->
  <div class="stats-container">
    <div class="stat-item">
      <div class="stat-number">1000+</div>
      <div class="stat-label">عميل راضي</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">500+</div>
      <div class="stat-label">مشروع مكتمل</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">24/7</div>
      <div class="stat-label">دعم فني</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">5</div>
      <div class="stat-label">سنوات خبرة</div>
    </div>
  </div>
</div>

<Footer />
```

  </main>
</template>

<style scoped>
/* جذر المتغيرات - نظام الألوان الثابت */
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
}

/* إعادة تعيين عامة */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* القسم الرئيسي */
.home {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* الخلفية المتحركة الجديدة */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5870f6 0%, #5c6074 25%, #5870f6 50%, #5c6074 75%, #5870f6 100%);
  background-size: 400% 400%;
  animation: gradientFlow 20s ease infinite;
  z-index: 0;
}

@keyframes gradientFlow {
  0% { 
    background-position: 0% 50%;
    transform: scale(1);
  }
  25% {
    background-position: 100% 50%;
    transform: scale(1.02);
  }
  50% { 
    background-position: 100% 100%;
    transform: scale(1);
  }
  75% {
    background-position: 0% 100%;
    transform: scale(1.01);
  }
  100% { 
    background-position: 0% 50%;
    transform: scale(1);
  }
}

/* الموجات المتحركة */
.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: 50%;
  opacity: 0.1;
  animation: waveMove 25s linear infinite;
}

.wave-1 {
  background: radial-gradient(circle, #5870f6 0%, transparent 70%);
  top: -50%;
  left: -25%;
  animation-delay: 0s;
  animation-duration: 30s;
}

.wave-2 {
  background: radial-gradient(circle, #5c6074 0%, transparent 70%);
  top: -75%;
  right: -25%;
  animation-delay: -10s;
  animation-duration: 35s;
  animation-direction: reverse;
}

.wave-3 {
  background: radial-gradient(circle, #5870f6 0%, transparent 70%);
  bottom: -50%;
  left: -50%;
  animation-delay: -20s;
  animation-duration: 40s;
}

@keyframes waveMove {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* الكرات المتدرجة المتحركة */
.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(88, 112, 246, 0.3) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(92, 96, 116, 0.25) 0%, transparent 70%);
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(88, 112, 246, 0.2) 0%, transparent 70%);
  bottom: 30%;
  left: 20%;
  animation-delay: -10s;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(92, 96, 116, 0.15) 0%, transparent 70%);
  top: 10%;
  right: 20%;
  animation-delay: -15s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(-30px, -50px) scale(1.1);
    opacity: 0.5;
  }
  50% {
    transform: translate(30px, -30px) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translate(-20px, 40px) scale(1.05);
    opacity: 0.6;
  }
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.floating-element {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.floating-element:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
.floating-element:nth-child(2) { top: 25%; left: 80%; animation-delay: 1s; }
.floating-element:nth-child(3) { top: 45%; left: 15%; animation-delay: 2s; }
.floating-element:nth-child(4) { top: 60%; left: 85%; animation-delay: 3s; }
.floating-element:nth-child(5) { top: 75%; left: 20%; animation-delay: 4s; }
.floating-element:nth-child(6) { top: 35%; left: 75%; animation-delay: 5s; }
.floating-element:nth-child(7) { top: 10%; left: 50%; animation-delay: 2.5s; }
.floating-element:nth-child(8) { top: 80%; left: 60%; animation-delay: 1.5s; }

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.6; 
  }
  33% {
    transform: translateY(-40px) scale(1.2); 
    opacity: 1;
  }
  66% {
    transform: translateY(20px) scale(0.9); 
    opacity: 0.8;
  }
}

.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  padding: 2rem;
}

.text {
  text-align: center;
  max-width: 900px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
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
  animation: textShimmer 4s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% { 
    background-position: 0% 50%; 
    transform: scale(1);
  }
  50% { 
    background-position: 100% 50%; 
    transform: scale(1.02);
  }
}

.title-underline {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--light-blue));
  margin: 1.5rem auto;
  border-radius: 2px;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { 
    transform: scaleX(1); 
    opacity: 1; 
  }
  50% { 
    transform: scaleX(1.2); 
    opacity: 0.8; 
  }
}

.subtitle {
  color: var(--text-secondary);
  font-weight: 300;
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  line-height: 1.7;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.feature-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(88, 112, 246, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  color: var(--light-blue);
  transform: scale(1.1);
}

.feature-item span {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

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

/* قسم الشهادات */
.feedbacks {
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(135deg, #5c6074 0%, #5870f6 50%, #5c6074 100%);
  background-size: 300% 300%;
  animation: feedbackBgMove 25s ease infinite;
}

@keyframes feedbackBgMove {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
}

/* خلفية متحركة لقسم الشهادات */
.feedback-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.bg-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: particleFloat 15s linear infinite;
}

.bg-particle:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; background: #5870f6; animation-delay: 0s; }
.bg-particle:nth-child(2) { width: 60px; height: 60px; top: 20%; right: 15%; background: #5c6074; animation-delay: -2s; }
.bg-particle:nth-child(3) { width: 100px; height: 100px; top: 40%; left: 5%; background: #5870f6; animation-delay: -4s; }
.bg-particle:nth-child(4) { width: 70px; height: 70px; top: 60%; right: 20%; background: #5c6074; animation-delay: -6s; }
.bg-particle:nth-child(5) { width: 90px; height: 90px; bottom: 20%; left: 15%; background: #5870f6; animation-delay: -8s; }
.bg-particle:nth-child(6) { width: 50px; height: 50px; bottom: 30%; right: 10%; background: #5c6074; animation-delay: -10s; }
.bg-particle:nth-child(7) { width: 110px; height: 110px; top: 15%; left: 50%; background: #5870f6; animation-delay: -3s; }
.bg-particle:nth-child(8) { width: 65px; height: 65px; top: 70%; left: 60%; background: #5c6074; animation-delay: -7s; }
.bg-particle:nth-child(9) { width: 85px; height: 85px; bottom: 10%; left: 40%; background: #5870f6; animation-delay: -5s; }
.bg-particle:nth-child(10) { width: 75px; height: 75px; top: 50%; right: 5%; background: #5c6074; animation-delay: -9s; }
.bg-particle:nth-child(11) { width: 95px; height: 95px; bottom: 40%; right: 40%; background: #5870f6; animation-delay: -1s; }
.bg-particle:nth-child(12) { width: 55px; height: 55px