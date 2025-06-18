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
  <div class="type">
    <!-- رأس الصفحة -->
    <div class="header">
      <div class="cart-info">
        🛒 السله: {{ cart.length }}
      </div>
      <div class="menu-icon" @click="toggleSidebar">
        ☰
      </div>
    </div>

    <!-- الشريط الجانبي -->
    <div class="sidebar" :class="{ open: sidebarOpen }">
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

      <div class="card" data-aos="fade-left" v-for="(product, index) in filteredproducts2" :key="index">
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
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: #000; /* خلفية سوداء */
  font-family: 'Rubik', sans-serif;
  color: white;
}

.type {
  padding: 20px;
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
  background: #333; /* رصاصي */
  border-radius: 8px;
  color: white;
  transition: 0.3s;
  border: none;
}

.filter ul li:hover,
.filter ul li.active {
  background: #666; /* رصاصي أفتح عند التحديد */
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
  background: #111;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px #222;
  text-align: center;
  width: 260px; /* حجم البطاقة العرضي */
  flex-shrink: 0;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* الصورة داخل البطاقة */
.card img {
  width: 100%;
  height: 170px; /* تصغير الصورة */
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
  background-color: #444;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 20px;
  transition: 0.3s;
}

.button:hover {
  background-color: #666;
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
  background-color: #111;
  color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(255, 255, 255, 0.1);
  transition: right 0.3s ease;
  z-index: 999;
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
  border-bottom: 1px solid #444;
  color: white;
}

.sidebar ul li:hover {
  background-color: #333;
}
</style>