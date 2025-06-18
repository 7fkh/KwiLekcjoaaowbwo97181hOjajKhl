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
          image: "https://i.imgur.com/V6gL51v.png"
        },
        {
          title: "بوت ديسكورد متكامل",
          description: "مع مميزات عديدة",
          price: 50,
          category: "ديسكورد",
          image: "https://i.imgur.com/V6gL51v.png"
        },
        {
          title: "إدارة حسابات التواصل",
          description: "نشاط يومي ومتابعة",
          price: 30,
          category: "سوشيال ميديا",
          image: "https://i.imgur.com/V6gL51v.png"
        },
        {
          title: "طلب مخصص",
          description: "حدد ما تريده وسننفذه",
          price: 100,
          category: "طلب خاص",
          image: "https://i.imgur.com/V6gL51v.png"
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
  <div class="video-background">
    <video autoplay muted loop playsinline>
      <source src="https://i.imgur.com/jfVh12B.mp4" type="video/mp4" />
    </video>
  </div>

  <div class="overlay-content">
    <div class="type">
      <h1 class="start" data-aos="fade-up">المنتجات</h1>
      <div class="cont">
        <div class="card" data-aos="fade-left" v-for="(product, index) in products" :key="index">
          <img :src="product.image" alt="Product Image" />
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <div class="btn">
            <a>{{ product.price }} SAR</a>
            <a class="button" @click="addToCart">
              <font-awesome-icon :icon="['fas', 'cart-plus']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-background {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-content {
  position: relative;
  z-index: 1;
}

/* بقية التنسيق الخاص بك يبقى كما هو */
.type {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

/* مثال بسيط لبقية التنسيقات التي ذكرتها */
.card {
  background-color: rgba(255, 255, 255, 0.85); /* شفافية بسيطة لتحسين وضوح البطاقة على الخلفية */
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease-in-out;
}
</style>