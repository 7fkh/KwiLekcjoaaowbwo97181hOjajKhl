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
          description: "برمجة سيرفر فايف ام من الصفر مع جميع المميزات المطلوبة",
          price: 25,
          originalPrice: 35,
          category: "فايف ام",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 4.8,
          reviews: 24,
          icon: "🎮"
        },
        {
          id: 2,
          title: "بوت ديسكورد متقدم",
          description: "بوت ديسكورد مع مميزات متقدمة ولوحة تحكم",
          price: 50,
          originalPrice: 70,
          category: "ديسكورد",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 4.9,
          reviews: 18,
          icon: "🤖"
        },
        {
          id: 3,
          title: "موقع إلكتروني مخصص",
          description: "تصميم وبرمجة موقع إلكتروني احترافي بتقنيات حديثة",
          price: 30,
          originalPrice: 45,
          category: "مواقع",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 4.7,
          reviews: 32,
          icon: "🌐"
        },
        {
          id: 4,
          title: "طلب مخصص",
          description: "خدمة برمجة مخصصة حسب احتياجاتك الخاصة",
          price: 100,
          originalPrice: 120,
          category: "طلب خاص",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 5.0,
          reviews: 15,
          icon: "⚡"
        },
        {
          id: 5,
          title: "نظام إدارة المحتوى",
          description: "نظام إدارة محتوى متكامل مع لوحة تحكم متقدمة",
          price: 80,
          originalPrice: 100,
          category: "مواقع",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 4.6,
          reviews: 28,
          icon: "📊"
        },
        {
          id: 6,
          title: "خدمات FiveM إضافية",
          description: "إضافات وتحسينات لسيرفر FiveM الخاص بك",
          price: 15,
          originalPrice: 25,
          category: "فايف ام",
          image: "https://i.imgur.com/kAg2dIa.jpeg",
          rating: 4.5,
          reviews: 41,
          icon: "🚗"
        }
      ],
      categories: [
        { id: 'الكل', name: 'الكل', icon: '🏪' },
        { id: 'ديسكورد', name: 'ديسكورد', icon: '💬' },
        { id: 'فايف ام', name: 'فايف ام', icon: '🎮' },
        { id: 'مواقع', name: 'مواقع', icon: '🌐' },
        { id: 'طلب خاص', name: 'طلب خاص', icon: '⭐' }
      ]
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.selectedCategory === 'الكل' 
        ? this.products 
        : this.products.filter(p => p.category === this.selectedCategory);
      
      if (this.searchQuery) {
        filtered = filtered.filter(p => 
          p.title.includes(this.searchQuery) || 
          p.description.includes(this.searchQuery)
        );
      }
      
      return filtered;
    },
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    cartItemsCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
  },
  methods: {
    filterProducts(category) {
      this.selectedCategory = category;
      this.sidebarOpen = false;
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
        stars += '⭐';
      }
      if (hasHalfStar) {
        stars += '⭐';
      }
      
      return stars;
    }
  }
};
</script>

