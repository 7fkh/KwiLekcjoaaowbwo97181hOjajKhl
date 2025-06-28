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
          <div class="dropdown-arrow" :class="{ rotated: userMenuOpen }">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>

```
    <div v-if="user && userMenuOpen" class="user-dropdown">
      <div class="user-dropdown-header">
        <img :src="user.avatar" class="dropdown-avatar" :alt="user.username" />
        <div class="dropdown-user-info">
          <div class="dropdown-username">{{ user.username }}</div>
          <div class="dropdown-discriminator" v-if="user.discriminator">#{{ user.discriminator }}</div>
        </div>
      </div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item" @click="viewProfile">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        الملف الشخصي
      </div>
      <div class="user-dropdown-item" @click="userSettings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        الإعدادات
      </div>
      <div class="user-dropdown-divider"></div>
      <div class="user-dropdown-item logout" @click="logout">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        تسجيل الخروج
      </div>
    </div>

    <a v-else :href="discordLoginUrl" class="login-btn" title="تسجيل الدخول عبر Discord">
      <div class="discord-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </div>
      <span>تسجيل الدخول</span>
    </a>

    <div class="icon search-icon" @click="handleSearch" title="البحث">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </div>
  </div>

  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" loading="lazy" />
    <span class="logo-text">خلي ستور</span>
  </div>

  <div class="right-icons">
    <div class="icon menu-icon" @click="toggleMenu" title="القائمة">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </div>
    <div class="icon arrow-icon" @click="goBack" title="العودة">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>
  </div>
</div>

<div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }">
  <div class="nav-overlay" @click="closeMenu"></div>
  <div class="nav-content">
    <div class="nav-header">
      <img :src="logo" alt="Logo" class="nav-logo" />
      <span class="nav-title">خلي ستور</span>
      <div class="close-btn" @click="closeMenu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </div>
    </div>
    
    <div class="pages">
      <router-link to="/" @click="closeMenu" class="nav-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        الرئيسية
      </router-link>
      <a href="#products" @click="closeMenu" class="nav-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        المنتجات
      </a>
      <router-link to="/order" @click="closeMenu" class="nav-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
        اطلب الآن
      </router-link>
    </div>
    
    <div class="btns">
      <a class="btn primary-btn" href="https://discord.gg/khli" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        سيرفر الديسكورد
      </a>
      <a class="btn secondary-btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H6.9C4.01 7 1.9 9.11 1.9 12s2.11 5 5 5h4v-1.9H6.9c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9.1-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.89 0 5-2.11 5-5s-2.11-5-5-5z"/>
        </svg>
        حسابات المتجر
      </a>
    </div>
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
      discordLoginUrl: 'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify',
      logo: null,
    };
  },
  mounted() {
    try {
      this.logo = require('@/assets/IMG_1254.png');
    } catch (error) {
      console.warn('Logo not found, using placeholder');
      this.logo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM1ODcwZjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
    }
    
    this.checkUserAuth();
    this.handleDiscordCallback();
    this.addEventListeners();
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.updateBodyScroll();
    },
    
    closeMenu() {
      this.mobileMenuOpen = false;
      this.updateBodyScroll();
    },
    
    updateBodyScroll() {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
      }
    },
    
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
    },
    
    closeUserMenu() {
      this.userMenuOpen = false;
    },
    
    handleSearch() {
      // يمكن تطبيق منطق البحث هنا
      this.$emit('search');
      console.log('Search functionality triggered');
    },
    
    goBack() {
      if (this.$router && this.$router.go) {
        this.$router.go(-1);
      } else {
        window.history.back();
      }
    },
    
    viewProfile() {
      this.$emit('view-profile', this.user);
      this.closeUserMenu();
    },
    
    userSettings() {
      this.$emit('user-settings', this.user);
      this.closeUserMenu();
    },
    
    logout() {
      this.user = null;
      this.closeUserMenu();
      this.$emit('logout');
      
      // محاولة إزالة البيانات من التخزين المحلي
      try {
        localStorage.removeItem('discordUser');
      } catch (error) {
        console.warn('Failed to remove user data from localStorage');
      }
    },
    
    checkUserAuth() {
      try {
        const userData = localStorage.getItem('discordUser');
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (this.isValidUserData(parsedData)) {
            this.user = parsedData;
          } else {
            localStorage.removeItem('discordUser');
          }
        }
      } catch (error) {
        console.warn('Error reading user data from localStorage:', error);
        try {
          localStorage.removeItem('discordUser');
        } catch (e) {
          console.warn('Failed to clear invalid user data');
        }
      }
    },
    
    isValidUserData(userData) {
      return userData && 
             typeof userData === 'object' && 
             userData.username && 
             userData.avatar;
    },
    
    handleDiscordCallback() {
      if (typeof window === 'undefined') return;
      
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        this.fetchDiscordUser(code);
        
        // تنظيف الرابط من المعاملات
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    },
    
    async fetchDiscordUser(code) {
      try {
        const response = await fetch(`/api/auth/discord/user?code=${encodeURIComponent(code)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const userData = await response.json();
        
        if (this.isValidUserData(userData)) {
          localStorage.setItem('discordUser', JSON.stringify(userData));
          this.user = userData;
          this.$emit('user-login', userData);
        } else {
          throw new Error('Invalid user data received');
        }
      } catch (error) {
        console.error('Error fetching Discord user data:', error);
        this.$emit('auth-error', error.message);
      }
    },
    
    addEventListeners() {
      if (typeof window === 'undefined') return;
      
      // إضافة مستمع للإيسكيب لإغلاق القوائم
      document.addEventListener('keydown', this.handleKeydown);
      
      // إضافة مستمع لتغيير حجم الشاشة
      window.addEventListener('resize', this.handleResize);
    },
    
    handleKeydown(event) {
      if (event.key === 'Escape') {
        if (this.userMenuOpen) {
          this.closeUserMenu();
        }
        if (this.mobileMenuOpen) {
          this.closeMenu();
        }
      }
    },
    
    handleResize() {
      // إغلاق القائمة المحمولة عند تكبير الشاشة
      if (window.innerWidth > 768 && this.mobileMenuOpen) {
        this.closeMenu();
      }
    },
  },
  
  beforeUnmount() {
    // تنظيف المستمعين والبيانات
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', this.handleKeydown);
    }
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  },
};
</script>

