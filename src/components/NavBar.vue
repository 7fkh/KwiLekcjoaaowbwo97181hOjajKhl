<template>
  <div class="control-background home">
    <div class="header">
      <div class="left-icons">
        <!-- عرض معلومات المستخدم -->
        <div v-if="user" class="user-profile" @click="toggleUserMenu">
          <img :src="user.avatar" :alt="user.username" class="user-avatar" loading="lazy" />
          <div class="user-info">
            <span class="username">{{ user.username }}</span>
            <span class="user-status">متصل</span>
          </div>
          <div class="dropdown-arrow" :class="{ rotated: userMenuOpen }">▼</div>
        </div>

        <!-- قائمة المستخدم المنسدلة -->
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

        <!-- زر تسجيل الدخول -->
        <a
          v-else
          :href="discordLoginUrl"
          title="تسجيل الدخول عبر Discord"
          class="login-btn"
        >
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
      this.closeUserMenu();
    },
    userSettings() {
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
  padding: 0 20px;
  height: auto;
  min-height: 120px;
  overflow: visible;
  border-bottom: 2px solid rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
  .control-background.home {
    min-height: 110px;
    padding: 0 15px;
  }
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-bottom: 2px solid rgba(255,255,255,0.1);
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}
</style>