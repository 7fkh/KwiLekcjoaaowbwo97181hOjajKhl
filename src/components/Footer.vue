<script>
import { ref, computed, onMounted } from 'vue'
import logo from '@/assets/IMG_1254.png'
import businessLogo from '@/assets/IMG_1485.jpeg'
import gpay from '@/assets/IMG_1484.jpeg'
import applepay from '@/assets/IMG_1484.jpeg'
import stcpay from '@/assets/IMG_1483.jpeg'
import paypal from '@/assets/IMG_1482.jpeg'
import visa from '@/assets/IMG_1482.jpeg'
import mastercard from '@/assets/IMG_1481.jpeg'
import mada from '@/assets/IMG_1481.jpeg'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = ref(new Date().getFullYear())
    const isVisible = ref(false)

    const paymentMethods = ref([
      { 
        src: gpay, 
        alt: 'Google Pay',
        name: 'جوجل باي',
        available: true
      },
      { 
        src: applepay, 
        alt: 'Apple Pay',
        name: 'آبل باي',
        available: true
      },
      { 
        src: stcpay, 
        alt: 'STC Pay',
        name: 'إس تي سي باي',
        available: true
      },
      { 
        src: paypal, 
        alt: 'PayPal',
        name: 'باي بال',
        available: true
      },
      { 
        src: visa, 
        alt: 'Visa',
        name: 'فيزا',
        available: true
      },
      { 
        src: mastercard, 
        alt: 'MasterCard',
        name: 'ماستركارد',
        available: true
      },
      { 
        src: mada, 
        alt: 'Mada',
        name: 'مدى',
        available: true
      }
    ])

    const companyInfo = ref({
      name: 'خلي ستور',
      tagline: 'حـلمـك يـتحـقق معنا',
      description: 'متجرك الموثوق للحصول على ما تريد بأسرع وقت وأفضل جودة',
      established: '2020'
    })

    const contactMethods = ref([
      {
        name: 'انستقرام',
        url: 'https://www.instagram.com/khlistore?igsh=eGdxcTVpYzVpNWlr&utm_source=qr',
        icon: '📱',
        color: 'instagram',
        description: 'تابعنا للحصول على آخر العروض'
      },
      {
        name: 'ديسكورد',
        url: 'https://discord.gg/your-server',
        icon: '💬',
        color: 'discord',
        description: 'انضم لمجتمعنا والحصول على الدعم'
      },
      {
        name: 'البريد الإلكتروني',
        url: 'mailto:info@khlistore.com',
        icon: '✉️',
        color: 'email',
        description: 'راسلنا لأي استفسار'
      }
    ])

    const importantTerms = ref([
      {
        title: 'العلامة التجارية',
        content: 'خلي ستور يُحذركم من المقلدين - لدينا علامة تجارية واحدة وهي "خلي ستور" فقط. لسنا مسؤولين عن أي متجر آخر يحمل اسماً مشابهاً.',
        icon: '⚠️'
      },
      {
        title: 'سياسة التعويض',
        content: 'نقوم بالتعويض في حالتين فقط: تأخير الطلب أكثر من 4 أيام عمل، أو وصول طلب مختلف عن المطلوب.',
        icon: '🔄'
      },
      {
        title: 'الاسترجاع والاستبدال',
        content: 'سياسة الاسترجاع والاستبدال الكاملة متاحة في خادم الديسكورد الخاص بنا مع جميع التفاصيل والشروط.',
        icon: '📋'
      },
      {
        title: 'ضمان الجودة',
        content: 'نضمن جودة جميع منتجاتنا ونوفر خدمة عملاء متميزة لضمان رضاكم التام.',
        icon: '✅'
      }
    ])

    const quickLinks = ref([
      { name: 'الرئيسية', url: '/' },
      { name: 'المنتجات', url: '/products' },
      { name: 'من نحن', url: '/about' },
      { name: 'اتصل بنا', url: '/contact' },
      { name: 'الشروط والأحكام', url: '/terms' },
      { name: 'سياسة الخصوصية', url: '/privacy' }
    ])

    const stats = ref([
      { number: '10,000+', label: 'عميل راضٍ', icon: '😊' },
      { number: '50,000+', label: 'طلب مكتمل', icon: '📦' },
      { number: '99%', label: 'نسبة الرضا', icon: '⭐' },
      { number: '24/7', label: 'دعم العملاء', icon: '🛟' }
    ])

    const availablePaymentMethods = computed(() => 
      paymentMethods.value.filter(method => method.available)
    )

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true
          }
        })
      })

      const footerElement = document.querySelector('.footer')
      if (footerElement) {
        observer.observe(footerElement)
      }

      return () => observer.disconnect()
    })

    return {
      logo,
      businessLogo,
      currentYear,
      isVisible,
      paymentMethods: availablePaymentMethods,
      companyInfo,
      contactMethods,
      importantTerms,
      quickLinks,
      stats,
      scrollToTop
    }
  }
}
</script>

