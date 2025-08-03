<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import CustomerTestimonials from '@/components/CustomerTestimonials.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    Footer,
    CustomerTestimonials
  },
  data() {
    return {
      isVisible: false,
      particlesVisible: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
    
    setTimeout(() => {
      this.particlesVisible = true;
    }, 1000);
  }
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <div class="home">
      <!-- Enhanced Floating Elements -->
      <div class="floating-elements">
        <div class="floating-element" v-for="n in 12" :key="n" :class="{ 'visible': particlesVisible }"></div>
      </div>

      <!-- Gradient Orbs -->
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>

      <NavBar />
      
      <div class="hero-content">
        <div class="text" :class="{ 'visible': isVisible }">
          <div class="logo-container">
            <div class="logo-wrapper">
              <h1 class="main-title">خلي ستور</h1>
            </div>
            <div class="title-underline"></div>
          </div>
          
          <h2 class="subtitle">
            متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير البرامج التقنية والمواقع الالكترونيه
          </h2>
          
          <div class="features-grid">
            <div class="feature-item" data-aos="fade-up" data-aos-delay="100">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <rect x="10" y="20" width="80" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
                  <rect x="15" y="25" width="70" height="35" fill="currentColor" opacity="0.2"/>
                  <rect x="10" y="65" width="80" height="10" rx="5" fill="currentColor"/>
                  <circle cx="20" cy="80" r="3" fill="currentColor"/>
                  <circle cx="30" cy="80" r="3" fill="currentColor"/>
                  <circle cx="40" cy="80" r="3" fill="currentColor"/>
                </svg>
              </div>
              <span class="feature-title">تطوير المواقع</span>
              <p class="feature-description">مواقع حديثة وسريعة مع تصميم متجاوب</p>
            </div>
            
            <div class="feature-item" data-aos="fade-up" data-aos-delay="200">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <rect x="25" y="15" width="50" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
                  <rect x="30" y="25" width="40" height="25" fill="currentColor" opacity="0.3"/>
                  <line x1="35" y1="60" x2="65" y2="60" stroke="currentColor" stroke-width="2"/>
                  <line x1="35" y1="70" x2="55" y2="70" stroke="currentColor" stroke-width="2"/>
                  <circle cx="50" cy="75" r="3" fill="currentColor"/>
                </svg>
              </div>
              <span class="feature-title">تطبيقات الجوال</span>
              <p class="feature-description">تطبيقات ذكية لنظامي iOS و Android</p>
            </div>
            
            <div class="feature-item" data-aos="fade-up" data-aos-delay="300">
              <div class="feature-icon">
                <svg viewBox="0 0 100 100" class="icon">
                  <path d="M20 50 L35 35 L50 50 L80 20" stroke="currentColor" stroke-width="4" fill="none"/>
                  <circle cx="20" cy="50" r="4" fill="currentColor"/>
                  <circle cx="35" cy="35" r="4" fill="currentColor"/>
                  <circle cx="50" cy="50" r="4" fill="currentColor"/>
                  <circle cx="80" cy="20" r="4" fill="currentColor"/>
                  <path d="M15 70 L85 70" stroke="currentColor" stroke-width="2"/>
                  <path d="M15 75 L85 75" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                </svg>
              </div>
              <span class="feature-title">الخدمات السريعة</span>
              <p class="feature-description">تسليم سريع وجودة عالية في الأداء</p>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">مشروع مكتمل</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">عميل راضي</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">دعم فني</span>
            </div>
          </div>

          <div class="cta-buttons">
            <RouterLink to="/products" class="cta-primary">
              <span>ابدأ مشروعك الآن</span>
              <svg viewBox="0 0 24 24" class="button-icon">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

    <!-- Customer Testimonials Section -->
    <CustomerTestimonials />

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
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease-in-out infinite;
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
  background: 
    radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.2) 0%, transparent 50%);
  z-index: 1;
}

.home > * {
  position: relative;
  z-index: 2;
}

