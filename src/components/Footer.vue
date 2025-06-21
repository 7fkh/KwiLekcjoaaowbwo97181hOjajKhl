<script>
import logo from '@/assets/IMG_1254.png'
import businessLogo from '@/assets/IMG_1485.jpeg'
import gpay from '@/assets/IMG_1484.jpeg'
import applepay from '@/assets/IMG_1484.jpeg'
import stcpay from '@/assets/IMG_1483.jpeg'
import paypal from '@/assets/IMG_1482.jpeg'
import visa from '@/assets/IMG_1482.jpeg'
import mastercard from '@/assets/IMG_1481.jpeg'
import mada from '@/assets/IMG_1481.jpeg'

export default {
  data() {
    return {
      logo,
      businessLogo,
      gpay,
      applepay,
      stcpay,
      paypal,
      visa,
      mastercard,
      mada
    }
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <img :src="logo" alt="شعار خلي ستور" class="footer-logo" />

      <p class="desc">
        ماذا تريد نقدمه لك بأسرع وقت وبأفضل جوده <br />
        مع خلي ستور حـلمـك يـتحـقق  ✨
      </p>

      <h3 class="section-title">بنود مهمه</h3>
      <ul class="links">
        <li></li>
        <li>خلي ستور يُحذركم من المقلدين لدينا علامه تجاريه واحده وهي خلي ستور فقط لسنا مسؤولين عن اي متجر اخر</li>
        <li>لانعوض الا بحالتين تأخير طلبك اكثر من٤ايام او في حال وصلك طلب اخر غير طلبك</li>
        <li>سياسة الاسترجاع والطلب كامله تتواجد بالديسكورد</li>
      </ul>

      <h3 class="section-title">خدمة العملاء</h3>
      <div class="contact-btns">
        <a href="تتعدل" class="contact-button">الواتساب</a>
        <a href="https://www.instagram.com/khlistore?igsh=eGdxcTVpYzVpNWlr&utm_source=qr" target="_blank" class="contact-button">انستقرام</a>
      </div>

      <div class="trusted">
        <hr />
        <p>طرق الدفع </p>
      </div>

      <div class="payment-icons">
        <img :src="gpay" alt="Google Pay" />
        <img :src="applepay" alt="Apple Pay" />
        <img :src="stcpay" alt="STC Pay" />
        <img :src="paypal" alt="PayPal" />
        <img :src="visa" alt="Visa" />
        <img :src="mastercard" alt="MasterCard" />
        <img :src="mada" alt="Mada" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0c0c0c;
  color: white;
  padding: 40px 20px;
  text-align: center;
  font-family: "Cairo", sans-serif;
}

.footer-logo {
  width: 80px;
  margin-bottom: 15px;
}

.desc {
  font-size: 16px;
  color: #ddd;
  line-height: 1.8;
  margin-bottom: 30px;
}

.section-title {
  color: #e3b04b;
  margin: 20px 0 10px;
  font-size: 18px;
}

.links {
  list-style: none;
  padding: 0;
  margin: 0 auto 30px;
  max-width: 250px;
}

.links li {
  margin: 8px 0;
  color: #eee;
  cursor: pointer;
}

.links li:hover {
  color: #e3b04b;
}

.contact-btns {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.contact-button {
  background-color: #8b2c2c;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.contact-button:hover {
  background-color: #a34040;
}

.trusted {
  margin: 20px 0;
  color: #bbb;
}

.trusted-img {
  width: 50px;
  margin-top: 10px;
}

.payment-icons {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.payment-icons img {
  width: 40px;
  height: auto;
}
</style>