<template>
  <main>
    <div class="home">
      <NavBar />
      <div class="text">
        <h1>خلي ستور</h1>
        <h2>
          متجر رقمي متخصص في تقديم خدمات البرمجة وتطوير الحلول التقنية والمواقع
          الالكترونية
        </h2>
        <div class="btns">
          <RouterLink class="btn" to="/products">المنتجات</RouterLink>
          <RouterLink class="btn" to="/order">اطلب الآن</RouterLink>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <div class="feedbacks">
      <h1>
        تـقـييمـات المـتـجـر
        <font-awesome-icon :icon="['fas', 'comment']" />
      </h1>
      <div class="cont">
        <div
          v-for="(item, index) in feedbacks"
          :key="index"
          class="cont1"
          @click="handleClick(item)"
          :class="{ active: selectedFeedback && selectedFeedback.user === item.user }"
        >
          <div class="top">
            <div class="left">
              <img src="" />
              <p>{{ item.user }}</p>
            </div>
            <div class="right">
              <p>⭐️⭐️⭐️⭐️⭐️</p>
            </div>
          </div>
          <h3>{{ item.comment }}</h3>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      selectedFeedback: null,
      feedbacks: [
        {
          user: '.11m',
          comment: 'قسم بالله عسل قليله بحقه رجال أخلاق وأسلوب وصبر علي مدري كيف'
        },
        {
          user: '_9nj',
          comment: 'الأفضل و الأسرع  أسلوب واخلاق ومضمون'
        },
        {
          user: '0.pa',
          comment: 'انا متعامل مع الرجال و اسلوبه مرا حلو + اسعار بوتاته رخيصه رغم الميزات الي فيها انصح التعامُل مع الرجال و من افضل المبرمجين الي شريت بوتات مـن عندهم'
        }
      ]
    };
  },
  methods: {
    handleClick(feedback) {
      this.selectedFeedback = feedback;
      alert(`تم اختيار تقييم من: ${feedback.user}`);
    }
  }
};
</script>

<style scoped>
/* ... باقي التنسيقات الأصلية هنا ... */

.cont1 {
  border-radius: 8px;
  background-color: whitesmoke;
  width: 400px;
  padding: 5px 10px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border-top: 4px solid #4758b0;
  border-bottom: 4px solid #4758b0;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.cont1:hover {
  transform: scale(1.02);
  background-color: #f0f0f0;
}

.cont1.active {
  border: 2px solid #4758b0;
  background-color: #d9e1ff;
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

/* باقي التنسيقات الخاصة بالأزرار والترويسة والصفحة */
</style>