<template>
  <footer>
      <div class="left">
          <img src="https://cdn.discordapp.com/attachments/1324222259878957098/1376569206203748352/Photoroom__.png?ex=6835cd7a&is=68347bfa&hm=3e45d130487f89ecd912518f22f6939b89d15a1a7b7358d9499c077e25811b36&" alt="KhLi logo">
          <h4>© KhLi StoRe</h4>
      </div>
      <list>
          <nav>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="#prices">Products</a>
          <a href="https://discord.gg/khli">Contact</a>
      </nav>
      <nav>
          <a href="/order">الصفحه الرئيسيه</a>
          <a href="/">عن خلي ستور</a>
          <a href="#prices">المنتجات</a>
          <a href="https://discord.gg/khli">السوشل ميديا</a>
      </nav>
      </list>
  </footer>
</template>

<style scoped>

list{
  display:flex;
  gap:60px;
}

footer {
  margin-top:200px;
  background-color:#5870f6;
          color: #fff;
          padding: 20px 0;
          text-align: center;
          width: 100%;
          min-height: 40vh;
          display: flex;
          flex-direction:row;
          flex-wrap:wrap;
          gap:80px;
          justify-content:space-around;
          align-items: center;
      }

      nav{
          display:flex;
          flex-direction:column;
          gap:30px;
      }

      footer a {
          color: #fff;
          text-decoration: none;
          margin: 0 10px;
      }

      footer img {
          width:400px;
          height:400px;
          margin-left:10px;
      }

      @media (max-width:768px){
        footer img {
          width:200px;
          height:200px;
        }
      }
</style>
