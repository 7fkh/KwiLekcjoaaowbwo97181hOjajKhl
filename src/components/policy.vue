<template>
  <div class="refund-policy-page">
    <div class="background-animation">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="policy-container">
      <h1 class="page-title">سياسة الاسترداد</h1>

      <div class="policy-grid">
        <div class="policy-box">
          <h2>1. أحكام عامة</h2>
          <p>
            نحن نلتزم بتوفير خدمات عالية الجودة، ونمنح عملائنا الحق في طلب استرداد المبلغ خلال فترة محددة وفقًا لشروط معينة. هذه السياسة تهدف لضمان رضا العملاء وشفافية التعامل.
          </p>
        </div>

        <div class="policy-box">
          <h2>2. مدة صلاحية الاسترداد</h2>
          <p>
            يمكن للعميل طلب استرداد خلال 7 أيام من تاريخ الشراء، بشرط عدم استخدام الخدمة أو استهلاك المنتج. بعد انتهاء هذه المدة، لا يمكن المطالبة باسترداد إلا في الحالات الاستثنائية.
          </p>
        </div>

        <div class="policy-box">
          <h2>3. الحالات غير المؤهلة للاسترداد</h2>
          <p>
            لا يمكن استرداد المبالغ في الحالات التالية: اكتمال تنفيذ الخدمة، استلام المنتج الرقمي، إساءة استخدام الخدمة، أو وجود استخدام جزئي للمنتج أو الاشتراك.
          </p>
        </div>

        <div class="policy-box">
          <h2>4. خطوات تقديم طلب الاسترداد</h2>
          <p>
            يجب على العميل التواصل مع الدعم وتقديم رقم الطلب وتفاصيل سبب الاسترداد. سيتم مراجعة الطلب خلال 48 ساعة، والتواصل مع العميل بنتيجة المراجعة.
          </p>
        </div>

        <div class="policy-box">
          <h2>5. مدة معالجة المبلغ</h2>
          <p>
            في حال الموافقة على طلب الاسترداد، يتم تحويل المبلغ خلال 7 إلى 14 يوم عمل حسب طريقة الدفع المستخدمة. قد تختلف المدة حسب البنك أو مزود الخدمة.
          </p>
        </div>

        <div class="policy-box">
          <h2>6. الرسوم الإدارية (إن وجدت)</h2>
          <p>
            بعض الطلبات قد تتطلب خصم رسوم إدارية بسيطة عند الاسترداد، ويتم توضيح هذه الرسوم مسبقًا أثناء عملية الشراء أو في شروط الاستخدام.
          </p>
        </div>

        <div class="policy-box">
          <h2>7. الحق في رفض الطلب</h2>
          <p>
            نحتفظ بحق رفض طلب الاسترداد إذا تبين أن هناك خرقًا للشروط أو إساءة استخدام أو استغلال غير قانوني للخدمة. نحرص على العدالة في جميع الحالات.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.refund-policy-page {
  position: relative;
  padding: 50px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: backgroundMove 15s ease infinite;
  color: #fff;
  font-family: 'Cairo', sans-serif;
  overflow-x: hidden;
}

.page-title {
  text-align: center;
  font-size: 36px;
  color: #00bfff;
  margin-bottom: 40px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.6);
}

.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  z-index: 2;
  position: relative;
}

.policy-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.policy-box:hover {
  transform: translateY(-5px);
}

.policy-box h2 {
  color: #00bfff;
  font-size: 20px;
  margin-bottom: 15px;
}

.policy-box p {
  font-size: 15px;
  line-height: 1.8;
  color: #ddd;
}

/* Floating animation */
.background-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  animation: float 8s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}
.shape-2 {
  width: 80px;
  height: 80px;
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}
.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 10%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes backgroundMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 28px;
  }
}
</style>
