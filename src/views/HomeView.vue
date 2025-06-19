<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default{
  components:{
    NavBar,
    Footer
  },
  data() {
    return {
      images:[
      ]
    };
  },
}
</script>

‏<template>
‏  <main>
‏    <div class="home">
‏      <NavBar />

      <!-- ✅ شريط تسجيل الدخول -->
‏      <div class="login-header">
‏        <div v-if="!discordUser">
‏          <a :href="discordLoginUrl" class="discord-btn">🔐 تسجيل الدخول عبر ديسكورد</a>
‏        </div>
‏        <div v-else class="profile">
‏          <img
‏            :src="`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`"
‏            alt="Avatar"
‏            class="avatar"
          />
‏          <p>مرحباً، {{ discordUser.username }}#{{ discordUser.discriminator }}</p>
‏        </div>
‏      </div>

      <!-- النص الرئيسي -->
‏      <div class="text">
‏        <h1>خلي ستور</h1>
‏        <h2>متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونية</h2>
‏        <div class="btns">
‏          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
‏          <RouterLink class="btn" to="/order">اطلب الآن</RouterLink>
‏        </div>
‏      </div>

      <!-- موجة -->
‏      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
‏        <path fill="#ffffff" fill-opacity="1"
‏          d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
‏      </svg>
‏    </div>

    <!-- تقييمات -->
‏    <div class="feedbacks">
‏      <h1>تـقـييمـات المـتـجـر <font-awesome-icon :icon="['fas', 'comment']" /></h1>
‏      <div class="cont">
‏        <div v-for="feedback in feedbackList" :key="feedback.id" class="cont1" data-aos="fade-right" data-aos-duration="1500">
‏          <div class="top">
‏            <div class="left">
‏              <img :src="feedback.avatar" />
‏              <p>{{ feedback.username }}</p>
‏            </div>
‏            <div class="right">
‏              <p>⭐️⭐️⭐️⭐️⭐️</p>
‏            </div>
‏          </div>
‏          <h3>{{ feedback.text }}</h3>
‏        </div>
‏      </div>
‏    </div>

‏    <Footer />
‏  </main>
‏</template>

‏<script>
‏import NavBar from "@/components/NavBar.vue";
‏import Footer from "@/components/Footer.vue";

‏export default {
‏  components: { NavBar, Footer },
‏  data() {
‏    return {
‏      discordUser: null,
‏      feedbackList: [
        {
‏          id: 1,
‏          username: ".11m",
‏          avatar: "",
‏          text: "قسم بالله عسل قليله بحقه رجال أخلاق وأسلوب وصبر علي مدري كيف"
        },
        {
‏          id: 2,
‏          username: "_9nj",
‏          avatar: "",
‏          text: "الأفضل و الأسرع  أسلوب واخلاق ومضمون"
        },
        {
‏          id: 3,
‏          username: "0.pa",
‏          avatar: "",
‏          text: "انا متعامل مع الرجال و اسلوبه مرا حلو + اسعار بوتاته رخيصه رغم الميزات انصح بالتعامل"
        }
      ]
    };
  },
‏  computed: {
‏    discordLoginUrl() {
‏      const CLIENT_ID = "ضع_هنا_CLIENT_ID";
‏      const REDIRECT_URI = encodeURIComponent("https://your-vercel-app.vercel.app"); // غيره إذا كنت على localhost
‏      return `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
    }
  },
‏  async mounted() {
‏    const params = new URLSearchParams(window.location.search);
‏    const code = params.get("code");

‏    if (code) {
‏      try {
‏        const response = await fetch(`https://your-vercel-app.vercel.app/api/auth/discord?code=${code}`);
‏        const data = await response.json();
‏        this.discordUser = data.user;
‏        localStorage.setItem("discordUser", JSON.stringify(data.user));
‏        window.history.replaceState({}, document.title, "/");
‏      } catch (err) {
‏        console.error("فشل تسجيل الدخول", err);
      }
‏    } else {
‏      const saved = localStorage.getItem("discordUser");
‏      if (saved) this.discordUser = JSON.parse(saved);
    }
  }
};
‏</script>


<style scoped>
.cont img{
  border-radius:8px;
  width:40%;
}

.card{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:20px 20px;
  border-radius:10px;
  gap:30px;
}

.home svg{
  margin-top:auto;
}

.card h2{
  font-size:30px;
  color:#525359;
}

.card .info{
  width:100%;
  font-size:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:end;
}

.cont{
  margin-top:100px;
  width:100%;
  display:flex;
  flex-direction:row;
  gap:80px;
  justify-content:center;
  flex-wrap:wrap;
}

.card .price{
  width:100%;
  direction:rtl;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:start;
  gap:10px;
}

.prices h1,.feedbacks h1,.works h1{
  color:#4758b0;
  font-size:55px;
}

main{
  width:100%;
  height:100%;
  overflow:hidden;
}

.prices{
  margin-top:100px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.feedbacks{
  margin-top:100px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.works{
  margin-top:100px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
}

.home{
  width:100%;
  height:100vh;
  background-color:#4758b0;
  background-size:cover;
}

.text{
  text-align:center;
  margin-top:150px;
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:8px;
}

.text h1{
  color:white;
  font-size:55px;
  text-shadow:1px 1px 3px rgba(0, 0, 0, 0.425);
}

.text h2{
  color:rgb(255, 255, 255);
  font-weight:lighter;
  width:40%;
  text-shadow:2px 2px 5px rgba(0, 0, 0, 0.377);
}

.btns{
  margin-top:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:20px;
}

.btn{
  text-decoration:none;
  color:#4758b0;
  padding:8px 30px;
  border-radius:25px;
  background-color:white;
  cursor:pointer;
  box-shadow:2px 2px 5px rgba(0, 0, 0, 0.377);
}

.feedbacks img{
  border-radius:100%;
  background-color:#4758b0;
  width:50px;
  height:50px;
  display:none;
}

.cont1{
  border-radius:8px;
  background-color:whitesmoke;
  width:400px;
  padding:5px 10px;
  height:250px;
  display:flex;
  flex-direction:column;
  border-top:4px solid #4758b0;
  border-bottom:4px solid #4758b0;
}

.top{
  margin-top:15px;
  display:flex;
  justify-content:space-around;
  align-items:center;
}

.left{
  display:flex;
  justify-content:space-around;
  align-items:center;
}

.top img{
  width:40px;
  margin-right:10px;
}

.cont1 h3{
  text-align:end;
  margin-top:60px;
  padding:5px 5px;
}

@media screen and (max-width: 768px) {
  .home svg{
    display:none;
  }

  .home{
    min-height:100vh;
  }

  .home .text h2{
    width:90%;
  }

  .prices{
    margin-top:200px;
  }

  .works img{
    width:80%;
  }
  .cont1{
    width:90%;
  }

  .prices .card{
    width:90%;
  }
  .card img{
    width:200px;
  }
  .cont1 p{
    font-size:20px;
  }

  .prices .card{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
  }

  .prices .card h2,
  .prices .card .info,
  .prices .card .price{
    width:300px;
  }

  .home{
    min-height:120vh;
  }
}
</style>