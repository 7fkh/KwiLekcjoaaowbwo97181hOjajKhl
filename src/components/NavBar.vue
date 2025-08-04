<template>
  <div class="control-background home">
    <!-- العناصر المتحركة المحسنة -->
    <div class="floating-elements">
      <div 
        class="floating-element" 
        v-for="n in 12" 
        :key="n"
        :style="getFloatingElementStyle(n)"
      ></div>
    </div>

    <!-- خطوط الشبكة التفاعلية -->
    <div class="grid-lines">
      <div class="grid-line" v-for="i in 6" :key="i"></div>
    </div>

    <div class="header">
      <div class="left-icons">
        <div class="icon search-icon" @click="handleSearch" title="البحث" aria-label="البحث">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <div class="icon-ripple"></div>
        </div>
        <div class="icon notification-icon" @click="handleNotifications" title="الإشعارات" aria-label="الإشعارات">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div class="notification-badge" v-if="notificationCount > 0">{{ notificationCount }}</div>
          <div class="icon-ripple"></div>
        </div>
      </div>

      <div class="logo">
        <div class="logo-container">
          <img :src="logo" alt="خلي ستور" loading="lazy" />
          <div class="logo-glow"></div>
        </div>
        <span class="logo-text">
          <span class="logo-main">خلي</span>
          <span class="logo-accent">ستور</span>
        </span>
      </div>

      <div class="right-icons">
        <div class="icon profile-icon" @click="handleProfile" title="الملف الشخصي" aria-label="الملف الشخصي">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <div class="icon-ripple"></div>
        </div>
        <div class="icon menu-icon" @click="toggleMenu" title="القائمة" aria-label="القائمة الرئيسية">
          <svg viewBox="0 0 24 24" fill="currentColor" class="menu-svg">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          <div class="icon-ripple"></div>
        </div>
        <div class="icon back-icon" @click="goBack" title="العودة" aria-label="العودة للخلف">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <div class="icon-ripple"></div>
        </div>
      </div>
    </div>

    <div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }" role="navigation">
      <div class="nav-backdrop"></div>
      
      <div class="nav-close" @click="closeMenu" v-if="mobileMenuOpen" aria-label="إغلاق القائمة">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        <div class="icon-ripple"></div>
      </div>
      
      <div class="pages">
        <router-link to="/" @click="closeMenu" class="nav-link" aria-label="الصفحة الرئيسية">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>الرئيسية</span>
          </div>
          <div class="nav-link-glow"></div>
        </router-link>
        
        <router-link to="/products" @click="closeMenu" class="nav-link" aria-label="صفحة المنتجات">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span>المنتجات</span>
          </div>
          <div class="nav-link-glow"></div>
        </router-link>
        
        <router-link to="/order" @click="closeMenu" class="nav-link" aria-label="صفحة الطلب">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V0h-2v2H8V0H6v2H4.5C3.11 2 2 3.11 2 4.5V20c0 1.39 1.11 2.5 2.5 2.5h15c1.39 0 2.5-1.11 2.5-2.5V4.5C22 3.11 20.89 2 19.5 2zM20 20H4V7h16v13z"/>
            </svg>
            <span>اطلب الآن</span>
          </div>
          <div class="nav-link-glow"></div>
        </router-link>

        <router-link to="/about" @click="closeMenu" class="nav-link" aria-label="معلومات عنا">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>معلومات عنا</span>
          </div>
          <div class="nav-link-glow"></div>
        </router-link>
      </div>
      
      <div class="btns">
        <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank" aria-label="انضم إلى سيرفر الديسكورد">
          <div class="btn-content">
            <svg viewBox="0 0 71 55" fill="currentColor">
              <g clip-path="url(#clip0)">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
              </g>
            </svg>
            <span>سيرفر الديسكورد</span>
          </div>
          <div class="btn-glow"></div>
        </a>
        
        <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank" aria-label="حسابات المتجر على وسائل التواصل">
          <div class="btn-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>
            <span>حسابات المتجر</span>
          </div>
          <div class="btn-glow"></div>
        </a>

        <a class="btn tertiary-btn" href="/contact" aria-label="تواصل معنا">
          <div class="btn-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>تواصل معنا</span>
          </div>
          <div class="btn-glow"></div>
        </a>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      logo: null,
      notificationCount: 3,
    };
  },
  mounted() {
    this.logo = require('@/assets/IMG_1254.png');
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
      
      if (this.mobileMenuOpen) {
        this.$nextTick(() => {
          const firstLink = this.$el.querySelector('.nav-link');
          if (firstLink) firstLink.focus();
        });
      }
    },
    closeMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = 'auto';
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    handleSearch() {
      // إضافة منطق البحث المتقدم
      this.$emit('search-requested');
      console.log('البحث المتقدم');
    },
    handleNotifications() {
      // إضافة منطق الإشعارات
      this.$emit('notifications-requested');
      console.log('الإشعارات');
    },
    handleProfile() {
      // إضافة منطق الملف الشخصي
      this.$router.push('/profile');
    },
    handleResize() {
      // تحسين الأداء عند تغيير حجم الشاشة
      if (window.innerWidth > 768 && this.mobileMenuOpen) {
        this.closeMenu();
      }
    },
    getFloatingElementStyle(index) {
      // توليد أنماط ديناميكية للعناصر المتحركة
      const positions = [
        { top: '15%', left: '8%', delay: '0s', size: '12px' },
        { top: '65%', left: '15%', delay: '1s', size: '8px' },
        { top: '35%', left: '85%', delay: '2s', size: '10px' },
        { top: '85%', left: '75%', delay: '3s', size: '14px' },
        { top: '25%', left: '55%', delay: '4s', size: '9px' },
        { top: '75%', left: '92%', delay: '5s', size: '11px' },
        { top: '45%', left: '3%', delay: '2.5s', size: '13px' },
        { top: '55%', left: '97%', delay: '1.5s', size: '7px' },
        { top: '5%', left: '25%', delay: '3.5s', size: '15px' },
        { top: '95%', left: '45%', delay: '0.5s', size: '6px' },
        { top: '20%', left: '70%', delay: '4.5s', size: '12px' },
        { top: '80%', left: '30%', delay: '6s', size: '9px' }
      ];
      
      const pos = positions[index - 1] || positions[0];
      return {
        top: pos.top,
        left: pos.left,
        animationDelay: pos.delay,
        width: pos.size,
        height: pos.size
      };
    }
  },
};
</script>

