<template>
  <div class="control-background home">
    <div class="header">
      <div class="left-icons">
        <button 
          class="icon search-icon" 
          @click="handleSearch" 
          :title="$t('search')"
          aria-label="البحث"
          type="button"
        >
          <SearchIcon />
        </button>
      </div>

      <div class="logo">
        <img 
          :src="logo" 
          alt="خلي ستور - شعار المتجر"
          loading="lazy" 
          @error="handleImageError"
        />
        <span class="logo-text">خلي ستور</span>
      </div>

      <div class="right-icons">
        <button 
          class="icon menu-icon" 
          @click="toggleMenu" 
          :title="$t('menu')"
          aria-label="القائمة"
          :aria-expanded="mobileMenuOpen"
          type="button"
        >
          <MenuIcon />
        </button>
        <button 
          class="icon arrow-icon" 
          @click="goBack" 
          :title="$t('back')"
          aria-label="العودة"
          type="button"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>

    <nav 
      class="nav" 
      :class="{ 'nav-mobile-open': mobileMenuOpen }"
      role="navigation"
      aria-label="التنقل الرئيسي"
    >
      <button 
        class="nav-close" 
        @click="closeMenu" 
        v-if="mobileMenuOpen"
        aria-label="إغلاق القائمة"
        type="button"
      >
        <CloseIcon />
      </button>
      
      <div class="pages" role="menubar">
        <router-link 
          to="/" 
          @click="closeMenu" 
          class="nav-link"
          role="menuitem"
          aria-label="الانتقال إلى الصفحة الرئيسية"
        >
          <HomeIcon />
          الرئيسية
        </router-link>
        
        <a 
          href="/products" 
          @click="closeMenu" 
          class="nav-link"
          role="menuitem"
          aria-label="عرض المنتجات"
        >
          <ShoppingCartIcon />
          المنتجات
        </a>
        
        <router-link 
          to="/order" 
          @click="closeMenu" 
          class="nav-link"
          role="menuitem"
          aria-label="اطلب الآن"
        >
          <OrderIcon />
          اطلب الآن
        </router-link>
      </div>
      
      <div class="btns">
        <a 
          class="btn primary-btn" 
          href="https://discord.gg/khli" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="انضم إلى سيرفر الديسكورد (يفتح في نافذة جديدة)"
        >
          <DiscordIcon />
          سيرفر الديسكورد
        </a>
        
        <a 
          class="btn secondary-btn" 
          href="https://linktr.ee/KhLiStoRe" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="زيارة حسابات المتجر (يفتح في نافذة جديدة)"
        >
          <LinkIcon />
          حسابات المتجر
        </a>
      </div>
    </nav>

    <div 
      v-if="mobileMenuOpen" 
      class="mobile-overlay" 
      @click="closeMenu"
      role="button"
      tabindex="0"
      @keydown.enter="closeMenu"
      @keydown.space="closeMenu"
      aria-label="إغلاق القائمة"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

// Icon components for better performance and maintainability
const SearchIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  `
}

const MenuIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  `
}

const ArrowIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  `
}

const CloseIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `
}

const HomeIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  `
}

const ShoppingCartIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  `
}

const OrderIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
    </svg>
  `
}

const DiscordIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
    </svg>
  `
}

