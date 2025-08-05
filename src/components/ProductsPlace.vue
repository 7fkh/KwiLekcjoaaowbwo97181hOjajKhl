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
      searchQuery: '',
      products: [
        {
          id: 1,
          title: "برمجة سيرفر فايف ام",
          description: "برمجة سيرفر فايف ام من الصفر مع جميع المميزات المطلوبة والسكريبتات الأساسية",
          price: 250,
          originalPrice: 350,
          category: "فايف ام",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.8,
          reviews: 24,
          featured: true
        },
        {
          id: 2,
          title: "بوت ديسكورد متقدم",
          description: "بوت ديسكورد مع مميزات متقدمة ولوحة تحكم شاملة وأوامر مخصصة",
          price: 150,
          originalPrice: 200,
          category: "ديسكورد",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.9,
          reviews: 18,
          featured: false
        },
        {
          id: 3,
          title: "موقع إلكتروني احترافي",
          description: "تصميم وبرمجة موقع إلكتروني احترافي متجاوب مع جميع الأجهزة",
          price: 800,
          originalPrice: 1000,
          category: "مواقع",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.7,
          reviews: 32,
          featured: true
        },
        {
          id: 4,
          title: "تطبيق موبايل مخصص",
          description: "تصميم وبرمجة تطبيق موبايل مخصص لنظامي iOS و Android",
          price: 1500,
          originalPrice: 2000,
          category: "تطبيقات",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 5.0,
          reviews: 15,
          featured: true
        },
        {
          id: 5,
          title: "نظام إدارة المحتوى",
          description: "نظام إدارة محتوى متكامل مع لوحة تحكم متقدمة وإدارة المستخدمين",
          price: 600,
          originalPrice: 800,
          category: "مواقع",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.6,
          reviews: 28,
          featured: false
        },
        {
          id: 6,
          title: "خدمات FiveM إضافية",
          description: "إضافات وتحسينات وسكريبتات مخصصة لسيرفر FiveM",
          price: 100,
          originalPrice: 150,
          category: "فايف ام",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.5,
          reviews: 41,
          featured: false
        },
        {
          id: 7,
          title: "متجر إلكتروني متكامل",
          description: "متجر إلكتروني متكامل مع نظام دفع ولوحة تحكم شاملة",
          price: 1200,
          originalPrice: 1500,
          category: "مواقع",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.9,
          reviews: 22,
          featured: true
        },
        {
          id: 8,
          title: "أتمتة وسكريبتات",
          description: "سكريبتات أتمتة مخصصة لتسهيل المهام اليومية والإدارية",
          price: 300,
          originalPrice: 400,
          category: "أتمتة",
          image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
          rating: 4.4,
          reviews: 19,
          featured: false
        }
      ],
      categories: [
        { id: 'الكل', name: 'جميع المنتجات' },
        { id: 'ديسكورد', name: 'بوتات ديسكورد' },
        { id: 'فايف ام', name: 'خدمات FiveM' },
        { id: 'مواقع', name: 'المواقع الإلكترونية' },
        { id: 'تطبيقات', name: 'تطبيقات الموبايل' },
        { id: 'أتمتة', name: 'الأتمتة والسكريبتات' }
      ]
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.selectedCategory === 'الكل' 
        ? this.products 
        : this.products.filter(p => p.category === this.selectedCategory);
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    },
    featuredProducts() {
      return this.products.filter(p => p.featured).slice(0, 4);
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    cartItemsCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    },
    totalSavings() {
      return this.cart.reduce((savings, item) => {
        const itemSaving = (item.originalPrice - item.price) * item.quantity;
        return savings + itemSaving;
      }, 0);
    }
  },
