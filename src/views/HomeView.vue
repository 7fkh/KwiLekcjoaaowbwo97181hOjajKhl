<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      discordUser: null,
      feedbackList: [
        {
          id: 1,
          username: ".11m",
          avatar: "",
          text: "قسم بالله عسل قليله بحقه رجال أخلاق وأسلوب وصبر علي مدري كيف"
        },
        {
          id: 2,
          username: "_9nj",
          avatar: "",
          text: "الأفضل و الأسرع  أسلوب واخلاق ومضمون"
        },
        {
          id: 3,
          username: "0.pa",
          avatar: "",
          text: "انا متعامل مع الرجال و اسلوبه مرا حلو + اسعار بوتاته رخيصه رغم الميزات انصح بالتعامل"
        }
      ]
    };
  },
  computed: {
    discordLoginUrl() {
      const CLIENT_ID = "ضع_هنا_CLIENT_ID";
      const REDIRECT_URI = encodeURIComponent("https://your-vercel-app.vercel.app");
      return `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
    }
  },
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      try {
        const response = await fetch(`https://your-vercel-app.vercel.app/api/auth/discord?code=${code}`);
        const data = await response.json();
        this.discordUser = data.user;
        localStorage.setItem("discordUser", JSON.stringify(data.user));
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("فشل تسجيل الدخول", err);
      }
    } else {
      const saved = localStorage.getItem("discordUser");
      if (saved) this.discordUser = JSON.parse(saved);
    }
  }
}
</script>

<template>
  <main>
    <div class="home">
      <NavBar />

      <div class="login-header">
        <div v-if="!discordUser">
          <a :href="discordLoginUrl" class="discord-btn">🔐 تسجيل الدخول عبر ديسكورد</a>
        </div>
        <div v-else class="profile">
          <img
            :src="`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`"
            alt="Avatar"
            class="avatar"
          />
          <p>مرحباً، {{ discordUser.username }}#{{ discordUser.discriminator }}</p>
        </div>
      </div>

      <div class="text">
        <h1>خلي ستور</h1>
        <h2>متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونية</h2>
        <div class="btns">
          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
          <RouterLink class="btn" to="/order">اطلب الآن</RouterLink>
        </div>
      </div>

      <!-- موجة بلون رمادي غامق بدل الأبيض -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#222" fill-opacity="1"
          d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </div>

    <div class="feedbacks">
      <h1>تـقـييمـات المـتـجـر <font-awesome-icon :icon="['fas', 'comment']" /></h1>
      <div class="cont">
        <div v-for="feedback in feedbackList" :key="feedback.id" class="cont1" data-aos="fade-right" data-aos-duration="1500">
          <div class="top">
            <div class="left">
              <img :src="feedback.avatar" />
              <p>{{ feedback.username }}</p>
            </div>
            <div class="right">
              <p>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
          </div>
          <h3>{{ feedback.text }}</h3>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
:root {
  --main-bg: #000;
  --main-text: #fff;
  --button-bg: #555;
  --button-text: #fff;
  --card-bg: #111;
  --highlight: #4758b0;
}

body {
  background-color: var(--main-bg);
  margin: 0;
  padding: 0;
  font-family: "Cairo", sans-serif;
}

a {
  color: var(--button-text);
}

main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--main-bg);
  color: var(--main-text);
}

.home {
  width: 100%;
  height: 100vh;
  background-color: var(--main-bg);
  background-size: cover;
}

.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
}

.discord-btn {
  padding: 10px 25px;
  background-color: var(--button-bg);
  color: var(--button-text);
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.discord-btn:hover {
  background-color: #777;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.text {
  text-align: center;
  margin-top: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.text h1 {
  color: var(--main-text);
  font-size: 55px;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.2);
}

.text h2 {
  color: var(--main-text);
  font-weight: lighter;
  width: 40%;
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
}

.btns {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.btn {
  text-decoration: none;
  color: var(--button-text);
  padding: 8px 30px;
  border-radius: 25px;
  background-color: var(--button-bg);
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.2);
}

.feedbacks {
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feedbacks h1 {
  color: var(--highlight);
  font-size: 55px;
}

.cont {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.cont1 {
  border-radius: 8px;
  background-color: var(--card-bg);
  width: 400px;
  padding: 5px 10px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border-top: 4px solid var(--highlight);
  border-bottom: 4px solid var(--highlight);
  color: var(--main-text);
}

.top {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.left {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.top img {
  width: 40px;
  margin-right: 10px;
}

.cont1 h3 {
  text-align: end;
  margin-top: 60px;
  padding: 5px 5px;
}

@media screen and (max-width: 768px) {
  .home svg {
    display: none;
  }

  .home {
    min-height: 120vh;
  }

  .text h2 {
    width: 90%;
  }

  .cont1 {
    width: 90%;
  }
}
</style>