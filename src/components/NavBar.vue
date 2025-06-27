<template>
  <div class="control-background">
    <div class="header">
      <div class="left-icons">
        <a :href="discordLoginUrl" title="تسجيل الدخول عبر Discord">
          <i class="fas fa-user"></i>
        </a>
        <i class="fas fa-search"></i>
      </div>

      <div class="logo">
        <img :src="logo" alt="logo" />
      </div>

      <div class="right-icons">
        <i class="fas fa-bars menu-icon"></i>
        <i class="fas fa-arrow-right arrow-icon"></i>
      </div>
    </div>

    <div class="nav">
      <div class="pages">
        <a href="/">الرئيسية</a>
        <a href="#products">المنتجات</a>
        <a href="/order">اطلب الان</a>
      </div>
      <div class="btns">
        <a class="btn" href="https://discord.gg/khli" target="_blank" rel="noopener">سيرفر الديسكورد</a>
        <a class="btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">حسابات المتجر</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discordLoginUrl:
        'https://discord.com/oauth2/authorize?client_id=1343787703585476629&response_type=code&redirect_uri=https%3A%2F%2Fkhli-store.vercel.app%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds.join',
      logo: require('@/assets/IMG_1254.png')
    };
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
  z-index: 0;
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
  transition: 0.3s;
}

.left-icons a {
  color: white;
  text-decoration: none;
}

.left-icons a:hover i {
  color: #5865f2;
}

.logo img {
  height: 35px;
  object-fit: contain;
}

.menu-icon {
  color: #f5b64a;
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
}

.nav .pages a:hover {
  border-bottom: 1px solid white;
}

.nav .btns {
  display: flex;
  gap: 10px;
}

.nav .btn {
  text-decoration: none;
  color: #4758b0;
  padding: 5px 15px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.nav .btn:hover {
  background-color: #3c6cff;
  color: white;
}

/* موبايل */
@media screen and (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 15px;
  }

  .header {
    flex-direction: column;
    font-size: 18px;
    gap: 10px;
  }
}
</style>