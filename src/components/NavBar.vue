<template>
  <div class="nav">
    <img src="https://i.ibb.co/5YZdWRq/C6-FFEB54-BC01-4292-956-F-65-A205-FF3316.png">
    <div class="pages">
      <a href="/">الرئيسية</a>
      <a href="#prices">المنتجات</a>
      <a href="/order">اطلب الان</a>
    </div>
    <div class="btns">
      <a class="btn" href="https://discord.gg/bren">سيرفر الديسكورد</a>
      <a class="btn" href="
https://www.tiktok.com/@brenshop0?_t=8ml5v0rDaS8&_r=1">حساب التيكتوك</a>
    </div>
  </div>
</template>

<style scoped>
.nav{
  width:100%;
  height:15vh;
  display:flex;
  flex-direction:row-reverse;
  justify-content:center;
  align-items:center;
  gap:20%;
}

.nav .pages{
  display:flex;
  flex-direction:row-reverse;
  justify-content:center;
  align-items:center;
  gap:30px;
}

.nav .pages a{
  text-decoration:none;
  color:white;
  cursor:pointer;
}

.nav img{
  width:80px;
  height:100px;
}

/*
.nav .pages a{
  text-decoration:none;
  color:#3C6CFF;
  padding:5px 15px;
  border-top-left-radius:25px;
  border-bottom-right-radius:25px;
  background-color:white;
  cursor:pointer;
  transition:1s;
}*/

.nav .pages a:hover{
  border-bottom:1px solid white;
}

.nav .btn{
  text-decoration:none;
  color:#525359;
  padding:5px 15px;
  border-radius:8px;
  background-color:white;
  cursor:pointer;
  margin:0 10px;
}

@media screen and (max-width: 768px) {
  .nav{
    flex-direction:column;
  }
}
</style>
