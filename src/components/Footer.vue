<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import logo from '@/assets/IMG_1254.png'
import businessLogo from '@/assets/IMG_1485.jpeg'

export default {
  name: 'EnhancedFooter',
  setup() {
    const isVisible = ref(false)
    const currentTime = ref(new Date())
    const animatedStats = reactive({
      orders: 0,
      customers: 0,
      rating: 0
    })

    // Mock stats - replace with real data
    const targetStats = {
      orders: 15420,
      customers: 8650,
      rating: 4.9
    }

    const paymentMethods = [
      { 
        name: 'Google Pay', 
        url: 'https://i.imgur.com/google-pay-logo.png',
        icon: '🔵',
        color: '#16213e' 
      },
      { 
        name: 'Apple Pay', 
        url: 'https://i.imgur.com/apple-pay-logo.png',
        icon: '🍎',
        color: '#16213e' 
      },
      { 
        name: 'STC Pay', 
        url: 'https://i.imgur.com/stc-pay-logo.png',
        icon: '📱',
        color: '#16213e' 
      },
      { 
        name: 'Visa', 
        url: 'https://i.imgur.com/visa-logo.png',
        icon: '💳',
        color: '#16213e' 
      }
    ]

    const socialLinks = [
      {
        name: 'الدعم الفني',
        url: '#support',
        icon: '💬',
        color: '#16213e',
        external: false
      }
    ]

    const importantTerms = [
      {
        icon: '⚠️',
        title: 'تحذير من المقلدين',
        content: 'خلي ستور يُحذركم من المقلدين - لدينا علامة تجارية واحدة وهي خلي ستور فقط. لسنا مسؤولين عن أي متجر آخر'
      },
      {
        icon: '🔄',
        title: 'سياسة التعويض',
        content: 'لا نعوض إلا في حالتين: تأخير طلبك أكثر من ٤ أيام أو في حال وصلك طلب آخر غير طلبك'
      },
      {
        icon: '📋',
        title: 'سياسة الاسترجاع',
        content: 'سياسة الاسترجاع والطلب كاملة متوفرة في الديسكورد الخاص بنا'
      }
    ]

    const quickLinks = [
      { name: 'الرئيسية', url: '/', icon: '🏠' },
      { name: 'المنتجات', url: '/products', icon: '🛍️' },
      { name: 'السياسات', url: '/policy', icon: '📞' },
      { name: 'الأسئلة الشائعة', url: '/faq', icon: '❓' }
    ]

    // Intersection Observer for animations
    let observer
    const footerRef = ref(null)

    const animateNumbers = () => {
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      Object.keys(targetStats).forEach(key => {
        const target = targetStats[key]
        const step = target / steps
        let current = 0

        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            animatedStats[key] = target
            clearInterval(timer)
          } else {
            animatedStats[key] = Math.floor(current)
          }
        }, stepTime)
      })
    }

    const updateTime = () => {
      currentTime.value = new Date()
    }

    const handleSocialClick = (link) => {
      if (link.external) {
        window.open(link.url, '_blank', 'noopener,noreferrer')
      } else {
        // Handle internal links or custom actions
        console.log(`Navigate to ${link.url}`)
      }
    }

    const handlePaymentClick = (method) => {
      // Open payment method image instead of payment website
      window.open(method.url, '_blank', 'noopener,noreferrer')
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      // Intersection Observer for entrance animation
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
            animateNumbers()
          }
        },
        { threshold: 0.1 }
      )

      if (footerRef.value) {
        observer.observe(footerRef.value)
      }

      // Update time every minute
      const timeInterval = setInterval(updateTime, 60000)

      onUnmounted(() => {
        if (observer) observer.disconnect()
        clearInterval(timeInterval)
      })
    })

    const formatTime = (date) => {
      return date.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Riyadh'
      })
    }

    return {
      logo,
      businessLogo,
      paymentMethods,
      socialLinks,
      importantTerms,
      quickLinks,
      isVisible,
      currentTime,
      animatedStats,
      footerRef,
      handleSocialClick,
      handlePaymentClick,
      scrollToTop,
      formatTime
    }
  }
}
</script>

