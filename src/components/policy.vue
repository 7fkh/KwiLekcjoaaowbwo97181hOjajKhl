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
          <h2>1. شروط الاسترداد العامة</h2>
          <p>
            نحن نسعى لتقديم أفضل الخدمات لعملائنا، ومع ذلك، نقوم أنه قد تكون هناك حالات تستدعي طلب استرداد المبلغ. يمكن طلب الاسترداد خلال 7 أيام من تاريخ الشراء، شريطة أن تكون الخدمة لم تُستخدم بعد.
          </p>
        </div>

        <div class="policy-box">
          <h2>2. الخدمات غير القابلة للاسترداد</h2>
          <p>
            بعض الخدمات غير قابلة للاسترداد بطبيعتها، وتشمل: الخدمات الرقمية التي تم تسليمها بالكامل، والاشتراكات المستخدمة جزئيًا، والخدمات المخصصة التي تم تنفيذها وفقًا لمتطلبات العميل. سيتم توضيح هذه الخدمات قبل الشراء.
          </p>
        </div>

        <div class="policy-box">
          <h2>3. إجراءات طلب الاسترداد</h2>
          <p>
            يمكن تقديم طلب استرداد عبر التواصل مع الدعم الفني، مع ذكر رقم الطلب وسبب الاسترداد. سيتم مراجعة الطلب خلال 48 ساعة، وسيتم إعلامك بالنتيجة.
          </p>
        </div>

        <div class="policy-box">
          <h2>4. وقت معالجة الاسترداد</h2>
          <p>
            عند الموافقة على الطلب، يتم معالجة عملية الاسترداد خلال 7 إلى 14 يوم عمل كحد أقصى، وذلك حسب وسيلة الدفع المستخدمة.
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

/* Responsive */
@media (max-width: 600px) {
  .page-title {
    font-size: 28px;
  }
}
</style>
