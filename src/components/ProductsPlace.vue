<script>
export default {
  data() {
    return {
      selectedCategory: 'الكل',
      cart: [],
      sidebarOpen: false,
      cartOpen: false,
      showNotification: false,
      lastAddedProduct: null,
      products: [
        {
          title: "برمجة سيرفر فايف ام",
          description: "من الصفر",
          price: 25,
          category: "فايف ام",
          image: "https://i.imgur.com/kAg2dIa.jpeg"
        },
        {
          title: "بوت ديسكورد",
          description: "مع مميزات عديدة",
          price: 50,
          category: "ديسكورد",
          image: "https://i.imgur.com/kAg2dIa.jpeg"
        },
        {
          title: "موقع خاص",
          description: "بلغات جديده",
          price: 30,
          category: "مواقع",
          image: "https://i.imgur.com/kAg2dIa.jpeg"
        },
        {
          title: "طلب مخصص",
          description: "حدد ما تريده",
          price: 100,
          category: "طلب خاص",
          image: "https://i.imgur.com/kAg2dIa.jpeg"
        }
      ]
    };
  },
  computed: {
    filteredproducts2() {
      if (this.selectedCategory === 'الكل') return this.products;
      return this.products.filter(p => p.category === this.selectedCategory);
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    filterProducts(category) {
      this.selectedCategory = category;
      this.sidebarOpen = false;
    },
    addToCart(product) {
      const existingItem = this.cart.find(item => item.title === product.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      
      this.lastAddedProduct = product;
      this.showNotification = true;
      
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    updateQuantity(index, newQuantity) {
      if (newQuantity <= 0) {
        this.removeFromCart(index);
      } else {
        this.cart[index].quantity = newQuantity;
      }
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      this.cartOpen = false;
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
      this.sidebarOpen = false;
    },
    clearCart() {
      this.cart = [];
      this.cartOpen = false;
    }
  }
};
</script>

<template>
  <div class="type animated-background">
    <!-- إشعار إضافة للسلة -->
    <div class="notification" :class="{ show: showNotification }">
      <div class="notification-content">
        <div class="notification-icon">🎉</div>
        <div class="notification-text">
          <h4>تمت الإضافة بنجاح!</h4>
          <p>{{ lastAddedProduct?.title }}</p>
        </div>
        <div class="notification-price">{{ lastAddedProduct?.price }} ريال</div>
      </div>
      <div class="notification-progress"></div>
    </div>

```
<!-- رأس الصفحة -->
<div class="header">
  <div class="cart-container">
    <div class="cart-info" @click="toggleCart" :class="{ active: cartOpen }">
      <div class="cart-icon">
        🛒
        <span class="cart-badge" v-if="cart.length > 0">{{ cart.length }}</span>
      </div>
      <span class="cart-text">السلة</span>
    </div>
  </div>
  <div class="menu-icon" @click="toggleSidebar">
    ☰
  </div>
</div>

<!-- قائمة السلة المنسدلة -->
<div class="cart-dropdown animated-background-dark" :class="{ open: cartOpen }">
  <div class="cart-header">
    <h3>🛒 سلة التسوق</h3>
    <button class="close-cart" @click="toggleCart">✕</button>
  </div>
  
  <div class="cart-items" v-if="cart.length > 0">
    <div class="cart-item" v-for="(item, index) in cart" :key="index">
      <img :src="item.image" alt="Product" class="cart-item-image">
      <div class="cart-item-details">
        <h4>{{ item.title }}</h4>
        <p>{{ item.price }} ريال</p>
        <div class="quantity-controls">
          <button @click="updateQuantity(index, item.quantity - 1)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(index, item.quantity + 1)">+</button>
        </div>
      </div>
      <button class="remove-item" @click="removeFromCart(index)">🗑️</button>
    </div>
  </div>
  
  <div class="empty-cart" v-else>
    <div class="empty-cart-icon">🛒</div>
    <p>السلة فارغة</p>
  </div>
  
  <div class="cart-footer" v-if="cart.length > 0">
    <div class="total-price">
      <strong>المجموع: {{ totalPrice }} ريال</strong>
    </div>
    <div class="cart-actions">
      <button class="clear-cart" @click="clearCart">إفراغ السلة</button>
      <button class="checkout">إتمام الشراء</button>
    </div>
  </div>
</div>

<!-- الشريط الجانبي --><!-- الشريط الجانبي -->
<div class="sidebar animated-background-dark" :class="{ open: sidebarOpen }">
  <h3>القائمة</h3>
  <ul>
    <li @click="filterProducts('الكل')">عرض الكل</li>
    <li @click="filterProducts('ديسكورد')">ديسكورد</li>
    <li @click="filterProducts('فايف ام')">فايف ام</li>
    <li @click="filterProducts('مواقع')">مواقع خاصه</li> <!-- ✅ تم التعديل هنا -->
    <li @click="filterProducts('طلب خاص')">طلب خاص</li>
  </ul>
</div>

<!-- فلترة المنتجات -->
<div class="filter">
  <ul>
    <li @click="filterProducts('الكل')" :class="{ active: selectedCategory === 'الكل' }">الكل</li>
    <li @click="filterProducts('ديسكورد')" :class="{ active: selectedCategory === 'ديسكورد' }">ديسكورد</li>
    <li @click="filterProducts('فايف ام')" :class="{ active: selectedCategory === 'فايف ام' }">فايف ام</li>
    <li @click="filterProducts('مواقع')" :class="{ active: selectedCategory === 'مواقع' }">مواقع خاصه</li> <!-- ✅ تم التعديل هنا -->
    <li @click="filterProducts('طلب خاص')" :class="{ active: selectedCategory === 'طلب خاص' }">طلب خاص</li>
  </ul>
</div>

<div class="cont">
  <div v-if="filteredproducts2.length === 0" class="no-products">
    لا توجد منتجات في هذا القسم حاليًا.
  </div>

  <div class="card animated-background-light" data-aos="fade-left" v-for="(product, index) in filteredproducts2" :key="index">
    <div class="card-image-container">
      <img :src="product.image" alt="Product Image" />
      <div class="card-overlay">
        <div class="card-quick-actions">
          <button class="quick-view">👁️</button>
          <button class="favorite">❤️</button>
        </div>
      </div>
    </div>
    <div class="card-content">
      <h3>{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <div class="price-tag">
        <span class="price">{{ product.price }} ريال</span>
        <span class="currency">SAR</span>
      </div>
      <button class="add-to-cart-btn" @click="addToCart(product)">
        <span class="btn-text">إضافة للسلة</span>
        <span class="btn-icon">🛒</span>
      </button>
    </div>
  </div>
</div>
```

  </div>
</template>

<style>
/* الانميشن المتحرك للخلفية */
.animated-background {
  background: linear-gradient(45deg, #5870f6, #5c6074, #3a4ed8, #7d8596, #5870f6, #5c6074);
  background-size: 600% 600%;
  animation: gradientMove 3s ease-in-out infinite;
  position: relative;
}

/* طبقة التعتيم */
.animated-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* المحتوى فوق طبقة التعتيم */
.animated-background > * {
  position: relative;
  z-index: 2;
}

/* كيفريمز الانميشن */
@keyframes gradientMove {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

/* للعناصر التي تحتاج تعتيم أكثر */
.animated-background-dark::before {
  background: rgba(0, 0, 0, 0.7);
}

/* للعناصر التي تحتاج تعتيم أقل */
.animated-background-light::before {
  background: rgba(0, 0, 0, 0.3);
}

/* إشعار إضافة للسلة */
.notification {
  position: fixed;
  top: -100px;
  right: 20px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 0;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 300px;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
}

.notification.show {
  top: 20px;
  animation: notificationBounce 0.6s ease-out;
}

@keyframes notificationBounce {
  0% { transform: translateY(-100px) scale(0.8); }
  50% { transform: translateY(10px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}

.notification-content {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

.notification-icon {
  font-size: 24px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.notification-text h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.notification-text p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.notification-price {
  margin-right: auto;
  font-weight: bold;
  font-size: 16px;
}

.notification-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.notification-progress::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  animation: progressBar 3s linear;
}

@keyframes progressBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Rubik', sans-serif;
  color: white;
}

.type {
  padding: 20px;
  min-height: 100vh;
}

/* رأس الصفحة المحسن */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
}

.cart-container {
  position: relative;
}

.cart-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.cart-info:hover,
.cart-info.active {
  background: rgba(88, 112, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(88, 112, 246, 0.4);
}

.cart-icon {
  position: relative;
  font-size: 24px;
  animation: cartBounce 2s infinite;
}

@keyframes cartBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: badgePulse 1s infinite;
}

@keyframes badgePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.cart-text {
  font-weight: bold;
  font-size: 16px;
}

/* قائمة السلة المنسدلة */
.cart-dropdown {
  position: fixed;
  top: -100%;
  left: 20px;
  right: 20px;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-height: 80vh;
  overflow-y: auto;
}

.cart-dropdown.open {
  top: 80px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-header h3 {
  margin: 0;
  color: white;
  font-size: 20px;
}

.close-cart {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 18px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.close-cart:hover {
  background: rgba(255, 77, 87, 0.3);
  transform: rotate(90deg);
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 15px;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: white;
}

.cart-item-details p {
  margin: 0 0 10px 0;
  color: #5870f6;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  background: rgba(88, 112, 246, 0.3);
  border: none;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.quantity-controls button:hover {
  background: rgba(88, 112, 246, 0.6);
}

.remove-item {
  background: rgba(255, 77, 87, 0.3);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.remove-item:hover {
  background: rgba(255, 77, 87, 0.6);
  transform: scale(1.1);
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.7);
}

.empty-cart-icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.total-price {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
  color: white;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.clear-cart,
.checkout {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.clear-cart {
  background: rgba(255, 77, 87, 0.3);
  color: white;
}

.clear-cart:hover {
  background: rgba(255, 77, 87, 0.6);
}

.checkout {
  background: rgba(76, 175, 80, 0.3);
  color: white;
}

.checkout:hover {
  background: rgba(76, 175, 80, 0.6);
}

/* تحسين البطاقات */
.card {
  color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 280px;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(88, 112, 246, 0.4);
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.3s;
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-quick-actions {
  display: flex;
  gap: 15px;
}

.quick-view,
.favorite {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
}

.quick-view:hover {
  background: rgba(88, 112, 246, 0.8);
  transform: scale(1.1);
}

.favorite:hover {
  background: rgba(255, 77, 87, 0.8);
  transform: scale(1.1);
}

.card-content {
  padding: 20px;
}

.card h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.card p {
  margin: 0 0 15px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.price-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #5870f6;
}

.currency {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #5870f6, #667eea);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(88, 112, 246, 0.4);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 18px;
  animation: cartShake 0.5s ease;
}

.add-to-cart-btn:hover .btn-icon {
  animation: cartShake 0.5s ease infinite;
}

@keyframes cartShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

/* باقي الأنماط */
.filter ul {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.filter ul li {
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.filter ul li:hover,
.filter ul li.active {
  background: rgba(88, 112, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(88, 112, 246, 0.3);
}

.cont {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
}

.menu-icon {
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.menu-icon:hover {
  color: #5870f6;
  background: rgba(88, 112, 246, 0.2);
  transform: scale(1.1);
}

.sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 250px;
  height: 100%;
  color: white;
  padding: 20px;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
  transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 998;
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar.open {
  right: 0;
}

.sidebar h3 {
  margin-bottom: 20px;
  color: white;
  font-size: 22px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  border-radius: 10px;
  margin-bottom: 5px;
}

.sidebar ul li:hover {
  background-color: rgba(88, 112, 246, 0.3);
  transform: translateX(-10px);
  box-shadow: 0 3px 10px rgba(88, 112, 246, 0.3);
}

.start {
  text-align: center;
  font-size: 3em;
  margin: 40px 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(88, 112, 246, 0.3); }
  to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(88, 112, 246, 0.6); }
}

.no-products {
  text-align: center;
  font-size: 1.2em;
  color: white;
  margin: 50px 0;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

/* استجابة للجوال */
@media (max-width: 768px) {
  .cont {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
    max-width: 350px;
  }

  .cart-dropdown {
    left: 10px;
    right: 10px;
  }
</style>