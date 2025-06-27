<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <a :href="discordLoginUrl" title="تسجيل الدخول عبر Discord" target="_blank" rel="noopener">
          <div class="icon user-icon"></div>
        </a>
        <div class="icon search-icon" @click="handleSearch"></div>
      </div>

```
  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" />
  </div>

  <div class="right-icons">
    <div class="icon menu-icon" @click="toggleMenu"></div>
    <div class="icon arrow-icon"></div>
  </div>
</div>

<div class="nav" :class="{ 'nav-mobile-open': mobileMenuOpen }">
  <div class="pages">
    <router-link to="/" @click="closeMenu">الرئيسية</router-link>
    <a href="#products" @click="closeMenu">المنتجات</a>
    <router-link to="/order" @click="closeMenu">اطلب الان</router-link>
  </div>
  <div class="btns">
    <a class="btn" href="https://discord.gg/khli" target="_blank" rel="noopener">سيرفر الديسكورد</a>
    <a class="btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">حسابات المتجر</a>
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
    },
    closeMenu() {
      this.mobileMenuOpen = false;
    },
    handleSearch() {
      console.log('Search clicked');
    }
  }
}
</script>

<style scoped>
/* أيقونات CSS */
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 8px;
}

.icon:hover {
  transform: scale(1.1);
}

/* أيقونة المستخدم */
.user-icon {
  background: white;
  border-radius: 50%;
  position: relative;
}

.user-icon::before {
  content: '';
  position: absolute;
  top: 3px;
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
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 8px;
  background: #5870f6;
  border-radius: 0 0 12px 12px;
}

/* أيقونة البحث */
.search-icon {
  position: relative;
}

.search-icon::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
}

.search-icon::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 6px;
  height: 2px;
  background: white;
  transform: rotate(45deg);
}

/* أيقونة القائمة */
.menu-icon {
  position: relative;
  background: transparent;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  background: #f5b64a;
  transition: 0.3s;
}

.menu-icon::before {
  top: 6px;
  box-shadow: 0 6px 0 #f5b64a;
}

.menu-icon::after {
  top: 12px;
}

/* أيقونة السهم */
.arrow-icon {
  position: relative;
}

.arrow-icon::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 5px;
  width: 10px;
  height: 2px;
  background: white;
}

.arrow-icon::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 6px;
  height: 6px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(-135deg);
}

/* باقي الستايلات */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.control-background {
  width: 100%;
  background: linear-gradient(45deg, #5870f6, #5c6074, #5870f6, #5c6074);
  background-size: 400% 400%;
  animation: gradientMove 4s ease-in-out infinite;
  position: relative;
  padding-bottom: 20px;
  border-bottom: 1px solid #222;
  z-index: 1000;
}

.control-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.control-background > * {
  position: relative;
  z-index: 2;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  animation: fadeInUp 0.8s ease;
}

.left-icons,
.right-icons {
  display: flex;
  align-items: center;
}

.left-icons a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.left-icons a:hover {
  color: #5865f2;
}

.logo img {
  height: 35px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

.nav {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 20%;
  color: white;
  animation: fadeInUp 1s ease;
  transition: all 0.3s ease;
}

.nav .pages {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.nav .pages a {
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav .pages a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav .pages a.router-link-active {
  border-bottom: 2px solid #5865f2;
}

.nav .btns {
  display: flex;
  gap: 10px;
}

.nav .btn {
  text-decoration: none;
  color: #4758b0;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav .btn:hover {
  background-color: #5865f2;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* موبايل */
@media screen and (max-width: 768px) {
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav .pages {
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
  
  .nav .pages a {
    display: block;
    text-align: center;
    padding: 10px;
    width: 100%;
  }
  
  .nav .btns {
    flex-direction: column;
    width: 100%;
  }
  
  .nav .btn {
    text-align: center;
    width: 100%;
  }

  .header {
    font-size: 18px;
  }
  
  .logo img {
    height: 30px;
  }
}

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
</style>