methods: {
  filterProducts(category) {
    this.selectedCategory = category;
    this.sidebarOpen = false;
  },

  goToCheckout() {
    if (this.cart.length === 0) return; // تأكد أن السلة غير فارغة

    const cartData = JSON.stringify(this.cart);
    this.$router.push({ name: 'OrderView', query: { cart: cartData } });
    this.cartOpen = false; // إغلاق السلة بعد التحويل
  },

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }

    this.lastAddedProduct = product;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
  },

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
    }
  },

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen && this.cartOpen) {
      this.cartOpen = false;
    }
  },

  toggleCart() {
    this.cartOpen = !this.cartOpen;
    if (this.cartOpen && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  },

  closeSidebar() {
    this.sidebarOpen = false;
  },

  closeCart() {
    this.cartOpen = false;
  },

  clearCart() {
    this.cart = [];
    this.cartOpen = false;
  },

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }

    return stars;
  },

  formatPrice(price) {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(price);
  },

  getCategoryIcon(categoryId) {
    const icons = {
      'الكل': 'fas fa-th-large',
      'ديسكورد': 'fab fa-discord',
      'فايف ام': 'fas fa-gamepad',
      'مواقع': 'fas fa-globe',
      'تطبيقات': 'fas fa-mobile-alt',
      'أتمتة': 'fas fa-robot'
    };
    return icons[categoryId] || 'fas fa-tag';
  },

  getDiscountPercentage(originalPrice, currentPrice) {
    return Math.round((1 - currentPrice / originalPrice) * 100);
  }
}

</script>

