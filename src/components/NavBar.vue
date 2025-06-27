<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <a
          :href="discordLoginUrl"
          title="تسجيل الدخول عبر Discord"
          target="_blank"
          rel="noopener"
          class="icon-link"
        >
          <div class="icon user-icon"></div>
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
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      mobileMenuOpen: false,
      discordLoginUrl:
        'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds.join',
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
    handleSearch() {
      console.log('Search clicked');
    },
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  },
};
</script>

<style scoped>
/* اختصرت لك CSS بشكل احترافي لتقليل الحجم مع الحفاظ على كل التنسيقات */

/* أيقونات */
.icon {
  width: 24px;
  height: 24px;
  margin: 0 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.icon:hover { transform: scale(1.1); }
.icon:active { transform: scale(0.95); }

/* المستخدم */
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

/* البحث */
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

/* القائمة */
.menu-icon {
  display: none;
  position: relative;
}
.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  left: 2px;
  width: 20px;
  height: 3px;
  background: #f5b64a;
  border-radius: 2px;
}
.menu-icon::before {
  top: 5px;
  box-shadow: 0 7px 0 #f5b64a;
}
.menu-icon::after { top: 16px; }

/* السهم */
.arrow-icon::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 4px;
  width: 12px;
  height: 2px;
  background: white;
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

/* الخلفية */
.control-background {
  background: linear-gradient(135deg, #667eea, #764ba2);
  animation: gradientMove 6s infinite ease-in-out;
  position: relative;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.control-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
.control-background > * {
  position: relative;
  z-index: 2;
}

/* الهيدر */
.header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.left-icons, .right-icons {
  display: flex;
  align-items: center;
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
  color: white;
  display: none;
}

/* التنقل */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 0 20px 20px;
  color: white;
}
.pages {
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
}
.nav-link {
  text-decoration: none;
  color: white;
  padding: 8px 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 25px;
  transition: 0.3s;
}
.nav-link:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}
.router-link-active {
  background: #5865f2;
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
  background: white;
  color: #4758b0;
}
.primary-btn:hover, .secondary-btn:hover {
  transform: translateY(-3px);
}

/* موبايل */
@media screen and (max-width: 768px) {
  .menu-icon { display: block; }
  .logo-text { display: block; }
  .nav {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
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

/* أنميشن الخلفية */
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>