<template>
  <div class="header">
    <div class="left-icons">
      <i class="fas fa-user"></i>
      <i class="fas fa-search"></i>
    </div>

    <div class="logo">
      <img src="/assets/IMG_1254.png" alt="logo" />
    </div>

    <div class="right-icons">
      <i class="fas fa-bars menu-icon"></i>
      <i class="fas fa-arrow-right arrow-icon"></i>
    </div>
  </div>

  <!-- بقية كود الـ nav اللي عندك -->
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
</template>

<style scoped>
.header {
  background-color: #0d0d0d;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid #222;
}

.left-icons i,
.right-icons i {
  margin: 0 8px;
  cursor: pointer;
}

.logo img {
  height: 35px;
  object-fit: contain;
}

.menu-icon {
  color: #f5b64a; /* لون الخطوط الثلاث */
}

.arrow-icon {
  color: white;
}

.nav {
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 20%;
  background: transparent;
  color: white;
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