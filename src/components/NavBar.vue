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
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
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

/* الخلفية الرئيسية */
.control-background.home {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  position: relative;
  min-height: 120px;
  overflow: visible;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
  z-index: 1;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* الهيدر */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
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
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(255, 255, 255, 0.8);
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: translateY(-1px);
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
}

/* الأيقونات */
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
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.icon:active {
  transform: translateY(0) scale(0.95);
}

.icon svg {
  color: white;
  transition: all 0.3s ease;
}

.icon:hover svg {
  transform: scale(1.1);
}

/* ملف المستخدم */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 250px;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.user-profile:hover .user-avatar {
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.username {
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.user-status {
  color: #4CAF50;
  font-size: 12px;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.dropdown-arrow {
  color: white;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* قائمة المستخدم المنسدلة */
.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 20px;
  background: #2f3136;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  min-width: 240px;
  overflow: hidden;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-dropdown-header {
  padding: 20px;
  background: linear-gradient(135deg, #36393f, #2f3136);
  display: flex;
  align-items: center;
  gap: 15px;
}

.dropdown-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.dropdown-username {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.dropdown-discriminator {
  color: #b9bbbe;
  font-size: 14px;
  font-weight: 500;
}

.user-dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #40444b, transparent);
  margin: 0;
}

.user-dropdown-item {
  padding: 16px 20px;
  color: #dcddde;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-dropdown-item:hover {
  background: #40444b;
  color: white;
}

.user-dropdown-item.logout {
  color: #ed4245;
}

.user-dropdown-item.logout:hover {
  background: rgba(237, 66, 69, 0.1);
  color: #ff6b6b;
}

/* زر تسجيل الدخول */
.login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #5865F2, #4752C4);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-btn:hover {
  background: linear-gradient(135deg, #4752C4, #3c4aaa);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(88, 101, 242, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

.discord-icon svg {
  width: 20px;
  height: 20px;
}

/* التنقل */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

/* الطبقات التراكبية */
.dropdown-overlay,
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
  
  .user-info {
    display: none;
  }
  
  .left-icons, .right-icons {
    gap: 10px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .user-profile {
    padding: 6px 12px;
    max-width: 60px;
  }

  .user-dropdown {
    left: 10px;
    right: 10px;
    min-width: auto;
  }

  .logo img {
    width: 40px;
    height: 40px;
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
}

/* تحسينات إضافية للأداء */
.control-background.home,
.nav,
.user-dropdown,
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
.nav-link:focus,
.user-profile:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* تحسين الظلال للأجهزة عالية الدقة */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon,
  .user-dropdown {
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