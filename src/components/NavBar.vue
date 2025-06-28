<template>
  <div class="modern-header">
    <!-- شريط علوي للإشعارات -->
    <div v-if="notification" class="notification-bar" :class="notification.type">
      <div class="notification-content">
        <span class="notification-icon">{{ notification.icon }}</span>
        <span class="notification-text">{{ notification.message }}</span>
        <button @click="dismissNotification" class="notification-close">×</button>
      </div>
    </div>

```
<div class="header-container">
  <div class="header-content">
    <!-- قسم المستخدم والبحث -->
    <div class="left-section">
      <!-- عرض المستخدم المتقدم -->
      <div v-if="user" class="user-profile-advanced" @click="toggleUserMenu">
        <div class="user-avatar-container">
          <img :src="user.avatar" :alt="user.username" class="user-avatar-modern" />
          <div class="status-indicator" :class="user.status"></div>
          <div class="user-badge" v-if="user.isPremium">👑</div>
        </div>
        <div class="user-info-modern" v-if="!isMobile">
          <div class="username-container">
            <span class="username-modern">{{ user.displayName || user.username }}</span>
            <span class="user-tag">#{{ user.discriminator }}</span>
          </div>
          <div class="user-status-text">{{ getUserStatusText() }}</div>
        </div>
        <div class="dropdown-arrow-modern" :class="{ 'rotated': userMenuOpen }">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 4.5L6 7.5L9 4.5"/>
          </svg>
        </div>
      </div>

      <!-- زر تسجيل الدخول المتطور -->
      <div v-else class="login-section">
        <a :href="discordLoginUrl" class="modern-login-btn" :class="{ 'loading': isLoggingIn }">
          <div class="login-btn-content">
            <div class="discord-logo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <span class="login-text">{{ isLoggingIn ? 'جاري الاتصال...' : 'دخول عبر Discord' }}</span>
            <div class="login-arrow">→</div>
          </div>
          <div class="loading-shimmer" v-if="isLoggingIn"></div>
        </a>
      </div>

      <!-- شريط البحث المتقدم -->
      <div class="search-container" :class="{ 'search-active': searchActive }">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input 
            v-model="searchQuery"
            @focus="searchActive = true"
            @blur="handleSearchBlur"
            @keyup.enter="performSearch"
            type="text" 
            placeholder="البحث في المتجر..."
            class="search-input"
          />
          <button v-if="searchQuery" @click="clearSearch" class="clear-search">×</button>
        </div>
        <div v-if="searchActive && searchSuggestions.length" class="search-suggestions">
          <div v-for="suggestion in searchSuggestions" :key="suggestion.id" 
               @click="selectSuggestion(suggestion)" class="search-suggestion">
            <span class="suggestion-icon">{{ suggestion.icon }}</span>
            <span class="suggestion-text">{{ suggestion.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- اللوجو المتطور -->
    <div class="logo-modern">
      <div class="logo-container">
        <img :src="logo" alt="KhLi Store Logo" class="logo-image" />
        <div class="logo-shine"></div>
      </div>
      <div class="logo-text-container">
        <span class="logo-text-main">خلي ستور</span>
        <span class="logo-subtitle">متجرك المميز</span>
      </div>
    </div>

    <!-- القسم الأيمن -->
    <div class="right-section">
      <!-- إشعارات -->
      <div class="notifications-container" v-if="user">
        <button class="icon-btn notifications-btn" @click="toggleNotifications" :class="{ 'has-notifications': unreadNotifications > 0 }">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zM10 18a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z"/>
          </svg>
          <span v-if="unreadNotifications > 0" class="notification-badge">{{ unreadNotifications }}</span>
        </button>
      </div>

      <!-- زر القائمة -->
      <button class="icon-btn menu-btn" @click="toggleMenu" :class="{ 'menu-open': mobileMenuOpen }">
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  </div>

  <!-- شريط التنقل المتقدم -->
  <nav class="nav-modern" :class="{ 'nav-mobile-open': mobileMenuOpen }">
    <div class="nav-content">
      <div class="nav-links">
        <router-link to="/" @click="closeMenu" class="nav-link-modern">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">الرئيسية</span>
        </router-link>
        <a href="#products" @click="closeMenu" class="nav-link-modern">
          <span class="nav-icon">🛍️</span>
          <span class="nav-text">المنتجات</span>
        </a>
        <router-link to="/order" @click="closeMenu" class="nav-link-modern">
          <span class="nav-icon">📋</span>
          <span class="nav-text">اطلب الآن</span>
        </router-link>
      </div>

      <div class="nav-actions">
        <a class="action-btn primary" href="https://discord.gg/khli" target="_blank" rel="noopener">
          <span class="btn-glow"></span>
          <span class="btn-content">
            <span class="btn-icon">💬</span>
            <span class="btn-text">Discord</span>
          </span>
        </a>
        <a class="action-btn secondary" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">
          <span class="btn-content">
            <span class="btn-icon">🔗</span>
            <span class="btn-text">الروابط</span>
          </span>
        </a>
      </div>
    </div>
  </nav>
</div>

<!-- القائمة المنسدلة للمستخدم المتطورة -->
<transition name="dropdown">
  <div v-if="user && userMenuOpen" class="user-dropdown-modern">
    <div class="dropdown-header">
      <div class="user-avatar-large">
        <img :src="user.avatar" :alt="user.username" />
        <div class="status-ring" :class="user.status"></div>
      </div>
      <div class="user-details">
        <h3 class="user-display-name">{{ user.displayName || user.username }}</h3>
        <p class="user-tag-full">{{ user.username }}#{{ user.discriminator }}</p>
        <div class="user-badges">
          <span v-if="user.isPremium" class="badge premium">Premium</span>
          <span v-if="user.isVerified" class="badge verified">✓</span>
        </div>
      </div>
    </div>

    <div class="dropdown-section">
      <h4 class="section-title">الحساب</h4>
      <button @click="viewProfile" class="dropdown-item">
        <span class="item-icon">👤</span>
        <span class="item-text">الملف الشخصي</span>
        <span class="item-arrow">→</span>
      </button>
      <button @click="userSettings" class="dropdown-item">
        <span class="item-icon">⚙️</span>
        <span class="item-text">الإعدادات</span>
        <span class="item-arrow">→</span>
      </button>
    </div>

    <div class="dropdown-section">
      <h4 class="section-title">المتجر</h4>
      <button @click="viewOrders" class="dropdown-item">
        <span class="item-icon">📦</span>
        <span class="item-text">طلباتي</span>
        <span class="item-badge">{{ user.orderCount || 0 }}</span>
      </button>
      <button @click="viewWishlist" class="dropdown-item">
        <span class="item-icon">❤️</span>
        <span class="item-text">المفضلة</span>
        <span class="item-badge">{{ user.wishlistCount || 0 }}</span>
      </button>
    </div>

    <div class="dropdown-footer">
      <button @click="logout" class="logout-btn">
        <span class="logout-icon">🚪</span>
        <span class="logout-text">تسجيل الخروج</span>
      </button>
    </div>
  </div>
</transition>

<!-- Overlays -->
<div v-if="userMenuOpen || mobileMenuOpen" class="overlay" @click="closeAllMenus"></div>
```

  </div>