<template>
  <footer ref="footerRef" class="footer" :class="{ 'visible': isVisible }">
    <!-- Animated Background -->
    <div class="background-animation">
      <div class="floating-shapes">
        <div v-for="i in 6" :key="i" class="shape" :style="{ '--delay': i * 0.5 + 's' }"></div>
      </div>
    </div>

    <div class="footer-content">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="logo-container">
          <a href="/" aria-label="العودة للصفحة الرئيسية">
            <img 
              src="https://imgur.com/a/UduHwH7" 
              class="footer-logo"
              loading="lazy"
            />
            <div class="logo-glow"></div>
          </a>
        </div>
        <h2 class="brand-title">خلي ستور</h2>
        <p class="brand-tagline">
          <span class="highlight">ماذا تريد نقدمه لك</span><br />
          بأسرع وقت وبأفضل جودة<br />
          <span class="sparkle">مع خلي ستور حـلمـك يـتحـقق ✨</span>
        </p>

        <!-- Live Stats -->
        <div class="stats-container">
          <div class="stat-item">
            <span class="stat-number">{{ animatedStats.orders.toLocaleString() }}+</span>
            <span class="stat-label">طلب مكتمل</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ animatedStats.customers.toLocaleString() }}+</span>
            <span class="stat-label">عميل سعيد</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ animatedStats.rating }}/5</span>
            <span class="stat-label">تقييم العملاء ⭐</span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- روابط سريعة -->
        <div class="section quick-links-section">
          <h3 class="section-title">
            <span class="title-icon">🔗</span>
            روابط سريعة
          </h3>
          <div class="quick-links">
            <a 
              v-for="link in quickLinks"
              :key="link.name"
              :href="link.url"
              class="quick-link"
            >
              <span class="link-icon">{{ link.icon }}</span>
              {{ link.name }}
            </a>
          </div>
        </div>

        <!-- بنود مهمة -->
        <div class="section terms-section">
          <h3 class="section-title">
            <span class="title-icon">📋</span>
            بنود مهمة
          </h3>
          <div class="terms-grid">
            <div 
              v-for="(term, index) in importantTerms" 
              :key="index"
              class="term-card"
              :style="{ '--delay': (index * 0.1) + 's' }"
            >
              <div class="term-header">
                <span class="term-icon">{{ term.icon }}</span>
                <h4 class="term-title">{{ term.title }}</h4>
              </div>
              <p class="term-content">{{ term.content }}</p>
            </div>
          </div>
        </div>

        <!-- خدمة العملاء -->
        <div class="section contact-section">
          <h3 class="section-title">
            <span class="title-icon">💬</span>
            خدمة العملاء
          </h3>
          <div class="contact-grid">
            <button
              v-for="link in socialLinks"
              :key="link.name"
              @click="handleSocialClick(link)"
              class="contact-card"
              :style="{ '--accent-color': link.color }"
            >
              <span class="contact-icon">{{ link.icon }}</span>
              <span class="contact-name">{{ link.name }}</span>
            </button>
          </div>
          
          <!-- أوقات العمل -->
          <div class="operating-hours">
            <div class="time-display">
              <span class="time-label">الوقت الحالي في الرياض:</span>
              <span class="current-time">{{ formatTime(currentTime) }}</span>
            </div>
            <div class="hours-info">
              <span class="hours-text">نحن متاحون ٢٤/٧ لخدمتكم</span>
            </div>
          </div>
        </div>
      </div>

      <!-- طرق الدفع -->
      <div class="payment-section">
        <h3 class="section-title payment-title">
          <span class="title-icon">💳</span>
          طرق الدفع المتاحة
        </h3>
        <div class="payment-grid">
          <button 
            v-for="method in paymentMethods"
            :key="method.name"
            @click="handlePaymentClick(method)"
            class="payment-card"
            :style="{ '--brand-color': method.color }"
          >
            <span class="payment-icon">{{ method.icon }}</span>
            <span class="payment-name">{{ method.name }}</span>
          </button>
        </div>
      </div>

      <!-- أسفل الفوتر -->
      <div class="bottom-section">
        <div class="security-badges">
          <div class="badge"><span class="badge-icon">🔒</span>دفع آمن 100%</div>
          <div class="badge"><span class="badge-icon">🚚</span>توصيل سريع</div>
          <div class="badge"><span class="badge-icon">✅</span>ضمان الجودة</div>
        </div>

        <div class="copyright-section">
          <p class="copyright">
            &copy; {{ new Date().getFullYear() }} خلي ستور. جميع الحقوق محفوظة
          </p>
          <p class="legal-note">
            هذا الموقع محمي بموجب قوانين الملكية الفكرية في المملكة العربية السعودية
          </p>
        </div>

        <!-- زر العودة للأعلى -->
        <button @click="scrollToTop" class="scroll-top-btn" aria-label="العودة للأعلى">
          <span class="scroll-icon">↑</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e  50%, #1a1a2e 75%, #0a0a0a 100%);
  color: white;
  padding: 80px 20px 40px;
  text-align: center;
  font-family: "Cairo", sans-serif;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.footer.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animated Background */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #16213e, #1a1a2e);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0.3;
}

