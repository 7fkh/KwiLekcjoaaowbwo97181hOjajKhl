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
  },
  methods: {
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

      <NavBar />
      
      <div class="hero-content">
        <div class="text" :class="{ 'visible': isVisible }">
          <div class="logo-container">
            <div class="logo-wrapper">
              <div class="logo-icon">
                <svg viewBox="0 0 100 100" class="store-icon">
                  <rect x="20" y="30" width="60" height="50" fill="none" stroke="currentColor" stroke-width="3"/>
                  <rect x="15" y="25" width="70" height="5" fill="currentColor"/>
                  <circle cx="35" cy="70" r="5" fill="currentColor"/>
                  <circle cx="65" cy="70" r="5" fill="currentColor"/>
                  <path d="M30 45 L70 45 M30 55 L60 55" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h1 class="main-title">خلي ستور</h1>
            </div>
            <div class="title-underline"></div>
          </div>
          
          <h2 class="subtitle">
            متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير البرامج التقنية والمواقع الالكترونيه
          </h2>
          
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <rect x="10" y="20" width="80" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
                  <rect x="15" y="25" width="70" height="35" fill="currentColor" opacity="0.2"/>
                  <rect x="10" y="65" width="80" height="10" rx="5" fill="currentColor"/>
                  <circle cx="20" cy="80" r="3" fill="currentColor"/>
                  <circle cx="30" cy="80" r="3" fill="currentColor"/>
                </svg>
              </div>
              <span>تطوير المواقع</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <circle cx="50" cy="30" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
                  <path d="M35 30 L50 45 L65 30" stroke="currentColor" stroke-width="3" fill="none"/>
                  <rect x="20" y="50" width="60" height="30" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
                  <path d="M30 60 L70 60 M30 70 L60 70" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <span>تطوير البرامج التقنية</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <path d="M20 50 L35 35 L50 50 L80 20" stroke="currentColor" stroke-width="4" fill="none"/>
                  <circle cx="20" cy="50" r="4" fill="currentColor"/>
                  <circle cx="35" cy="35" r="4" fill="currentColor"/>
                  <circle cx="50" cy="50" r="4" fill="currentColor"/>
                  <circle cx="80" cy="20" r="4" fill="currentColor"/>
                  <path d="M15 70 L85 70" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <span>الخدمات السريعة</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="3"/>
                  <path d="M50 30 L50 50 L65 65" stroke="currentColor" stroke-width="3"/>
                  <circle cx="50" cy="50" r="3" fill="currentColor"/>
                  <path d="M25 15 L35 25 M75 15 L65 25 M85 40 L75 50 M85 60 L75 50 M75 75 L65 75 M25 75 L35 75 M15 60 L25 50 M15 40 L25 50" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <span>دعم مستمرر</span>
            </div>
          </div>

          <div class="cta-buttons">
            <button class="cta-primary">
              <span>ابدأ مشروعك</span>
              <svg viewBox="0 0 24 24" class="button-icon">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </button>
            <button class="cta-secondary">
              <svg viewBox="0 0 24 24" class="button-icon">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>تواصل معنا</span>
            </button>
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
        <div class="section-icon">
          <svg viewBox="0 0 100 100" class="testimonial-icon">
            <path d="M20 30 Q20 20 30 20 Q40 20 40 30 Q40 40 30 45 L25 50 L35 50 Q45 50 45 40 Q45 20 25 20 Q5 20 5 40 Q5 60 25 60 L35 60" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M60 30 Q60 20 70 20 Q80 20 80 30 Q80 40 70 45 L65 50 L75 50 Q85 50 85 40 Q85 20 65 20 Q45 20 45 40 Q45 60 65 60 L75 60" stroke="currentColor" stroke-width="3" fill="none"/>
          </svg>
        </div>
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
                <div class="quote-icon">
                  <svg viewBox="0 0 50 50" class="quote-svg">
                    <path d="M15 35 Q10 30 10 20 Q10 10 20 10 Q25 10 25 15 Q25 20 20 25 L15 30 L20 30 Q30 30 30 20 Q30 10 20 10 Q10 10 10 20 Q10 30 15 35 Z" fill="currentColor" opacity="0.3"/>
                    <path d="M35 35 Q30 30 30 20 Q30 10 40 10 Q45 10 45 15 Q45 20 40 25 L35 30 L40 30 Q50 30 50 20 Q50 10 40 10 Q30 10 30 20 Q30 30 35 35 Z" fill="currentColor" opacity="0.3"/>
                  </svg>
                </div>
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
                  <svg viewBox="0 0 24 24" class="check-icon">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  <span>عميل محقق</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      
      <!-- Stats Section -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 100 100" class="stat-svg">
              <circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
              <path d="M50 50 Q35 50 35 65 Q35 80 50 80 Q65 80 65 65 Q65 50 50 50" fill="currentColor"/>
              <circle cx="30" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
              <circle cx="70" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-number">1000+</div>
          <div class="stat-label">عميل راضي</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 100 100" class="stat-svg">
              <rect x="20" y="30" width="60" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
              <path d="M30 40 L70 40 M30 50 L60 50 M30 60 L65 60" stroke="currentColor" stroke-width="2"/>
              <path d="M70 20 L80 30 L70 40" stroke="currentColor" stroke-width="3" fill="currentColor"/>
            </svg>
          </div>
          <div class="stat-number">500+</div>
          <div class="stat-label">مشروع مكتمل</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 100 100" class="stat-svg">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="3"/>
              <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" stroke-width="4"/>
              <text x="50" y="25" text-anchor="middle" font-size="12" fill="currentColor">24</text>
              <text x="50" y="85" text-anchor="middle" font-size="8" fill="currentColor">ساعة</text>
            </svg>
          </div>
          <div class="stat-number">24/7</div>
          <div class="stat-label">دعم فني</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 100 100" class="stat-svg">
              <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="currentColor"/>
              <circle cx="50" cy="50" r="8" fill="white"/>
              <text x="50" y="55" text-anchor="middle" font-size="10" fill="black">5</text>
            </svg>
          </div>
          <div class="stat-number">5</div>
          <div class="stat-label">سنوات خبرة</div>
        </div>
      </div>
    </div>

    <Footer />
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
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e  50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 6s ease-in-out infinite;
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

.home > * {
  position: relative;
  z-index: 2;
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
.floating-element:nth-child(7) { top: 30%; left: 5%; animation-delay: 2.5s; }
.floating-element:nth-child(8) { top: 50%; left: 95%; animation-delay: 1.5s; }

.hero-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 2rem 1rem;
}

.text {
  text-align: center;
  max-width: 900px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.text.visible {
  opacity: 1;
  transform: translateY(0);
}

.logo-container {
  margin-bottom: 1rem;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
}

.store-icon {
  width: 100%;
  height: 100%;
  color: white;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
}

.main-title {
  color: white;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-underline {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  margin: 20px auto;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(30, 64, 175, 0.5);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  max-width: 700px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 800px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  color: white;
}

.feature-item:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  width: 50px;
  height: 50px;
}

.feature-icon .icon {
  width: 100%;
  height: 100%;
  color: white;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-primary,
.cta-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-primary {
  background: linear-gradient(45deg, #1e40af, #3b82f6);
  color: white;
  box-shadow: 0 10px 30px rgba(30, 64, 175, 0.4);
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(30, 64, 175, 0.6);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.button-icon {
  width: 20px;
  height: 20px;
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
  animation: bounce 2s infinite;
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
  padding: 5rem 0;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  position: relative;
}

.feedbacks::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.feedbacks > * {
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.section-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.testimonial-icon {
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
}

.section-title {
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.section-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(30, 64, 175, 0.5);
}

.testimonials-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.testimonial-card {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: auto;
  min-height: 350px;
}

.testimonial-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.user-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.quote-icon {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.5);
}

.quote-svg {
  width: 100%;
  height: 100%;
}

.card-body {
  margin-top: 1rem;
  text-align: center;
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.stars {
  color: gold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.star {
  margin: 0 2px;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.star.filled {
  opacity: 1;
}

.feedback-text {
  font-size: 1rem;
  color: #eee;
  line-height: 1.6;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  text-align: center;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #4caf50;
}

/* Stats Section */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  padding: 2rem 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  width: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-10px);
}

.stat-icon {
  width: 50px;
  height: 50px;
}

.stat-svg {
  width: 100%;
  height: 100%;
  color: white;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@keyframes scroll {
  0% { top: 8px; opacity: 1; }
  50% { top: 20px; opacity: 0.5; }
  100% { top: 8px; opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
