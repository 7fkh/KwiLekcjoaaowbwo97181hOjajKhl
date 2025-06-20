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
          username: "خالد الحربي",
          avatar: "src/assets/IMG_1500.webp",
          text: " رهييييب 👏 10/10"
        },
        {
          id: 2,
          username: "naseer1319",
          avatar: "src/assets/IMG_1500.webp",
          text: "أنصحكم فيه، الأفضل بلا منازع"
        },
        {
          id: 3,
          username: "3we6",
          avatar: "src/assets/IMG_1500.webp",
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
          <div class="testimonial-card animated">
            <img class="user-img" :src="feedback.avatar" alt="avatar" />
            <p class="username">{{ feedback.username }}</p>
            <div class="stars">
              <span v-for="n in 5" :key="n" class="star">★</span>
            </div>
            <p class="feedback-text">{{ feedback.text }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <Footer />
  </main>
</template>

<style scoped>
/* تصميم بطاقة التقييم */
.testimonial-card {
  background-color: #3e3e3e;
  color: white;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 1s ease;
}

.user-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-top: -50px;
  border: 5px solid #3e3e3e;
  object-fit: cover;
}

.username {
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
}

.stars {
  margin: 10px 0;
}

.star {
  color: gold;
  font-size: 22px;
  margin: 0 2px;
}

.feedback-text {
  font-size: 18px;
  color: #ccc;
}

/* حركة الدخول */
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

/* خلفية الموقع */
.home {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  background-size: cover;
}

.feedbacks h1 {
  color: white;
  font-size: 40px;
  margin-bottom: 40px;
}

/* باقي تنسيقات الواجهة */
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

@media screen and (max-width: 768px) {
  .text h2 {
    width: 90%;
  }

  .testimonial-card {
    width: 95%;
  }

  .user-img {
    width: 70px;
    height: 70px;
  }

  .username {
    font-size: 18px;
  }

  .feedback-text {
    font-size: 16px;
  }
}
</style>