<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default {
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Autoplay]
    };
  },
  data() {
    return {
      feedbackList: [
        {
          id: 1,
          username: "kg.r",
          avatar: "",
          text: "أفضل متجر حرفياً وأضمن سيرفر"
        },
        {
          id: 2,
          username: "naseer1319",
          avatar: "",
          text: "أنصحكم فيه، الأفضل بلا منازع"
        },
        {
          id: 3,
          username: "3we6",
          avatar: "",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو"
        }
      ]
    };
  }
}
</script>

<template>
  <main>
    <div class="home">
      <NavBar />
      <div class="text">
        <h1>خلي ستور</h1>
        <h2>متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونيه</h2>
        <div class="btns">
          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
          <RouterLink class="btn" to="/order">اطلب الان</RouterLink>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1"
              d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </div>

    <!-- قسم التقييمات -->
    <div class="feedbacks">
      <h1>شهادة عملائنا لنا - KhLi StoRe</h1>
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        class="testimonial-swiper"
      >
        <SwiperSlide v-for="feedback in feedbackList" :key="feedback.id">
          <div class="cont1 animated">
            <div class="top">
              <div class="left">
                <img :src="feedback.avatar || '/default-avatar.png'" />
                <p>{{ feedback.username }}</p>
              </div>
              <div class="right stars">
                <span v-for="n in 5" :key="n" class="star">★</span>
              </div>
            </div>
            <h3>{{ feedback.text }}</h3>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
/* النجوم */
.star {
  color: gold;
  font-size: 20px;
  margin-left: 2px;
}

.stars {
  display: flex;
  align-items: center;
}

/* حركة انميشن */
.animated {
  animation: fadeInUp 1s ease;
}

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

/* باقي التنسيقات من كودك الأصلي */
.cont img {
  border-radius: 8px;
  width: 40%;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  border-radius: 10px;
  gap: 30px;
}

.home svg {
  margin-top: auto;
}

.card h2 {
  font-size: 30px;
  color: #3e404e;
}

.card .info {
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}

.cont {
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 80px;
  justify-content: center;
  flex-wrap: wrap;
}

.card .price {
  width: 100%;
  direction: rtl;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
}

.prices h1,
.feedbacks h1,
.works h1 {
  color: #3e404e;
  font-size: 50px;
}

main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.prices,
.feedbacks,
.works {
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  background-size: cover;
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
  color: white;
  font-size: 55px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.425);
}

.text h2 {
  color: rgb(255, 255, 255);
  font-weight: lighter;
  width: 40%;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.377);
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
  color: #333;
  padding: 8px 30px;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.377);
}

.feedbacks img {
  border-radius: 100%;
  background-color: #3e404e;
  width: 50px;
  height: 50px;
  display: inline-block;
}

.cont1 {
  border-radius: 8px;
  background-color: whitesmoke;
  width: 400px;
  padding: 5px 10px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border-top: 4px solid #000000;
  border-bottom: 4px solid #000000;
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
    min-height: 100vh;
  }

  .home .text h2 {
    width: 90%;
  }

  .prices {
    margin-top: 200px;
  }

  .works img {
    width: 80%;
  }

  .cont1 {
    width: 90%;
  }

  .prices .card {
    width: 90%;
  }

  .card img {
    width: 200px;
  }

  .cont1 p {
    font-size: 20px;
  }

  .prices .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .prices .card h2,
  .prices .card .info,
  .prices .card .price {
    width: 300px;
  }

  .home {
    min-height: 120vh;
  }
}
</style>