<style scoped>
/* متغيرات CSS للألوان والقياسات */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --dark-gradient: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0c0c0c 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 8px 32px rgba(0, 0, 0, 0.2);
  --shadow-heavy: 0 16px 48px rgba(0, 0, 0, 0.3);
  --border-radius-sm: 12px;
  --border-radius-md: 20px;
  --border-radius-lg: 30px;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* الأنيميشن المحسنة */
@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 200% 50%; }
  75% { background-position: 300% 50%; }
}

@keyframes floatEnhanced {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
  33% { transform: translateY(-25px) rotate(120deg); opacity: 1; }
  66% { transform: translateY(-10px) rotate(240deg); opacity: 0.8; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(102, 126, 234, 0.2); }
}

@keyframes slideInFromLeft {
  0% { transform: translateX(-100%) scale(0.8); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}

@keyframes slideInFromRight {
  0% { transform: translateX(100%) scale(0.8); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}

@keyframes rippleEffect {
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.1; transform: scaleY(1); }
  50% { opacity: 0.3; transform: scaleY(1.2); }
}

/* الخلفية الرئيسية المحسنة */
.control-background.home {
  background: var(--dark-gradient);
  background-size: 600% 600%;
  animation: gradientFlow 12s ease-in-out infinite;
  position: relative;
  min-height: 90px;
  max-height: 140px;
  overflow: hidden;
  box-shadow: var(--shadow-medium);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

.control-background.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 70%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(118, 75, 162, 0.15) 0%, transparent 50%);
  z-index: 1;
}

.control-background.home::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
}

.control-background.home > * {
  position: relative;
  z-index: 3;
}

/* العناصر المتحركة المحسنة */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(102, 126, 234, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  animation: floatEnhanced 8s ease-in-out infinite;
  filter: blur(0.5px);
}

/* خطوط الشبكة التفاعلية */
.grid-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  animation: gridPulse 4s ease-in-out infinite;
}

.grid-line:nth-child(1) { top: 20%; animation-delay: 0s; }
.grid-line:nth-child(2) { top: 40%; animation-delay: 0.5s; }
.grid-line:nth-child(3) { top: 60%; animation-delay: 1s; }
.grid-line:nth-child(4) { top: 80%; animation-delay: 1.5s; }
.grid-line:nth-child(5) { top: 35%; animation-delay: 2s; }
.grid-line:nth-child(6) { top: 65%; animation-delay: 2.5s; }

