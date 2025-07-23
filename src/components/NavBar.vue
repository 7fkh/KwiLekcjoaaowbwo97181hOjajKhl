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


  <div class="logo">
    <img :src="logo" url="https://imgur.com/a/UduHwH7" loading="lazy" />
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
    <a href="/products" @click="closeMenu" class="nav-link">
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
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
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
  0% { opacity: 0; transform: translateY(20px); }
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
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

/* الخلفية الرئيسية - حجم محدود */
.control-background.home {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e  50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  position: relative;
  min-height: 80px; /* تقليل الحد الأدنى للارتفاع */
  max-height: 120px; /* حد أقصى للارتفاع */
  overflow: visible;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 20px 20px; /* زوايا مدورة في الأسفل فقط */
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
  z-index: 1;
  border-radius: 0 0 20px 20px;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* الهيدر - حجم مضغوط */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px; /* تقليل الحشو */
  position: relative;
  min-height: 60px; /* ارتفاع ثابت للهيدر */
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto; /* منع التمدد */
  min-width: 60px; /* عرض أدنى */
}

.right-icons {
  justify-content: flex-end;
}

/* الشعار - حجم مضغوط */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center;
  max-width: 200px; /* حد أقصى للعرض */
  margin: 0 auto;
}

.logo img {
  width: 38px; /* حجم أصغر */
  height: 38px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05) rotate(3deg);
  border-color: rgba(255, 255, 255, 0.8);
}

.logo-text {
  font-size: 18px; /* حجم خط أصغر */
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: translateY(-1px);
  text-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
}