const LinkIcon = {
  template: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>
  `
}

export default {
  name: 'HeaderComponent',
  components: {
    SearchIcon,
    MenuIcon,
    ArrowIcon,
    CloseIcon,
    HomeIcon,
    ShoppingCartIcon,
    OrderIcon,
    DiscordIcon,
    LinkIcon
  },
  emits: ['search'],
  setup(props, { emit }) {
    const router = useRouter()
    const mobileMenuOpen = ref(false)
    const logo = ref(null)

    // Computed properties
    const isMenuOpen = computed(() => mobileMenuOpen.value)

    // Load logo with error handling
    const loadLogo = async () => {
      try {
        const logoModule = await import('@/assets/IMG_1254.png')
        logo.value = logoModule.default
      } catch (error) {
        console.warn('Logo could not be loaded:', error)
        // Fallback to a placeholder or default image
        logo.value = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23ccc"/%3E%3Ctext x="20" y="25" text-anchor="middle" fill="%23666" font-size="12"%3ELogo%3C/text%3E%3C/svg%3E'
      }
    }

    // Handle image loading error
    const handleImageError = (event) => {
      console.warn('Logo image failed to load')
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23ccc"/%3E%3Ctext x="20" y="25" text-anchor="middle" fill="%23666" font-size="12"%3ELogo%3C/text%3E%3C/svg%3E'
    }

    // Menu management with body scroll lock
    const toggleMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
      updateBodyScroll()
    }

    const closeMenu = () => {
      mobileMenuOpen.value = false
      updateBodyScroll()
    }

    const updateBodyScroll = () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : 'auto'
      }
    }

    // Enhanced navigation with error handling
    const goBack = () => {
      try {
        if (window.history.length > 1) {
          router.go(-1)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.warn('Navigation error:', error)
        router.push('/')
      }
    }

    // Search handler
    const handleSearch = () => {
      emit('search')
    }

    // Keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen.value) {
        closeMenu()
      }
    }

    // Lifecycle hooks
    onMounted(() => {
      loadLogo()
      document.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleKeyDown)
    })

    // Translation helper (placeholder for i18n)
    const $t = (key) => {
      const translations = {
        search: 'البحث',
        menu: 'القائمة',
        back: 'العودة'
      }
      return translations[key] || key
    }

    return {
      mobileMenuOpen,
      logo,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      goBack,
      handleSearch,
      handleImageError,
      $t
    }
  }
}
</script>

<style scoped>
/* CSS Custom Properties for better maintainability */
:root {
  --header-height: 80px;
  --header-height-mobile: 70px;
  --border-radius: 20px;
  --border-radius-mobile: 15px;
  --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --backdrop-blur: blur(10px);
  --shadow-light: 0 2px 15px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.2);
  --shadow-heavy: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Enhanced animations with better performance */
@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translate3d(0, 20px, 0); 
  }
  to { 
    opacity: 1; 
    transform: translate3d(0, 0, 0); 
  }
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes slideIn {
  from { 
    transform: translate3d(-100%, 0, 0); 
    opacity: 0; 
  }
  to { 
    transform: translate3d(0, 0, 0); 
    opacity: 1; 
  }
}

@keyframes pulse {
  0%, 100% { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.03, 1.03, 1); }
}

/* Main background with improved performance */
.control-background.home {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientMove 8s ease infinite;
  position: relative;
  min-height: var(--header-height);
  max-height: calc(var(--header-height) + 40px);
  overflow: visible;
  box-shadow: var(--shadow-light);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  will-change: background-position;
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: var(--backdrop-blur);
  z-index: 1;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* Header with flexbox improvements */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: relative;
  min-height: 60px;
  gap: 15px;
}

.left-icons, 
.right-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  min-width: 60px;
}

.right-icons {
  justify-content: flex-end;
}

/* Enhanced logo with better loading states */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center;
  max-width: 200px;
  margin: 0 auto;
}

.logo img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: var(--transition-base);
  object-fit: cover;
  background: rgba(255, 255, 255, 0.1);
}

.logo img:hover {
  transform: scale(1.05) rotate(3deg);
  border-color: rgba(255, 255, 255, 0.8);
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  transition: var(--transition-base);
  user-select: none;
}

.logo-text:hover {
  transform: translateY(-1px);
  text-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
}

/* Enhanced icons with better accessibility */
.icon {
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: var(--backdrop-blur);
  outline: none;
  position: relative;
}

.icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px) scale(1.05);
  box-shadow: var(--shadow-medium);
}

.icon:active {
  transform: translateY(0) scale(0.98);
}

.icon:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.icon svg {
  color: white;
  transition: var(--transition-base);
  width: 18px;
  height: 18px;
}

.icon:hover svg {
  transform: scale(1.1);
}

/* Enhanced navigation */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 0 15px 15px;
  transition: var(--transition-base);
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
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: var(--transition-base);
  backdrop-filter: var(--backdrop-blur);
  outline: none;
}

.nav-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.nav-close svg {
  color: white;
  width: 20px;
  height: 20px;
}

/* Pages navigation */
.pages {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: var(--transition-base);
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--backdrop-blur);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  outline: none;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--shadow-medium);
}

.nav-link:active {
  transform: translateY(0);
}

.nav-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: var(--shadow-medium);
}

.nav-link svg {
  transition: var(--transition-base);
  width: 16px;
  height: 16px;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

/* Enhanced buttons */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition-base);
  font-weight: 600;
  font-size: 13px;
  box-shadow: var(--shadow-medium);
  border: 2px solid rgba(255, 255, 255, 0.2);
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: var(--backdrop-blur);
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
  box-shadow: var(--shadow-heavy);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-medium);
}

.btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

.btn svg {
  transition: var(--transition-base);
  width: 16px;
  height: 16px;
}

.btn:hover svg {
  transform: scale(1.1);
}

/* Button variants */
.primary-btn {
  background: linear-gradient(135deg, #5870f6, #4c63d2);
}

.primary-btn:hover {
  background: linear-gradient(135deg, #4c63d2, #3b4ba8);
  box-shadow: 0 8px 30px rgba(88, 112, 246, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.secondary-btn {
  background: linear-gradient(135deg, #6c757d, #495057);
}

.secondary-btn:hover {
  background: linear-gradient(135deg, #5a6268, #3d4448);
  box-shadow: 0 8px 30px rgba(108, 117, 125, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  cursor: pointer;
  outline: none;
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .control-background.home {
    min-height: var(--header-height-mobile);
    max-height: calc(var(--header-height-mobile) + 30px);
    border-radius: 0 0 var(--border-radius-mobile) var(--border-radius-mobile);
  }

  .control-background.home::before {
    border-radius: 0 0 var(--border-radius-mobile) var(--border-radius-mobile);
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

  .left-icons, 
  .right-icons {
    gap: 8px;
    min-width: 50px;
  }

  /* Mobile navigation overlay */
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    gap: 30px;
    margin-bottom: 40px;
  }

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

  .btns {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 300px;
  }

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

/* Hide menu icon on desktop */
@media (min-width: 769px) {
  .menu-icon {
    display: none;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  :root {
    --header-height-mobile: 65px;
    --border-radius-mobile: 12px;
  }

  .header {
    padding: 10px 12px;
    min-height: 45px;
  }
  
  .logo-text {
    display: none;
  }
  
  .left-icons, 
  .right-icons {
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

/* Very small screens */
@media (max-width: 360px) {
  :root {
    --header-height-mobile: 60px;
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

/* Performance optimizations */
.control-background.home,
.nav,
.btn,
.icon,
.nav-link {
  will-change: transform;
}

/* Hover effects for devices that support hover */
@media (hover: hover) {
  .icon:hover {
    animation: pulse 0.6s ease-in-out;
  }
  
  .btn:hover {
    animation: pulse 0.4s ease-in-out;
  }
}

/* High DPI screen optimizations */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
  
  .btn:hover,
  .icon:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
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
    background: #1a1a2e;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .control-background.home {
    background: linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #000000 100%);
  }
}

/* Print styles */
@media print {
  .control-background.home {
    background: #1a1a2e !important;
    box-shadow: none !important;
    animation: none !important;
  }
  
  .nav,
  .btns {
    display: none !important;
  }
  
  .logo-text {
    color: black !important;
    text-shadow: none !important;
  }
}

/* Focus management for better accessibility */
.control-background.home *:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  z-index: 1000;
}

/* Loading states */
.logo img[src=""] {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Error states */
.logo img[alt]:after {
  content: attr(alt);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  width: 100%;
}

/* Ensure proper stacking context */
.control-background.home {
  z-index: 100;
}

.nav.nav-mobile-open {
  z-index: 999;
}

.mobile-overlay {
  z-index: 998;
}

/* Smooth transitions for router changes */
.nav-link.router-link-active {
  transition: all 0.3s ease;
}

/* Enhanced button states */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn:disabled:hover {
  transform: none !important;
  box-shadow: var(--shadow-medium) !important;
}

/* Content spacing helper */
.main-content {
  margin-top: 0;
  padding-top: 20px;
}

.app-container {
  max-width: 100vw;
  overflow-x: hidden;
}

/* RTL support improvements */
[dir="rtl"] .header {
  direction: rtl;
}

[dir="rtl"] .logo {
  flex-direction: row-reverse;
}

[dir="rtl"] .nav-link svg {
  margin-left: 0;
  margin-right: 8px;
}

/* Container queries support (if available) */
@container (max-width: 768px) {
  .header {
    padding: 10px 15px;
  }
  
  .logo-text {
    font-size: 14px;
  }
}
</style>