/* الهيدر المحسن */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 25px;
  position: relative;
  min-height: 70px;
  animation: slideInFromLeft 0.8s ease-out;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 0 0 auto;
  min-width: 80px;
}

.right-icons {
  justify-content: flex-end;
  animation: slideInFromRight 0.8s ease-out;
}

/* الشعار المحسن */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
  max-width: 250px;
  margin: 0 auto;
  animation: slideInFromLeft 1s ease-out 0.2s both;
}

.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid var(--glass-border);
  transition: var(--transition-smooth);
  z-index: 2;
  position: relative;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 3s ease-in-out infinite;
  z-index: 1;
}

.logo:hover img {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 25px rgba(102, 126, 234, 0.5);
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  color: var(--text-primary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: var(--transition-smooth);
}

.logo-main {
  font-size: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.logo-accent {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  line-height: 1;
}

.logo:hover .logo-text {
  transform: translateY(-2px);
}

/* الأيقونات المحسنة */
.icon {
  width: 44px;
  height: 44px;
  background: var(--glass-bg);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
}

.icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  border-radius: 50%;
  opacity: 0;
  transition: var(--transition-smooth);
}

.icon:hover::before {
  opacity: 1;
}

.icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-medium);
  border-color: rgba(255, 255, 255, 0.4);
}

.icon:active {
  transform: translateY(-1px) scale(1.02);
}

.icon svg {
  color: var(--text-primary);
  transition: var(--transition-smooth);
  width: 20px;
  height: 20px;
  z-index: 2;
  position: relative;
}

.icon:hover svg {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
}

/* تأثير الريبل */
.icon-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  transition: var(--transition-fast);
}

.icon:active .icon-ripple {
  animation: rippleEffect 0.6s ease-out;
}

/* شارة الإشعارات */
.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: pulseGlow 2s ease-in-out infinite;
}

/* التنقل المحسن */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
  transition: var(--transition-slow);
  position: relative;
}

.nav-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius-md);
  opacity: 0;
  transition: var(--transition-smooth);
}

.nav:hover .nav-backdrop {
  opacity: 1;
}

.nav-close {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: var(--glass-bg);
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  z-index: 1000;
}

.nav-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1) rotate(90deg);
  box-shadow: var(--shadow-light);
}

.nav-close svg {
  color: var(--text-primary);
  width: 22px;
  height: 22px;
}

/* الصفحات المحسنة */
.pages {
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 20px;
  border-radius: var(--border-radius-lg);
  transition: var(--transition-smooth);
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  min-width: 120px;
  justify-content: center;
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
  position: relative;
}

.nav-link-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition-slow);
}

.nav-link:hover .nav-link-glow {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-link:active {
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  box-shadow: var(--shadow-light);
  border-color: rgba(102, 126, 234, 0.5);
}

.nav-link svg {
  transition: var(--transition-smooth);
  width: 18px;
  height: 18px;
}

.nav-link:hover svg {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

/* الأزرار المحسنة */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
  padding: 14px 28px;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-weight: 700;
  font-size: 14px;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  min-width: 160px;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
  position: relative;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: var(--transition-slow);
}

.btn:hover .btn-glow {
  left: 100%;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-heavy);
}

.btn:active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.btn svg {
  transition: var(--transition-smooth);
  width: 18px;
  height: 18px;
}

.btn:hover svg {
  transform: scale(1.1) rotate(-5deg);
}

/* أنواع الأزرار */
.primary-btn {
  background: var(--primary-gradient);
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.primary-btn:hover {
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.6);
}

.secondary-btn {
  background: var(--secondary-gradient);
  border: 2px solid rgba(240, 147, 251, 0.3);
}

.secondary-btn:hover {
  box-shadow: 0 10px 40px rgba(240, 147, 251, 0.4);
  border-color: rgba(240, 147, 251, 0.6);
}

.tertiary-btn {
  background: linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%);
  border: 2px solid rgba(54, 209, 220, 0.3);
}

.tertiary-btn:hover {
  box-shadow: 0 10px 40px rgba(54, 209, 220, 0.4);
  border-color: rgba(54, 209, 220, 0.6);
}

