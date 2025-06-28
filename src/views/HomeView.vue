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
      <div class="floating-elements">
        <div class="floating-element" v-for="n in 8" :key="n"></div>
      </div>

```
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

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
  50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
}

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
  background: var(--glass-bg);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-soft);
}

.feature-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-strong);
  border-color: var(--light-blue);
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
  margin-bottom: 2rem;
  font-weight: 300;
}

.section-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--light-blue));
  margin: 0 auto;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

.testimonials-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 25px;
  padding: 2rem;
  backdrop-filter: blur(30px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-strong);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), var(--light-blue));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.testimonial-card:hover::before {
  transform: scaleX(1);
}

.testimonial-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  border-color: var(--light-blue);
  background: rgba(255, 255, 255, 0.12);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--glass-border);
  object-fit: cover;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.testimonial-card:hover .user-img {
  transform: scale(1.1);
  border-color: var(--light-blue);
}

.quote-icon {
  font-size: 3.5rem;
  color: var(--glass-border);
  font-family: serif;
  line-height: 1;
  opacity: 0.6;
}

.card-body {
  flex: 1;
  text-align: center;
}

.username {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stars {
  margin-bottom: 1.5rem;
}

.star {
  font-size: 1.6rem;
  margin: 0 3px;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.star.filled {
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
  transform: scale(1.1);
}

.feedback-text {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-style: italic;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.card-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 25px;
  color: #10b981;
  font-size: 0.95rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.verified-badge svg {
  color: #10b981;
}

/* قسم الإحصائيات */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 5rem auto 0;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.stat-item {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: var(--glass-bg);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  transition: all 0.4s ease;
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), var(--light-blue));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-item:hover::before {
  transform: scaleX(1);
}

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-strong);
  background: rgba(255, 255, 255, 0.15);
}

.stat-number {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, var(--accent-color), var(--light-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* التصميم المتجاوب */
@media screen and (max-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .feature-item {
    padding: 1rem;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .feedbacks {
    padding: 4rem 0;
  }
}

@media screen and (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .contact-info {
    gap: 0.75rem;
  }
  
  .contact-item {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
  
  .user-img {
    width: 60px;
    height: 60px;
  }
  
  .quote-icon {
    font-size: 2.5rem;
  }
}

/* تحسينات الأداء والسلاسة */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.testimonial-swiper {
  padding: 1rem 0 2rem;
}

/* إزالة التمرير الافقي غير المرغوب فيه */
body {
  overflow-x: hidden;
}

/* تحسين التحميل */
.floating-element,
.testimonial-card,
.feature-item,
.stat-item {
  will-change: transform;
}
</style>