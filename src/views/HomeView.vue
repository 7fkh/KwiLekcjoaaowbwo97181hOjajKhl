<template>
  <main>
    <!-- Hero Section -->
    <div class="home">
      <div class="floating-elements">
        <div class="floating-element" v-for="n in 6" :key="n"></div>
      </div>

      <NavBar />

      <div class="hero-content">
        <div class="text" :class="{ 'visible': isVisible }">
          <div class="logo-container">
            <h1 class="main-title">خلي ستور</h1>
            <div class="title-underline"></div>
          </div>

          <h2 class="subtitle">
            متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع الالكترونيه
          </h2>

          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">💻</div>
              <span>تطوير المواقع</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🔧</div>
              <span>الحلول التقنية</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <span>خدمة سريعة</span>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>تصفح للأسفل</span>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="feedbacks">
      <div class="section-header">
        <h1 class="section-title">شهادة عملاء خلي ستور</h1>
        <p class="section-subtitle">KhLiStoRe Customer Reviews</p>
        <div class="section-divider"></div>
      </div>

      <div class="testimonials-container">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :effect="'cards'"
          :grab-cursor="true"
          class="testimonial-swiper"
          :breakpoints="{
            768: {
              slidesPerView: 2,
              effect: 'slide'
            },
            1024: {
              slidesPerView: 3,
              effect: 'slide'
            }
          }"
        >
          <SwiperSlide v-for="feedback in feedbackList" :key="feedback.id">
            <div class="testimonial-card fade-in-up">
              <div class="card-header">
                <img class="user-img" :src="feedback.avatar" alt="avatar" />
                <div class="quote-icon">"</div>
              </div>

              <div class="card-body">
                <p class="username">{{ feedback.username }}</p>
                <div class="stars">
                  <span 
                    v-for="n in 5" 
                    :key="n" 
                    class="star"
                    :class="{ 'filled': n <= feedback.rating }"
                  >★</span>
                </div>
                <p class="feedback-text">{{ feedback.text }}</p>
              </div>

              <div class="card-footer">
                <div class="verified-badge">
                  <span>✓ عميل محقق</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Stats Section -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">1000+</div>
          <div class="stat-label">عميل راضي</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">مشروع مكتمل</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">دعم فني</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">5</div>
          <div class="stat-label">سنوات خبرة</div>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';

export default {
  components: {
    NavBar,
    Footer,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay, EffectCards],
      isVisible: false,
      feedbackList: [
        {
          id: 1,
          username: "عوض الحربي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "10/10 افضل متجر باذن الله مب اخر مره",
          rating: 5
        },
        {
          id: 2,
          username: "سعد مرتضى",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أنصحكم فيه, ماكان عندي قيمة الطلب كامل ونقص المبلغ الله يسعده",
          rating: 5
        },
        {
          id: 3,
          username: "عبدالله الغامدي",
          avatar: "https://i.imgur.com/QP1AlsJ.jpeg",
          text: "الافضل ابو خلي و موثوقققق مره انصحكم فيه،",
          rating: 5
        },
        {
          id: 4,
          username: "ابو زهره",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "خلي ستور امبراطور الساحة ..",
          rating: 5
        },
        {
          id: 5,
          username: "فهد عبدالله",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو",
          rating: 5
        },
        {
          id: 6,
          username: "صالح المريسي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "ابو خلي ما يقصر فنان بكل شي تبي بوتات واقعية تبي شوب تبي اي شي بس كلمه وجهز فلوسك",
          rating: 5
        },
        {
          id: 7,
          username: "سالم التميمي",
          avatar: "https://i.imgur.com/COjYjpR.png",
          text: "متجر جميل وجيد اسعاره مقبوله وسريعين بالخدمه",
          rating: 5
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
  }
}
</script>

<style scoped>
.fade-in-up {
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
</style>