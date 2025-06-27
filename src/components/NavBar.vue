<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <a :href="discordLoginUrl" title="تسجيل الدخول عبر Discord" target="_blank" rel="noopener" class="icon-link">
          <div class="icon user-icon"></div>
        </a>
        <div class="icon search-icon" @click="handleSearch" title="البحث"></div>
      </div>

```
  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" />
    <span class="logo-text">خلي ستور</span>
  </div>

  <div class="right-icons">
    <div class="icon menu-icon" @click="toggleMenu" title="القائمة"></div>
    <div class="icon arrow-icon" title="العودة"></div>
  </div>
</div>

<div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }">
  <div class="pages">
    <router-link to="/" @click="closeMenu" class="nav-link">الرئيسية</router-link>
    <a href="#products" @click="closeMenu" class="nav-link">المنتجات</a>
    <router-link to="/order" @click="closeMenu" class="nav-link">اطلب الان</router-link>
  </div>
  <div class="btns">
    <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank" rel="noopener">
      <span class="btn-icon">💬</span>
      سيرفر الديسكورد
    </a>
    <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">
      <span class="btn-icon">🔗</span>
      حسابات المتجر
    </a>
  </div>
</div>

<!-- شريط معلومات إضافي للهاتف -->
<div class="mobile-info-bar">
  <div class="info-item">
    <span class="info-icon">🛡️</span>
    <span class="info-text">حماية شاملة</span>
  </div>
  <div class="info-item">
    <span class="info-icon">⚡</span>
    <span class="info-text">سرعة عالية</span>
  </div>
  <div class="info-item">
    <span class="info-icon">💼</span>
    <span class="info-text">خدمة محترفة</span>
  </div>
</div>
```

  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      discordLoginUrl: 'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds.join',
      logo: null
    };
  },
  mounted() {
    try {
      this.logo = require('@/assets/IMG_1254.png');
    } catch (error) {
      this.logo = '/assets/IMG_1254.png';
      console.warn('Could not load logo with require, using direct path');
    }
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      // منع التمرير عند فتح القائمة
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
    },
    closeMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = 'auto';
    },
    handleSearch() {
      console.log('Search clicked');
      // يمكن إضافة منطق البحث هنا
    }
  },
  beforeUnmount() {
    // تنظيف عند إلغاء التحميل
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
/* أيقونات CSS محسنة */
.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon:hover {
  transform: scale(1.1);
}

.icon:active {
  transform: scale(0.95);
}

/* أيقونة المستخدم محسنة */
.user-icon {
  background: white;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-icon::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #5870f6;
  border-radius: 50%;
}

.user-icon::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 7px;
  background: #5870f6;
  border-radius: 0 0 12px 12px;
}

/* أيقونة البحث محسنة */
.search-icon {
  position: relative;
}

.search-icon::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
}

.search-icon::after {
  content: '';
  position: absolute;
  top: 13px;
  left: 13px;
  width: 6px;
  height: 2px;
  background: white;
  transform: rotate(45deg);
  border-radius: 1px;
}

/* أيقونة القائمة محسنة */
.menu-icon {
  position: relative;
  background: transparent;
  display: none;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  left: 2px;
  width: 20px;
  height: 3px;
  background: #f5b64a;
  transition: 0.3s;
  border-radius: 2px;
}

.menu-icon::before {
  top: 5px;
  box-shadow: 0 7px 0 #f5b64a;
}

.menu-icon::after {
  top: 16px;
}

/* أيقونة السهم محسنة */
.arrow-icon {
  position: relative;
}

.arrow-icon::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 4px;
  width: 12px;
  height: 2px;
  background: white;
  border-radius: 1px;
}

.arrow-icon::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(-135deg);
}

/* خلفية متدرجة محسنة */
.control-background {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 400% 400%;
  animation: gradientMove 6s ease-in-out infinite;
  position: relative;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.control-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.control-background > * {
  position: relative;
  z-index: 2;
}

@keyframes gradientMove {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* هيدر محسن */
.header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  min-height: 60px;
}

.left-icons,
.right-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.icon-link:hover {
  color: #5865f2;
}

/* شعار محسن */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.logo img:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  display: none;
}

/* تنقل محسن */
.nav {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 5%;
  color: white;
  padding: 0 20px 20px;
  transition: all 0.3s ease;
}

.nav .pages {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

.nav-link:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.nav-link.router-link-active {
  background: #5865f2;
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.4);
}

/* أزرار محسنة */
.nav .btns {
  display: flex;
  gap: 12px;
}

.nav .btn {
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.btn-icon {
  font-size: 1.1rem;
}

.primary-btn {
  background: linear-gradient(45deg, #5865f2, #7289da);
  color: white;
  border: 2px solid rgba(255,255,255,0.2);
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(88, 101, 242, 0.4);
  background: linear-gradient(45deg, #4752c4, #5b6ecd);
}

.secondary-btn {
  background: rgba(255,255,255,0.9);
  color: #4758b0;
  border: 2px solid rgba(255,255,255,0.3);
}

.secondary-btn:hover {
  background: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255,255,255,0.3);
}

/* شريط معلومات للهاتف */
.mobile-info-bar {
  display: none;
  padding: 10px 20px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

/* موبايل محسن */
@media screen and (max-width: 768px) {
  .header {
    padding: 12px 15px;
    min-height: 50px;
  }
  
  .logo-text {
    display: block;
    font-size: 1rem;
  }
  
  .logo img {
    height: 32px;
  }
  
  .menu-icon {
    display: block !important;
  }
  
  .mobile-info-bar {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  
  .info-item:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
  
  .info-icon {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }
  
  .info-text {
    font-size: 0.8rem;
    color: white;
    font-weight: 600;
    text-align: center;
  }
  
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    padding: 40px 20px;
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav .pages {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  
  .nav-link {
    display: block;
    text-align: center;
    padding: 15px 20px;
    width: 100%;
    font-size: 1.2rem;
    background: rgba(255,255,255,0.15);
  }
  
  .nav .btns {
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }
  
  .nav .btn {
    text-align: center;
    width: 100%;
    justify-content: center;
    padding: 15px 20px;
    font-size: 1.1rem;
  }
  
  .icon {
    width: 22px;
    height: 22px;
    margin: 0 4px;
  }
}

/* تحسينات الأداء */
* {
  box-sizing: border-box;
}

.control-background {
  will-change: background-position;
}

.header,
.nav {
  will-change: transform, opacity;
}

/* تحسينات إمكانية الوصول */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* تحسين الألوان للوضع المظلم */
@media (prefers-color-scheme: dark) {
  .control-background {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  }
}
</style>