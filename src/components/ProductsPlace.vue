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
    }
  },
  methods: {
    filterProducts(category) {
      this.selectedCategory = category;
      this.sidebarOpen = false;
    },
    addToCart(product) {
      this.cart.push(product);
      this.lastAddedProduct = product;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2500);
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    }
  }
};
</script>

<template>
  <div class="type home">
    <!-- إشعار الإضافة للسلة -->
    <div v-if="showNotification" class="notification-card fadeUpCustom">
      ✅ تمت إضافة {{ lastAddedProduct.title }} إلى السلة!
    </div>

    <!-- رأس الصفحة -->
    <div class="header">
      <div class="cart-icon" @click="toggleCart" title="عرض السلة">
        🛒 ({{ cart.length }})
      </div>
      <div class="menu-icon" @click="toggleSidebar" title="القائمة">
        ☰
      </div>
    </div>

    <!-- نافذة السلة -->
    <div v-if="cartOpen" class="cart-popup fadeUpCustom">
      <h3>السلة</h3>
      <div v-if="cart.length === 0">السلة فارغة.</div>
      <ul v-else>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.title }} - {{ item.price }} SAR
        </li>
      </ul>
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

    <h1 class="start fadeUpCustom">المنتجات</h1>

    <!-- فلاتر التصنيفات -->
    <div class="filter fadeUpCustom">
      <ul>
        <li @click="filterProducts('الكل')" :class="{ active: selectedCategory === 'الكل' }">الكل</li>
        <li @click="filterProducts('ديسكورد')" :class="{ active: selectedCategory === 'ديسكورد' }">ديسكورد</li>
        <li @click="filterProducts('فايف ام')" :class="{ active: selectedCategory === 'فايف ام' }">فايف ام</li>
        <li @click="filterProducts('موقع خاص')" :class="{ active: selectedCategory === 'موقع خاص' }">موقع خاص</li>
        <li @click="filterProducts('طلب خاص')" :class="{ active: selectedCategory === 'طلب خاص' }">طلب خاص</li>
      </ul>
    </div>

    <!-- عرض المنتجات -->
    <div class="cont">
      <div v-if="filteredproducts2.length === 0" class="no-products">
        لا توجد منتجات في هذا القسم حاليًا.
      </div>

      <div class="card fadeUpCustom" v-for="(product, index) in filteredproducts2" :key="index">
        <img :src="product.image" alt="Product Image" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <div class="btn">
          <a>
            {{ product.price }} SAR
          </a>
          <a class="button" @click="addToCart(product)">
            ➕ أضف للسلة
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
  font-family: 'Rubik', sans-serif;
  color: white;
  background: black;
}

.fadeUpCustom {
  animation: fadeUpCustom 0.8s ease;
}

@keyframes fadeUpCustom {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.home {
  background: linear-gradient(270deg, #0f0f0f, #1a1a1a, #222, #1a1a1a, #0f0f0f);
  background-size: 400% 400%;
  animation: gradientMove 10s ease infinite;
  min-height: 100vh;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.btn:hover {
  transition: all 0.3s ease;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
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
  background: #333;
  border-radius: 8px;
  color: white;
  transition: 0.3s;
}

.filter ul li:hover,
.filter ul li.active {
  background: #666;
}

p {
  color: white;
  font-size: 18px;
}

.cont {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
}

.card {
  background: #111;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px #222;
  text-align: center;
  width: 260px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 5px 15px #555;
}

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
  font-size: 18px;
  transition: 0.3s;
  cursor: pointer;
}

.button:hover {
  background-color: #666;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  font-weight: bold;
  color: white;
  gap: 15px;
}

.menu-icon,
.cart-icon {
  font-size: 22px;
  background: #333;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
}

.cart-icon:hover,
.menu-icon:hover {
  background: #555;
}

.cart-popup {
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: #111;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 15px #222;
  width: 280px;
  max-height: 350px;
  overflow-y: auto;
  z-index: 1000;
}

.cart-popup h3 {
  margin-bottom: 10px;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid #444;
  padding-bottom: 6px;
}

.cart-popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-popup ul li {
  padding: 8px 0;
  border-bottom: 1px solid #333;
  font-size: 16px;
  color: #ddd;
}

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

.notification-card {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #222;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px #444;
  font-weight: bold;
  z-index: 10000;
  user-select: none;
}
</style>