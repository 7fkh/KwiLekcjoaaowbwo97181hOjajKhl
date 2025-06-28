<template>
  <div class="control-background home">
    <div class="header">
      <div class="left-icons">
        <div v-if="user" class="user-profile" @click="toggleUserMenu">
          <img :src="user.avatar" :alt="user.username" class="user-avatar" loading="lazy" />
          <div class="user-info">
            <span class="username">{{ user.username }}</span>
            <span class="user-status">متصل</span>
          </div>
          <div class="dropdown-arrow" :class="{ rotated: userMenuOpen }">▼</div>
        </div>

```
    <div v-if="user && userMenuOpen" class="user-dropdown">
      <div class="user-dropdown-header">
        <img :src="user.avatar" class="dropdown-avatar" />
        <div class="dropdown-user-info">
          <div class="dropdown-username">{{ user.username }}</div>
          <div class="dropdown-discriminator">#{{ user.discriminator }}</div>
        </div>
      </div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item" @click="viewProfile">👤 الملف الشخصي</div>
      <div class="user-dropdown-item" @click="userSettings">⚙️ الإعدادات</div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item logout" @click="logout">🚪 تسجيل الخروج</div>
    </div>

    <a v-else :href="discordLoginUrl" class="login-btn" title="تسجيل الدخول عبر Discord">
      <div class="discord-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#5865F2" />
        </svg>
      </div>
      <span>تسجيل الدخول</span>
    </a>

    <div class="icon search-icon" @click="handleSearch" title="البحث"></div>
  </div>

  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" loading="lazy" />
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
    <router-link to="/order" @click="closeMenu" class="nav-link">اطلب الآن</router-link>
  </div>
  <div class="btns">
    <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank">💬 سيرفر الديسكورد</a>
    <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank">🔗 حسابات المتجر</a>
  </div>
</div>

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
      user: null,
      discordLoginUrl:
        'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify',
      logo: null,
    };
  },
  mounted() {
    this.logo = require('@/assets/IMG_1254.png');
    this.checkUserAuth();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      this.fetchDiscordUser(code);
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
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
      console.log('عرض الملف الشخصي');
      this.closeUserMenu();
    },
    userSettings() {
      console.log('الإعدادات');
      this.closeUserMenu();
    },
    logout() {
      localStorage.removeItem('discordUser');
      this.user = null;
      this.closeUserMenu();
    },
    checkUserAuth() {
      const userData = localStorage.getItem('discordUser');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (e) {
          console.warn('خطأ في قراءة بيانات المستخدم', e);
          localStorage.removeItem('discordUser');
        }
      }
    },
    async fetchDiscordUser(code) {
      try {
        const response = await fetch(`/api/auth/discord/user?code=${code}`);
        if (!response.ok) throw new Error('فشل في جلب بيانات المستخدم');

        const userData = await response.json();
        localStorage.setItem('discordUser', JSON.stringify(userData));
        this.user = userData;
      } catch (err) {
        console.error('خطأ أثناء جلب بيانات المستخدم:', err);
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.control-background.home {
  background: linear-gradient(45deg, #5870f6, #5c6074, #5870f6, #5c6074);
  background-size: 400% 400%;
  animation: gradientMove 4s ease-in-out infinite;
  position: relative;
  height: 110px;
  max-height: 140px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .control-background.home {
    height: 130px;
  }
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: relative;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

/* User Profile Styles */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.2);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.user-status {
  color: #4CAF50;
  font-size: 12px;
}

.dropdown-arrow {
  color: white;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: 100%;
  left: 20px;
  background: #2f3136;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  z-index: 1000;
  min-width: 220px;
  overflow: hidden;
  margin-top: 8px;
}

.user-dropdown-header {
  padding: 16px;
  background: #36393f;
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.dropdown-username {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.dropdown-discriminator {
  color: #b9bbbe;
  font-size: 14px;
}

.user-dropdown-divider {
  height: 1px;
  background: #40444b;
  margin: 0;
}

.user-dropdown-item {
  padding: 12px 16px;
  color: #dcddde;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
}

.user-dropdown-item:hover {
  background: #40444b;
}

.user-dropdown-item.logout {
  color: #ed4245;
}

.user-dropdown-item.logout:hover {
  background: rgba(237, 66, 69, 0.1);
}

/* Login Button */
.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #5865F2;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #4752C4;
  transform: translateY(-1px);
}

.discord-icon svg {
  width: 18px;
  height: 18px;
}

/* Navigation Styles */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px 15px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 999;
    justify-content: center;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
  }

  .nav.nav-mobile-open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
}

.pages {
  display: flex;
  gap: 20px;
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
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 20px;
    padding: 12px 24px;
  }
}

/* Buttons Container */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .btns {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 300px;
  }
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    padding: 15px 30px;
    font-size: 16px;
    border-radius: 30px;
  }
}

/* Primary Button */
.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
  border: 2px solid transparent;
}

.primary-btn:hover {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 8px 25px rgba(88, 112, 246, 0.4);
}

/* Secondary Button */
.secondary-btn {
  background: linear-gradient(135deg, #444, #333);
  border: 2px solid #555;
}

.secondary-btn:hover {
  background: linear-gradient(135deg, #555, #444);
  border-color: #666;
  box-shadow: 0 8px 25px rgba(68, 68, 68, 0.4);
}

/* Dropdown Overlay */
.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: transparent;
}

/* Hide menu icon on desktop */
@media (min-width: 769px) {
  .menu-icon {
    display: none;
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .header {
    padding: 10px 15px;
  }
  
  .logo-text {
    display: none;
  }
  
  .user-info {
    display: none;
  }
  
  .left-icons {
    gap: 10px;
  }
}
</style>