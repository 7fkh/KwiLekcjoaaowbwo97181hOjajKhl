<template>
  <header class="header-container" role="banner">
    <div class="control-background home" :class="{ 'scrolled': isScrolled }">
      <div class="header">
        <div class="left-icons">
          <button 
            class="icon search-icon" 
            @click="handleSearch" 
            :title="t('search')"
            :aria-label="t('search')"
            type="button"
            :disabled="isLoading"
          >
            <SearchIcon />
          </button>
        </div>

        <router-link to="/" class="logo" :aria-label="t('homeLogo')">
          <div class="logo-image-container">
            <img 
              v-if="logo"
              :src="logo" 
              :alt="t('logoAlt')"
              loading="lazy" 
              @error="handleImageError"
              @load="handleImageLoad"
              :class="{ 'loaded': imageLoaded }"
            />
            <div v-else class="logo-skeleton"></div>
          </div>
          <span class="logo-text" v-show="showLogoText">{{ t('storeName') }}</span>
        </router-link>

        <div class="right-icons">
          <button 
            class="icon menu-icon" 
            @click="toggleMenu" 
            :title="t('menu')"
            :aria-label="t('menu')"
            :aria-expanded="mobileMenuOpen"
            :aria-controls="navId"
            type="button"
            ref="menuButton"
          >
            <MenuIcon />
          </button>
          <button 
            class="icon arrow-icon" 
            @click="goBack" 
            :title="t('back')"
            :aria-label="t('back')"
            type="button"
            :disabled="!canGoBack"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <nav 
        :id="navId"
        class="nav" 
        :class="{ 'nav-mobile-open': mobileMenuOpen }"
        role="navigation"
        :aria-label="t('mainNavigation')"
        :aria-hidden="isMobile && !mobileMenuOpen"
        ref="navElement"
      >
        <button 
          class="nav-close" 
          @click="closeMenu" 
          v-if="mobileMenuOpen"
          :aria-label="t('closeMenu')"
          type="button"
          ref="closeButton"
        >
          <CloseIcon />
        </button>
        
        <div class="pages" role="menubar">
          <router-link 
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            @click="handleNavClick"
            class="nav-link"
            role="menuitem"
            :aria-label="link.ariaLabel"
            :class="{ 'active': isActiveRoute(link.path) }"
          >
            <component :is="link.icon" />
            {{ link.text }}
          </router-link>
        </div>
        
        <div class="btns">
          <a 
            v-for="button in externalButtons"
            :key="button.href"
            class="btn"
            :class="button.variant"
            :href="button.href" 
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="button.ariaLabel"
            @click="trackExternalClick(button.name)"
          >
            <component :is="button.icon" />
            {{ button.text }}
          </a>
        </div>
      </nav>

      <transition name="overlay">
        <div 
          v-if="mobileMenuOpen" 
          class="mobile-overlay" 
          @click="closeMenu"
          @keydown.enter="closeMenu"
          @keydown.space.prevent="closeMenu"
          role="button"
          tabindex="0"
          :aria-label="t('closeMenu')"
        ></div>
      </transition>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading-indicator" aria-hidden="true">
      <div class="spinner"></div>
    </div>

    <!-- Notifications -->
    <transition name="notification">
      <div v-if="notification" class="notification" :class="notification.type" role="alert">
        {{ notification.message }}
      </div>
    </transition>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Enhanced Icon Components with better accessibility
const createIcon = (path, viewBox = "0 0 24 24") => ({
  props: {
    size: { type: String, default: '20' },
    color: { type: String, default: 'currentColor' }
  },
  template: `
    <svg 
      :viewBox="viewBox" 
      :width="size" 
      :height="size" 
      :fill="color" 
      aria-hidden="true"
      focusable="false"
    >
      <path :d="path" />
    </svg>
  `,
  setup() {
    return { path, viewBox }
  }
})

const SearchIcon = createIcon("M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z")

const MenuIcon = createIcon("M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z")

const ArrowIcon = createIcon("M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z")

const CloseIcon = createIcon("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z")

const HomeIcon = createIcon("M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z")

const ShoppingCartIcon = createIcon("M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z")

const OrderIcon = createIcon("M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z")

const DiscordIcon = createIcon("M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z")

