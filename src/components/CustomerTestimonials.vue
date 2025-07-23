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
      ],
      stats: [
        {
          number: "1000+",
          label: "عميل راضي",
          svg: `<circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M50 50 Q35 50 35 65 Q35 80 50 80 Q65 80 65 65 Q65 50 50 50" fill="currentColor"/>
                <circle cx="30" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="70" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>`
        },
        {
          number: "500+",
          label: "مشروع مكتمل",
          svg: `<rect x="20" y="30" width="60" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M30 40 L70 40 M30 50 L60 50 M30 60 L65 60" stroke="currentColor" stroke-width="2"/>
                <path d="M70 20 L80 30 L70 40" stroke="currentColor" stroke-width="3" fill="currentColor"/>`
        },
        {
          number: "24/7",
          label: "دعم فني",
          svg: `<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M35 35 L65 65 M65 35 L35 65" stroke="currentColor" stroke-width="4"/>
                <text x="50" y="25" text-anchor="middle" font-size="12" fill="currentColor">24</text>
                <text x="50" y="85" text-anchor="middle" font-size="8" fill="currentColor">ساعة</text>`
        },
        {
          number: "5",
          label: "سنوات خبرة",
          svg: `<path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="currentColor"/>
                <circle cx="50" cy="50" r="8" fill="white"/>
                <text x="50" y="55" text-anchor="middle" font-size="10" fill="black">5</text>`
        }
      ]
    };
  },
  mounted() {
    this.observeElements();
  },
  methods: {
    observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
      });
    }
  }
}
</script>

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
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="user-avatar">
                <img class="user-img" :src="feedback.avatar" alt="avatar" />
                <div class="avatar-ring"></div>
              </div>
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
                  :style="{ 'animation-delay': (n * 0.1) + 's' }"
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
      <div class="stat-item" v-for="(stat, index) in stats" :key="index" :style="{ 'animation-delay': (index * 0.2) + 's' }">
        <div class="stat-icon">
          <svg viewBox="0 0 100 100" class="stat-svg" v-html="stat.svg"></svg>
        </div>
        <div class="stat-number" :data-target="stat.number">{{ stat.number }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Testimonials Section */
.feedbacks {
  padding: 5rem 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.feedbacks::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(22, 33, 62, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(26, 26, 46, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(10, 10, 10, 0.3) 0%, transparent 50%);
  z-index: 1;
  animation: backgroundPulse 10s ease-in-out infinite;
}

@keyframes backgroundPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.9; }
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
  animation: fadeInDown 1s ease-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.section-title {
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #16213e 50%, #ffffff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.section-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #0a0a0a, #1a1a2e, #16213e, #1a1a2e, #0a0a0a);
  background-size: 200% 100%;
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(22, 33, 62, 0.8);
  animation: dividerGlow 3s ease-in-out infinite;
}

@keyframes dividerGlow {
  0%, 100% {
    background-position: 0% 50%;
    box-shadow: 0 0 20px rgba(22, 33, 62, 0.8);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0 0 30px rgba(22, 33, 62, 1);
  }
}

.testimonials-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.testimonial-card {
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 46, 0.8) 50%, rgba(22, 33, 62, 0.9) 100%);
  color: #ffffff;
  border-radius: 25px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(20px);
  border: 1px solid transparent;
  background-clip: padding-box;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: auto;
  min-height: 350px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.testimonial-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #0a0a0a, #1a1a2e, #16213e, #1a1a2e, #0a0a0a);
  background-size: 400% 400%;
  border-radius: 25px;
  z-index: -1;
  opacity: 0;
  animation: borderGlow 4s linear infinite;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover .card-glow {
  opacity: 1;
}

@keyframes borderGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.testimonial-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(22, 33, 62, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.user-avatar {
  position: relative;
}

.user-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.avatar-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: linear-gradient(45deg, #0a0a0a, #1a1a2e, #16213e, #1a1a2e) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: ringRotate 3s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover .avatar-ring {
  opacity: 1;
}

@keyframes ringRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.quote-icon {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.5);
  animation: quoteFloat 2s ease-in-out infinite;
}

@keyframes quoteFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(5deg); }
}

.quote-svg {
  width: 100%;
  height: 100%;
}

.card-body {
  text-align: center;
  flex-grow: 1;
}

.username {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.stars {
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 3px;
}

.star {
  opacity: 0.4;
  transition: all 0.3s ease;
  transform: scale(0.8);
  animation: starPulse 2s ease-in-out infinite;
}

.star.filled {
  opacity: 1;
  transform: scale(1);
  text-shadow: 0 0 10px #ffd700;
}

@keyframes starPulse {
  0%, 100% { 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.1);
    filter: brightness(1.2);
  }
}

.testimonial-card:hover .star.filled {
  animation: starBounce 0.6s ease-in-out;
}

@keyframes starBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.feedback-text {
  font-size: 1rem;
  color: #eee;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
  position: relative;
}

.feedback-text::before,
.feedback-text::after {
  content: '"';
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
  position: absolute;
}

.feedback-text::before {
  top: -10px;
  left: -10px;
}

.feedback-text::after {
  bottom: -10px;
  right: -10px;
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
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.verified-badge:hover {
  background: rgba(76, 175, 80, 0.2);
  transform: scale(1.05);
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #4caf50;
  animation: checkPulse 2s ease-in-out infinite;
}

@keyframes checkPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
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
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 46, 0.6) 50%, rgba(22, 33, 62, 0.8) 100%);
  padding: 2rem;
  border-radius: 25px;
  width: 200px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.stat-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.stat-item:hover::before {
  left: 100%;
}

.stat-item:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(22, 33, 62, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.stat-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.stat-svg {
  width: 100%;
  height: 100%;
  color: white;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
  animation: iconGlow 3s ease-in-out infinite;
}

@keyframes iconGlow {
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
    transform: scale(1.1);
  }
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ffffff 0%, #16213e 50%, #ffffff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: numberShine 4s ease-in-out infinite;
}

@keyframes numberShine {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
  text-align: center;
  font-weight: 500;
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
    flex-direction: column;
    align-items: center;
  }
  
  .stat-item {
    width: 200px;
  }
}

/* Swiper Customization */
.testimonial-swiper {
  padding: 2rem 0;
}

.testimonial-swiper .swiper-slide {
  height: auto;
  display: flex;
  align-items: stretch;
}
</style>