<template>
  <footer class="footer" :class="{ 'animate-in': isVisible }" role="contentinfo">
    <div class="footer-container">
      
      <!-- Header Section with Logo and Stats -->
      <section class="footer-header">
        <div class="brand-section">
          <div class="logo-container">
            <img 
              :src="logo" 
              :alt="`شعار ${companyInfo.name}`"
              class="footer-logo"
              loading="lazy"
            />
            <div class="brand-info">
              <h2 class="brand-name">{{ companyInfo.name }}</h2>
              <p class="brand-tagline">{{ companyInfo.tagline }}</p>
              <p class="brand-description">{{ companyInfo.description }}</p>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="stat-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <span class="stat-icon">{{ stat.icon }}</span>
            <div class="stat-content">
              <span class="stat-number">{{ stat.number }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Grid -->
      <div class="footer-grid">
        
        <!-- Quick Links Column -->
        <section class="footer-column">
          <h3 class="column-title">روابط سريعة</h3>
          <ul class="links-list">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.url" class="quick-link">
                <span class="link-arrow">←</span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </section>

        <!-- Contact Methods Column -->
        <section class="footer-column">
          <h3 class="column-title">تواصل معنا</h3>
          <div class="contact-methods">
            <a 
              v-for="method in contactMethods" 
              :key="method.name"
              :href="method.url"
              :class="['contact-method', `contact-${method.color}`]"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="method.description"
            >
              <span class="contact-icon">{{ method.icon }}</span>
              <div class="contact-info">
                <span class="contact-name">{{ method.name }}</span>
                <span class="contact-description">{{ method.description }}</span>
              </div>
            </a>
          </div>
        </section>

        <!-- Important Terms Column -->
        <section class="footer-column terms-column">
          <h3 class="column-title">بنود مهمة</h3>
          <div class="terms-container">
            <div 
              v-for="(term, index) in importantTerms" 
              :key="index"
              class="term-card"
            >
              <div class="term-header">
                <span class="term-icon">{{ term.icon }}</span>
                <h4 class="term-title">{{ term.title }}</h4>
              </div>
              <p class="term-content">{{ term.content }}</p>
            </div>
          </div>
        </section>

      </div>

      <!-- Payment Methods Section -->
      <section class="payment-section">
        <div class="payment-header">
          <h3 class="payment-title">
            <span class="payment-icon">💳</span>
            طرق الدفع المتاحة
          </h3>
          <p class="payment-subtitle">ادفع بالطريقة التي تناسبك</p>
        </div>
        
        <div class="payment-grid">
          <div 
            v-for="(method, index) in paymentMethods" 
            :key="method.alt"
            class="payment-method"
            :style="{ animationDelay: `${index * 0.1}s` }"
            :title="method.name"
          >
            <img 
              :src="method.src" 
              :alt="method.alt"
              class="payment-icon"
              loading="lazy"
            />
            <span class="payment-name">{{ method.name }}</span>
            <div class="payment-status">متاح</div>
          </div>
        </div>
      </section>

      <!-- Security & Trust Section -->
      <section class="trust-section">
        <div class="trust-badges">
          <div class="trust-badge">
            <span class="trust-icon">🔒</span>
            <span class="trust-text">دفع آمن</span>
          </div>
          <div class="trust-badge">
            <span class="trust-icon">🚚</span>
            <span class="trust-text">توصيل سريع</span>
          </div>
          <div class="trust-badge">
            <span class="trust-icon">🛡️</span>
            <span class="trust-text">ضمان الجودة</span>
          </div>
          <div class="trust-badge">
            <span class="trust-icon">⭐</span>
            <span class="trust-text">خدمة متميزة</span>
          </div>
        </div>
      </section>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>
              © {{ currentYear }} {{ companyInfo.name }}. جميع الحقوق محفوظة.
              <span class="established">تأسس عام {{ companyInfo.established }}</span>
            </p>
          </div>
          
          <button 
            @click="scrollToTop"
            class="scroll-top-btn"
            aria-label="العودة إلى الأعلى"
            title="العودة إلى الأعلى"
          >
            <span class="scroll-arrow">↑</span>
          </button>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* Root Variables */
:root {
  --primary-gold: #e3b04b;
  --dark-gold: #d4a143;
  --light-gold: #f4d03f;
  --dark-bg: #0a0a0a;
  --darker-bg: #050505;
  --card-bg: rgba(255, 255, 255, 0.05);
  --border-color: rgba(227, 176, 75, 0.2);
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-muted: #aaa;
  --instagram: linear-gradient(45deg, #e1306c, #fd1d1d, #fcb045);
  --discord: linear-gradient(45deg, #5865f2, #7289da);
  --email: linear-gradient(45deg, #34495e, #2c3e50);
  --shadow-light: 0 4px 15px rgba(227, 176, 75, 0.1);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.3);
  --shadow-heavy: 0 12px 40px rgba(0, 0, 0, 0.4);
  --border-radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Main Footer */
.footer {
  background: 
    radial-gradient(circle at 20% 80%, rgba(227, 176, 75, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(227, 176, 75, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
  color: var(--text-primary);
  font-family: "Cairo", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-gold), transparent);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  position: relative;
  z-index: 2;
}

/* Animation Classes */
.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Section */
.footer-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
  padding-bottom: 60px;
  border-bottom: 1px solid var(--border-color);
}

.brand-section {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.footer-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: var(--shadow-medium);
  transition: var(--transition);
  border: 2px solid var(--border-color);
}

.footer-logo:hover {
  transform: rotate(5deg) scale(1.05);
  box-shadow: var(--shadow-heavy);
  border-color: var(--primary-gold);
}

.brand-info {
  max-width: 400px;
}

.brand-name {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-gold);
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brand-tagline {
  font-size: 18px;
  font-weight: 600;
  color: var(--light-gold);
  margin: 0 0 15px 0;
  opacity: 0.9;
}

.brand-description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  opacity: 0.8;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  min-width: 280px;
}

.stat-card {
  background: var(--card-bg);
  padding: 20px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  transition: var(--transition);
  animation: slideInRight 0.6s ease-out;
  animation-fill-mode: both;
}

.stat-card:hover {
  background: rgba(227, 176, 75, 0.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.stat-icon {
  font-size: 24px;
  opacity: 0.8;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-gold);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 60px;
  margin-bottom: 80px;
}

.footer-column {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.footer-column:nth-child(2) {
  animation-delay: 0.2s;
}

.footer-column:nth-child(3) {
  animation-delay: 0.4s;
}

.column-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-gold);
  margin: 0 0 30px 0;
  position: relative;
  padding-bottom: 15px;
}

.column-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-gold), var(--light-gold));
  border-radius: 2px;
}