<template>
  <div class="store-container" dir="rtl">
    <!-- إشعار الإضافة للسلة -->
    <transition name="notification">
      <div v-if="showNotification" class="notification-card">
        <div class="notification-content">
          <span class="notification-icon">✅</span>
          <span class="notification-text">تمت إضافة {{ lastAddedProduct.title }} إلى السلة!</span>
        </div>
      </div>
    </transition>

    <!-- Overlay للسايدبار والسلة -->
    <div 
      v-if="sidebarOpen || cartOpen" 
      class="overlay" 
      @click="sidebarOpen = false; cartOpen = false"
    ></div>

    <!-- رأس الصفحة -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>🛍️ متجر البرمجة</h1>
        </div>
        
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="🔍 ابحث عن منتج..."
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="header-actions">
          <button class="cart-btn" @click="toggleCart" :class="{ active: cartOpen }">
            <span class="cart-icon">🛒</span>
            <span class="cart-count" v-if="cartItemsCount > 0">{{ cartItemsCount }}</span>
          </button>
          
          <button class="menu-btn" @click="toggleSidebar" :class="{ active: sidebarOpen }">
            <span class="menu-icon">☰</span>
          </button>
        </div>
      </div>
    </header>

    <!-- نافذة السلة -->
    <transition name="slide-left">
      <div v-if="cartOpen" class="cart-popup">
        <div class="cart-header">
          <h3>🛒 سلة المشتريات</h3>
          <button class="close-btn" @click="closeCart">❌</button>
        </div>
        
        <div class="cart-content">
          <div v-if="cart.length === 0" class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <p>السلة فارغة</p>
            <small>أضف منتجات لتظهر هنا</small>
          </div>
          
          <div v-else class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <div class="cart-item-icon">{{ item.icon }}</div>
              <img :src="item.image" :alt="item.title" class="cart-item-image">
              <div class="cart-item-details">
                <h4>{{ item.title }}</h4>
                <p class="cart-item-price">💰 {{ item.price }} ريال</p>
                <div class="quantity-controls">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn">➖</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">➕</button>
                </div>
              </div>
              <button @click="removeFromCart(item.id)" class="remove-btn">🗑️</button>
            </div>
            
            <div class="cart-footer">
              <div class="cart-total">
                <strong>💰 الإجمالي: {{ cartTotal }} ريال</strong>
              </div>
              <div class="cart-actions">
                <button @click="clearCart" class="clear-btn">🗑️ إفراغ السلة</button>
                <button class="checkout-btn">🚀 إتمام الطلب</button>
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
          <h3>📂 الأقسام</h3>
          <button class="close-btn" @click="closeSidebar">❌</button>
        </div>
        
        <nav class="sidebar-nav">
          <ul>
            <li 
              v-for="category in categories" 
              :key="category.id"
              @click="filterProducts(category.id)"
              :class="{ active: selectedCategory === category.id }"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
              <span class="category-arrow">👈</span>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <!-- المحتوى الرئيسي -->
    <main class="main-content">
      <!-- فلاتر التصنيفات -->
      <section class="categories-section">
        <h2>🏷️ التصنيفات</h2>
        <div class="categories-filter">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="filterProducts(category.id)"
            :class="{ active: selectedCategory === category.id }"
            class="category-btn"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </button>
        </div>
      </section>

      <!-- عرض المنتجات -->
      <section class="products-section">
        <div class="section-header">
          <h2>🛍️ المنتجات</h2>
          <span class="products-count">📊 {{ filteredProducts.length }} منتج</span>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="no-products">
          <div class="no-products-icon">🔍</div>
          <h3>❌ لا توجد منتجات</h3>
          <p>لا توجد منتجات في هذا القسم حاليًا</p>
        </div>

        <div v-else class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id" 
            class="product-card"
          >
            <div class="product-image-container">
              <div class="product-icon">{{ product.icon }}</div>
              <img :src="product.image" :alt="product.title" class="product-image">
              <div class="product-badge" v-if="product.originalPrice > product.price">
                🏷️ خصم {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
              </div>
            </div>
            
            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="product-rating">
                <span class="stars">{{ renderStars(product.rating) }}</span>
                <span class="rating-text">{{ product.rating }} (👥 {{ product.reviews }} تقييم)</span>
              </div>
              
              <div class="product-price">
                <span class="current-price">💰 {{ product.price }} ريال</span>
                <span v-if="product.originalPrice > product.price" class="original-price">
                  💸 {{ product.originalPrice }} ريال
                </span>
              </div>
              
              <button @click="addToCart(product)" class="add-to-cart-btn">
                <span class="btn-icon">🛒</span>
                <span class="btn-text">أضف للسلة</span>
                <span class="btn-arrow">👈</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
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
}

.store-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

