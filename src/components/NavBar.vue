<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <!-- عرض معلومات المستخدم إذا كان مسجل الدخول -->
        <div v-if="user" class="user-profile" @click="toggleUserMenu">
          <img :src="user.avatar" :alt="user.username" class="user-avatar" />
          <div class="user-info">
            <span class="username">{{ user.username }}</span>
            <span class="user-status">متصل</span>
          </div>
          <div class="dropdown-arrow" :class="{ 'rotated': userMenuOpen }">▼</div>
        </div>

```
    <!-- قائمة المستخدم المنسدلة -->
    <div v-if="user && userMenuOpen" class="user-dropdown">
      <div class="user-dropdown-header">
        <img :src="user.avatar" :alt="user.username" class="dropdown-avatar" />
        <div class="dropdown-user-info">
          <div class="dropdown-username">{{ user.username }}</div>
          <div class="dropdown-discriminator">#{{ user.discriminator }}</div>
        </div>
      </div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item" @click="viewProfile">
        <span class="dropdown-icon">👤</span>
        الملف الشخصي
      </div>
      <div class="user-dropdown-item" @click="userSettings">
        <span class="dropdown-icon">⚙️</span>
        الإعدادات
      </div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item logout" @click="logout">
        <span class="dropdown-icon">🚪</span>
        تسجيل الخروج
      </div>
    </div>

    <!-- زر تسجيل الدخول إذا لم يكن مسجل -->
    <a
      v-else
      :href="discordLoginUrl"
      title="تسجيل الدخول عبر Discord"
      target="_blank"
      rel="noopener"
      class="login-btn"
    >
      <div class="discord-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </div>
      <span>تسجيل الدخول</span>
    </a>

    <div class="icon search-icon" @click="handleSearch" title="البحث"></div>
  </div>

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
    <a
      class="btn primary-btn"
      href="https://discord.gg/khli"
      target="_blank"
      rel="noopener"
    >
      <span class="btn-icon">💬</span>
      سيرفر الديسكورد
    </a>
    <a
      class="btn secondary-btn"
      href="https://linktr.ee/KhLiStoRe"
      target="_blank"
      rel="noopener"
    >
      <span class="btn-icon">🔗</span>
      حسابات المتجر
    </a>
  </div>
</div>

<!-- Overlay للقائمة المنسدلة -->
<div v-if="userMenuOpen" class="dropdown-overlay" @click="closeUserMenu"></div>
```

  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false,
      user: null, // سيتم تعبئته بعد تسجيل الدخول
      discordLoginUrl:
        'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+guilds.join+guilds+gdm.join+email+connections',
      logo: null,
    };
  },
  mounted() {
    try {
      this.logo = require('@/assets/IMG_1254.png');
    } catch (error) {
      this.logo = '/assets/IMG_1254.png';
      console.warn('Fallback logo used.');
    }
    
    // محاكاة تسجيل دخول المستخدم (يجب استبدالها بالبيانات الحقيقية)
    this.checkUserAuth();
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
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
    },
    closeUserMenu() {
      this.userMenuOpen = false;
    },
    handleSearch() {
      console.log('Search clicked');
    },
    viewProfile() {
      console.log('View profile');
      this.closeUserMenu();
    },
    userSettings() {
      console.log('User settings');
      this.closeUserMenu();
    },
    logout() {
      this.user = null;
      this.closeUserMenu();
      // إضافة منطق تسجيل الخروج هنا
      console.log('User logged out');
    },
    // فحص حالة المصادقة (يجب استبدالها بالتنفيذ الحقيقي)
    checkUserAuth() {
      // محاكاة بيانات المستخدم - يجب استبدالها بـ API call حقيقي
      const userData = localStorage.getItem('discordUser');
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        // محاكاة مستخدم للعرض التوضيحي
        setTimeout(() => {
          this.user = {
            id: '123456789',
            username: 'خلي ستور',
            discriminator: '1234',
            avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
            email: 'user@example.com'
          };
        }, 2000);
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
};
</script>

