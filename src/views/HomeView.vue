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
          username: "عوض الحربي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "10/10 افضل متجر باذن الله مب اخر مره"
        },
        {
          id: 2,
          username: "سعد مرتضى",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أنصحكم فيه, ماكان عندي قيمة الطلب كامل ونقص المبلغ الله يسعده"
        },
        {
          id: 3,
          username: "فهد عبدالله",
          avatar: "https://i.imgur.com/COjYjpR.png",
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
      <!-- تم حذف عنصر SVG هنا -->
    </div>

    <!-- قسم التقييمات -->
    <div class="feedbacks">
      <h1 class="section-title">شهادة عملائنا || KhLiStoRe</h1>
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
/* عنوان التقييمات */
.section-title {
  color: #ffffff;
  font-size: 40px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: bold;
}

/* تصميم الخلفيه والتقييم */
.testimonial-card {
  background-color: #000000;
  color: #000000;
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
  color: #ffffff;
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

.feedbacks {
  padding: 50px 0;
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
  background-color: #3498DB;
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