<template>
  <div class="store-container">

    <!-- إشعار الإضافة للسلة -->
    <transition name="notification">
      <div v-if="showNotification" class="notification-card">
        <div class="notification-content">
          <i class="fas fa-check-circle success-icon"></i>
          <span class="notification-text">تمت إضافة {{ lastAddedProduct.title }} إلى السلة!</span>
        </div>
      </div>
    </transition>

    <!-- Overlay -->
    <div 
      v-if="sidebarOpen || cartOpen" 
      class="overlay" 
      @click="sidebarOpen = false; cartOpen = false"
    ></div>

    <!-- رأس الصفحة -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <i class="fas fa-code logo-icon"></i>
          <h1>متجر البرمجة</h1>
        </div>

        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ابحث عن منتج..." 
            class="search-input"
          >
          <i class="fas fa-search search-icon"></i>
        </div>

        <div class="header-actions">
          <button class="cart-btn" @click="toggleCart" :class="{ active: cartOpen }">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" v-if="cartItemsCount > 0">{{ cartItemsCount }}</span>
          </button>

          <button class="menu-btn" @click="toggleSidebar" :class="{ active: sidebarOpen }">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- نافذة السلة -->
    <transition name="slide-left">
      <div v-if="cartOpen" class="cart-popup">
        <div class="cart-header">
          <h3><i class="fas fa-shopping-cart"></i> سلة المشتريات</h3>
          <button class="close-btn" @click="closeCart">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="cart-content">
          <div v-if="cart.length === 0" class="empty-cart">
            <div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div>
            <p>السلة فارغة</p>
            <small>أضف منتجات لتظهر هنا</small>
          </div>

          <div v-else class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.title" class="cart-item-image">
              <div class="cart-item-details">
                <h4>{{ item.title }}</h4>
                <p class="cart-item-price">{{ formatPrice(item.price) }}</p>
                <div class="quantity-controls">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn">
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button @click="removeFromCart(item.id)" class="remove-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <div class="cart-footer">
              <div class="cart-summary">
                <div class="cart-total">
                  <strong>الإجمالي: {{ formatPrice(cartTotal) }}</strong>
                </div>
                <div v-if="totalSavings > 0" class="cart-savings">
                  وفرت: {{ formatPrice(totalSavings) }}
                </div>
              </div>
              <div class="cart-actions">
                <button @click="clearCart" class="clear-btn">
                  <i class="fas fa-trash"></i>
                  إفراغ السلة
                </button>
                <button 
                  @click="goToCheckout" 
                  class="checkout-btn"
                  :disabled="cart.length === 0"
                >
                  <i class="fas fa-credit-card"></i>
                  إتمام الطلب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- الشريط الجانبي -->
    <transition name="slide-right">
      <div v-if="sidebarOpen" class="sidebar">
        <div class="sidebar-header">
          <h3><i class="fas fa-list"></i> الأقسام</h3>
          <button class="close-btn" @click="closeSidebar">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li 
              v-for="category in categories" 
              :key="category.id"
              @click="filterProducts(category.id)"
              :class="{ active: selectedCategory === category.id }"
            >
              <i :class="getCategoryIcon(category.id)"></i>
              <span class="category-name">{{ category.name }}</span>
              <i class="fas fa-chevron-left category-arrow"></i>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <!-- المحتوى الرئيسي -->
    <main class="main-content">

      <!-- المنتجات المميزة -->
      <section class="featured-section" v-if="selectedCategory === 'الكل' && !searchQuery">
        <h2><i class="fas fa-star"></i> المنتجات المميزة</h2>
        <div class="featured-grid">
          <div 
            v-for="product in products.filter(p => p.featured).slice(0, 4)" 
            :key="'featured-' + product.id" 
            class="featured-card"
          >
            <div class="featured-image-container">
              <img :src="product.image" :alt="product.title" class="featured-image">
              <div class="featured-badge">مميز</div>
            </div>
            <div class="featured-info">
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
              <div class="featured-price">
                <span class="current-price">{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price">
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>
              <button @click="addToCart(product)" class="featured-btn">
                <i class="fas fa-shopping-cart"></i> أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- فلاتر التصنيفات -->
      <section class="categories-section">
        <h2><i class="fas fa-tags"></i> التصنيفات</h2>
        <div class="categories-filter">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="filterProducts(category.id)"
            :class="{ active: selectedCategory === category.id }"
            class="category-btn"
          >
            <i :class="getCategoryIcon(category.id)"></i>
            <span>{{ category.name }}</span>
          </button>
        </div>
      </section>

      <!-- عرض المنتجات -->
      <section class="products-section">
        <div class="section-header">
          <h2><i class="fas fa-box"></i> المنتجات</h2>
          <div class="products-info">
            <span class="products-count">{{ filteredProducts.length }} منتج</span>
            <div v-if="searchQuery" class="search-info">
              نتائج البحث عن: "{{ searchQuery }}"
              <button @click="searchQuery = ''" class="clear-search">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="no-products">
          <div class="no-products-icon"><i class="fas fa-search"></i></div>
          <h3>لا توجد منتجات</h3>
          <p>لا توجد منتجات تطابق معايير البحث الحالية</p>
          <button @click="searchQuery = ''; selectedCategory = 'الكل'" class="reset-filters">
            <i class="fas fa-refresh"></i> إعادة تعيين الفلاتر
          </button>
        </div>

        <div v-else class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id" 
            class="product-card"
          >
            <div class="product-image-container">
              <img :src="product.image" :alt="product.title" class="product-image">
              <div class="product-badge" v-if="product.originalPrice > product.price">
                خصم {{ getDiscountPercentage(product.originalPrice, product.price) }}%
              </div>
              <div v-if="product.featured" class="featured-badge">مميز</div>
            </div>

            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-rating">
                <span class="stars">{{ renderStars(product.rating) }}</span>
                <span class="rating-text">{{ product.rating }} ({{ product.reviews }} تقييم)</span>
              </div>
              <div class="product-price">
                <span class="current-price">{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price">
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>
              <button @click="addToCart(product)" class="add-to-cart-btn">
                <i class="fas fa-shopping-cart"></i>
                <span>أضف للسلة</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- التذييل -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4><i class="fas fa-info-circle"></i> حول المتجر</h4>
          <p>متجر متخصص في خدمات البرمجة والتصميم الاحترافي.</p>
        </div>
        <div class="footer-section">
          <h4><i class="fas fa-phone"></i> التواصل</h4>
          <p>واتساب: +966500000000</p>
          <p>الإيميل: support@programming-store.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 جميع الحقوق محفوظة لمتجر البرمجة.</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Tajawal', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  line-height: 1.6;
  direction: rtl;
}

.store-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  position: relative;
}

