<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-container">
      <div class="animation-container">
        <div class="pulse-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <div class="ring ring-4"></div>
        </div>

```
    <div class="center-orb">
      <div class="orb-inner">
        <div class="orb-core"></div>
        <div class="sparkles">
          <div class="sparkle sparkle-1"></div>
          <div class="sparkle sparkle-2"></div>
          <div class="sparkle sparkle-3"></div>
          <div class="sparkle sparkle-4"></div>
          <div class="sparkle sparkle-5"></div>
          <div class="sparkle sparkle-6"></div>
        </div>
      </div>
    </div>
    
    <div class="floating-particles">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
      <div class="particle particle-6"></div>
    </div>
  </div>
  
  <!-- شريط التقدم -->
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-text">{{ Math.round(progress) }}%</div>
  </div>

  <!-- نص التحميل -->
  <div class="loading-text">
    <p>{{ loadingText }}</p>
  </div>
</div>
```

  </div>
</template>

<script>
export default {
  name: 'KhliLoading', // اسم أفضل
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: 'جاري التحميل...'
    },
    duration: {
      type: Number,
      default: 5000 // 5 ثواني
    }
  },
  data() {
    return {
      progress: 0,
      progressInterval: null
    }
  },
  watch: {
    isLoading(newVal) {
      if (newVal) {
        this.startProgress()
      } else {
        this.resetProgress()
      }
    }
  },
  beforeUnmount() {
    // تنظيف الـ interval عند إزالة المكون
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
  },
  methods: {
    startProgress() {
      this.progress = 0
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
      }
      
      this.progressInterval = setInterval(() => {
        this.progress += 2
        if (this.progress >= 100) {
          clearInterval(this.progressInterval)
          setTimeout(() => {
            this.$emit('loading-complete')
          }, 200)
        }
      }, this.duration / 50)
    },
    resetProgress() {
      this.progress = 0
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
        this.progressInterval = null
      }
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.animation-container {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* الحلقات النابضة */
.pulse-rings {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  border: 2px solid #5870f6;
  border-radius: 50%;
  opacity: 0;
  animation: pulseRing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.ring-1 {
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.ring-2 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0.5s;
}

.ring-3 {
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1s;
}

.ring-4 {
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1.5s;
}

@keyframes pulseRing {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* الكرة المركزية */
.center-orb {
  position: relative;
  width: 50px;
  height: 50px;
  z-index: 2;
}

.orb-inner {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  background: linear-gradient(45deg, #5870f6, #7c3aed, #5870f6);
  background-size: 200% 200%;
  animation: gradientShift 2s ease-in-out infinite;
  box-shadow: 
    0 0 20px rgba(88, 112, 246, 0.6),
    0 0 40px rgba(88, 112, 246, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.orb-core {
  position: absolute;
  top: 15%;
  left: 20%;
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: coreGlow 1.5s ease-in-out infinite alternate;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes coreGlow {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* البريق المتحرك */
.sparkles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: sparkleFloat 3s linear infinite;
}

.sparkle-1 { top: 10%; left: 30%; animation-delay: 0s; }
.sparkle-2 { top: 20%; right: 25%; animation-delay: 0.5s; }
.sparkle-3 { bottom: 15%; right: 30%; animation-delay: 1s; }
.sparkle-4 { bottom: 25%; left: 20%; animation-delay: 1.5s; }
.sparkle-5 { top: 40%; left: 10%; animation-delay: 2s; }
.sparkle-6 { top: 60%; right: 15%; animation-delay: 2.5s; }

@keyframes sparkleFloat {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

/* الجسيمات العائمة */
.floating-particles {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #5870f6;
  border-radius: 50%;
  animation: particleFloat 4s linear infinite;
}

.particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
.particle-2 { top: 30%; right: 20%; animation-delay: 0.7s; }
.particle-3 { bottom: 25%; right: 15%; animation-delay: 1.4s; }
.particle-4 { bottom: 35%; left: 25%; animation-delay: 2.1s; }
.particle-5 { top: 60%; left: 5%; animation-delay: 2.8s; }
.particle-6 { top: 70%; right: 10%; animation-delay: 3.5s; }

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
  }
  25% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  75% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) scale(0.5);
  }
}

/* شريط التقدم */
.progress-container {
  width: 200px;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(88, 112, 246, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5870f6, #7c3aed, #5870f6);
  background-size: 200% 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
  animation: progressShine 2s linear infinite;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressGlow 2s linear infinite;
}

@keyframes progressShine {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes progressGlow {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.progress-text {
  margin-top: 10px;
  color: #5870f6;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(88, 112, 246, 0.5);
}

.loading-text {
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
}

.loading-text p {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(88, 112, 246, 0.5);
}

/* تأثيرات إضافية للشاشات الصغيرة */
@media (max-width: 768px) {
  .animation-container {
    width: 120px;
    height: 120px;
  }
  
  .center-orb {
    width: 40px;
    height: 40px;
  }
  
  .progress-container {
    width: 160px;
  }
  
  .loading-text p {
    font-size: 14px;
  }
}
</style>
