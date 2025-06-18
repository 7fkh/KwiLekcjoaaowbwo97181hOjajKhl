<script>
export default {
data() {
  return {
    selectedCategory: 'الكل',
    cart: [],
    sidebarOpen: false,
    products: [
      {
        title: "تصميم شعار احترافي",
        description: "شعار بجودة عالية",
        price: 25,
        category: "لوقوهات",
        image: "https://i.imgur.com/mywu.png"
      },
      {
        title: "بوت ديسكورد متكامل",
        description: "مع مميزات عديدة",
        price: 50,
        category: "ديسكورد",
        image: "https://i.imgur.com/myww.png"
      },
      {
        title: "إدارة حسابات التواصل",
        description: "نشاط يومي ومتابعة",
        price: 30,
        category: "سوشيال ميديا",
        image: "https://i.imgur.com/myw.png"
      },
      {
        title: "طلب مخصص",
        description: "حدد ما تريده وسننفذه",
        price: 100,
        category: "طلب خاص",
        image: "https://i.imgur.com/my.png"
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
    this.sidebarOpen = false; // إغلاق الشريط بعد الاختيار
  },
  addToCart(product) {
    this.cart.push(product);
    alert(`✅ تمت إضافة ${product.title} إلى السلة. عدد المنتجات: ${this.cart.length}`);
  },
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
</script>

<template>
  <div class="type">
    <!-- رأس الصفحة -->
    <div class="header">
      <div class="cart-info">
        🛒 عدد المنتجات: {{ cart.length }}
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
        <li @click="filterProducts('سوشيال ميديا')">سوشيال ميديا</li>
        <li @click="filterProducts('لوقوهات')">لوقوهات</li>
        <li @click="filterProducts('طلب خاص')">طلب خاص</li>
      </ul>
    </div>

    <h1 class="start" data-aos="fade-up">المنتجات</h1>

    <div class="filter">
      <ul>
        <li @click="filterProducts('الكل')" :class="{ active: selectedCategory === 'الكل' }">الكل</li>
        <li @click="filterProducts('ديسكورد')" :class="{ active: selectedCategory === 'ديسكورد' }">ديسكورد</li>
        <li @click="filterProducts('سوشيال ميديا')" :class="{ active: selectedCategory === 'سوشيال ميديا' }">سوشيال ميديا</li>
        <li @click="filterProducts('لوقوهات')" :class="{ active: selectedCategory === 'لوقوهات' }">لوقوهات</li>
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
  background: #4758b0; /* خلفية موحدة */
  font-family: 'Rubik', sans-serif;
}

.filter ul li {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  background: #4758b0; /* لون الزر */
  border-radius: 8px;
  color: white; /* لون النص */
  transition: 0.3s;
  border: none;
}

.filter ul li:hover,
.filter ul li.active {
  background: #3541a1; /* لون أغمق عند التحديد أو التمرير */
  color: #fff;
}

/* زر السلة */
.button {
  color: white;
  background-color: #4758b0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 20px;
  transition: 0.3s;
}

.button:hover {
  background-color: #3541a1;
}

/* تحسين عرض عدد المنتجات */
p {
  color: white;
  font-size: 18px;
}
</style>