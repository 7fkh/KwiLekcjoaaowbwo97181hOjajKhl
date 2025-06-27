<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay],
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
          username: "عبدالله الغامدي",
          avatar: "https://i.imgur.com/QP1AlsJ.jpeg",
          text: "الافضل ابو خلي و موثوقققق مره انصحكم فيه،"
        },
        {
          id: 4,
          username: "ابو زهره",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "خلي ستور امبراطور الساحة .."
        },
        {
          id: 5,
          username: "فهد عبدالله",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو"
        },
        {
          id: 6,
          username: "صالح المريسي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: " ابو خلي ما يقصر فنان بكل شي تبي بوتات واقعية تبي شوب تبي اي شي بس كلمه وجهز فلوسك"
        },
        {
          id: 7,
          username: "سالم التميمي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "متجر جميل وجيد اسعاره مقبوله وسريعين بالخدمه"
        }
      ]
    }
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }
}
</script>

<template>
  <main>
    <div class="home" data-aos="fade-up">
      <NavBar />
      <div class="text" data-aos="fade-up" data-aos-delay="200">
        <h1>خلي ستور</h1>
        <h2>متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونيه</h2>
        <div class="btns" data-aos="fade-up" data-aos-delay="400">
          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
          <RouterLink class="btn" to="/order">اطلب الان</RouterLink>
        </div>
      </div>
    </div>

    <div class="feedbacks" data-aos="fade-up" data-aos-delay="600">
      <h1 class="section-title">شهادة عملاء خلي ستور || KhLiStoRe</h1>
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        class="testimonial-swiper"
      >
        <SwiperSlide v-for="feedback in feedbackList" :key="feedback.id">
          <div class="testimonial-card">
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
/* تخصيص Swiper */
::v-deep(.swiper) {
  width: 100%;
  padding: 20px 0;
}

::v-deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.swiper-pagination-bullet-active) {
  background-color: #5865f2;
}

/* كارت التقييم */
.testimonial-card {
  background: #1c1c1c;
  color: white;
  padding: 25px;
  border-radius: 15px;
  max-width: 300px;
  margin: auto;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.stars {
  color: gold;
  font-size: 1rem;
  margin-bottom: 10px;
}

.feedback-text {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* نص الصفحة */
.text h1,
.text h2,
.text .btns {
  /* ستظهر الأنميشن عبر AOS */
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