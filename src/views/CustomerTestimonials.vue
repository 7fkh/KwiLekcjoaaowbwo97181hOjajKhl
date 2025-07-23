<template>
  <div class="feedbacks">
    <div class="section-header">
      <div class="section-icon">
        <svg viewBox="0 0 100 100" class="testimonial-icon">
          <path d="M20 30 Q20 20 30 20 Q40 20 40 30 Q40 40 30 45 L25 50 L35 50 Q45 50 45 40 Q45 20 25 20 Q5 20 5 40 Q5 60 25 60 L35 60" stroke="currentColor" stroke-width="3" fill="none"/>
          <path d="M60 30 Q60 20 70 20 Q80 20 80 30 Q80 40 70 45 L65 50 L75 50 Q85 50 85 40 Q85 20 65 20 Q45 20 45 40 Q45 60 65 60 L75 60" stroke="currentColor" stroke-width="3" fill="none"/>
        </svg>
      </div>
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
          <div class="testimonial-card">
            <div class="card-header">
              <img class="user-img" :src="feedback.avatar" alt="avatar" />
              <div class="quote-icon">
                <svg viewBox="0 0 50 50" class="quote-svg">
                  <path d="M15 35 Q10 30 10 20 Q10 10 20 10 Q25 10 25 15 Q25 20 20 25 L15 30 L20 30 Q30 30 30 20 Q30 10 20 10 Q10 10 10 20 Q10 30 15 35 Z" fill="currentColor" opacity="0.3"/>
                  <path d="M35 35 Q30 30 30 20 Q30 10 40 10 Q45 10 45 15 Q45 20 40 25 L35 30 L40 30 Q50 30 50 20 Q50 10 40 10 Q30 10 30 20 Q30 30 35 35 Z" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
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
                <svg viewBox="0 0 24 24" class="check-icon">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span>عميل محقق</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    <!-- Stats Section -->
    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 100 100" class="stat-svg">
            <circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
            <path d="M50 50 Q35 50 35 65 Q35 80 50 80 Q65 80 65 65 Q65 50 50 50" fill="currentColor"/>
            <circle cx="30" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="70" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-number">1000+</div>
        <div class="stat-label">عميل راضي</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 100 100" class="stat-svg">
            <rect x="20" y="30" width="60" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
            <path d="M30 40 L70 40 M30 50 L60 50 M30 60 L65 60" stroke="currentColor" stroke-width="2"/>
            <path d="M70 20 L80 30 L70 40" stroke="currentColor" stroke-width="3" fill="currentColor"/>
          </svg>
        </div>
        <div class="stat-number">500+</div>
        <div class="stat-label">مشروع مكتمل</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 100 100" class="stat-svg">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="3"/>
            <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" stroke-width="4"/>
            <text x="50" y="25" text-anchor="middle" font-size="12" fill="currentColor">24</text>
            <text x="50" y="85" text-anchor="middle" font-size="8" fill="currentColor">ساعة</text>
          </svg>
        </div>
        <div class="stat-number">24/7</div>
        <div class="stat-label">دعم فني</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 100 100" class="stat-svg">
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="currentColor"/>
            <circle cx="50" cy="50" r="8" fill="white"/>
            <text x="50" y="55" text-anchor="middle" font-size="10" fill="black">5</text>
          </svg>
        </div>
        <div class="stat-number">5</div>
        <div class="stat-label">سنوات خبرة</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';

export default {
  name: 'CustomerTestimonials',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay, EffectCards],
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
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "أنصحكم فيه, ماكان عندي قيمة الطلب كامل ونقص المبلغ الله يسعده",
          rating: 5
        },
        {
          id: 3,
          username: "عبدالله الغامدي",
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "الافضل ابو خلي و موثوقققق مره انصحكم فيه،",
          rating: 5
        },
        {
          id: 4,
          username: "ابو زهره",
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "خلي ستور امبراطور الساحة ..",
          rating: 5
        },
        {
          id: 5,
          username: "فهد عبدالله",
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "أي شيء تبغاه إن شاء الله موجود هناك وضمان مرة أسطوري وتعامل حلو",
          rating: 5
        },
        {
          id: 6,
          username: "صالح المريسي",
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "ابو خلي ما يقصر فنان بكل شي تبي بوتات واقعية تبي شوب تبي اي شي بس كلمه وجهز فلوسك",
          rating: 5
        },
        {
          id: 7,
          username: "سالم التميمي",
          avatar: "https://imgur.com/a/Sx0ZZLU",
          text: "متجر جميل وجيد اسعاره مقبوله وسريعين بالخدمه",
          rating: 5
        }
      ]
    };
  }
}
</script>

<style scoped>
/* Testimonials Section */
.feedbacks {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  position: relative;
}

.feedbacks::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.feedbacks > * {
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.section-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.testimonial-icon {
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
}

.section-title {
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.section-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(30, 64, 175, 0.5);
}

.testimonials-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.testimonial-card {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: auto;
  min-height: 350px;
}

.testimonial-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.user-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.quote-icon {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.5);
}

.quote-svg {
  width: 100%;
  height: 100%;
}

.card-body {
  margin-top: 1rem;
  text-align: center;
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.stars {
  color: gold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.star {
  margin: 0 2px;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.star.filled {
  opacity: 1;
}

.feedback-text {
  font-size: 1rem;
  color: #eee;
  line-height: 1.6;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  text-align: center;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #4caf50;
}

/* Stats Section */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  padding: 2rem 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  width: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-10px);
}

.stat-icon {
  width: 50px;
  height: 50px;
}

.stat-svg {
  width: 100%;
  height: 100%;
  color: white;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

/* Media Queries */
@media (max-width: 768px) {
  .feedbacks {
    padding: 3rem 0;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .testimonial-card {
    min-height: 300px;
    padding: 1.5rem;
  }
  
  .stats-container {
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .stat-item {
    width: 150px;
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-item {
    width: 100%;
  }
}
</style>