/* Quick Links */
.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 12px;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
}

.quick-link:hover {
  color: var(--primary-gold);
  background: rgba(227, 176, 75, 0.1);
  transform: translateX(8px);
  border-color: var(--border-color);
}

.link-arrow {
  transition: var(--transition);
  opacity: 0.6;
}

.quick-link:hover .link-arrow {
  transform: translateX(4px);
  opacity: 1;
  color: var(--primary-gold);
}

/* Contact Methods */
.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-primary);
  transition: var(--transition);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.contact-instagram:hover {
  background: var(--instagram);
}

.contact-discord:hover {
  background: var(--discord);
}

.contact-email:hover {
  background: var(--email);
}

.contact-icon {
  font-size: 24px;
  min-width: 40px;
  text-align: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-name {
  font-size: 16px;
  font-weight: 600;
}

.contact-description {
  font-size: 14px;
  opacity: 0.8;
}

/* Terms Column */
.terms-column {
  grid-column: span 2;
}

.terms-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.term-card {
  background: var(--card-bg);
  padding: 25px;
  border-radius: var(--border-radius);
  border-right: 4px solid var(--primary-gold);
  backdrop-filter: blur(10px);
  transition: var(--transition);
  border: 1px solid var(--border-color);
  border-right-width: 4px;
}

.term-card:hover {
  background: rgba(227, 176, 75, 0.08);
  transform: translateX(-5px);
  box-shadow: var(--shadow-light);
}

.term-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.term-icon {
  font-size: 20px;
}

.term-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-gold);
  margin: 0;
}