</template>

<script>
export default {
  name: 'ModernHeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false,
      searchActive: false,
      searchQuery: '',
      isLoggingIn: false,
      unreadNotifications: 3,
      user: null,
      notification: null,
      searchSuggestions: [
        { id: 1, text: 'منتجات Discord', icon: '💬' },
        { id: 2, text: 'بوتات مخصصة', icon: '🤖' },
        { id: 3, text: 'خدمات التصميم', icon: '🎨' },
        { id: 4, text: 'استضافة البوتات', icon: '🖥️' }
      ],
      discordLoginUrl: 'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+guilds.join+guilds+gdm.join+email+connections',
      logo: null,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  mounted() {
    try {
      this.logo = require('@/assets/IMG_1254.png');
    } catch (error) {
      this.logo = '/assets/IMG_1254.png';
    }
    
    this.checkUserAuth();
    this.showWelcomeNotification();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
      if (this.userMenuOpen) {
        this.mobileMenuOpen = false;
      }
    },
    closeAllMenus() {
      this.userMenuOpen = false;
      this.mobileMenuOpen = false;
      this.searchActive = false;
      document.body.style.overflow = 'auto';
    },
    handleSearchBlur() {
      setTimeout(() => {
        this.searchActive = false;
      }, 200);
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        console.log('Searching for:', this.searchQuery);
        this.searchActive = false;
      }
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchActive = false;
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.text;
      this.performSearch();
    },
    toggleNotifications() {
      console.log('Toggle notifications');
    },
    viewProfile() {
      console.log('View profile');
      this.userMenuOpen = false;
    },
    userSettings() {
      console.log('User settings');
      this.userMenuOpen = false;
    },
    viewOrders() {
      console.log('View orders');
      this.userMenuOpen = false;
    },
    viewWishlist() {
      console.log('View wishlist');
      this.userMenuOpen = false;
    },
    logout() {
      this.user = null;
      this.userMenuOpen = false;
      this.showNotification('تم تسجيل الخروج بنجاح', 'success', '👋');
    },
    getUserStatusText() {
      const statusMap = {
        online: 'متصل الآن',
        idle: 'غير متاح',
        dnd: 'مشغول',
        offline: 'غير متصل'
      };
      return statusMap[this.user?.status] || 'متصل';
    },
    checkUserAuth() {
      // محاكاة تسجيل دخول
      setTimeout(() => {
        this.user = {
          id: '123456789',
          username: 'خلي_ستور',
          discriminator: '1234',
          displayName: 'خلي ستور',
          avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
          status: 'online',
          isPremium: true,
          isVerified: true,
          orderCount: 5,
          wishlistCount: 12
        };
      }, 1500);
    },
    showWelcomeNotification() {
      setTimeout(() => {
        this.showNotification('مرحباً بك في خلي ستور! 🎉', 'info', '🎊');
      }, 1000);
    },
    showNotification(message, type = 'info', icon = 'ℹ️') {
      this.notification = { message, type, icon };
      setTimeout(() => {
        this.dismissNotification();
      }, 5000);
    },
    dismissNotification() {
      this.notification = null;
    },
    handleResize() {
      if (!this.isMobile && this.mobileMenuOpen) {
        this.closeMenu();
      }
    }
  }
};
</script>

