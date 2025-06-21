<script>
export default {
  data() {
    return {
      selectedCategory: 'الكل',
      cart: [],
      sidebarOpen: false,
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
    }
  },
  methods: {
    filterProducts(category) {
      this.selectedCategory = category;
      this.sidebarOpen = false;
    },
    addToCart(product) {
      this.cart.push(product);
      alert(`✅ تمت إضافة ${product.title} إلى السلة. عدد المنتجات: ${this.cart.length}`);
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>

<template>
  <div class="type animated-background">
    <!-- رأس الصفحة -->
    <div class="header">
      <div class="cart-info">
        🛒 السله: {{ cart.length }}
      </div>
      <div class="menu-icon" @click="toggleSidebar">
        ☰
      </div>
    </div>

```
<!-- الشريط الجانبي -->
<div class="sidebar animated-background-dark" :class="{ open: sidebarOpen }">
  <h3>القائمة</h3>
  <ul>
    <li @click="filterProducts('الكل')">عرض الكل</li>
    <li @click="filterProducts('ديسكورد')">ديسكورد</li>
    <li @click="filterProducts('فايف ام')">فايف ام</li>
    <li @click="filterProducts('موقع خاص')">مواقع خاصه</li>
    <li @click="filterProducts('طلب خاص')">طلب خاص</li>
  </ul>
</div>

<h1 class="start" data-aos="fade-up">المنتجات</h1>

<div class="filter">
  <ul>
    <li @click="filterProducts('الكل')" :class="{ active: selectedCategory === 'الكل' }">الكل</li>
    <li @click="filterProducts('ديسكورد')" :class="{ active: selectedCategory === 'ديسكورد' }">ديسكورد</li>
    <li @click="filterProducts('فايف ام')" :class="{ active: selectedCategory === 'فايف ام' }">فايف ام</li>
    <li @click="filterProducts('موقع خاص')" :class="{ active: selectedCategory === 'موقع خاص' }">موقع خاص</li>
    <li @click="filterProducts('طلب خاص')" :class="{ active: selectedCategory === 'طلب خاص' }">طلب خاص</li>
  </ul>
</div>

<div class="cont">
  <div v-if="filteredproducts2.length === 0" class="no-products">
    لا توجد منتجات في هذا القسم حاليًا.
  </div>

  <div class="card animated-background-light" data-aos="fade-left" v-for="(product, index) in filteredproducts2" :key="index">
    <img :src="product.image" alt="Product Image" />
    <h3>{{ product.title }}</h3>
    <p>{{ product.description }}</p>
    <div class="btn">
      <a>
        <img class="coin-icon" src="" />
        {{ product.price }} SAR
      </a>
      <a class="button" @click="addToCart(product)">
        <font-awesome-icon :icon="['fas', 'cart-plus']" />
      </a>
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
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

/* للعناصر التي تحتاج تعتيم أكثر */
.animated-background-dark::before {
  background: rgba(0, 0, 0, 0.6);
}

/* للعناصر التي تحتاج تعتيم أقل */
.animated-background-light::before {
  background: rgba(0, 0, 0, 0.3);
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

.filter ul {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  flex-wrap: wrap;
}

.filter ul li {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 8px;
  color: white;
  transition: 0.3s;
  border: none;
  backdrop-filter: blur(5px);
}

.filter ul li:hover,
.filter ul li.active {
  background: rgba(102, 102, 102, 0.8);
}

p {
  color: white;
  font-size: 18px;
}

/* الحاوية التي تحتوي المنتجات */
.cont {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
}

/* البطاقة الواحدة */
.card {
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  text-align: center;
  width: 260px;
  flex-shrink: 0;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(88, 112, 246, 0.3);
}

/* الصورة داخل البطاقة */
.card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.card h3 {
  margin: 10px 0;
  font-size: 18px;
}

/* استجابة للجوال */
@media (max-width: 768px) {
  .cont {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }

  .card img {
    height: 180px;
  }
}

.btn {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  color: white;
  background-color: rgba(68, 68, 68, 0.8);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 20px;
  transition: 0.3s;
  backdrop-filter: blur(5px);
}

.button:hover {
  background-color: rgba(102, 102, 102, 0.8);
  box-shadow: 0 0 10px rgba(88, 112, 246, 0.5);
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: bold;
  color: white;
}

.menu-icon {
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
}

.menu-icon:hover {
  color: #5870f6;
}

.cart-info {
  font-size: 18px;
}

/* الشريط الجانبي */
.sidebar {
  position: fixed;
  top: 0;
  right: -250px;
  width: 220px;
  height: 100%;
  color: white;
  padding: 20px;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  z-index: 999;
  backdrop-filter: blur(15px);
}

.sidebar.open {
  right: 0;
}

.sidebar h3 {
  margin-bottom: 15px;
  color: white;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: 0.3s;
}

.sidebar ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(-5px);
}

.start {
  text-align: center;
  font-size: 2.5em;
  margin: 20px 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.no-products {
  text-align: center;
  font-size: 1.2em;
  color: white;
  margin: 50px 0;
}
</style>