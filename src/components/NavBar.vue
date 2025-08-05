<template>
  <div class="control-background home">
    <div class="header">
      <div class="header-section left">
        <div class="icon search-icon" @click="handleSearch" title="البحث">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      <div class="header-section center">
        <div class="logo">
          <img :src="logo" alt="خلي ستور" loading="lazy" />
          <span class="logo-text">خلي ستور</span>
        </div>
      </div>

      <div class="header-section right">
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
          <svg viewBox="0 0 127.14 96.36" width="20" height="20" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
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
    this.logo = require('/assets/IMG_1254.png');
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('menu-open');
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.updateBodyOverflow();
    },
    closeMenu() {
      this.mobileMenuOpen = false;
      this.updateBodyOverflow();
    },
    updateBodyOverflow() {
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
      } else {
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
      }
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    handleSearch() {
      // تطبيق منطق البحث هنا
      console.log('البحث تم تفعيله');
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

@keyframes slideInRight {
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes ripple {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
}

/* الخلفية الرئيسية - محسّنة للجوال */
.control-background.home {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;
  backdrop-filter: blur(10px);
  min-height: auto;
  max-height: none;
  overflow: visible;
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  border-radius: 0 0 20px 20px;
  z-index: 1;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* الهيدر - تخطيط محسّن ومرن */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  min-height: 70px;
  position: relative;
  gap: 15px;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-section.left {
  flex: 0 0 auto;
  justify-content: flex-start;
  min-width: fit-content;
}

.header-section.center {
  flex: 1;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.header-section.right {
  flex: 0 0 auto;
  justify-content: flex-end;
  min-width: fit-content;
}

/* الشعار - محسّن ومتجاوب */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 100%;
  overflow: hidden;
}

.logo img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  object-fit: cover;
  flex-shrink: 0;
}

.logo:hover img {
  transform: scale(1.05) rotate(3deg);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logo:hover .logo-text {
  transform: translateY(-1px);
  text-shadow: 2px 3px 6px rgba(0, 0, 0, 0.6);
}

/* الأيقونات - محسّنة مع تأثيرات بصرية */
.icon {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%);
}

.icon:hover::before {
  width: 100%;
  height: 100%;
}

.icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.icon:active {
  transform: translateY(0) scale(0.95);
}

.icon:active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ripple 0.6s ease-out;
}

.icon svg {
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 20px;
  height: 20px;
  z-index: 1;
}

.icon:hover svg {
  transform: scale(1.1);
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

/* التنقل - تحسينات شاملة */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  padding: 0 20px 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-close {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1001;
}

.nav-close:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-close svg {
  color: white;
  width: 24px;
  height: 24px;
}

/* الصفحات */
.pages {
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::before {
  right: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.nav-link:active {
  transform: translateY(0);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav-link svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 18px;
  height: 18px;
}

.nav-link:hover svg {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
}

/* الأزرار */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
  padding: 14px 26px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: blur(15px);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: right 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover::before {
  right: 100%;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(-1px);
}

.btn svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 18px;
  height: 18px;
}

.btn:hover svg {
  transform: scale(1.1);
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
}

.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.primary-btn:hover {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 35px rgba(88, 112, 246, 0.4);
}

.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 35px rgba(108, 117, 125, 0.4);
}

/* الطبقة التراكبية */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* إخفاء أيقونة القائمة على سطح المكتب */
.menu-icon {
  display: none;
}

/* تخطيط الجوال - تحسينات شاملة */
@media (max-width: 768px) {
  .control-background.home {
    border-radius: 0 0 18px 18px;
  }

  .header {
    padding: 12px 16px;
    min-height: 60px;
    gap: 10px;
  }

  .header-section {
    gap: 8px;
  }

  .logo img {
    width: 36px;
    height: 36px;
  }

  .logo-text {
    font-size: 17px;
  }

  .icon {
    width: 38px;
    height: 38px;
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }

  .menu-icon {
    display: flex;
  }

  /* القائمة المنسدلة للجوال - محسّنة */
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(16, 33, 62, 0.98), rgba(26, 26, 46, 0.98));
    backdrop-filter: blur(25px);
    z-index: 1000;
    justify-content: center;
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    padding: 90px 30px 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .nav.nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-close {
    display: flex;
  }

  .pages {
    flex-direction: column;
    gap: 25px;
    margin-bottom: 35px;
    width: 100%;
    max-width: 300px;
  }

  .nav-link {
    font-size: 18px;
    padding: 16px 28px;
    width: 100%;
    justify-content: center;
    border-radius: 18px;
    min-height: 55px;
  }

  .nav-link svg {
    width: 20px;
    height: 20px;
  }

  .btns {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 300px;
  }

  .btn {
    width: 100%;
    padding: 16px 28px;
    font-size: 16px;
    border-radius: 18px;
    min-height: 55px;
  }

  .btn svg {
    width: 20px;
    height: 20px;
  }
}

/* الشاشات الصغيرة */
@media (max-width: 480px) {
  .control-background.home {
    border-radius: 0 0 15px 15px;
  }

  .header {
    padding: 10px 14px;
    min-height: 55px;
    gap: 8px;
  }

  .header-section {
    gap: 6px;
  }

  .logo img {
    width: 34px;
    height: 34px;
  }

  .logo-text {
    font-size: 16px;
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .icon svg {
    width: 16px;
    height: 16px;
  }

  .nav {
    padding: 80px 25px 40px;
  }

  .pages {
    max-width: 280px;
    gap: 22px;
  }

  .nav-link {
    font-size: 17px;
    padding: 14px 24px;
    min-height: 50px;
  }

  .btns {
    max-width: 280px;
    gap: 18px;
  }

  .btn {
    padding: 14px 24px;
    font-size: 15px;
    min-height: 50px;
  }
}

/* الشاشات الصغيرة جداً */
@media (max-width: 360px) {
  .control-background.home {
    border-radius: 0 0 12px 12px;
  }

  .header {
    padding: 8px 12px;
    min-height: 50px;
  }

  .logo-text {
    display: none;
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
    width: 30px;
    height: 30px;
  }

  .nav {
    padding: 70px 20px 35px;
  }

  .pages {
    max-width: 260px;
    gap: 20px;
  }

  .nav-link {
    font-size: 16px;
    padding: 12px 20px;
    min-height: 45px;
  }

  .btns {
    max-width: 260px;
    gap: 16px;
  }

  .btn {
    padding: 12px 20px;
    font-size: 14px;
    min-height: 45px;
  }

  .btn svg {
    width: 16px;
    height: 16px;
  }
}

/* تحسينات الأداء والوصولية */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* تحسينات الوصولية */
.icon:focus,
.btn:focus,
.nav-link:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.icon:focus-visible,
.btn:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid #5870f6;
  outline-offset: 2px;
}

/* تحسينات للشاشات عالية الدقة */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon,
  .nav-link {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
  
  .btn:hover,
  .icon:hover,
  .nav-link:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
  }
}

/* إصلاحات خاصة للأجهزة التي تدعم اللمس */
@media (hover: none) and (pointer: coarse) {
  .icon:hover,
  .btn:hover,
  .nav-link:hover {
    transform: none;
  }
  
  .icon:active,
  .btn:active,
  .nav-link:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

/* تحسينات لتجربة المستخدم */
.icon,
.btn,
.nav-link {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* منع التمرير أثناء فتح القائمة */
:global(body.menu-open) {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}

/* تحسين الخطوط للشاشات الصغيرة */
@media (max-width: 320px) {
  .nav-link {
    font-size: 15px;
  }
  
  .btn {
    font-size: 13px;
  }
}

/* تحسينات للتباين في الوضع المظلم */
@media (prefers-color-scheme: dark) {
  .control-background.home {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  }
  
  .icon,
  .nav-link,
  .btn {
    border-color: rgba(255, 255, 255, 0.3);
  }
}

/* تحسينات للطباعة */
@media print {
  .control-background.home {
    background: #fff !important;
    color: #000 !important;
    box-shadow: none !important;
  }
  
  .nav,
  .btns {
    display: none !important;
  }
}
