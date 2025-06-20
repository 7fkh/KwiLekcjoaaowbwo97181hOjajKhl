<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

// استيراد Swiper و Autoplay
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default {
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide
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
        <h2>متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الإلكترونية</h2>
        <div class="btns">
          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
          <RouterLink class="btn" to="/order">اطلب الآن</RouterLink>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1"
              d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </div>

    <div class="feedbacks-slider">
      <h1>شهادة عملائنا لنا - KhLi StoRe</h1>
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        class="testimonial-swiper"
      >
        <SwiperSlide v-for="feedback in feedbackList" :key="feedback.id">
          <div class="testimonial-card">
            <div class="top">
              <img :src="feedback.avatar || '/IMG_1500.webp'" />
              <p>{{ feedback.username }}</p>
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
/* أضف تنسيق CSS المناسب هنا حسب تنسيقاتك السابقة */
.feedbacks-slider {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feedbacks-slider h1 {
  font-size: 50px;
  color: #3e404e;
  margin-bottom: 30px;
}
.testimonial-swiper {
  width: 90%;
  max-width: 500px;
}
.testimonial-card {
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  text-align: right;
}
.testimonial-card .top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.testimonial-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3e404e;
}
.testimonial-card h3 {
  margin-top: 20px;
  font-size: 18px;
  color: #000;
}
</style>