<template>
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
.nav {
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 20%;
  background: transparent; /* خلفية شفافة */
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