<style scoped>
/* CSS Variables للألوان والقيم */
:root {
  --primary-color: #5870f6;
  --primary-dark: #4c63d2;
  --secondary-color: #5c6074;
  --success-color: #4CAF50;
  --danger-color: #ed4245;
  --background-dark: #2f3136;
  --background-darker: #36393f;
  --text-light: #dcddde;
  --text-muted: #b9bbbe;
  --border-color: #40444b;
  --white: #ffffff;
  --black: #000000;
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.4s ease;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 20px;
  --border-radius-xl: 25px;
  --border-radius-full: 50%;
}

/* Animations */
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

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Base Styles */
* {
  box-sizing: border-box;
}

.control-background.home {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--primary-color), var(--secondary-color));
  background-size: 400% 400%;
  animation: gradientMove 6s ease-in-out infinite;
  position: relative;
  min-height: 110px;
  overflow: visible;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  box-shadow: 0 4px 20px var(--shadow-medium);
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
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
  gap: 15px;
}

.left-icons, .right-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform var(--transition-normal);
}

.logo img:hover {
  transform: scale(1.1);
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: var(--white);
  text-shadow: 0 2px 4px var(--shadow-medium);
}

/* Icon Styles */
.icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-medium);
}

.icon:active {
  transform: translateY(0);
}

/* User Profile Styles */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 250px;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-full);
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  flex: 1;
}

.username {
  color: var(--white);
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.user-status {
  color