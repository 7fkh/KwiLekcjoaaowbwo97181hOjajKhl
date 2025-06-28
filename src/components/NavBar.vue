<template>
  <div class="control-background home">
    <div class="header">
      <div class="left-icons">
        <div class="icon search-icon" @click="handleSearch" title="البحث">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

```
  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" loading="lazy" />
    <span class="logo-text">خلي ستور</span>
  </div>

  <div class="right-icons">
    <div class="icon menu-icon" @click="toggleMenu" title="القائمة">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </div>
    <div class="icon arrow-icon" @click="goBack" title="العودة">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>
  </div>
</div>

<div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }">
  <div class="nav-close" @click="closeMenu" v-if="mobileMenuOpen">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  </div>
  
  <div class="pages">
    <router-link to="/" @click="closeMenu" class="nav-link">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
      الرئيسية
    </router-link>
    <a href="#products" @click="closeMenu" class="nav-link">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      المنتجات
    </a>
    <router-link to="/order" @click="closeMenu" class="nav-link">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
      </svg>
      اطلب الآن
    </router-link>
  </div>
  
  <div class="btns">
    <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank">
      <svg viewBox="0 0 71 55" width="20" height="20" fill="currentColor">
        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
      </svg>
      سيرفر الديسكورد
    </a>
    <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
      حسابات المتجر
    </a>
  </div>
</div>

<div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
```

  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      logo: null,
    };
  },
  mounted() {
    this.logo = require('@/assets/IMG_1254.png');
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
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
  },
};
</script>

<style scoped>
/* الأنيميشن الأساسية */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes slideIn {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* الخلفية الرئيسية - إزالة الخلفية المتدرجة */
.control-background.home {
  background: transparent;
  position: relative;
  min-height: auto;
  overflow: visible;
}

/* الهيدر - خلفية شفافة */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
  background: transparent;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.right-icons {
  justify-content: flex-end;
}

/* الشعار */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
}

.logo img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(102, 126, 234, 0.5);
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  color: #333;
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: translateY(-1px);
  color: #667eea;
}

/* الأيقونات */
.icon {
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.icon:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.icon:active {
  transform: translateY(0) scale(0.95);
}

.icon svg {
  color: #666;
  transition: all 0.3s ease;
}

.icon:hover svg {
  transform: scale(1.1);
  color: #667eea;
}

/* التنقل - هنا يتم تطبيق الخلفية المتدرجة */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  border-radius: 20px;
  margin: 0 20px 20px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  z-index: 1;
  border-radius: 20px;
}

.nav > * {
  position: relative;
  z-index: 2;
}

.nav-close {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-close svg {
  color: white;
}

/* التنقل على الجوال */
@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
    backdrop-filter: blur(20px);
    z-index: 999;
    justify-content: center;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    padding: 60px 20px 20px;
    margin: 0;
    border-radius: 0;
  }

  .nav::before {
    border-radius: 0;
  }

  .nav.nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-close {
    display: flex;
  }
}

/* الصفحات */
.pages {
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .pages {
    flex-direction: column;
    gap: 40px;
    margin-bottom: 50px;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.nav-link:active {
  transform: translateY(0);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-link svg {
  transition: all 0.3s ease;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 20px;
    padding: 16px 32px;
    min-width: 200px;
    justify-content: center;
  }
}

/* حاوية الأزرار */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .btns {
    flex-direction: column;
    gap: 25px;
    width: 100%;
    max-width: 320px;
  }
}

/* الأزرار */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.btn svg {
  transition: all 0.3s ease;
}

.btn:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    padding: 18px 36px;
    font-size: 16px;
    border-radius: 35px;
  }
}

/* الزر الأساسي */
.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.primary-btn:hover {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 12px 40px rgba(88, 112, 246, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* الزر الثانوي */
.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  box-shadow: 0 12px 40px rgba(108, 117, 125, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* الطبقة التراكبية للجوال */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
}

/* إخفاء أيقونة القائمة على سطح المكتب */
@media (min-width: 769px) {
  .menu-icon {
    display: none;
  }
}

/* التعديلات التجاوبية */
@media (max-width: 480px) {
  .header {
    padding: 15px;
  }
  
  .logo-text {
    display: none;
  }
  
  .left-icons, .right-icons {
    gap: 10px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .logo img {
    width: 40px;
    height: 40px;
  }

  .nav {
    margin: 0 15px 15px;
    border-radius: 15px;
  }
}

@media (max-width: 360px) {
  .header {
    padding: 12px;
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .logo img {
    width: 36px;
    height: 36px;
  }

  .nav {
    margin: 0 12px 12px;
  }
}

/* تحسينات إضافية للأداء */
.nav,
.btn,
.icon,
.nav-link {
  will-change: transform;
}

/* تأثيرات تفاعلية محسنة */
@media (hover: hover) {
  .icon:hover {
    animation: pulse 0.6s ease-in-out;
  }
  
  .btn:hover {
    animation: pulse 0.4s ease-in-out;
  }
}

/* تحسينات الوصولية */
.icon:focus,
.btn:focus,
.nav-link:focus {
  outline: 2px solid rgba(102, 126, 234, 0.8);
  outline-offset: 2px;
  border-radius: 4px;
}

/* تحسين الظلال للأجهزة عالية الدقة */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  .btn:hover,
  .icon:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  }
}

/* تحسين الأداء للرسوم المتحركة */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>