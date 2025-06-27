<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <a :href="discordLoginUrl" title="تسجيل الدخول عبر Discord" target="_blank" rel="noopener">
          <font-awesome-icon icon="user" />
        </a>
        <font-awesome-icon icon="search" @click="handleSearch" />
      </div>

```
  <div class="logo">
    <img :src="logo" alt="KhLi Store Logo" />
  </div>

  <div class="right-icons">
    <font-awesome-icon icon="bars" class="menu-icon" @click="toggleMenu" />
    <font-awesome-icon icon="arrow-right" class="arrow-icon" />
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
    // استخدام import بدلاً من require لتجنب مشاكل الـ bundler
    this.logo = require('@/assets/IMG_1254.png');
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMenu() {
      this.mobileMenuOpen = false;
    },
    handleSearch() {
      // إضافة منطق البحث هنا
      console.log('Search clicked');
    }
  }
}
</script>

<style scoped>
/* أنميشن الظهور */
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

/* خلفية متدرجة متحركة لمنطقة التحكم */
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

/* أنميشن الخلفية */
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

.left-icons i,
.right-icons i {
  margin: 0 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.left-icons i:hover,
.right-icons i:hover {
  transform: scale(1.1);
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

.menu-icon {
  color: #f5b64a;
  display: none;
}

.arrow-icon {
  color: white;
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
  .menu-icon {
    display: inline-block !important;
  }
  
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

/* تحسينات إضافية للأداء */
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