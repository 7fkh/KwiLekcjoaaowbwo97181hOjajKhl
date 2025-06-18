<script>
export default {
  data() {
    return {
      products: [
        {
          title: "تصميم شعار احترافي",
          description: "شعار بجودة عالية",
          price: 25,
          category: "لوقوهات",
          image: "https://via.placeholder.com/250"
        },
        {
          title: "بوت ديسكورد متكامل",
          description: "مع مميزات عديدة",
          price: 50,
          category: "ديسكورد",
          image: "https://via.placeholder.com/250"
        },
        {
          title: "إدارة حسابات التواصل",
          description: "نشاط يومي ومتابعة",
          price: 30,
          category: "سوشيال ميديا",
          image: "https://via.placeholder.com/250"
        },
        {
          title: "طلب مخصص",
          description: "حدد ما تريده وسننفذه",
          price: 100,
          category: "طلب خاص",
          image: "https://via.placeholder.com/250"
        }
      ],
      filteredproducts2: [],
      selectedCategory: 'الكل',
    };
  },
  methods: {
    filterProducts(categoryname) {
      this.selectedCategory = categoryname;
      if (categoryname === 'الكل') {
        this.filteredproducts2 = this.products;
      } else {
        this.filteredproducts2 = this.products.filter(product => product.category === categoryname);
      }
    },
    addToCart() {
      this.$router.push('/order');
    }
  },
  mounted() {
    // عرض كل المنتجات عند التحميل
    this.filteredproducts2 = this.products;
  }
};
</script>
<template>
  <div class="type">
    <h1 class="start" data-aos="fade-up">المنتجات</h1>

    <div class="filter">
      <ul>
        <li @click="filterProducts('الكل')">الكل</li>
        <li @click="filterProducts('ديسكورد')">ديسكورد</li>
        <li @click="filterProducts('سوشيال ميديا')">سوشيال ميديا</li>
        <li @click="filterProducts('لوقوهات')">لوقوهات</li>
        <li @click="filterProducts('طلب خاص')">طلب خاص</li>
      </ul>
    </div>

    <div class="cont">
      <div
        class="card"
        data-aos="fade-left"
        v-for="(product, index) in filteredproducts2"
        :key="index"
      >
        <img :src="product.image" alt="Product Image" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <div class="btn">
          <a>
            <img src="@/assets/coin.png" alt="coin" class="coin-icon" />
            {{ product.price }} SAR
          </a>
          <a class="button" @click="addToCart">
            <font-awesome-icon :icon="['fas', 'cart-plus']" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #000000;
}

.filter {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.filter ul {
  list-style: none;
  width: 80%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  padding: 0;
}

.filter ul li {
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
}

.filter ul li:not(:last-child) {
  border-left: 1px solid #000000;
}

.filter ul li:hover {
  color: #000000;
}

.type {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.cont {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
}

.category {
  color: rgb(66, 66, 66);
}

.card {
  font-family: 'Rubik';
  width: 300px;
  min-height: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  text-align: end;
  gap: 5px;
  color: #000000;
  margin: 30px 0;
  transition: 1s;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.card:hover {
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(250, 250, 250, 0.329);
}

.card img {
  width: 250px;
  margin-bottom: 20px;
}

.card h3 {
  font-size: 22px;
  font-weight: bold;
}

.card p {
  font-size: 16px;
  color: #555;
}

.start {
  color: black;
  font-size: 50px;
  text-align: center;
}

.btn {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.button {
  color: #000000;
  cursor: pointer;
  background: none;
  margin-bottom: 18px;
}

.coin-icon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
  vertical-align: middle;
}

@media screen and (max-width: 768px) {
  .card {
    width: 90vw;
  }

  .card img {
    width: 250px;
    margin-bottom: 20px;
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
    flex-wrap: wrap;
    gap: 10px;
  }

  .filter ul li {
    font-size: 14px;
    padding: 5px;
  }
}
</style>