.shape:nth-child(1) { top: 10%; left: 10%; }
.shape:nth-child(2) { top: 20%; right: 20%; animation-duration: 8s; }
.shape:nth-child(3) { top: 60%; left: 5%; animation-duration: 7s; }
.shape:nth-child(4) { bottom: 30%; right: 10%; }
.shape:nth-child(5) { bottom: 10%; left: 30%; animation-duration: 9s; }
.shape:nth-child(6) { top: 40%; right: 5%; animation-duration: 5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(90deg); }
  50% { transform: translateY(-40px) rotate(180deg); }
  75% { transform: translateY(-20px) rotate(270deg); }
}

/* Main Container */
.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Hero Section */
.hero-section {
  margin-bottom: 60px;
  animation: slideInUp 1s ease-out 0.2s both;
}

.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 25px;
}

.footer-logo {
  width: 120px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(22, 33, 62, 0.6);
  transition: all 0.5s ease;
  position: relative;
  z-index: 2;
}

.footer-logo:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 15px 50px rgba(22, 33, 62, 0.8);
}

.logo-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, #16213e, #1a1a2e, #16213e);
  border-radius: 25px;
  animation: glow 2s ease-in-out infinite alternate;
  opacity: 0.5;
  z-index: 1;
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(22, 33, 62, 0.5); }
  to { box-shadow: 0 0 30px rgba(22, 33, 62, 0.8), 0 0 40px rgba(22, 33, 62, 0.6); }
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ffffff, #16213e, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 20px 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.brand-tagline {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #e0e0e0;
}

.highlight {
  color: #ffffff;
  font-weight: 600;
}

.sparkle {
  background: linear-gradient(45deg, #ffffff, #16213e, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

/* Stats Container */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(22, 33, 62, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(22, 33, 62, 0.4);
  transition: all 0.3s ease;
  min-width: 140px;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(22, 33, 62, 0.3);
  box-shadow: 0 10px 30px rgba(22, 33, 62, 0.4);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.section {
  animation: slideInUp 1s ease-out both;
}

.section:nth-child(2) { animation-delay: 0.1s; }
.section:nth-child(3) { animation-delay: 0.2s; }

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 25px;
  position: relative;
}

.title-icon {
  font-size: 1.2rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #16213e, transparent);
}

/* Quick Links */
.quick-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(22, 33, 62, 0.2);
  border-radius: 10px;
  color: #e0e0e0;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.quick-link:hover {
  background: rgba(22, 33, 62, 0.3);
  border-left-color: #16213e;
  transform: translateX(5px);
  color: white;
}

.link-icon {
  font-size: 1rem;
}

/* Terms Section */
.terms-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.term-card {
  background: rgba(22, 33, 62, 0.2);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(22, 33, 62, 0.4);
  transition: all 0.3s ease;
  animation: slideInLeft 0.8s ease-out both;
  animation-delay: var(--delay);
}

.term-card:hover {
  background: rgba(22, 33, 62, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(22, 33, 62, 0.3);
}

.term-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.term-icon {
  font-size: 1.2rem;
}

.term-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.term-content {
  color: #ddd;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
}

/* Contact Section */
.contact-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 25px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 25px;
  background: rgba(22, 33, 62, 0.2);
  border: 2px solid rgba(22, 33, 62, 0.4);
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(22, 33, 62, 0.3), transparent);
  transition: left 0.5s ease;
}