<style scoped>
/* Reset and base styles */
* {
  box-sizing: border-box;
}

/* الهيدر الحديث */
.modern-header {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.98) 50%,
    rgba(241, 245, 249, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  z-index: 1000;
  position: sticky;
  top: 0;
}

/* شريط الإشعارات */
.notification-bar {
  padding: 8px 0;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideDown 0.5s ease-out;
}

.notification-bar.info {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  color: white;
}

.notification-bar.success {
  background: linear-gradient(90deg, #10b981, #047857);
  color: white;
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 8px;
  opacity: 0.8;
}

.notification-close:hover {
  opacity: 1;
}

/* حاوي الهيدر */
.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  gap: 24px;
}

/* الأقسام */
.left-section, .right-section {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.right-section {
  justify-content: flex-end;
}

/* ملف المستخدم المتقدم */
.user-profile-advanced {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 8px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%,
    rgba(139, 92, 246, 0.08) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.user-profile-advanced:hover {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%,
    rgba(139, 92, 246, 0.12) 100%);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-1px) scale(1.02);
}

.user-avatar-container {
  position: relative;
}

.user-avatar-modern {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.status-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.status-indicator.online { background: #10b981; }
.status-indicator.idle { background: #f59e0b; }
.status-indicator.dnd { background: #ef4444; }
.status-indicator.offline { background: #6b7280; }

.user-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 0.75rem;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
}

.user-info-modern {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.username-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.username-modern {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
  truncate: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.user-tag {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
}

.user-status-text {
  font-size: 0.75rem;
  color: #10b981;
  font-weight: 500;
}

.dropdown-arrow-modern {
  color: #6b7280;
  transition: transform 0.3s ease;
}

.dropdown-arrow-modern.rotated {
  transform: rotate(180deg);
}

/* زر تسجيل الدخول المتطور */
.modern-login-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  background: linear-gradient(135deg, #5865f2 0%, #7289da 100%);
  color: white;
  text-decoration: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 4px 15px rgba(88, 101, 242, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.modern-login-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 8px 25px rgba(88, 101, 242, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #4752c4 0%, #6772d1 100%);
}

.login-btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  position: relative;
  z-index: 2;
}

.discord-logo {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
}

.login-arrow {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.modern-login-btn:hover .login-arrow {
  transform: translateX(2px);
}

.loading-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%);
  animation: shimmer 2s infinite;
}

/* البحث المتقدم */
.search-container {
  position: relative;
  max-width: 320px;
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 0 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.search-container.search-active .search-input-wrapper {
  background: white;
  border-color: #3b82f6;
  box-shadow: 
    0 0 0 3px rgba(59, 130, 246, 0.1),
    0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-icon {
  color: #6b7280;
  margin-right: 8px;
  transition: color 0.3s ease;
}

.search-container.search-active .search-icon {
  color: #3b82f6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 0;
  background: transparent;
  font-size: 0.9rem;
  color: #1f2937;
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-search {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.3s ease;
}

.clear-search:hover {
  color: #ef4444;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  margin-top: 4px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

.search-suggestion {
  display: flex;
  align-items: center;
  gap: 12px