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
    </div>

    <div class="feedbacks">
      <h1 class="section-title">شهادة عملاء خلي ستور || KhLiStoRe</h1>
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
/* أنميشن الظهور */
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

.header {
  background-color: #0d0d0d;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid #222;
  animation: fadeInUp 0.8s ease;
}

.left-icons i,
.right-icons i {
  margin: 0 8px;
  cursor: pointer;
  transition: 0.3s;
}

.left-icons a {
  color: white;
  text-decoration: none;
}

.left-icons a:hover i {
  color: #5865f2; /* لون ديسكورد */
}

.logo img {
  height: 35px;
  object-fit: contain;
}

.menu-icon {
  color: #f5b64a;
}

.arrow-icon {
  color: white;
}

.nav {
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 20%;
  background: transparent;
  color: white;
  animation: fadeInUp 1s ease;
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