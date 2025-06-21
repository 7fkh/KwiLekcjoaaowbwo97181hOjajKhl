<template>
  <div class="nav home">
    <div class="pages fadeUpCustom">
      <a href="/">الرئيسية</a>
      <a href="#prices">المنتجات</a>
      <a href="/order">اطلب الان</a>
    </div>
    <div class="btns fadeUpCustom">
      <a class="btn" href="https://discord.gg/khli" target="_blank" rel="noopener">سيرفر الديسكورد</a>
      <a class="btn" href="https://linktr.ee/KhLiStoRe" target="_blank" rel="noopener">حسابات المتجر</a>
    </div>
  </div>
</template>

<style scoped>
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

.fadeUpCustom {
  animation: fadeInUp 0.8s ease;
}

.home {
  width: 100%;
  min-height: 15vh; /* height حسب navbar */
  background: linear-gradient(45deg, #5870f6, #5c6074, #5870f6, #5c6074);
  background-size: 400% 400%;
  animation: gradientMove 4s ease-in-out infinite;
  position: relative;
  overflow-x: hidden;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.home > * {
  position: relative;
  z-index: 2;
}

/* التنسيق العام للنافبار */
.nav {
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 20%;
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

/* ريسبونسف للجوال */
@media screen and (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 15px;
  }
}
</style>