/* الأيقونات - حجم مضغوط */
.icon {
  width: 38px; /* حجم أصغر */
  height: 38px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.icon:active {
  transform: translateY(0) scale(0.98);
}

.icon svg {
  color: white;
  transition: all 0.3s ease;
  width: 18px; /* حجم أيقونة أصغر */
  height: 18px;
}

.icon:hover svg {
  transform: scale(1.1);
}

/* التنقل - تحسينات للجوال */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px; /* تقليل الفجوة */
  padding: 0 15px 15px; /* تقليل الحشو */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-close {
  display: none;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
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
  width: 20px;
  height: 20px;
}

/* التنقل على الجوال - تحسينات */
@media (max-width: 768px) {
  .control-background.home {
    min-height: 70px; /* أصغر على الجوال */
    max-height: 100px;
    border-radius: 0 0 15px 15px;
  }

  .header {
    padding: 12px 15px;
    min-height: 50px;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 16px;
  }

  .icon {
    width: 34px;
    height: 34px;
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  .left-icons, .right-icons {
    gap: 8px;
    min-width: 50px;
  }

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
    padding: 80px 20px 40px;
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

/* الصفحات - تحسينات للمساحة */
.pages {
  display: flex;
  gap: 20px; /* تقليل الفجوة */
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .pages {
    flex-direction: column;
    gap: 30px;
    margin-bottom: 40px;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px; /* حجم خط أصغر */
  padding: 8px 16px; /* حشو أصغر */
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.nav-link:active {
  transform: translateY(0);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-link svg {
  transition: all 0.3s ease;
  width: 16px;
  height: 16px;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 18px;
    padding: 14px 28px;
    min-width: 180px;
    justify-content: center;
  }

  .nav-link svg {
    width: 20px;
    height: 20px;
  }
}

/* حاوية الأزرار - تحسينات للمساحة */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* تقليل الفجوة */
  flex-wrap: wrap;
  margin-top: 5px; /* تقليل الهامش العلوي */
}

@media (max-width: 768px) {
  .btns {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 300px;
  }
}

/* الأزرار - حجم مضغوط */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  color: #ffffff;
  padding: 10px 20px; /* حشو أصغر */
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 13px; /* حجم خط أصغر */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
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
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}

.btn svg {
  transition: all 0.3s ease;
  width: 16px;
  height: 16px;
}

.btn:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    padding: 15px 30px;
    font-size: 15px;
    border-radius: 30px;
  }

  .btn svg {
    width: 18px;
    height: 18px;
  }
}

/* الزر الأساسي */
.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.primary-btn:hover {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 8px 30px rgba(88, 112, 246, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* الزر الثانوي */
.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  box-shadow: 0 8px 30px rgba(108, 117, 125, 0.4);
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

/* التعديلات التجاوبية للشاشات الصغيرة جداً */
@media (max-width: 480px) {
  .control-background.home {
    min-height: 65px;
    max-height: 90px;
    border-radius: 0 0 12px 12px;
  }

  .header {
    padding: 10px 12px;
    min-height: 45px;
  }
  
  .logo-text {
    display: none; /* إخفاء النص على الشاشات الصغيرة جداً */
  }
  
  .left-icons, .right-icons {
    gap: 6px;
    min-width: 40px;
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

@media (max-width: 360px) {
  .control-background.home {
    min-height: 60px;
    max-height: 80px;
  }

  .header {
    padding: 8px 10px;
    min-height: 40px;
  }

  .icon {
    width: 28px;
    height: 28px;
  }

  .icon svg {
    width: 12px;
    height: 12px;
  }

  .logo img {
    width: 26px;
    height: 26px;
  }
}

/* تحسينات إضافية للأداء */
.control-background.home,
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
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* تحسين الظلال للأجهزة عالية الدقة */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
  
  .btn:hover,
  .icon:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }<template>
  <div class="control-background home">
    <div class="header">
      <div class="left-icons">
        <div class="icon search-icon" @click="handleSearch" :title="$t('search')">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      <div class="logo" @click="goHome">
        <img :src="logo" alt="خلي ستور" loading="lazy" />
        <span class="logo-text">خلي ستور</span>
      </div>

      <div class="right-icons">
        <div class="icon menu-icon" @click="toggleMenu" :title="$t('menu')" :class="{ active: mobileMenuOpen }">
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="icon arrow-icon" @click="goBack" :title="$t('back')" v-show="!isHomePage">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }">
      <div class="nav-header" v-if="mobileMenuOpen">
        <div class="nav-logo">
          <img :src="logo" alt="خلي ستور" />
          <span>خلي ستور</span>
        </div>
        <div class="nav-close" @click="closeMenu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
      </div>
      
      <div class="pages">
        <router-link to="/" @click="closeMenu" class="nav-link" exact-active-class="active">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>الرئيسية</span>
          </div>
        </router-link>
        <a href="/products" @click="closeMenu" class="nav-link">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span>المنتجات</span>
          </div>
        </a>
        <router-link to="/order" @click="closeMenu" class="nav-link">
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
            </svg>
            <span>اطلب الآن</span>
          </div>
        </router-link>
      </div>
      
      <div class="btns">
        <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span>سيرفر الديسكورد</span>
        </a>
        <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
          <span>حسابات المتجر</span>
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
      touchStartY: 0,
      touchEndY: 0,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  mounted() {
    this.logo = require('@/assets/IMG_1254.png');
    this.setupTouchEvents();
    this.setupKeyboardEvents();
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
    this.removeTouchEvents();
    this.removeKeyboardEvents();
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
      
      // إضافة فاعلية لمنع التمرير خلف القائمة
      if (this.mobileMenuOpen) {
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.width = '100%';
      } else {
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
      }
    },
    closeMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = 'auto';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    handleSearch() {
      // إضافة منطق البحث هنا
      console.log('Search clicked');
    },
    setupTouchEvents() {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        nav.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      }
    },
    removeTouchEvents() {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.removeEventListener('touchstart', this.handleTouchStart);
        nav.removeEventListener('touchend', this.handleTouchEnd);
      }
    },
    handleTouchStart(e) {
      this.touchStartY = e.touches[0].clientY;
    },
    handleTouchEnd(e) {
      this.touchEndY = e.changedTouches[0].clientY;
      
      // إغلاق القائمة عند السحب لأسفل بقوة
      if (this.touchStartY - this.touchEndY < -100 && this.mobileMenuOpen) {
        this.closeMenu();
      }
    },
    setupKeyboardEvents() {
      document.addEventListener('keydown', this.handleKeydown);
    },
    removeKeyboardEvents() {
      document.removeEventListener('keydown', this.handleKeydown);
    },
    handleKeydown(e) {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMenu();
      }
    }
  },
};
</script>

<style scoped>
/* تحسينات الأداء والحركة */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* الأنيميشن المحسن */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes slideInFromLeft {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

/* الخلفية الرئيسية محسنة للجوال */
.control-background.home {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 12s ease infinite;
  position: relative;
  min-height: 70px;
  max-height: 90px;
  overflow: visible;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 20px 20px;
  z-index: 100;
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 1;
  border-radius: 0 0 20px 20px;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* الهيدر محسن للجوال */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: relative;
  min-height: 60px;
  gap: 10px;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  min-width: 50px;
}

.right-icons {
  justify-content: flex-end;
}

/* الشعار محسن */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 15px;
}

.logo:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.1);
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.logo:hover img,
.logo:active img {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.logo-text {
  font-size: 19px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.logo:hover .logo-text {
  transform: translateY(-1px);
  text-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5);
}

/* الأيقونات محسنة للجوال */
.icon {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
}

.icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
}

.icon:active::before {
  width: 100%;
  height: 100%;
}