.contact-card:hover::before {
  left: 100%;
}

.contact-card:hover {
  border-color: var(--accent-color);
  background: rgba(22, 33, 62, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(22, 33, 62, 0.3);
}

.contact-icon {
  font-size: 1.2rem;
}

/* Operating Hours */
.operating-hours {
  background: rgba(22, 33, 62, 0.3);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(22, 33, 62, 0.5);
}

.time-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.time-label {
  font-size: 0.9rem;
  color: #ccc;
}

.current-time {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Courier New', monospace;
}

.hours-info {
  text-align: center;
}

.hours-text {
  color: #e0e0e0;
  font-size: 0.95rem;
}

/* Payment Section */
.payment-section {
  margin-bottom: 50px;
  animation: slideInUp 1s ease-out 0.4s both;
}

.payment-title {
  margin-bottom: 30px;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.payment-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(22, 33, 62, 0.2);
  border: 2px solid rgba(22, 33, 62, 0.4);
  border-radius: 15px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.payment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(22, 33, 62, 0.3), transparent);
  transition: left 0.5s ease;
}

.payment-card:hover::before {
  left: 100%;
}

.payment-card:hover {
  background: rgba(22, 33, 62, 0.3);
  border-color: var(--brand-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(22, 33, 62, 0.4);
}

.payment-icon {
  font-size: 2rem;
}

.payment-name {
  font-weight: 600;
}

/* Bottom Section */
.bottom-section {
  animation: slideInUp 1s ease-out 0.5s both;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 25px;
  color: #22c55e;
  font-size: 0.9rem;
  font-weight: 500;
}

.badge-icon {
  font-size: 1rem;
}

.copyright-section {
  padding-top: 30px;
  border-top: 1px solid rgba(22, 33, 62, 0.4);
  margin-bottom: 20px;
}

.copyright {
  color: #bbb;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.legal-note {
  color: #888;
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0;
}

/* Scroll to Top Button */
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #16213e, #1a1a2e);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(22, 33, 62, 0.6);
  z-index: 1000;
}

.scroll-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(22, 33, 62, 0.8);
}

.scroll-icon {
  display: block;
  font-weight: bold;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .stats-container {
    gap: 25px;
  }
  
  .stat-item {
    min-width: 120px;
    padding: 15px;
  }

  .payment-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 15px 30px;
  }

  .brand-title {
    font-size: 2rem;
  }

  .brand-tagline {
    font-size: 1.1rem;
  }

  .stats-container {
    gap: 20px;
  }

  .stat-item {
    min-width: 100px;
    padding: 12px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .security-badges {
    gap: 15px;
  }

  .badge {
    padding: 8px 15px;
    font-size: 0.8rem;
  }

  .scroll-top-btn {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  .footer-logo {
    width: 100px;
  }

  .brand-title {
    font-size: 1.8rem;
  }

  .brand-tagline {
    font-size: 1rem;
  }

  .stats-container {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .stat-item {
    width: 100%;
    max-width: 200px;
  }

  .payment-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .payment-card {
    padding: 15px 10px;
    font-size: 0.9rem;
  }

  .payment-icon {
    font-size: 1.5rem;
  }

  .security-badges {
    flex-direction: column;
    gap: 10px;
  }
}