.term-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* Payment Section */
.payment-section {
  margin-bottom: 60px;
}

.payment-header {
  text-align: center;
  margin-bottom: 40px;
}

.payment-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-gold);
  margin: 0 0 10px 0;
}

.payment-icon {
  font-size: 28px;
}

.payment-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  opacity: 0.8;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto;
}

.payment-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 25px 15px;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  transition: var(--transition);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  animation: bounceIn 0.6s ease-out;
  animation-fill-mode: both;
}

.payment-method:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: var(--shadow-medium);
  background: rgba(227, 176, 75, 0.1);
  border-color: var(--primary-gold);
}

.payment-method .payment-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  transition: var(--transition);
}

.payment-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
}

.payment-status {
  font-size: 10px;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Trust Section */
.trust-section {
  margin-bottom: 60px;
}

.trust-badges {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.trust-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.trust-badge:hover {
  background: rgba(227, 176, 75, 0.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.trust-icon {
  font-size: 20px;
}

.trust-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 40px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright p {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.established {
  opacity: 0.6;
  font-size: 12px;
  display: block;
  margin-top: 4px;
}

.scroll-top-btn {
  background: var(--primary-gold);
  color: var(--dark-bg);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-light);
  font-weight: 700;
}

.scroll-top-btn:hover {
  background: var(--light-gold);
  transform: translateY(-3px);
  box-shadow: var(--shadow-medium);
}

.scroll-arrow {
  font-size: 20px;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .footer-header {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  
  .stats-grid {
    justify-self: center;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 60px 15px 30px;
  }
  
  .footer-header {
    margin-bottom: 60px;
    padding-bottom: 40px;
  }
  
  .logo-container {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .footer-logo {
    width: 100px;
    height: 100px;
  }
  
  .brand-name {
    font-size: 28px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }
  
  .terms-column {
    grid-column: span 1;
  }
  
  .terms-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  .payment-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
  }
  
  .trust-badges {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 40px 10px 20px;
  }
  
  .footer-logo {
    width: 80px;
    height: 80px;
  }
  
  .brand-name {
    font-size: 24px;
  }
  
  .brand-tagline {
    font-size: 16px;
  }
  
  .brand-description {
    font-size: 14px;
  }
  
  .column-title {
    font-size: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-card {
    padding: 15px;
  }
  
  .payment-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  .payment-method {
    padding: 20px 10px;
  }
  
  .payment-method .payment-icon {
    width: 40px;
    height: 40px;
  }
  
  .trust-badges {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .contact-method {
    padding: 15px;
  }
  
  .term-card {
    padding: 20px;
  }
}

/* Dark Theme Enhancements */
@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: rgba(255, 255, 255, 0.08);
    --border-color: rgba(227, 176, 75, 0.3);
    --shadow-light: 0 4px 15px rgba(227, 176, 75, 0.15);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .footer-logo,
  .stat-card,
  .contact-method,
  .payment-method,
  .trust-badge,
  .scroll-top-btn,
  .quick-link,
  .term-card {
    transition: none;
    animation: none;
  }
  
  .animate-in {
    animation: none;
  }
  
  .footer-column {
    animation: none;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --primary-gold: #ffdd44;
    --border-color: rgba(255, 255, 255, 0.3);
    --card-bg: rgba(255, 255, 255, 0.1);
  }
  
  .footer {
    background: #000000;
  }
  
  .footer-logo,
  .payment-method,
  .trust-badge,
  .stat-card,
  .term-card,
  .contact-method {
    border: 2px solid var(--primary-gold);
  }
}

/* Print Styles */
@media print {
  .footer {
    background: white !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  .scroll-top-btn,
  .contact-methods {
    display: none !important;
  }
  
  .footer-logo {
    filter: grayscale(100%);
  }
  
  .payment-grid {
    display: none !important;
  }
}

/* Focus Styles for Accessibility */
.quick-link:focus,
.contact-method:focus,
.scroll-top-btn:focus {
  outline: 3px solid var(--primary-gold);
  outline-offset: 2px;
}

/* Loading States */
.footer-logo[src=""],
.payment-method img[src=""] {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