/* Header Styles */
.header {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.cart-btn, .menu-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.75rem;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  min-width: 50px;
}

.cart-btn:hover, .menu-btn:hover,
.cart-btn.active, .menu-btn.active {
  background: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  backdrop-filter: blur(5px);
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 200;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
}

.sidebar-nav li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-nav li:hover,
.sidebar-nav li.active {
  background: rgba(102, 126, 234, 0.2);
  border-right: 3px solid #667eea;
}

.category-icon {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 500;
  flex: 1;
}

.category-arrow {
  font-size: 1rem;
  opacity: 0.7;
}

/* Cart Popup Styles */
.cart-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 200;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
}

.empty-cart {
  text-align: center;
  padding: 3rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 1rem;
}

.cart-item-icon {
  font-size: 1.5rem;
  opacity: 0.8;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.cart-item-price {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  background: rgba(102, 126, 234, 0.2);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.qty-btn:hover {
  background: rgba(102, 126, 234, 0.4);
}

.quantity {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  background: rgba(255, 71, 87, 0.2);
  border: none;
  color: #ff4757;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.remove-btn:hover {
  background: rgba(255, 71, 87, 0.4);
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-total {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.clear-btn, .checkout-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.clear-btn {
  background: rgba(255, 71, 87, 0.2);
  color: #ff4757;
}

.clear-btn:hover {
  background: rgba(255, 71, 87, 0.4);
}

.checkout-btn {
  background: #667eea;
  color: white;
}

.checkout-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Categories Section */
.categories-section {
  margin-bottom: 3rem;
}

.categories-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.categories-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.category-btn:hover,
.category-btn.active {
  background: rgba(102, 126, 234, 0.3);
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
}

/* Products Section */
.products-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.products-count {
  background: rgba(102, 126, 234, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-weight: 600;
  color: #667eea;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.no-products-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Product Card */
.product-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.product-image-container {
  position: relative;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4757;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.product-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
}

.original-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 0.75rem;
  border-radius: 15px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Notification Styles */
.notification-card {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  z-index: 10000;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.notification-icon {
  font-size: 1.5rem;
}

.notification-text {
  color: white;
  font-weight: 600;
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(-20px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .logo h1 {
    font-size: 1.3rem;
  }

  .search-bar {
    max-width: 100%;
  }

  .main-content {
    padding: 1rem;
  }

  .categories-filter {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .category-btn {
    flex-shrink: 0;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .sidebar,
  .cart-popup {
    width: 100%;
    max-width: 350px;
  }

  .notification-card {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
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

  .categories-section h2,
  .section-header h2 {
    font-size: 1.5rem;
  }

  .product-card {
    margin: 0 0.5rem;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .search-input {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .product-card {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .category-btn {
    background: rgba(255, 255, 255, 0.05);
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}

/* Loading and hover effects */
.product-card,
.category-btn,
.add-to-cart-btn {
  position: relative;
  overflow: hidden;
}

.product-card::before,
.category-btn::before,
.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.product-card:hover::before,
.category-btn:hover::before,
.add-to-cart-btn:hover::before {
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

.cart-count {
  animation: pulse 2s infinite;
}

/* RTL Support */
[dir="rtl"] .search-icon {
  left: auto;
  right: 1rem;
}

[dir="rtl"] .search-input {
  padding: 0.75rem 1rem 0.75rem 3rem;
}

[dir="rtl"] .product-badge {
  right: auto;
  left: 1rem;
}

[dir="rtl"] .sidebar {
  right: auto;
  left: 0;
  border-left: none;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

[dir="rtl"] .cart-popup {
  left: auto;
  right: 0;
  border-right: none;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

[dir="rtl"] .category-icon {
  margin-left: 0;
  margin-right: 1rem;
}

[dir="rtl"] .sidebar-nav li:hover,
[dir="rtl"] .sidebar-nav li.active {
  border-right: none;
  border-left: 3px solid #667eea;
}
</style>