.icon:hover,
.icon:active {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

.icon svg {
  color: white;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  z-index: 1;
}

.icon:hover svg,
.icon:active svg {
  transform: scale(1.2);
}

/* هامبرجر محسن */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 18px;
  height: 14px;
  position: relative;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.menu-icon.active .hamburger span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.active .hamburger span:nth-child(2) {
  opacity: 0;
  transform: translateX(20px);
}

.menu-icon.active .hamburger span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* التنقل محسن للجوال */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* تحسينات الجوال */
@media (max-width: 768px) {
  .control-background.home {
    min-height: 65px;
    max-height: 80px;
    border-radius: 0 0 15px 15px;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .header {
    padding: 12px 16px;
    min-height: 50px;
  }

  .logo img {
    width: 36px;
    height: 36px;
  }

  .logo-text {
    font-size: 17px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }

  .left-icons, .right-icons {
    gap: 8px;
    min-width: 45px;
  }

  /* القائمة المنبثقة محسنة */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh; /* دعم أفضل للأجهزة الحديثة */
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(22, 33, 62, 0.98));
    backdrop-filter: blur(25px);
    z-index: 9999;
    justify-content: flex-start;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    padding: 0;
    overscroll-behavior: contain;
  }

  .nav.nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 20px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-logo img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .nav-logo span {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  .nav-close {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .nav-close:hover,
  .nav-close:active {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .nav-close svg {
    color: white;
    width: 22px;
    height: 22px;
  }

  .pages {
    flex-direction: column;
    gap: 8px;
    margin: 40px 0;
    width: 100%;
    padding: 0 20px;
  }

  .btns {
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 0 20px;
    margin-top: auto;
    margin-bottom: 40px;
  }
}

/* الصفحات */
.pages {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
}

@media (max-width: 768px) {
  .nav-link {
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 4px;
  }

  .nav-link-content {
    font-size: 18px;
    padding: 18px 24px;
    gap: 16px;
  }

  .nav-link svg {
    width: 22px;
    height: 22px;
  }
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before,
.nav-link:active::before {
  left: 100%;
}

.nav-link:hover,
.nav-link:active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-link.active,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

.nav-link svg {
  transition: all 0.3s ease;
  width: 18px;
  height: 18px;
}

.nav-link:hover svg,
.nav-link:active svg {
  transform: scale(1.15);
}

/* حاوية الأزرار */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
}

/* الأزرار محسنة */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
  padding: 12px 22px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: blur(15px);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  min-width: 120px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before,
.btn:active::before {
  left: 100%;
}

.btn:hover,
.btn:active {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.btn svg {
  transition: all 0.3s ease;
  width: 18px;
  height: 18px;
}

.btn:hover svg,
.btn:active svg {
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    padding: 16px 30px;
    font-size: 16px;
    border-radius: 30px;
    min-height: 56px;
    gap: 12px;
  }

  .btn svg {
    width: 20px;
    height: 20px;
  }
}

/* الزر الأساسي */
.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

.primary-btn:hover,
.primary-btn:active {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 10px 35px rgba(88, 112, 246, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

/* الزر الثانوي */
.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

.secondary-btn:hover,
.secondary-btn:active {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  box-shadow: 0 10px 35px rgba(108, 117, 125, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
}

/* الطبقة التراكبية للجوال محسنة */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 100dvh;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  animation: fadeInUp 0.3s ease;
}

/* إخفاء أيقونة القائمة على سطح المكتب */
@media (min-width: 769px) {
  .menu-icon {
    display: none;
  }
}

/* تحسينات للشاشات الصغيرة جداً */
@media (max-width: 480px) {
  .control-background.home {
    min-height: 60px;
    max-height: 75px;
    border-radius: 0 0 12px 12px;
  }

  .header {
    padding: 10px 14px;
    min-height: 45px;
  }
  
  .logo-text {
    font-size: 15px;
  }
  
  .left-icons, .right-icons {
    gap: 6px;
    min-width: 40px;
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .hamburger {
    width: 16px;
    height: 12px;
    gap: 2.5px;
  }

  .hamburger span {
    height: 1.5px;
  }

  .nav-header {
    padding: 16px 16px;
  }

  .pages {
    margin: 30px 0;
    padding: 0 16px;
  }

  .btns {
    padding: 0 16px;
    margin-bottom: 30px;
  }

  .nav-link-content {
    font-size: 16px;
    padding: 16px 20px;
  }

  .btn {
    padding: 14px 24px;
    font-size: 15px;
    min-height: 52px;
  }
}

@media (max-width: 360px) {
  .control-background.home {
    min-height: 55px;
    max-height: 70px;
  }

  .header {
    padding: 8px 12px;
    min-height: 40px;
  }

  .icon {
    width: 32px;
    height: 32px;
  }

  .icon svg {
    width: 14px;
    height: 14px;
  }

  .logo img {
    width: 28px;
    height: 28px;
  }

  .logo-text {
    font-size: 14px;
  }

  .hamburger {
    width: 14px;
    height: 10px;
    gap: 2px;
  }
}

/* تحسينات إضافية للأداء */
.control-background.home,
.nav,
.btn,
.icon,
.nav-link {
  will-change: transform;
  contain: layout;
}

/* تأثيرات تفاعلية محسنة للجوال */
@media (hover: none) and (pointer: coarse) {
  .icon:active {
    animation: bounceIn 0.4s ease-in-out;
  }
  
  .btn:active {
    animation: bounceIn 0.3s ease-in-out;
  }

  .nav-link:active {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0.98);
  }
}

/* تحسينات الوصولية */
.icon:focus,
.btn:focus,
.nav-link:focus,
.logo:focus {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* دعم الوضع المظلم للنظام */
@media (prefers-color-scheme: dark) {
  .control-background.home {
    background: linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #000000 100%);
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

/* تحسينات للشاشات عالية الكثافة */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon,
  .nav-link {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .btn:hover,
  .icon:hover,
  .nav-link:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }
}

/* تحسينات للاتجاه الأفقي على الجوال */
@media (max-width: 768px) and (orientation: landscape) {
  .nav {
    padding-top: 10px;
  }

  .nav-header {
    padding: 12px 20px;
  }

  .pages {
    margin: 20px 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .nav-link {
    width: auto;
    min-width: 140px;
  }

  .nav-link-content {
    padding: 12px 18px;
    font-size: 14px;
  }

  .btns {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    gap: 12px;
  }

  .btn {
    width: auto;
    min-width: 160px;
    padding: 12px 20px;
    font-size: 14px;
    min-height: 48px;
  }
}

/* تحسينات السلامة للمناطق الآمنة في الأجهزة الحديثة */
@supports (padding: max(0px)) {
  .control-background.home {
    padding-left: max(20px, env(safe-area-inset-left));
    padding-right: max(20px, env(safe-area-inset-right));
  }

  .nav {
    padding-left: max(20px, env(safe-area-inset-left));
    padding-right: max(20px, env(safe-area-inset-right));
    padding-bottom: max(40px, env(safe-area-inset-bottom));
  }
}

/* ضمان عدم تغطية المحتوى */
body {
  margin: 0;
  padding: 0;
  -webkit-overflow-scrolling: touch;
}

.main-content {
  margin-top: 0;
  padding-top: 20px;
}

.app-container {
  max-width: 100vw;
  overflow-x: hidden;
}

/* تحسينات إضافية للسرعة */
.nav.nav-mobile-open .nav-link {
  animation: slideInFromLeft 0.4s ease forwards;
}

.nav.nav-mobile-open .nav-link:nth-child(1) { animation-delay: 0.1s; }
.nav.nav-mobile-open .nav-link:nth-child(2) { animation-delay: 0.2s; }
.nav.nav-mobile-open .nav-link:nth-child(3) { animation-delay: 0.3s; }

.nav.nav-mobile-open .btn {
  animation: fadeInUp 0.5s ease forwards;
}

.nav.nav-mobile-open .btn:nth-child(1) { animation-delay: 0.4s; }
.nav.nav-mobile-open .btn:nth-child(2) { animation-delay: 0.5s; }

/* تحسين التمرير للقائمة المفتوحة */
.nav.nav-mobile-open {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* إصلاح مشكلة الارتداد في iOS */
@supports (-webkit-touch-callout: none) {
  .nav.nav-mobile-open {
    position: fixed;
    -webkit-overflow-scrolling: touch;
  }
}

/* تحسينات إضافية للتفاعل */
.logo:focus-visible,
.icon:focus-visible,
.btn:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid #5870f6;
  outline-offset: 2px;
  border-radius: 8px;
}

/* تحسين الانتقالات للقائمة */
.nav {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease,
              visibility 0.3s ease;
}

/* تحسين استجابة اللمس */
@media (pointer: coarse) {
  .icon,
  .btn,
  .nav-link {
    min-height: 44px;
    min-width: 44px;
  }
}

/* تحسين القراءة */
.logo-text,
.nav-link span,
.btn span {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* تحسين الأداء على الأجهزة القديمة */
@media (max-device-width: 768px) and (-webkit-min-device-pixel-ratio: 1) {
  .control-background.home {
    background: #1a1a2e; /* خلفية ثابتة للأجهزة القديمة */
    animation: none;
  }
  
  .btn::before,
  .nav-link::before,
  .icon::before {
    display: none; /* إزالة التأثيرات المعقدة */
  }
}
</style>