<style scoped>
/* إزالة الخلفية المتدرجة واستخدام خلفية شفافة/بسيطة */
.control-background {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

/* الهيدر */
.header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* معلومات المستخدم */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(88, 101, 242, 0.1);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-profile:hover {
  background: rgba(88, 101, 242, 0.15);
  border-color: rgba(88, 101, 242, 0.3);
  transform: translateY(-1px);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #5865f2;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.user-status {
  font-size: 0.75rem;
  color: #00d26a;
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 0.7rem;
  color: #666;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* القائمة المنسدلة للمستخدم */
.user-dropdown {
  position: absolute;
  top: 70px;
  left: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1001;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #5865f2, #7289da);
  color: white;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.dropdown-user-info {
  flex: 1;
}

.dropdown-username {
  font-weight: 600;
  font-size: 1rem;
}

.dropdown-discriminator {
  font-size: 0.8rem;
  opacity: 0.9;
}

.user-dropdown-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0;
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.9rem;
  color: #333;
}

.user-dropdown-item:hover {
  background: rgba(88, 101, 242, 0.1);
}

.user-dropdown-item.logout {
  color: #ed4245;
}

.user-dropdown-item.logout:hover {
  background: rgba(237, 66, 69, 0.1);
}

.dropdown-icon {
  font-size: 1rem;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

/* زر تسجيل الدخول */
.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #5865f2, #7289da);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.discord-icon {
  display: flex;
  align-items: center;
}

/* الأيقونات */
.icon {
  width: 24px;
  height: 24px;
  margin: 0 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  color: #666;
}

.icon:hover { 
  transform: scale(1.1);
  color: #5865f2;
}

.icon:active { transform: scale(0.95); }

/* أيقونة البحث */
.search-icon {
  position: relative;
  background: rgba(88, 101, 242, 0.1);
  border-radius: 50%;
  color: #5865f2;
}

.search-icon::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.search-icon::after {
  content: '';
  position: absolute;
  top: 13px;
  left: 13px;
  width: 6px;
  height: 2px;
  background: currentColor;
  transform: rotate(45deg);
  border-radius: 1px;
}

/* أيقونة القائمة */
.menu-icon {
  display: none;
  position: relative;
  background: rgba(245, 182, 74, 0.1);
  border-radius: 50%;
  color: #f5b64a;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  left: 2px;
  width: 20px;
  height: 3px;
  background: currentColor;
  border-radius: 2px;
}

.menu-icon::before {
  top: 5px;
  box-shadow: 0 7px 0 currentColor;
}

.menu-icon::after { top: 16px; }

/* أيقونة السهم */
.arrow-icon {
  position: relative;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  color: #667eea;
}

.arrow-icon::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 4px;
  width: 12px;
  height: 2px;
  background: currentColor;
}

.arrow-icon::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: rotate(-135deg);
}

/* اللوجو */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  height: 40px;
  border-radius: 8px;
  transition: 0.3s;
}

.logo img:hover { transform: scale(1.05); }

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  display: none;
}

/* التنقل */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0 20px 20px;
  color: #333;
}

.pages {
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 8px 16px;
  background: rgba(88, 101, 242, 0.1);
  border-radius: 25px;
  transition: 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(88, 101, 242, 0.2);
  transform: translateY(-2px);
  color: #5865f2;
}

.router-link-active {
  background: #5865f2;
  color: white;
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.4);
}

/* الأزرار */
.btns {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
}

.primary-btn {
  background: linear-gradient(45deg, #5865f2, #7289da);
  color: white;
}

.secondary-btn {
  background: #333;
  color: white;
}

.primary-btn:hover, .secondary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* الاستجابة للموبايل */
@media screen and (max-width: 768px) {
  .menu-icon { display: flex; }
  .logo-text { display: block; }
  
  .user-dropdown {
    left: 10px;
    right: 10px;
    width: auto;
  }
  
  .nav {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: 0.4s;
    visibility: hidden;
    opacity: 0;
  }
  
  .nav-mobile-open {
    transform: translateX(0);
    visibility: visible;
    opacity: 1;
  }
  
  .pages, .btns {
    flex-direction: column;
    gap: 20px;
  }
}

/* تحسينات إضافية */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>