const LinkIcon = createIcon("M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z")

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
  emits: ['search', 'navigation-change', 'external-link-click'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    
    // Reactive state
    const mobileMenuOpen = ref(false)
    const logo = ref(null)
    const imageLoaded = ref(false)
    const isLoading = ref(false)
    const isScrolled = ref(false)
    const notification = ref(null)
    const navId = ref('main-navigation')
    
    // Refs for DOM elements
    const menuButton = ref(null)
    const closeButton = ref(null)
    const navElement = ref(null)

    // Computed properties
    const isMobile = ref(window.innerWidth <= 768)
    const showLogoText = computed(() => !isMobile.value || window.innerWidth > 480)
    const canGoBack = computed(() => window.history.length > 1)

    // Configuration data
    const navigationLinks = ref([
      {
        path: '/',
        text: 'الرئيسية',
        icon: 'HomeIcon',
        ariaLabel: 'الانتقال إلى الصفحة الرئيسية'
      },
      {
        path: '/products',
        text: 'المنتجات',
        icon: 'ShoppingCartIcon',
        ariaLabel: 'عرض المنتجات'
      },
      {
        path: '/order',
        text: 'اطلب الآن',
        icon: 'OrderIcon',
        ariaLabel: 'اطلب الآن'
      }
    ])

    const externalButtons = ref([
      {
        href: 'https://discord.gg/khli',
        text: 'سيرفر الديسكورد',
        icon: 'DiscordIcon',
        variant: 'primary-btn',
        ariaLabel: 'انضم إلى سيرفر الديسكورد (يفتح في نافذة جديدة)',
        name: 'discord'
      },
      {
        href: 'https://linktr.ee/KhLiStoRe',
        text: 'حسابات المتجر',
        icon: 'LinkIcon',
        variant: 'secondary-btn',
        ariaLabel: 'زيارة حسابات المتجر (يفتح في نافذة جديدة)',
        name: 'linktree'
      }
    ])

    // Enhanced translation system
    const translations = ref({
      search: 'البحث',
      menu: 'القائمة',
      back: 'العودة',
      homeLogo: 'شعار المتجر - العودة للرئيسية',
      logoAlt: 'خلي ستور - شعار المتجر',
      storeName: 'خلي ستور',
      mainNavigation: 'التنقل الرئيسي',
      closeMenu: 'إغلاق القائمة'
    })

    const t = (key) => translations.value[key] || key

    // Enhanced logo loading with retry mechanism
    const loadLogo = async (retries = 3) => {
      try {
        isLoading.value = true
        const logoModule = await import('@/assets/IMG_1254.png')
        logo.value = logoModule.default
      } catch (error) {
        console.warn('Logo loading failed:', error)
        if (retries > 0) {
          setTimeout(() => loadLogo(retries - 1), 1000)
        } else {
          // Fallback to inline SVG
          logo.value = `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="#667eea" stroke="#764ba2" stroke-width="2"/>
              <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">KS</text>
            </svg>
          `)}`
        }
      } finally {
        isLoading.value = false
      }
    }

    // Image event handlers
    const handleImageLoad = () => {
      imageLoaded.value = true
    }

    const handleImageError = (event) => {
      console.warn('Logo image failed to load')
      event.target.src = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#667eea" stroke="#764ba2" stroke-width="2"/>
          <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">KS</text>
        </svg>
      `)}`
    }

    // Enhanced menu management with focus trap
    const toggleMenu = async () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
      updateBodyScroll()
      
      if (mobileMenuOpen.value) {
        await nextTick()
        trapFocus()
      } else {
        releaseFocus()
      }
      
      emit('navigation-change', { type: 'menu-toggle', open: mobileMenuOpen.value })
    }

    const closeMenu = () => {
      mobileMenuOpen.value = false
      updateBodyScroll()
      releaseFocus()
      emit('navigation-change', { type: 'menu-close' })
    }

    const updateBodyScroll = () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : 'auto'
        document.body.classList.toggle('menu-open', mobileMenuOpen.value)
      }
    }

    // Focus management for accessibility
    const trapFocus = () => {
      if (closeButton.value) {
        closeButton.value.focus()
      }
    }

    const releaseFocus = () => {
      if (menuButton.value) {
        menuButton.value.focus()
      }
    }

    // Enhanced navigation with loading states
    const goBack = async () => {
      try {
        isLoading.value = true
        if (canGoBack.value) {
          router.go(-1)
        } else {
          await router.push('/')
        }
        emit('navigation-change', { type: 'back' })
      } catch (error) {
        console.warn('Navigation error:', error)
        showNotification('حدث خطأ في التنقل', 'error')
        await router.push('/')
      } finally {
        isLoading.value = false
      }
    }

    // Enhanced search handler
    const handleSearch = () => {
      emit('search')
      showNotification('فتح البحث', 'info')
    }

    // Navigation link handlers
    const handleNavClick = (event) => {
      closeMenu()
      emit('navigation-change', { 
        type: 'nav-click', 
        path: event.target.getAttribute('href') 
      })
    }

    const isActiveRoute = (path) => {
      return route.path === path
    }

    // External link tracking
    const trackExternalClick = (buttonName) => {
      emit('external-link-click', { button: buttonName })
      showNotification(`فتح ${buttonName}`, 'success')
    }

    // Notification system
    const showNotification = (message, type = 'info') => {
      notification.value = { message, type }
      setTimeout(() => {
        notification.value = null
      }, 3000)
    }

    // Scroll handler
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    // Resize handler
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768
      if (isMobile.value !== newIsMobile) {
        isMobile.value = newIsMobile
        if (!newIsMobile && mobileMenuOpen.value) {
          closeMenu()
        }
      }
    }

    // Keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen.value) {
        closeMenu()
      }
    }

    // Watch route changes
    watch(route, () => {
      if (mobileMenuOpen.value) {
        closeMenu()
      }
    })

    // Lifecycle hooks
    onMounted(() => {
      loadLogo()
      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
    })

    onUnmounted(() => {
      document.body.style.overflow = 'auto'
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    })

    return {
      // State
      mobileMenuOpen,
      logo,
      imageLoaded,
      isLoading,
      isScrolled,
      notification,
      navId,
      isMobile,
      showLogoText,
      canGoBack,
      
      // Data
      navigationLinks,
      externalButtons,
      
      // Refs
      menuButton,
      closeButton,
      navElement,
      
      // Methods
      toggleMenu,
      closeMenu,
      goBack,
      handleSearch,
      handleNavClick,
      handleImageLoad,
      handleImageError,
      isActiveRoute,
      trackExternalClick,
      t
    }
  }
}
</script>

<style scoped>
/* Enhanced CSS Variables with semantic naming */
:root {
  --header-height: clamp(70px, 8vh, 100px);
  --header-height-mobile: clamp(60px, 7vh, 80px);
  --border-radius: 20px;
  --border-radius-mobile: 15px;
  --border-radius-small: 12px;
  
  /* Animation variables */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Visual effects */
  --backdrop-blur: blur(12px);
  --backdrop-blur-heavy: blur(20px);
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-heavy: 0 8px 24px rgba(0, 0, 0, 0.2);
  --shadow-float: 0 12px 32px rgba(0, 0, 0, 0.25);
  
  /* Colors */
  --color-primary: #5870f6;
  --color-primary-dark: #4c63d2;
  --color-secondary: #6c757d;
  --color-secondary-dark: #5a6268;
  --color-white: #ffffff;
  --color-white-alpha-10: rgba(255, 255, 255, 0.1);
  --color-white-alpha-20: rgba(255, 255, 255, 0.2);
  --color-white-alpha-30: rgba(255, 255, 255, 0.3);
  --color-black-alpha-20: rgba(0, 0, 0, 0.2);
  --color-black-alpha-30: rgba(0, 0, 0, 0.3);
  
  /* Typography */
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
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
  50% { transform: scale3d(1.05, 1.05, 1); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

/* Loading animations */
@keyframes skeleton {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* Header container with improved structure */
.header-container {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

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
  animation: gradientMove 12s ease infinite;
  position: relative;
  min-height: var(--header-height);
  max-height: calc(var(--header-height) + 40px);
  overflow: visible;
  box-shadow: var(--shadow-light);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  will-change: background-position, box-shadow;
  transition: var(--transition-base);
}

.control-background.home.scrolled {
  box-shadow: var(--shadow-heavy);
}

.control-background.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-black-alpha-20);
  backdrop-filter: var(--backdrop-blur);
  z-index: 1;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  transition: var(--transition-base);
}

.control-background.home > * {
  position: relative;
  z-index: 2;
}

/* Enhanced header with better spacing */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg) var(--space-xl);
  position: relative;
  min-height: 60px;
  gap: var(--space-lg);
  container-type: inline-size;
}

.left-icons, 
.right-icons {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 0 0 auto;
  min-width: 60px;
}

.right-icons {
  justify-content: flex-end;
}

/* Enhanced logo with loading states */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  justify-content: center;
  max-width: 220px;
  margin: 0 auto;
  text-decoration: none;
  transition: var(--transition-base);
  border-radius: var(--space-sm);
  padding: var(--space-xs);
}

.logo:hover {
  transform: translateY(-1px);
}

.logo:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
}

.logo-image-container {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
}

.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--color-white-alpha-30);
  transition: var(--transition-base);
  object-fit: cover;
  background: var(--color-white-alpha-10);
  opacity: 0;
  transform: scale(0.8);
}

.logo img.loaded {
  opacity: 1;
  transform: scale(1);
}

.logo img:hover {
  transform: scale(1.05) rotate(3deg);
  border-color: var(--color-white);
}

.logo-skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    var(--color-white-alpha-10) 25%, 
    var(--color-white-alpha-20) 50%, 
    var(--color-white-alpha-10) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 50%;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-white);
  text-shadow: 1px 1px 3px var(--color-black-alpha-30);
  transition: var(--transition-base);
  user-select: none;
  letter-spacing: 0.5px;
}

.logo-text:hover {
  transform: translateY(-1px);
  text-shadow: 1px 2px 6px var(--color-black-alpha-30);
}

/* Enhanced icons with better states */
.icon {
  width: 38px;
  height: 38px;
  background: var(--color-white-alpha-10);
  border-radius: 50%;
  border: 1px solid var(--color-white-alpha-20);
  cursor: pointer;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: var(--backdrop-blur);
  outline: none;
  position: relative;
  overflow: hidden;
}

.icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--color-white-alpha-20) 0%, transparent 70%);
  opacity: 0;
  transition: var(--transition-fast);
}

.icon:hover::before {
  opacity: 1;
}

.icon:hover {
  background: var(--color-white-alpha-20);
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-medium);
  border-color: var(--color-white-alpha-30);
}

.icon:active {
  transform: translateY(-1px) scale(0.98);
}

.icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.icon:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
  z-index: 1;
}

.icon svg {
  color: var(--color-white);
  transition: var(--transition-base);
  width: 18px;
  height: 18px;
}

.icon:hover svg {
  transform: scale(1.1);
}

/* Enhanced navigation with better structure */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--space-lg);
  padding: 0 var(--space-lg) var(--space-lg);
  transition: var(--transition-base);
}

.nav-close {
  display: none;
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  width: 36px;
  height: 36px;
  background: var(--color-white-alpha-10);
  border-radius: 50%;
  border: 1px solid var(--color-white-alpha-20);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: var(--transition-base);
  backdrop-filter: var(--backdrop-blur);
  outline: none;
  z-index: 10;
}

.nav-close:hover {
  background: var(--color-white-alpha-20);
  transform: scale(1.1);
}

.nav-close:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
}

.nav-close svg {
  color: var(--color-white);
  width: 20px;
  height: 20px;
}

/* Pages navigation with enhanced styling */
.pages {
  display: flex;
  gap: var(--space-xl);
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-base);
  padding: var(--space-sm) var(--space-lg);
  border-radius: 20px;
  transition: var(--transition-base);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-white-alpha-10);
  backdrop-filter: var(--backdrop-blur);
  border: 1px solid var(--color-white-alpha-20);
  text-shadow: 1px 1px 2px var(--color-black-alpha-30);
  outline: none;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, var(--color-white-alpha-10), transparent);
  transform: translateX(-100%);
  transition: transform var(--transition-slow);
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.nav-link:hover {
  background: var(--color-white-alpha-20);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  border-color: var(--color-white-alpha-30);
}

.nav-link:active {
  transform: translateY(-1px);
}

.nav-link:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
  z-index: 1;
}

.nav-link.active,
.nav-link.router-link-active {
  background: var(--color-white-alpha-30);
  box-shadow: var(--shadow-medium);
  transform: translateY(-1px);
}

.nav-link svg {
  transition: var(--transition-base);
  width: 16px;
  height: 16px;
}

.nav-link:hover svg {
  transform: scale(1.15) rotate(5deg);
}

/* Enhanced buttons with advanced styling */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
  margin-top: var(--space-xs);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--color-white);
  padding: var(--space-sm) var(--space-xl);
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition-base);
  font-weight: 600;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-medium);
  border: 2px solid var(--color-white-alpha-20);
  outline: none;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  backdrop-filter: var(--backdrop-blur);
  text-shadow: 1px 1px 2px var(--color-black-alpha-30);
  min-width: 140px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--color-white-alpha-20), transparent);
  transition: left var(--transition-slow);
}

.btn:hover::before {
  left: 100%;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--color-white-alpha-10) 0%, transparent 70%);
  opacity: 0;
  transition: var(--transition-fast);
}

.btn:hover::after {
  opacity: 1;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-float);
}

.btn:active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
}

.btn:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
  z-index: 1;
}

.btn svg {
  transition: var(--transition-base);
  width: 16px;
  height: 16px;
}

.btn:hover svg {
  transform: scale(1.15) rotate(-5deg);
}

/* Button variants with enhanced gradients */
.primary-btn {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
}

.primary-btn:hover {
  background: linear-gradient(135deg, var(--color-primary-dark), #3b4ba8);
  box-shadow: 0 8px 32px rgba(88, 112, 246, 0.4);
  border-color: var(--color-white-alpha-30);
}

.secondary-btn {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark));
}

.secondary-btn:hover {
  background: linear-gradient(135deg, var(--color-secondary-dark), #3d4448);
  box-shadow: 0 8px 32px rgba(108, 117, 125, 0.4);
  border-color: var(--color-white-alpha-30);
}

/* Loading indicator */
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-white-alpha-20);
  border-top: 2px solid var(--color-white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Notification system */
.notification {
  position: fixed;
  top: 100px;
  right: var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--space-sm);
  color: var(--color-white);
  font-weight: 500;
  font-size: var(--font-size-sm);
  z-index: 1000;
  backdrop-filter: var(--backdrop-blur);
  box-shadow: var(--shadow-heavy);
  max-width: 300px;
}

.notification.info {
  background: linear-gradient(135deg, #17a2b8, #138496);
}

.notification.success {
  background: linear-gradient(135deg, #28a745, #218838);
}

.notification.error {
  background: linear-gradient(135deg, #dc3545, #c82333);
}

/* Transition animations */
.overlay-enter-active, .overlay-leave-active {
  transition: opacity var(--transition-base);
}

.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}

.notification-enter-active {
  transition: all var(--transition-base);
}

.notification-leave-active {
  transition: all var(--transition-base);
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Mobile overlay with enhanced styling */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  background: var(--color-black-alpha-30);
  backdrop-filter: blur(8px);
  cursor: pointer;
  outline: none;
}

/* Responsive design improvements */
@media (max-width: 768px) {
  :root {
    --header-height: var(--header-height-mobile);
  }

  .control-background.home {
    min-height: var(--header-height-mobile);
    max-height: calc(var(--header-height-mobile) + 30px);
    border-radius: 0 0 var(--border-radius-mobile) var(--border-radius-mobile);
  }

  .control-background.home::before {
    border-radius: 0 0 var(--border-radius-mobile) var(--border-radius-mobile);
  }

  .header {
    padding: var(--space-md) var(--space-lg);
    min-height: 50px;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .logo-image-container {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: var(--font-size-lg);
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
    gap: var(--space-sm);
    min-width: 50px;
  }

  /* Mobile navigation overlay */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      135deg, 
      rgba(102, 126, 234, 0.95), 
      rgba(118, 75, 162, 0.95)
    );
    backdrop-filter: var(--backdrop-blur-heavy);
    z-index: 999;
    justify-content: center;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    padding: 80px var(--space-xl) 40px;
    transition: all var(--transition-base);
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
    gap: var(--space-2xl);
    margin-bottom: 40px;
  }

  .nav-link {
    font-size: var(--font-size-xl);
    padding: var(--space-lg) var(--space-2xl);
    min-width: 200px;
    justify-content: center;
  }

  .nav-link svg {
    width: 20px;
    height: 20px;
  }

  .btns {
    flex-direction: column;
    gap: var(--space-xl);
    width: 100%;
    max-width: 300px;
  }

  .btn {
    width: 100%;
    padding: var(--space-lg) var(--space-2xl);
    font-size: var(--font-size-lg);
    border-radius: 30px;
    min-width: auto;
  }

  .btn svg {
    width: 18px;
    height: 18px;
  }

  .notification {
    right: var(--space-lg);
    left: var(--space-lg);
    max-width: none;
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
    --border-radius-mobile: var(--border-radius-small);
  }

  .header {
    padding: var(--space-sm) var(--space-md);
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

  .logo-image-container {
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
    padding: var(--space-xs) var(--space-sm);
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

  .logo-image-container {
    width: 26px;
    height: 26px;
  }
}

/* Container queries for modern browsers */
@container (max-width: 480px) {
  .header {
    padding: var(--space-sm);
  }
  
  .logo-text {
    font-size: var(--font-size-base);
  }
}

/* Performance optimizations */
.control-background.home,
.nav,
.btn,
.icon,
.nav-link,
.logo {
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
  
  .nav-link:hover {
    animation: pulse 0.5s ease-in-out;
  }
}

/* High DPI screen optimizations */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .btn,
  .icon,
  .nav-link {
    box-shadow: var(--shadow-light);
  }
  
  .btn:hover,
  .icon:hover,
  .nav-link:hover {
    box-shadow: var(--shadow-heavy);
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

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .control-background.home {
    background: linear-gradient(
      135deg, 
      #000000 0%, 
      #1a1a2e 25%, 
      #16213e 50%, 
      #1a1a2e 75%, 
      #000000 100%
    );
  }
}

/* Light mode support */
@media (prefers-color-scheme: light) {
  .control-background.home {
    background: linear-gradient(
      135deg, 
      #f8f9fa 0%, 
      #e9ecef 25%, 
      #dee2e6 50%, 
      #e9ecef 75%, 
      #f8f9fa 100%
    );
  }
  
  .control-background.home *:not(.logo-text) {
    color: #333 !important;
  }
  
  .logo-text {
    color: #333 !important;
    text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
  }
}

/* Print styles */
@media print {
  .control-background.home {
    background: #f8f9fa !important;
    box-shadow: none !important;
    animation: none !important;
  }
  
  .nav,
  .btns,
  .right-icons {
    display: none !important;
  }
  
  .logo-text {
    color: #000 !important;
    text-shadow: none !important;
  }
}

/* Focus management improvements */
.control-background.home *:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  z-index: 1000;
}

/* Body modifications when menu is open */
:global(body.menu-open) {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

/* Enhanced loading states */
.logo img[src=""] {
  background: linear-gradient(
    90deg, 
    var(--color-white-alpha-10) 25%, 
    var(--color-white-alpha-20) 50%, 
    var(--color-white-alpha-10) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Ensure proper stacking context */
.header-container {
  z-index: 100;
}

.control-background.home {
  z-index: 100;
}

.nav.nav-mobile-open {
  z-index: 999;
}

.mobile-overlay {
  z-index: 998;
}

.notification {
  z-index: 1000;
}

.loading-indicator {
  z-index: 1001;
}

/* RTL support improvements */
[dir="rtl"] .header {
  direction: rtl;
}

[dir="rtl"] .logo {
  flex-direction: row-reverse;
}

[dir="rtl"] .nav-link {
  flex-direction: row-reverse;
}

[dir="rtl"] .btn {
  flex-direction: row-reverse;
}

/* Enhanced error states */
.icon:disabled {
  filter: grayscale(100%);
}

.btn:disabled {
  filter: grayscale(100%);
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Improved accessibility for screen readers */
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

/* Content spacing helpers */
.main-content {
  margin-top: 0;
  padding-top: var(--space-xl);
}

.app-container {
  max-width: 100vw;
  overflow-x: hidden;
}

/* Enhanced visual feedback */
.nav-link.router-link-exact-active {
  background: var(--color-white-alpha-30);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Improved button active states */
.btn:active {
  transform: translateY(-1px) scale(0.98);
}

.icon:active {
  transform: translateY(0) scale(0.95);
}

/* Enhanced transitions for route changes */
.router-link-active {
  transition: all var(--transition-base);
}

/* Improved skeleton loading */
.logo-skeleton {
  animation: skeleton 2s ease-in-out infinite;
}
</style>
