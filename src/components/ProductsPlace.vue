<script>
export default {
  data() {
    return {
      selectedCategory: 'الكل',
      cart: [],
      products: [
        {
          title: "تصميم شعار احترافي",
          description: "شعار بجودة عالية",
          price: 25,
          category: "لوقوهات",
          image: "https://i.imgur.com/myww9Xu.png"
        },
        {
          title: "بوت ديسكورد متكامل",
          description: "مع مميزات عديدة",
          price: 50,
          category: "ديسكورد",
          image: "https://i.imgur.com/myww9Xu.png"
        },
        {
          title: "إدارة حسابات التواصل",
          description: "نشاط يومي ومتابعة",
          price: 30,
          category: "سوشيال ميديا",
          image: "https://i.imgur.com/myww9Xu.png"
        },
        {
          title: "طلب مخصص",
          description: "حدد ما تريده وسننفذه",
          price: 100,
          category: "طلب خاص",
          image: "https://i.imgur.com/myww9Xu.png"
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
    },
    addToCart(product) {
      this.cart.push(product);
      alert(`✅ تمت إضافة ${product.title} إلى السلة. عدد المنتجات: ${this.cart.length}`);
    }
  }
};
</script>

<template>
  <div class="type">
    <h1 class="start" data-aos="fade-up">المنتجات</h1>
    <p style="font-weight: bold; color: white;">🛒 عدد المنتجات في السلة: {{ cart.length }}</p>

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
            <img class="coin-icon" src="https://i.imgur.com/diTEzxH.png" />
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
  background: linear-gradient(-45deg, #3a7bd5, #00d2ff, #2193b0, #6dd5ed);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  font-family: 'Rubik', sans-serif;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.active {
  color: #000;
}

.type {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.filter {
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  gap: 15px;
}

.filter ul li {
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  background: #ffffff44;
  border-radius: 8px;
  transition: 0.3s;
}

.filter ul li:hover,
.filter ul li.active {
  background: #ffffffaa;
  color: #000;
}

.cont {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.card {
  background-color: #ffffffdd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: end;
  transition: 0.5s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: end;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  object-fit: cover;
}

.card h3 {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.card p {
  font-size: 16px;
  color: #555;
  margin: 0 0 10px 0;
}

.start {
  color: black;
  font-size: 50px;
  text-align: center;
}

.btn {
  margin-top: 10px;
  font-size: 20px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.button {
  color: #000000;
  cursor: pointer;
  background: none;
  font-size: 24px;
}

.coin-icon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
  vertical-align: middle;
}

.no-products {
  font-size: 20px;
  color: white;
  background-color: #00000066;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .card {
    width: 90vw;
  }

  .card h3 {
    font-size: 20px;
  }

  .card p {
    font-size: 15px;
  }

  .start {
    font-size: 30px;
  }

  .filter ul {
    gap: 10px;
  }

  .filter ul li {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>