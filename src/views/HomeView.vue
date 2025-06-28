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
    // Trigger animation on mount
    setTimeout(() => {
      this.isVisible = true;
    }, 300);

    // Add scroll effect for parallax
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.home');
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    }
  }
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <div class="home">
      <div class="floating-elements">
        <div class="floating-element" v-for="n in 6" :key="n"></div>
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
          <div class="feature-icon">💻</div>
          <span>تطوير المواقع</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔧</div>
          <span>الحلول التقنية</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <span>خدمة سريعة</span>
        </div>
      </div>
      
      <div class="btns">
        <RouterLink class="btn btn-primary" to="/products">
          <span>المنتجات</span>
          <div class="btn-glow"></div>
        </RouterLink>
        <RouterLink class="btn btn-secondary" to="/order">
          <span>اطلب الان</span>
          <div class="btn-glow"></div>
        </RouterLink>
      </div>
    </div>
  </div>
  
  <div class="scroll-indicator">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
    <span>تصفح للأسفل</span>
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
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
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
/* Global Styles */
* {
  box-sizing: border-box;
}

/* Hero Section */
.home {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #5870f6, #5c6074, #5870f6, #5c6074);
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
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
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.floating-element:nth-child(2) { top: 60%; left: 20%; animation-delay: 1s; }
.floating-element:nth-child(3) { top: 40%; left: 80%; animation-delay: 2s; }
.floating-element:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; }
.floating-element:nth-child(5) { top: 10%; left: 60%; animation-delay: 4s; }
.floating-element:nth-child(6) { top: 70%; left: 90%; animation-delay: 5s; }

.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.text {
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.text.visible {
  opacity: 1;
  transform: translateY(0);
}

.logo-container {
  margin-bottom: 30px;
}

.main-title {
  color: white;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  margin: 20px auto;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  font-size: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.6;
  margin-bottom: 40px;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 5px;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.btn {
  position: relative;
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 2px solid transparent;
}

.btn span {
  position: relative;
  z-index: 2;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn:hover .btn-glow {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-3px);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 2;
}

.mouse {
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  position: relative;
}

.wheel {
  width: 3px;
  height: 6px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

/* Testimonials Section */
.feedbacks {
  padding: 100px 0;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  position: relative;
}

.feedbacks::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.2"/></svg>');
  animation: backgroundMove 20s linear infinite;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.section-title {
  color: #ffffff;
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 10px;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.section-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  margin: 0 auto;
  border-radius: 2px;
}

.testimonials-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: auto;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.user-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.testimonial-card:hover .user-img {
  transform: scale(1.1);
}

.quote-icon {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.2);
  font-family: serif;
  line-height: 1;
}

.card-body {
  flex: 1;
  text-align: center;
}

.username {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
}

.stars {
  margin-bottom: 20px;
}

.star {
  font-size: 1.5rem;
  margin: 0 2px;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.3);
}

.star.filled {
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.feedback-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-style: italic;
}

.card-footer {
  margin-top: 20px;
  text-align: center;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 20px;
  color: #4caf50;
  font-size: 0.9rem;
}

/* Stats Section */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 80px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #4ecdc4;
  margin-bottom: 10px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

/* Animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.2); }
}

@keyframes scroll {
  0% { transform: translateX(-50%) translateY(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(-50%) translateY(15px); opacity: 0; }
}

@keyframes backgroundMove {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .btns {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonial-card {
    padding: 20px;
  }
  
  .scroll-indicator {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>