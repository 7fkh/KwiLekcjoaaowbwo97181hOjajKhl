<template>
  <div class="control-background home" :class="{ 'menu-open': mobileMenuOpen }">
    <div class="header">
      <div class="left-icons">
        <button 
          class="icon search-icon" 
          @click="handleSearch" 
          :title="$t('search')"
          :aria-label="$t('search')"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>

      <button class="logo" @click="goHome" type="button" :aria-label="$t('home')">
        <img :src="logo" alt="خلي ستور" loading="lazy" width="40" height="40" />
        <span class="logo-text">خلي ستور</span>
      </button>

      <div class="right-icons">
        <button 
          class="icon menu-icon" 
          @click="toggleMenu" 
          :title="$t('menu')"
          :aria-label="mobileMenuOpen ? $t('closeMenu') : $t('openMenu')"
          :aria-expanded="mobileMenuOpen"
          :class="{ active: mobileMenuOpen }"
          type="button"
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        
        <button 
          v-show="!isHomePage" 
          class="icon arrow-icon" 
          @click="goBack" 
          :title="$t('back')"
          :aria-label="$t('back')"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
      </div>
    </div>

    <nav 
      class="nav" 
      :class="{ 'nav-mobile-open': mobileMenuOpen }"
      :aria-hidden="!mobileMenuOpen"
      role="navigation"
      :aria-label="$t('mainNavigation')"
    >
      <div class="nav-header" v-if="mobileMenuOpen">
        <div class="nav-logo">
          <img :src="logo" alt="خلي ستور" width="32" height="32" />
          <span>خلي ستور</span>
        </div>
        <button 
          class="nav-close" 
          @click="closeMenu"
          :aria-label="$t('closeMenu')"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="pages" role="list">
        <router-link 
          to="/" 
          @click="closeMenu" 
          class="nav-link" 
          exact-active-class="active"
          role="listitem"
        >
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>الرئيسية</span>
          </div>
        </router-link>
        
        <a 
          href="/products" 
          @click="closeMenu" 
          class="nav-link"
          role="listitem"
        >
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span>المنتجات</span>
          </div>
        </a>
        
        <router-link 
          to="/order" 
          @click="closeMenu" 
          class="nav-link"
          role="listitem"
        >
          <div class="nav-link-content">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
            </svg>
            <span>اطلب الآن</span>
          </div>
        </router-link>
      </div>
      
      <div class="btns">
        <a 
          class="btn primary-btn" 
          href="https://discord.gg/khli" 
          target="_blank" 
          rel="noopener noreferrer"
          :aria-label="$t('discordServer')"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span>سيرفر الديسكورد</span>
        </a>
        
        <a 
          class="btn secondary-btn" 
          href="https://linktr.ee/KhLiStoRe" 
          target="_blank" 
          rel="noopener noreferrer"
          :aria-label="$t('storeAccounts')"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
          <span>حسابات المتجر</span>
        </a>
      </div>
    </nav>

    <div 
      v-if="mobileMenuOpen" 
      class="mobile-overlay" 
      @click="closeMenu"
      aria-hidden="true"
    ></div>
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
      resizeTimeout: null,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  mounted() {
    this.logo = require('@/assets/IMG_1254.png');
    this.setupEventListeners();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.handleBodyScroll();
      
      // Announce to screen readers
      this.$nextTick(() => {
        const message = this.mobileMenuOpen ? 'القائمة مفتوحة' : 'القائمة مغلقة';
        this.announceToScreenReader(message);
      });
    },
    
    closeMenu() {
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        this.handleBodyScroll();
        this.announceToScreenReader('القائمة مغلقة');
      }
    },
    
    handleBodyScroll() {
      const body = document.body;
      const html = document.documentElement;
      
      if (this.mobileMenuOpen) {
        // Save current scroll position
        this.scrollPosition = window.scrollY;
        
        // Prevent scrolling
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${this.scrollPosition}px`;
        body.style.width = '100%';
      } else {
        // Restore scrolling
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        
        // Restore scroll position
        if (this.scrollPosition) {
          window.scrollTo(0, this.scrollPosition);
        }
      }
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
      // Implement search logic
      this.$emit('search');
      console.log('Search clicked');
    },
    
    setupEventListeners() {
      // Touch events for mobile navigation
      this.setupTouchEvents();
      
      // Keyboard events
      document.addEventListener('keydown', this.handleKeydown);
      
      // Resize events
      window.addEventListener('resize', this.handleResize);
      
      // Focus trap for mobile menu
      this.setupFocusTrap();
    },
    
    cleanup() {
      // Clean up body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Remove event listeners
      document.removeEventListener('keydown', this.handleKeydown);
      window.removeEventListener('resize', this.handleResize);
      this.removeTouchEvents();
      
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
    },
    
    setupTouchEvents() {
      const nav = this.$el?.querySelector('.nav');
      if (nav) {
        nav.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        nav.addEventListener('touchend', this.handleTouchEnd, { passive: true });
      }
    },
    
    removeTouchEvents() {
      const nav = this.$el?.querySelector('.nav');
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
      
      // Close menu on strong downward swipe
      if (this.touchStartY - this.touchEndY < -100 && this.mobileMenuOpen) {
        this.closeMenu();
      }
    },
    
    handleKeydown(e) {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMenu();
      }
    },
    
    handleResize() {
      // Debounce resize events
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      
      this.resizeTimeout = setTimeout(() => {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
          this.closeMenu();
        }
      }, 150);
    },
    
    setupFocusTrap() {
      // Implement focus trapping for accessibility
      this.$nextTick(() => {
        if (this.mobileMenuOpen) {
          const focusableElements = this.$el.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (firstElement) {
            firstElement.focus();
          }
        }
      });
    },
    
    announceToScreenReader(message) {
      // Create temporary element for screen reader announcements
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  },
};
</script>

<style scoped>
/* Performance optimizations */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* CSS Custom Properties for better maintainability */
:root {
  --header-height: 70px;
  --header-height-mobile: 65px;
  --border-radius: 20px;
  --border-radius-mobile: 15px;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.15);
  --shadow-heavy: 0 8px 30px rgba(0, 0, 0, 0.25);
  --blur-light: blur(10px);
  --blur-medium: blur(15px);
  --blur-heavy: blur(25px);
}

/* Improved animations */
@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes slideInFromLeft {
  from { 
    transform: translateX(-100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Main container with improved gradient */
.control-background.home {
  background: linear-gradient(
    135deg, 
    #0a0a0a 0%, 
    #1a1a2e 25%, 
    #16213e 50%, 
    #1a1a2e 75%, 
    #0a0a0a 100%
  );
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: var(--header-height);
  max-height: var(--header-height);
  box-shadow: var(--shadow-medium);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  backdrop-filter: var(--blur-light);
  contain: layout style paint;
  will-change: transform;
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: var(--blur-light);
  border-radius: inherit;
  z-index: 1;
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* Header layout */
.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 15px 20px;
  height: var(--header-height);
  gap: 16px;
}

.left-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;
}

.right-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: end;
}

/* Logo improvements */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 16px;
  transition: var(--transition-normal);
  justify-self: center;
  color: inherit;
  font: inherit;
}

.logo:hover,
.logo:focus-visible {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.logo:active {
  transform: translateY(0) scale(0.98);
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: var(--transition-normal);
  object-fit: cover;
}

.logo:hover img,
.logo:focus-visible img {
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  transition: var(--transition-normal);
}

/* Icon buttons */
.icon {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: var(--blur-medium);
  color: white;
  font: inherit;
  position: relative;
  overflow: hidden;
}

.icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: inherit;
  transform: scale(0);
  transition: transform var(--transition-fast);
}

.icon:hover::before,
.icon:focus-visible::before {
  transform: scale(1);
}

.icon:hover,
.icon:focus-visible {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  border-color: rgba(255, 255, 255, 0.3);
}

.icon:active {
  transform: translateY(0) scale(0.95);
}

.icon svg {
  transition: var(--transition-normal);
  z-index: 1;
}

.icon:hover svg,
.icon:focus-visible svg {
  transform: scale(1.1);
}

/* Hamburger menu */
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 18px;
  height: 14px;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: var(--transition-normal);
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

/* Navigation */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
  transition: var(--transition-normal);
}

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
  transition: var(--transition-normal);
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--blur-medium);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 14px;
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
.nav-link:focus-visible::before {
  left: 100%;
}

.nav-link:hover,
.nav-link:focus-visible {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-link.active,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: var(--shadow-medium);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Buttons */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: var(--transition-normal);
  font-weight: 600;
  font-size: 14px;
  box-shadow: var(--shadow-medium);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: var(--blur-medium);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before,
.btn:focus-visible::before {
  left: 100%;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
  border-color: rgba(255, 255, 255, 0.4);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
}

.primary-btn:hover,
.primary-btn:focus-visible {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 8px 30px rgba(88, 112, 246, 0.4);
}

.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
}

.secondary-btn:hover,
.secondary-btn:focus-visible {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  box-shadow: 0 8px 30px rgba(108, 117, 125, 0.4);
}

/* Mobile styles - using container queries when possible */
/* Mobile styles */
@media (max-width: 768px) {
  :root {
    --header-height: var(--header-height-mobile);
    --border-radius: var(--border-radius-mobile);
  }

  .control-background.home {
    min-height: var(--header-height-mobile);
    max-height: var(--header-height-mobile);
    border-radius: 0 0 var(--border-radius-mobile) var(--border-radius-mobile);
  }

  .header {
    height: var(--header-height-mobile);
    padding: 12px 16px;
    gap: 12px;
  }

  .logo {
    padding: 6px 12px;
    gap: 8px;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 16px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  /* Mobile navigation */
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(
      180deg,
      rgba(26, 26, 46, 0.98) 0%,
      rgba(22, 33, 62, 0.98) 50%,
      rgba(10, 10, 10, 0.98) 100%
    );
    backdrop-filter: var(--blur-heavy);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    padding: 0;
    justify-content: flex-start;
    overflow-y: auto;
    transition: right var(--transition-slow), opacity var(--transition-normal);
    opacity: 0;
    visibility: hidden;
  }

  .nav-mobile-open {
    right: 0;
    opacity: 1;
    visibility: visible;
    animation: slideInFromLeft var(--transition-slow) ease-out;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: var(--blur-medium);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-weight: 700;
    font-size: 16px;
  }

  .nav-logo img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .nav-close {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: var(--transition-normal);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font: inherit;
  }

  .nav-close:hover,
  .nav-close:focus-visible {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .pages {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 12px;
    margin-top: 0;
  }

  .nav-link {
    width: 100%;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: all var(--transition-normal);
  }

  .nav-link-content {
    padding: 16px 20px;
    font-size: 15px;
    justify-content: flex-start;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .nav-link.active,
  .nav-link.router-link-active {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: inset 4px 0 0 rgba(255, 255, 255, 0.6);
  }

  .btns {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 12px;
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn {
    width: 100%;
    padding: 16px 20px;
    font-size: 15px;
    border-radius: 16px;
  }

  /* Mobile overlay */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: var(--blur-light);
    z-index: 1000;
    opacity: 0;
    animation: fadeInUp var(--transition-normal) ease-out forwards;
  }

  /* Hide search on very small screens */
  @media (max-width: 480px) {
    .search-icon {
      display: none;
    }
    
    .header {
      grid-template-columns: auto 1fr auto;
    }
    
    .left-icons {
      justify-self: start;
    }
  }
}

/* Tablet styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .header {
    padding: 15px 24px;
  }

  .nav {
    padding: 0 24px 20px;
  }

  .pages {
    gap: 18px;
  }

  .nav-link-content {
    padding: 12px 20px;
    font-size: 15px;
  }

  .btn {
    padding: 14px 28px;
    font-size: 15px;
  }
}

/* Desktop large screens */
@media (min-width: 1200px) {
  .header {
    padding: 15px 32px;
  }

  .nav {
    padding: 0 32px 20px;
  }

  .pages {
    gap: 20px;
  }

  .btns {
    gap: 16px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .control-background.home {
    background: #000;
    border: 2px solid #fff;
  }

  .icon,
  .btn {
    border: 2px solid #fff;
    background: #000;
  }

  .nav-link {
    border: 2px solid #fff;
    background: #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .control-background.home {
    animation: none;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  :root {
    --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.4);
    --shadow-heavy: 0 8px 30px rgba(0, 0, 0, 0.5);
  }
}

/* Focus styles for better accessibility */
.icon:focus-visible,
.logo:focus-visible,
.nav-link:focus-visible,
.btn:focus-visible,
.nav-close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* RTL support improvements */
[dir="rtl"] .nav {
  right: auto;
  left: -100%;
}

[dir="rtl"] .nav-mobile-open {
  left: 0;
  right: auto;
}

[dir="rtl"] .nav {
  border-left: none;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.3);
}

[dir="rtl"] .nav-link:hover,
[dir="rtl"] .nav-link:focus-visible {
  transform: translateX(-4px);
}

[dir="rtl"] .nav-link.active,
[dir="rtl"] .nav-link.router-link-active {
  box-shadow: inset -4px 0 0 rgba(255, 255, 255, 0.6);
}

/* Performance optimizations */
.control-background.home,
.nav,
.icon,
.btn,
.nav-link {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Print styles */
@media print {
  .control-background.home {
    background: #fff;
    color: #000;
    box-shadow: none;
    border: 1px solid #000;
  }

  .nav,
  .btns {
    display: none;
  }
}

/* Container queries support (when available) */
@supports (container-type: inline-size) {
  .header {
    container-type: inline-size;
  }

  @container (max-width: 480px) {
    .logo-text {
      display: none;
    }
  }
}
</style>