/* Enhanced Floating Elements */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.floating-element {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  opacity: 0;
  transform: translateY(100px);
  transition: all 1s ease;
  animation: float 8s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.floating-element.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Enhanced positioning */
.floating-element:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
.floating-element:nth-child(2) { top: 60%; left: 15%; animation-delay: 1s; }
.floating-element:nth-child(3) { top: 30%; left: 85%; animation-delay: 2s; }
.floating-element:nth-child(4) { top: 80%; left: 75%; animation-delay: 3s; }
.floating-element:nth-child(5) { top: 10%; left: 65%; animation-delay: 4s; }
.floating-element:nth-child(6) { top: 70%; left: 90%; animation-delay: 5s; }
.floating-element:nth-child(7) { top: 35%; left: 5%; animation-delay: 2.5s; }
.floating-element:nth-child(8) { top: 45%; left: 95%; animation-delay: 1.5s; }
.floating-element:nth-child(9) { top: 25%; left: 40%; animation-delay: 3.5s; }
.floating-element:nth-child(10) { top: 65%; left: 55%; animation-delay: 4.5s; }
.floating-element:nth-child(11) { top: 85%; left: 25%; animation-delay: 5.5s; }
.floating-element:nth-child(12) { top: 5%; left: 35%; animation-delay: 6s; }

/* Gradient Orbs */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.4;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #3b82f6, #1e40af);
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #8b5cf6, #a855f7);
  bottom: -100px;
  left: -100px;
  animation-delay: 2s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #06b6d4, #0891b2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

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
  max-width: 1000px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
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
  margin-bottom: 1rem;
}

.main-title {
  color: white;
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 900;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #e2e8f0, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite alternate;
  letter-spacing: -2px;
}

.title-underline {
  width: 150px;
  height: 6px;
  background: linear-gradient(90deg, #1e40af, #3b82f6, #06b6d4);
  margin: 20px auto;
  border-radius: 3px;
  box-shadow: 0 0 15px rgba(30, 64, 175, 0.6);
  animation: underlineGlow 3s ease-in-out infinite;
}

.subtitle {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 400;
  font-size: clamp(1.2rem, 3.5vw, 1.8rem);
  line-height: 1.7;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  max-width: 750px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
  max-width: 900px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  position: relative;
  overflow: hidden;
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.feature-item:hover::before {
  transform: scaleX(1);
}

.feature-item:hover {
  transform: translateY(-15px) scale(1.02);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.25);
}

.feature-icon {
  width: 60px;
  height: 60px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon .icon {
  width: 100%;
  height: 100%;
  color: white;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.feature-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 1.5;
  margin: 0;
}

/* Stats Section */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #3b82f6;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-primary,
.cta-secondary {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.cta-primary {
  background: linear-gradient(45deg, #1e40af, #3b82f6);
  color: white;
  box-shadow: 0 15px 35px rgba(30, 64, 175, 0.4);
}

.cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cta-primary:hover::before {
  left: 100%;
}

.cta-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px rgba(30, 64, 175, 0.6);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.5);
}

.button-icon {
  width: 22px;
  height: 22px;
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

/* Enhanced Animations */
@keyframes titleGlow {
  0% {
    text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  }
  100% {
    text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 255, 255, 0.4);
  }
}

@keyframes underlineGlow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(30, 64, 175, 0.6);
    transform: scaleX(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(30, 64, 175, 0.9);
    transform: scaleX(1.1);
  }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotateZ(0deg); 
  }
  33% { 
    transform: translateY(-25px) rotateZ(120deg); 
  }
  66% { 
    transform: translateY(-15px) rotateZ(240deg); 
  }
}

@keyframes orbFloat {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
  }
  50% { 
    transform: translate(20px, -20px) scale(1.1); 
  }
}

@keyframes scroll {
  0% { top: 8px; opacity: 1; }
  50% { top: 20px; opacity: 0.5; }
  100% { top: 8px; opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-15px); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Enhanced Media Queries */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stats-container {
    gap: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }

  .main-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }
  
  .subtitle {
    font-size: clamp(1rem, 4vw, 1.4rem);
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 1rem 0.5rem;
  }
  
  .text {
    gap: 2rem;
  }
  
  .feature-item {
    padding: 2rem 1.5rem;
  }
  
  .stats-container {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