/* الطبقة التراكبية للجوال */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* التجاوب مع الشاشات المختلفة */
@media (max-width: 768px) {
  .control-background.home {
    min-height: 80px;
    max-height: 110px;
    border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
  }

  .header {
    padding: 15px 18px;
    min-height: 60px;
  }

  .logo img {
    width: 36px;
    height: 36px;
  }

  .logo-main {
    font-size: 18px;
  }

  .logo-accent {
    font-size: 12px;
  }

  .icon {
    width: 38px;
    height: 38px;
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }

  .left-icons, .right-icons {
    gap: 12px;
    min-width: 60px;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--dark-gradient);
    background-size: 600% 600%;
    animation: gradientFlow 12s ease-in-out infinite;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    z-index: 999;
    justify-content: center;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    padding: 100px 30px 50px;
  }

  .nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }

  .nav.nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
    animation: slideInFromLeft 0.4s ease-out;
  }

  .nav-close {
    display: flex;
  }

  .pages {
    flex-direction: column;
    gap: 35px;
    margin-bottom: 50px;
  }

  .nav-link {
    font-size: 20px;
    padding: 18px 35px;
    min-width: 220px;
    border-radius: var(--border-radius-lg);
  }

  .nav-link svg {
    width: 22px;
    height: 22px;
  }

  .btns {
    flex-direction: column;
    gap: 25px;
    width: 100%;
    max-width: 320px;
  }

  .btn {
    width: 100%;
    padding: 18px 35px;
    font-size: 16px;
    border-radius: var(--border-radius-lg);
  }

  .btn svg {
    width: 20px;
    height: 20px;
  }
}

/* إخفاء أيقونة القائمة على سطح المكتب */
@media (min-width: 769px) {
  .menu-icon {
    display: none;
  }
}

/* الشاشات الصغيرة جداً */
@media (max-width: 480px) {
  .control-background.home {
    min-height: 70px;
    max-height: 95px;
  }

  .header {
    padding: 12px 15px;
    min-height: 50px;
  }
  
  .logo-text {
    display: none;
  }
  
  .left-icons, .right-icons {
    gap: 8px;
    min-width: 45px;
  }

  .icon {
    width: 34px;
    height: 34px;
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .notification-badge {
    width: 16px;
    height: 16px;
    font-size: 9px;
  }
}

@media (max-width: 360px) {
  .control-background.home {
    min-height: 65px;
    max-height: 85px;
  }

  .header {
    padding: 10px 12px;
    min-height: 45px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }

  .icon svg {
    width: 14px;
    height: 14px;
  }

  .logo img {
    width: 28px;
    height: 28px;
  }
}

/* الشاشات الكبيرة */
@media (min-width: 1200px) {
  .control-background.home {
    max-width: 1400px;
    margin: 0 auto;
    border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  }

  .header {
    padding: 25px 40px;
  }

  .logo img {
    width: 50px;
    height: 50px;
  }

  .logo-main {
    font-size: 22px;
  }

  .logo-accent {
    font-size: 16px;
  }

  .icon {
    width: 48px;
    height: 48px;
  }

  .icon svg {
    width: 22px;
    height: 22px;
  }

  .nav-link {
    padding: 14px 24px;
    font-size: 16px;
  }

  .btn {
    padding: 16px 32px;
    font-size: 15px;
  }
}

/* تحسينات الأداء */
.control-background.home,
.nav,
.btn,
.icon,
.nav-link {
  will-change: transform;
}

/* تحسينات الوصولية */
.icon:focus,
.btn:focus,
.nav-link:focus {
  outline: 3px solid rgba(102, 126, 234, 0.8);
  outline-offset: 2px;
}

/* تقليل الحركة للمستخدمين الذين يفضلون تقليل الحركة */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* تحسينات للطباعة */
@media print {
  .control-background.home {
    background: none !important;
    box-shadow: none !important;
  }
  
  .floating-elements,
  .grid-lines {
    display: none !important;
  }
}

/* خط عربي محسن */
.logo-text,
.nav-link,
.btn {
  font-family: 'Cairo', 'Tajawal', 'Segoe UI', system-ui, -apple-system, sans-serif;
  direction: rtl;
  text-align: center;
}

/* تحسينات إضافية للأجهزة اللمسية */
@media (pointer: coarse) {
  .icon,
  .btn,
  .nav-link {
    min-height: 44px;
    min-width: 44px;
  }
}

/* تأثيرات مخصصة للحالة النشطة */
.router-link-active .nav-link-content {
  animation: pulseGlow 2s ease-in-out infinite;
}

/* تحسين الظلال للثيمات الداكنة */
@media (prefers-color-scheme: dark) {
  :root {
    --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 8px 32px rgba(0, 0, 0, 0.4);
    --shadow-heavy: 0 16px 48px rgba(0, 0, 0, 0.5);
  }
}
</style>