/* Header Styles */
.header {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.8rem;
  color: #667eea;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.cart-btn, .menu-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  padding: 0.875rem 1rem;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-btn:hover, .menu-btn:hover,
.cart-btn.active, .menu-btn.active {
  background: rgba(102, 126, 234, 0.3);
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
}

/* Success Icon */
.success-icon {
  color: #22c55e !important;
  font-size: 1.2rem;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 150;
  backdrop-filter: blur(8px);
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(30px);
  z-index: 200;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 71, 87, 0.3);
  color: #ff4757;
  transform: scale(1.1);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.sidebar-nav li:hover,
.sidebar-nav li.active {
  background: rgba(102, 126, 234, 0.2);
  border-right: 4px solid #667eea;
  transform: translateX(-5px);
}

.sidebar-nav li i {
  font-size: 1.3rem;
  color: #667eea;
  width: 20px;
  text-align: center;
}

.category-name {
  font-size: 1rem;
  font-weight: 500;
  flex: 1;
  color: #ffffff;
}

.category-arrow {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.sidebar-nav li:hover .category-arrow {
  transform: translateX(-5px);
  color: #667eea;
}

/* Cart Popup Styles */
.cart-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 380px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(30px);
  z-index: 200;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.3);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
}

.empty-cart p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.empty-cart small {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

.cart-items {
  padding: 1rem 0;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 1rem;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.cart-item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 600;
}

.cart-item-price {
  color: #667eea;
  font-weight: 700;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.qty-btn {
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: rgba(102, 126, 234, 0.4);
  color: #ffffff;
  transform: scale(1.1);
}

.quantity {
  font-weight: 700;
  min-width: 35px;
  text-align: center;
  font-size: 1.1rem;
  color: #ffffff;
}

.remove-btn {
  background: rgba(255, 71, 87, 0.2);
  border: 1px solid rgba(255, 71, 87, 0.3);
  color: #ff4757;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(255, 71, 87, 0.4);
  color: #ffffff;
  transform: scale(1.1);
}

.cart-footer {
  padding: 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
}

.cart-summary {
  margin-bottom: 1.5rem;
}

.cart-total {
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #667eea;
  font-weight: 700;
}

.cart-savings {
  text-align: center;
  font-size: 1rem;
  color: #22c55e;
  font-weight: 600;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.clear-btn, .checkout-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-family: 'Tajawal', sans-serif;
}

.clear-btn {
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
}

.clear-btn:hover {
  background: rgba(255, 71, 87, 0.4);
  color: #ffffff;
  transform: translateY(-2px);
}

.checkout-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.checkout-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Main Content */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Featured Section */
.featured-section {
  margin-bottom: 4rem;
}

.featured-section h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.featured-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.featured-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.featured-image-container {
  position: relative;
  overflow: hidden;
}

.featured-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-card:hover .featured-image {
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #000;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.featured-info {
  padding: 2rem;
}

.featured-info h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
}

.featured-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.featured-price {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.featured-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 1rem;
  border-radius: 15px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-family: 'Tajawal', sans-serif;
}

.featured-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

/* Categories Section */
.categories-section {
  margin-bottom: 4rem;
}

.categories-section h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.categories-filter {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  padding: 1rem 2rem;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.category-btn:hover,
.category-btn.active {
  background: rgba(102, 126, 234, 0.3);
  border-color: #667eea;
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
}

.category-btn i {
  font-size: 1.2rem;
  color: #667eea;
}

/* Products Section */
.products-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 2.2rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
}

.products-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.products-count {
  background: rgba(102, 126, 234, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.search-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 193, 7, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  color: #ffc107;
  font-weight: 500;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.clear-search {
  background: none;
  border: none;
  color: #ffc107;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.clear-search:hover {
  background: rgba(255, 193, 7, 0.3);
  transform: scale(1.2);
}

.no-products {
  text-align: center;
  padding: 5rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.no-products-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.3);
}

.no-products h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.no-products p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.reset-filters {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reset-filters:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

/* Product Card */
.product-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.4);
}

.product-image-container {
  position: relative;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff4757, #ff3742);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
}

.product-info {
  padding: 2rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
}

.product-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stars {
  color: #ffd700;
  font-size: 1.1rem;
}

.rating-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.product-price {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #667eea;
}

.original-price {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 1rem;
  border-radius: 15px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-family: 'Tajawal', sans-serif;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.add-to-cart-btn i {
  font-size: 1.2rem;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Notification Styles */
.notification-card {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 15px;
  padding: 1.2rem 2rem;
  z-index: 10000;
  box-shadow: 0 15px 40px rgba(34, 197, 94, 0.3);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) translateY(-20px) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(-20px) scale(0.8);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .featured-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1.5rem;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .search-bar {
    width: 100%;
    max-width: 100%;
  }

  .main-content {
    padding: 1rem;
  }

  .categories-filter {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
    gap: 1rem;
  }

  .category-btn {
    flex-shrink: 0;
    padding: 0.8rem 1.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .categories-section h2,
  .featured-section h2 {
    font-size: 1.8rem;
  }

  .sidebar,
  .cart-popup {
    width: 100%;
    max-width: 380px;
  }

  .notification-card {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
    padding: 1rem 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.75rem;
  }

  .main-content {
    padding: 0.75rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .categories-section h2,
  .section-header h2,
  .featured-section h2 {
    font-size: 1.5rem;
  }

  .product-card,
  .featured-card {
    margin: 0 0.5rem;
  }

  .cart-popup {
    width: 100vw;
    max-width: 100%;
  }

  .sidebar {
    width: 100vw;
    max-width: 100%;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

/* Loading and hover effects */
.product-card,
.featured-card,
.category-btn,
.add-to-cart-btn,
.featured-btn {
  position: relative;
  overflow: hidden;
}

.product-card::before,
.featured-card::before,
.category-btn::before,
.add-to-cart-btn::before,
.featured-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.product-card:hover::before,
.featured-card:hover::before,
.category-btn:hover::before,
.add-to-cart-btn:hover::before,
.featured-btn:hover::before {
  left: 100%;
}

/* Enhanced animations */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cart-count {
  animation: pulse 2s infinite;
}

.featured-badge {
  animation: float 3s ease-in-out infinite;
}

/* Focus states for accessibility */
.search-input:focus,
.cart-btn:focus,
.menu-btn:focus,
.close-btn:focus,
.qty-btn:focus,
.remove-btn:focus,
.clear-btn:focus,
.checkout-btn:focus,
.category-btn:focus,
.add-to-cart-btn:focus,
.featured-btn:focus,
.reset-filters:focus,
.clear-search:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .header,
  .sidebar,
  .cart-popup,
  .notification-card,
  .overlay {
    display: none !important;
  }
  
  .main-content {
    padding: 0;
  }
  
  .product-card,
  .featured-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .store-container {
    background: #000000;
  }
  
  .product-card,
  .featured-card,
  .sidebar,
  .cart-popup {
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;
  }
  
  .add-to-cart-btn,
  .featured-btn,
  .checkout-btn {
    background: #000000;
    color: #ffffff;
    border: 2px solid #ffffff;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .cart-count {
    animation: none;
  }
  
  .featured-badge {
    animation: none;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .search-input {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .product-card,
  .featured-card {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .category-btn {
    background: rgba(255, 255, 255, 0.08);
  }
  
  .sidebar,
  .cart-popup {
    background: rgba(0, 0, 0, 0.99);
  }
}

/* Custom properties for theming */
:root {
  --primary-color: #667eea;
  --primary-dark: #5a67d8;
  --secondary-color: #764ba2;
  --accent-color: #ff4757;
  --success-color: #22c55e;
  --warning-color: #ffc107;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  --background-primary: rgba(255, 255, 255, 0.1);
  --background-secondary: rgba(255, 255, 255, 0.05);
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-light: rgba(102, 126, 234, 0.2);
  --shadow-dark: rgba(0, 0, 0, 0.3);
  --border-radius: 15px;
  --border-radius-large: 20px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --font-size-xs: 0.8rem;
  --font-size-sm: 0.9rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.2rem;
  --font-size-xl: 1.5rem;
  --font-size-xxl: 2rem;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.4s ease;
}

/* Utility classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-xxl { font-size: var(--font-size-xxl); }

.mb-xs { margin-bottom: var(--spacing-xs); }
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.mb-xl { margin-bottom: var(--spacing-xl); }

.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-xs { gap: var(--spacing-xs); }
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }

.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }

.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }

.select-none { user-select: none; }

.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }

.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }

.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.rounded { border-radius: var(--border-radius); }
.rounded-lg { border-radius: var(--border-radius-large); }
.rounded-full { border-radius: 50%; }

.shadow-sm { box-shadow: 0 2px 4px var(--shadow-dark); }
.shadow-md { box-shadow: 0 4px 8px var(--shadow-dark); }
.shadow-lg { box-shadow: 0 8px 16px var(--shadow-dark); }
.shadow-xl { box-shadow: 0 16px 32px var(--shadow-dark); }

.transition-fast { transition: all var(--transition-fast); }
.transition-normal { transition: all var(--transition-normal); }
.transition-slow { transition: all var(--transition-slow); }

.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:scale-110:hover { transform: scale(1.1); }
.hover\:-translate-y-1:hover { transform: translateY(-4px); }
.hover\:-translate-y-2:hover { transform: translateY(-8px); }

.bg-primary { background-color: var(--primary-color); }
.bg-secondary { background-color: var(--secondary-color); }
.bg-accent { background-color: var(--accent-color); }
.bg-success { background-color: var(--success-color); }
.bg-warning { background-color: var(--warning-color); }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }

.border { border: 1px solid var(--border-color); }
.border-primary { border-color: var(--primary-color); }
.border-accent { border-color: var(--accent-color); }

/* Component-specific utilities */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--text-primary);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-light);
}

.btn-secondary {
  background: var(--background-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-secondary:hover {
  background: var(--background-secondary);
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

.card {
  background: var(--background-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-large);
  backdrop-filter: blur(15px);
  transition: var(--transition-slow);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px var(--shadow-light);
  border-color: rgba(102, 126, 234, 0.3);
}

.input {
  background: var(--background-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-large);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: 'Tajawal', sans-serif;
  transition: var(--transition-normal);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.input::placeholder {
  color: var(--text-muted);
}

/* Animation classes */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Layout improvements */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.flex-responsive {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.flex-responsive > * {
  flex: 1;
  min-width: 250px;
}

/* Performance optimizations */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
}

/* Accessibility improvements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus-visible:focus:not(:focus-visible) {
  outline: none;
}

.focus-visible:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Error states */
.error {
  color: var(--accent-color);
  border-color: var(--accent-color);
}

.success {
  color: var(--success-color);
  border-color: var(--success-color);
}

.warning {
  color: var(--warning-color);
  border-color: var(--warning-color);
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

/* Toast notifications */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.toast.show {
  transform: translateX(0);
}

.toast.success {
  border-left: 4px solid var(--success-color);
}

.toast.error {
  border-left: 4px solid var(--accent-color);
}

.toast.warning {
  border-left: 4px solid var(--warning-color);
}

/* Modal improvements */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(30px);
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

/* Improved form styling */
.form-group {
  margin-bottom: var(--spacing-md);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--background-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-family: 'Tajawal', sans-serif;
  transition: var(--transition-normal);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-error {
  color: var(--accent-color);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

/* Enhanced button variations */
.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.btn-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

/* Table styling */
.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--background-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.table th,
.table td {
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: right;
  border-bottom: 1px solid var(--border-color);
}

.table th {
  background: var(--background-secondary);
  font-weight: 600;
  color: var(--primary-color);
}

.table tbody tr:hover {
  background: var(--background-secondary);
}

/* Badge component */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background: var(--primary-color);
  color: white;
}

.badge-success {
  background: var(--success-color);
  color: white;
}

.badge-warning {
  background: var(--warning-color);
  color: black;
}

.badge-error {
  background: var(--accent-color);
  color: white;
}

/* Divider */
.divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-lg) 0;
}

.divider-text {
  position: relative;
  text-align: center;
  margin: var(--spacing-lg) 0;
}

.divider-text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-color);
}

.divider-text span {
  background: var(--background-primary);
  padding: 0 var(--spacing-md);
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
}
</style>
