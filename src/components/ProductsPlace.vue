<script>
import { debounce, throttle } from 'lodash';

export default {
  name: 'OrderView',
  
  data() {
    return {
      // Loading and Error States
      isLoading: false,
      hasError: false,
      errorMessage: '',
      
      // Core State
      selectedCategory: 'الكل',
      cart: [],
      wishlist: [],
      sidebarOpen: false,
      cartOpen: false,
      
      // Notification System
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success', // success, error, warning, info
      notificationTimeout: null,
      
      // Search and Filters
      searchQuery: '',
      sortBy: 'default',
      currentPage: 1,
      itemsPerPage: 12,
      
      // Product Management
      products: [],
      categories: [],
      
      // Cart Features
      couponCode: '',
      appliedCoupon: null,
      isApplyingCoupon: false,
      isProcessingOrder: false,
      shippingCost: 0,
      maxQuantity: 10,
      
      // UI State
      isDarkMode: null,
      showBackToTop: false,
      quickViewProduct: null,
      
      // Store Configuration
      storeInfo: {
        name: 'متجر البرمجة',
        description: 'متجر متخصص في خدمات البرمجة والتصميم الاحترافي.',
        whatsapp: '+966500000000',
        email: 'support@programming-store.com'
      },
      
      // Security and Performance
      imageFailureCache: new Set(),
      searchCache: new Map(),
      requestCache: new Map(),
      
      // Constants
      searchPlaceholder: 'ابحث عن منتج...',
      availableCoupons: [
        { code: 'SAVE10', discount: 10, type: 'percentage' },
        { code: 'SAVE50', discount: 50, type: 'fixed' },
        { code: 'WELCOME', discount: 15, type: 'percentage' }
      ]
    };
  },

  computed: {
    filteredProducts() {
      let filtered = this.selectedCategory === 'الكل' 
        ? [...this.products] 
        : this.products.filter(p => p.category === this.selectedCategory);
      
      if (this.searchQuery.trim()) {
        const query = this.sanitizeInput(this.searchQuery).toLowerCase();
        filtered = filtered.filter(p => 
          this.sanitizeInput(p.title).toLowerCase().includes(query) || 
          this.sanitizeInput(p.description).toLowerCase().includes(query) ||
          this.sanitizeInput(p.category).toLowerCase().includes(query) ||
          (p.tags && p.tags.some(tag => this.sanitizeInput(tag).toLowerCase().includes(query)))
        );
      }
      
      return this.sortProductsArray(filtered);
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },

    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

      for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        pages.push(i);
      }

      if (current - delta > 2) {
        pages.unshift('...');
      }
      if (current + delta < total - 1) {
        pages.push('...');
      }

      pages.unshift(1);
      if (total > 1) {
        pages.push(total);
      }

      return [...new Set(pages)];
    },

    featuredProducts() {
      return this.products.filter(p => p.featured).slice(0, 4);
    },

    shouldShowFeatured() {
      return this.selectedCategory === 'الكل' && !this.searchQuery.trim();
    },

    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    cartItemsCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0);
    },

    totalSavings() {
      return this.cart.reduce((savings, item) => {
        const originalPrice = item.originalPrice || item.price;
        const itemSaving = (originalPrice - item.price) * item.quantity;
        return savings + itemSaving;
      }, 0);
    },

    couponDiscount() {
      if (!this.appliedCoupon) return 0;
      
      if (this.appliedCoupon.type === 'percentage') {
        return (this.cartTotal * this.appliedCoupon.discount) / 100;
      } else {
        return Math.min(this.appliedCoupon.discount, this.cartTotal);
      }
    },

    finalTotal() {
      return Math.max(0, this.cartTotal + this.shippingCost - this.couponDiscount);
    },

    currentYear() {
      return new Date().getFullYear();
    }
  },

  watch: {
    selectedCategory() {
      this.currentPage = 1;
    },

    searchQuery() {
      this.currentPage = 1;
    },

    sortBy() {
      this.currentPage = 1;
    }
  },

  created() {
    this.debouncedSearch = debounce(this.performSearch, 300);
    this.throttledScroll = throttle(this.handleScroll, 100);
    this.initializeData();
  },

  mounted() {
    this.setupEventListeners();
    this.loadUserPreferences();
    this.loadCartFromStorage();
    this.loadWishlistFromStorage();
  },

  beforeUnmount() {
    this.removeEventListeners();
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  },

  methods: {
    // Data Initialization
    initializeData() {
      this.isLoading = true;

      try {
        this.products = [
          {
            id: 1,
            title: "بوت ديسكورد متقدم",
            description: "بوت ديسكورد احترافي مع إدارة الخوادم والموسيقى والألعاب التفاعلية",
            price: 250,
            originalPrice: 350,
            category: "ديسكورد",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.8,
            reviews: 45,
            featured: true,
            tags: ['بوت', 'ديسكورد', 'إدارة', 'موسيقى'],
            createdAt: new Date('2024-01-15'),
            inStock: true,
            specifications: {
              language: 'JavaScript/Python',
              hosting: 'مضمن لمدة سنة',
              support: '24/7',
              customization: 'متاح'
            }
          },
          {
            id: 2,
            title: "سكريبت FiveM مخصص",
            description: "سكريبت FiveM متكامل للوظائف والاقتصاد مع واجهة مستخدم احترافية",
            price: 400,
            originalPrice: 500,
            category: "فايف ام",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.9,
            reviews: 38,
            featured: true,
            tags: ['FiveM', 'سكريبت', 'وظائف', 'اقتصاد'],
            createdAt: new Date('2024-02-10'),
            inStock: true,
            specifications: {
              language: 'Lua',
              framework: 'ESX/QBCore',
              database: 'MySQL',
              support: 'شهر مجاني'
            }
          },
          {
            id: 3,
            title: "موقع إلكتروني احترافي",
            description: "تصميم وبرمجة موقع إلكتروني احترافي متجاوب مع جميع الأجهزة",
            price: 800,
            originalPrice: 1000,
            category: "مواقع",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.7,
            reviews: 32,
            featured: true,
            tags: ['موقع', 'تصميم', 'متجاوب'],
            createdAt: new Date('2024-01-20'),
            inStock: true,
            specifications: {
              technology: 'HTML5/CSS3/JavaScript',
              responsive: 'نعم',
              seo: 'محسن لمحركات البحث',
              hosting: 'سنة مجانية'
            }
          },
          {
            id: 4,
            title: "تطبيق موبايل مخصص",
            description: "تصميم وبرمجة تطبيق موبايل مخصص لنظامي iOS و Android",
            price: 1500,
            originalPrice: 2000,
            category: "تطبيقات",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 5.0,
            reviews: 15,
            featured: true,
            tags: ['تطبيق', 'موبايل', 'iOS', 'Android'],
            createdAt: new Date('2024-03-01'),
            inStock: true,
            specifications: {
              platforms: 'iOS & Android',
              technology: 'React Native/Flutter',
              features: 'مخصصة حسب الطلب',
              maintenance: '6 أشهر مجانية'
            }
          },
          {
            id: 5,
            title: "نظام إدارة المحتوى",
            description: "نظام إدارة محتوى متكامل مع لوحة تحكم متقدمة وإدارة المستخدمين",
            price: 600,
            originalPrice: 800,
            category: "مواقع",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.6,
            reviews: 28,
            featured: false,
            tags: ['CMS', 'إدارة', 'محتوى'],
            createdAt: new Date('2024-01-10'),
            inStock: true,
            specifications: {
              technology: 'PHP/Laravel',
              database: 'MySQL',
              features: 'متعددة المستخدمين',
              customization: 'قابل للتخصيص'
            }
          },
          {
            id: 6,
            title: "خدمات FiveM إضافية",
            description: "إضافات وتحسينات وسكريپتات مخصصة لسيرفر FiveM",
            price: 100,
            originalPrice: 150,
            category: "فايف ام",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.5,
            reviews: 41,
            featured: false,
            tags: ['FiveM', 'سكريپتات', 'إضافات'],
            createdAt: new Date('2024-02-15'),
            inStock: true,
            specifications: {
              type: 'إضافات متنوعة',
              compatibility: 'جميع الإطارات',
              installation: 'دعم التركيب',
              updates: 'تحديثات مجانية'
            }
          },
          {
            id: 7,
            title: "متجر إلكتروني متكامل",
            description: "متجر إلكتروني متكامل مع نظام دفع ولوحة تحكم شاملة",
            price: 1200,
            originalPrice: 1500,
            category: "مواقع",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.9,
            reviews: 22,
            featured: true,
            tags: ['متجر', 'دفع', 'تجارة إلكترونية'],
            createdAt: new Date('2024-02-28'),
            inStock: true,
            specifications: {
              payments: 'بوابات دفع متعددة',
              inventory: 'إدارة المخزون',
              shipping: 'حساب الشحن',
              analytics: 'تقارير مفصلة'
            }
          },
          {
            id: 8,
            title: "أتمتة وسكريپتات",
            description: "سكريپتات أتمتة مخصصة لتسهيل المهام اليومية والإدارية",
            price: 300,
            originalPrice: 400,
            category: "أتمتة",
            image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png",
            rating: 4.4,
            reviews: 19,
            featured: false,
            tags: ['أتمتة', 'سكريپتات', 'إدارة'],
            createdAt: new Date('2024-01-25'),
            inStock: true,
            specifications: {
              language: 'Python/JavaScript',
              automation: 'مهام متنوعة',
              schedule: 'جدولة تلقائية',
              integration: 'تكامل مع APIs'
            }
          }
        ];

        this.categories = [
          { id: 'الكل', name: 'جميع المنتجات' },
          { id: 'ديسكورد', name: 'بوتات ديسكورد' },
          { id: 'فايف ام', name: 'خدمات FiveM' },
          { id: 'مواقع', name: 'المواقع الإلكترونية' },
          { id: 'تطبيقات', name: 'تطبيقات الموبايل' },
          { id: 'أتمتة', name: 'الأتمتة والسكريپتات' }
        ];

        this.isLoading = false;
        this.showNotificationMessage('تم تحميل المنتجات بنجاح', 'success', 2000);
      } catch (error) {
        this.handleError('فشل في تحميل البيانات', error);
      }
    },

    // Event Listeners
    setupEventListeners() {
      window.addEventListener('scroll', this.throttledScroll);
      window.addEventListener('keydown', this.handleGlobalKeydown);
      window.addEventListener('beforeunload', this.saveUserData);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      
      // إضافة مستمع للنقر خارج العناصر لإغلاق القوائم
      document.addEventListener('click', this.handleOutsideClick);
    },

    removeEventListeners() {
      window.removeEventListener('scroll', this.throttledScroll);
      window.removeEventListener('keydown', this.handleGlobalKeydown);
      window.removeEventListener('beforeunload', this.saveUserData);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      document.removeEventListener('click', this.handleOutsideClick);
    },

    handleGlobalKeydown(event) {
      if (event.key === 'Escape') {
        this.closeAllPanels();
        this.closeQuickView();
      }
    },

    handleOutsideClick(event) {
      // إغلاق السايدبار عند النقر خارجه
      if (this.sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        this.sidebarOpen = false;
      }
      
      // إغلاق السلة عند النقر خارجها
      if (this.cartOpen && !event.target.closest('.cart-panel') && !event.target.closest('.cart-toggle')) {
        this.cartOpen = false;
      }
      
      // إغلاق العرض السريع عند النقر خارجه
      if (this.quickViewProduct && !event.target.closest('.quick-view-modal') && !event.target.closest('.quick-view-btn')) {
        this.quickViewProduct = null;
      }
    },

    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },

    handleVisibilityChange() {
      if (document.hidden) {
        this.saveUserData();
      }
    },

    // Security Functions - تحسين دالة التنظيف
    sanitizeInput(input) {
      if (typeof input !== 'string') return String(input || '');
      return input
        .replace(/[<>\"']/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
    },

    sanitizeImageUrl(url) {
      if (!url || typeof url !== 'string') return '/images/placeholder.jpg';
      
      // Check if URL is in failure cache
      if (this.imageFailureCache.has(url)) {
        return '/images/placeholder.jpg';
      }
      
      // Validate URL format
      try {
        const urlObj = new URL(url);
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          return '/images/placeholder.jpg';
        }
        return url;
      } catch {
        return '/images/placeholder.jpg';
      }
    },

    // تحسين دالة التحقق من صحة البيانات - هذا هو الإصلاح الرئيسي
    validateProductData(product) {
      if (!product || typeof product !== 'object') {
        console.warn('Product is null, undefined, or not an object:', product);
        return false;
      }

      // التحقق من الحقول الأساسية
      const requiredFields = ['id', 'title', 'price', 'category'];
      for (const field of requiredFields) {
        if (product[field] === undefined || product[field] === null) {
          console.warn(`Product missing required field: ${field}`, product);
          return false;
        }
      }

      // التحقق من أنواع البيانات
      if (typeof product.id !== 'number' || product.id <= 0) {
        console.warn('Invalid product ID:', product.id);
        return false;
      }

      if (typeof product.title !== 'string' || product.title.trim().length === 0) {
        console.warn('Invalid product title:', product.title);
        return false;
      }

      if (typeof product.price !== 'number' || product.price < 0) {
        console.warn('Invalid product price:', product.price);
        return false;
      }

      if (typeof product.category !== 'string' || product.category.trim().length === 0) {
        console.warn('Invalid product category:', product.category);
        return false;
      }

      // التحقق من الحقول الاختيارية
      if (product.image && typeof product.image !== 'string') {
        console.warn('Invalid product image URL:', product.image);
        return false;
      }

      if (product.rating !== undefined && (typeof product.rating !== 'number' || product.rating < 0 || product.rating > 5)) {
        console.warn('Invalid product rating:', product.rating);
        return false;
      }

      return true;
    },

    // Error Handling
    handleError(message, error = null) {
      console.error('Error:', message, error);
      this.hasError = true;
      this.errorMessage = message;
      this.isLoading = false;
      
      this.showNotificationMessage(message, 'error', 5000);
    },

    retryOperation() {
      this.hasError = false;
      this.errorMessage = '';
      this.initializeData();
    },

    handleImageError(event) {
      const img = event.target;
      this.imageFailureCache.add(img.src);
      img.src = '/images/placeholder.jpg';
      img.alt = 'صورة غير متاحة';
    },

    // Notification System
    showNotificationMessage(message, type = 'success', duration = 3000) {
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout);
      }

      this.notificationMessage = this.sanitizeInput(message);
      this.notificationType = type;
      this.showNotification = true;

      this.notificationTimeout = setTimeout(() => {
        this.closeNotification();
      }, duration);
    },

    closeNotification() {
      this.showNotification = false;
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout);
        this.notificationTimeout = null;
      }
    },

    getNotificationIcon(type) {
      const icons = {
        success: 'fas fa-check-circle success-icon',
        error: 'fas fa-exclamation-circle error-icon',
        warning: 'fas fa-exclamation-triangle warning-icon',
        info: 'fas fa-info-circle info-icon'
      };
      return icons[type] || icons.info;
    },

    // Product Management
    filterProducts(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
      this.closeSidebar();
    },

    sortProductsArray(products) {
      if (!Array.isArray(products)) return [];
      
      switch (this.sortBy) {
        case 'price-low':
          return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
          return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
          return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'newest':
          return [...products].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
          });
        default:
          return products;
      }
    },

    performSearch() {
      // Search caching for performance
      const cacheKey = this.searchQuery.trim().toLowerCase();
      if (this.searchCache.has(cacheKey)) {
        return;
      }
      this.searchCache.set(cacheKey, true);
      this.currentPage = 1;
    },

    clearSearch() {
      this.searchQuery = '';
      this.currentPage = 1;
    },

    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = 'الكل';
      this.sortBy = 'default';
      this.currentPage = 1;
      this.showNotificationMessage('تم إعادة تعيين الفلاتر', 'info');
    },

    // Cart Management - الإصلاح الشامل
    addToCart(product) {
      console.log('Attempting to add product to cart:', product);

      if (!this.validateProductData(product)) {
        console.error('Product validation failed:', product);
        this.showNotificationMessage('بيانات المنتج غير صحيحة', 'error');
        return false;
      }

      try {
        // البحث عن العنصر الموجود
        const existingItemIndex = this.cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
          const existingItem = this.cart[existingItemIndex];
          
          if (existingItem.quantity >= this.maxQuantity) {
            this.showNotificationMessage(`الحد الأقصى للكمية هو ${this.maxQuantity}`, 'warning');
            return false;
          }
          
          // زيادة الكمية
          this.cart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
          
          this.showNotificationMessage(`تم زيادة كمية ${product.title}`, 'success');
        } else {
          // إضافة عنصر جديد
          const cartItem = {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            category: product.category,
            image: product.image || '/images/placeholder.jpg',
            rating: product.rating || 0,
            quantity: 1,
            addedAt: new Date().toISOString(),
            specifications: product.specifications || {}
          };
          
          this.cart.push(cartItem);
          this.showNotificationMessage(`تمت إضافة ${product.title} إلى السلة!`, 'success');
        }

        this.saveCartToStorage();
        return true;
        
      } catch (error) {
        console.error('Error adding to cart:', error);
        this.handleError('فشل في إضافة المنتج للسلة', error);
        return false;
      }
    },

    removeFromCart(productId) {
      try {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
          const item = this.cart[itemIndex];
          this.cart.splice(itemIndex, 1);
          this.showNotificationMessage(`تم حذف ${item.title} من السلة`, 'info');
          this.saveCartToStorage();
          return true;
        }
        return false;
      } catch (error) {
        this.handleError('فشل في حذف المنتج من السلة', error);
        return false;
      }
    },

    updateQuantity(productId, newQuantity) {
      if (newQuantity < 1) {
        return this.removeFromCart(productId);
      }

      if (newQuantity > this.maxQuantity) {
        this.showNotificationMessage(`الحد الأقصى للكمية هو ${this.maxQuantity}`, 'warning');
        return false;
      }

      try {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
          this.cart[itemIndex] = {
            ...this.cart[itemIndex],
            quantity: parseInt(newQuantity)
          };
          this.saveCartToStorage();
          return true;
        }
        return false;
      } catch (error) {
        this.handleError('فشل في تحديث الكمية', error);
        return false;
      }
    },

    clearCart() {
      if (this.cart.length === 0) {
        this.showNotificationMessage('السلة فارغة بالفعل', 'info');
        return;
      }
      
      if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
        this.cart = [];
        this.appliedCoupon = null;
        this.couponCode = '';
        this.saveCartToStorage();
        this.showNotificationMessage('تم إفراغ السلة', 'success');
        this.closeCart();
      }
    },

    isProductInCart(productId) {
      return this.cart.some(item => item.id === productId);
    },

    getCartItem(productId) {
      return this.cart.find(item => item.id === productId);
    },

    getCartItemQuantity(productId) {
      const item = this.getCartItem(productId);
      return item ? item.quantity : 0;
    },

    // Coupon System
    async applyCoupon() {
      const code = this.couponCode.trim().toUpperCase();
      if (!code) {
        this.showNotificationMessage('يرجى إدخال كود الخصم', 'warning');
        return;
      }

      if (this.cart.length === 0) {
        this.showNotificationMessage('السلة فارغة', 'warning');
        return;
      }

      this.isApplyingCoupon = true;

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const coupon = this.availableCoupons.find(c => c.code === code);
        
        if (!coupon) {
          this.showNotificationMessage('كود الخصم غير صحيح', 'error');
          return;
        }

        if (this.appliedCoupon && this.appliedCoupon.code === code) {
          this.showNotificationMessage('تم تطبيق هذا الكوبون مسبقاً', 'warning');
          return;
        }

        this.appliedCoupon = coupon;
        this.couponCode = '';
        this.saveCartToStorage();
        this.showNotificationMessage(`تم تطبيق كوبون الخصم ${code} - خصم ${coupon.discount}${coupon.type === 'percentage' ? '%' : ' ر.س'}`, 'success');
      } catch (error) {
        this.handleError('فشل في تطبيق كوبون الخصم', error);
      } finally {
        this.isApplyingCoupon = false;
      }
    },

    removeCoupon() {
      this.appliedCoupon = null;
      this.couponCode = '';
      this.saveCartToStorage();
      this.showNotificationMessage('تم إلغاء كوبون الخصم', 'info');
    },

    // Checkout Process
    async goToCheckout() {
      if (this.cart.length === 0) {
        this.showNotificationMessage('السلة فارغة', 'warning');
        return;
      }

      this.isProcessingOrder = true;

      try {
        // Validate cart items
        for (const item of this.cart) {
          if (!this.validateProductData(item)) {
            throw new Error(`بيانات المنتج ${item.title || 'غير معروف'} غير صحيحة`);
          }
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const orderData = {
          items: this.cart.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
          })),
          subtotal: this.cartTotal,
          shipping: this.shippingCost,
          couponDiscount: this.couponDiscount,
          total: this.finalTotal,
          coupon: this.appliedCoupon,
          timestamp: new Date().toISOString(),
          customer: {
            // في التطبيق الحقيقي، ستحصل على هذه البيانات من النموذج
            name: 'عميل تجريبي',
            email: 'customer@example.com',
            phone: '+966500000000'
          }
        };

        // في التطبيق الحقيقي، ستقوم بإرسال هذا إلى API
        console.log('Order Data:', orderData);

        // محاكاة نجاح الطلب
        this.showNotificationMessage('تم إرسال الطلب بنجاح! سيتم التواصل معك قريباً', 'success', 5000);
        
        // Clear cart after successful order
        this.cart = [];
        this.appliedCoupon = null;
        this.couponCode = '';
        this.saveCartToStorage();
        this.closeCart();

        // في التطبيق الحقيقي، يمكنك توجيه المستخدم لصفحة تأكيد الطلب
        // this.$router.push('/order-confirmation');

      } catch (error) {
        this.handleError('فشل في معالجة الطلب: ' + error.message, error);
      } finally {
        this.isProcessingOrder = false;
      }
    },

    // Contact Methods
    contactViaWhatsApp(product = null) {
      let message = 'السلام عليكم، أريد الاستفسار عن ';
      
      if (product) {
        message += `منتج: ${product.title}`;
      } else if (this.cart.length > 0) {
        message += 'المنتجات في السلة:\n';
        this.cart.forEach(item => {
          message += `- ${item.title} (الكمية: ${item.quantity})\n`;
        });
        message += `\nالإجمالي: ${this.formatPrice(this.finalTotal)}`;
      } else {
        message += 'خدماتكم';
      }
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${this.storeInfo.whatsapp.replace('+', '')}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    },

    contactViaEmail(product = null) {
      let subject = 'استفسار عن ';
      let body = 'السلام عليكم،\n\nأريد الاستفسار عن ';
      
      if (product) {
        subject += product.title;
        body += `منتج: ${product.title}\n\nتفاصيل المنتج:\n`;
        body += `السعر: ${this.formatPrice(product.price)}\n`;
        body += `الفئة: ${product.category}\n`;
        body += `الوصف: ${product.description}`;
      } else {
        subject += 'خدماتكم';
        body += 'خدماتكم المتاحة';
      }
      
      body += '\n\nشكراً لكم';
      
      const mailtoUrl = `mailto:${this.storeInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl);
    },

    // Wishlist Management
    toggleWishlist(productId) {
      if (!productId || typeof productId !== 'number') {
        this.showNotificationMessage('معرف المنتج غير صحيح', 'error');
        return;
      }

      try {
        const index = this.wishlist.indexOf(productId);
        const product = this.products.find(p => p.id === productId);
        
        if (!product) {
          this.showNotificationMessage('المنتج غير موجود', 'error');
          return;
        }
        
        if (index > -1) {
          this.wishlist.splice(index, 1);
          this.showNotificationMessage(`تم حذف ${product.title} من المفضلة`, 'info');
        } else {
          this.wishlist.push(productId);
          this.showNotificationMessage(`تم إضافة ${product.title} للمفضلة`, 'success');
        }
        
        this.saveWishlistToStorage();
      } catch (error) {
        this.handleError('فشل في تحديث المفضلة', error);
      }
    },

    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    },

    getWishlistProducts() {
      return this.products.filter(product => this.isInWishlist(product.id));
    },

    // UI Controls - تحسين التحكم في القوائم
    toggleSidebar(event) {
      if (event) {
        event.stopPropagation();
      }
      this.sidebarOpen = !this.sidebarOpen;
      if (this.sidebarOpen && this.cartOpen) {
        this.cartOpen = false;
      }
    },

    toggleCart(event) {
      if (event) {
        event.stopPropagation();
      }
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

    closeAllPanels() {
      this.sidebarOpen = false;
      this.cartOpen = false;
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
      this.saveUserPreferences();
      this.showNotificationMessage(`تم تغيير المظهر إلى ${this.isDarkMode ? 'الداكن' : 'الفاتح'}`, 'info');
    },

    // Quick View - تحسين العرض السريع
    openQuickView(product, event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      
      if (!this.validateProductData(product)) {
        this.showNotificationMessage('بيانات المنتج غير صحيحة', 'error');
        return;
      }
      
      this.quickViewProduct = product;
      // منع التمرير في الخلفية عند فتح العرض السريع
      document.body.style.overflow = 'hidden';
    },

    closeQuickView() {
      this.quickViewProduct = null;
      // إعادة تمكين التمرير
      document.body.style.overflow = '';
    },

    // Pagination
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.scrollToTop();
      }
    },

    goToFirstPage() {
      this.changePage(1);
    },

    goToLastPage() {
      this.changePage(this.totalPages);
    },

    goToPrevPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1);
      }
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    scrollToProducts() {
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    // Utility Functions
    renderStars(rating) {
      if (!rating || typeof rating !== 'number') return '';
      
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      let stars = '';
      
      // نجوم مملوءة
      for (let i = 0; i < fullStars; i++) {
        stars += '★';
      }
      
      // نجمة نصف مملوءة
      if (hasHalfStar) {
        stars += '☆';
      }
      
      // نجوم فارغة
      for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
      }

      return stars;
    },

    formatPrice(price) {
      if (typeof price !== 'number' || isNaN(price)) return '0 ر.س';
      
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(price);
    },

    formatNumber(number) {
      if (typeof number !== 'number' || isNaN(number)) return '0';
      return new Intl.NumberFormat('ar-SA').format(number);
    },

    truncateText(text, maxLength) {
      if (!text || typeof text !== 'string') return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + '...';
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

    getCategoryCount(categoryId) {
      if (categoryId === 'الكل') {
        return this.products.length;
      }
      return this.products.filter(p => p.category === categoryId).length;
    },

    getDiscountPercentage(originalPrice, currentPrice) {
      if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
      return Math.round((1 - currentPrice / originalPrice) * 100);
    },

    isNewProduct(product) {
      if (!product.createdAt) return false;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(product.createdAt) > thirtyDaysAgo;
    },

    isFeaturedProduct(product) {
      return product.featured === true;
    },

    isProductOnSale(product) {
      return product.originalPrice && product.originalPrice > product.price;
    },

    // Search Enhancement
    highlightSearchTerm(text, searchTerm) {
      if (!searchTerm || !text) return text;
      
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    // Storage Management - تحسين إدارة التخزين
    saveCartToStorage() {
      try {
        const cartData = {
          items: this.cart,
          appliedCoupon: this.appliedCoupon,
          timestamp: new Date().toISOString(),
          version: '1.0' // لمراقبة إصدار البيانات
        };
        localStorage.setItem('cart', JSON.stringify(cartData));
      } catch (error) {
        console.warn('Failed to save cart to storage:', error);
        this.showNotificationMessage('فشل في حفظ بيانات السلة', 'warning');
      }
    },

    loadCartFromStorage() {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsed = JSON.parse(cartData);
          
          // التحقق من إصدار البيانات والتحقق من صحتها
          if (parsed.items && Array.isArray(parsed.items)) {
            // فلترة العناصر الصحيحة فقط
            this.cart = parsed.items.filter(item => {
              const isValid = this.validateProductData(item) && typeof item.quantity === 'number' && item.quantity > 0;
              if (!isValid) {
                console.warn('Invalid cart item removed:', item);
              }
              return isValid;
            });
            
            // استعادة الكوبون المطبق
            if (parsed.appliedCoupon && typeof parsed.appliedCoupon === 'object') {
              this.appliedCoupon = parsed.appliedCoupon;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to load cart from storage:', error);
        // مسح البيانات التالفة
        localStorage.removeItem('cart');
      }
    },

    saveWishlistToStorage() {
      try {
        const wishlistData = {
          items: this.wishlist,
          timestamp: new Date().toISOString(),
          version: '1.0'
        };
        localStorage.setItem('wishlist', JSON.stringify(wishlistData));
      } catch (error) {
        console.warn('Failed to save wishlist to storage:', error);
      }
    },

    loadWishlistFromStorage() {
      try {
        const wishlistData = localStorage.getItem('wishlist');
        if (wishlistData) {
          const parsed = JSON.parse(wishlistData);
          
          // دعم الصيغة القديمة والجديدة
          if (Array.isArray(parsed)) {
            // الصيغة القديمة
            this.wishlist = parsed.filter(id => typeof id === 'number' && id > 0);
          } else if (parsed.items && Array.isArray(parsed.items)) {
            // الصيغة الجديدة
            this.wishlist = parsed.items.filter(id => typeof id === 'number' && id > 0);
          }
        }
      } catch (error) {
        console.warn('Failed to load wishlist from storage:', error);
        localStorage.removeItem('wishlist');
      }
    },

    saveUserPreferences() {
      try {
        const preferences = {
          isDarkMode: this.isDarkMode,
          itemsPerPage: this.itemsPerPage,
          selectedCategory: this.selectedCategory,
          sortBy: this.sortBy,
          lastVisit: new Date().toISOString(),
          version: '1.0'
        };
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
      } catch (error) {
        console.warn('Failed to save user preferences:', error);
      }
    },

    loadUserPreferences() {
      try {
        const preferences = localStorage.getItem('userPreferences');
        if (preferences) {
          const parsed = JSON.parse(preferences);
          
          // تطبيق التفضيلات مع القيم الافتراضية
          this.isDarkMode = parsed.isDarkMode !== undefined ? parsed.isDarkMode : true;
          this.itemsPerPage = parsed.itemsPerPage || 12;
          
          // تطبيق المظهر
          document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        } else {
          // القيم الافتراضية عند عدم وجود تفضيلات محفوظة
          this.isDarkMode = true;
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (error) {
        console.warn('Failed to load user preferences:', error);
        localStorage.removeItem('userPreferences');
        // تطبيق القيم الافتراضية
        this.isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    },

    saveUserData() {
      this.saveCartToStorage();
      this.saveWishlistToStorage();
      this.saveUserPreferences();
    },

    clearAllData() {
      if (confirm('هل أنت متأكد من مسح جميع البيانات المحفوظة؟')) {
        try {
          localStorage.removeItem('cart');
          localStorage.removeItem('wishlist');
          localStorage.removeItem('userPreferences');
          
          // إعادة تعيين الحالة
          this.cart = [];
          this.wishlist = [];
          this.appliedCoupon = null;
          this.couponCode = '';
          this.selectedCategory = 'الكل';
          this.sortBy = 'default';
          this.currentPage = 1;
          
          this.showNotificationMessage('تم مسح جميع البيانات المحفوظة', 'success');
        } catch (error) {
          this.handleError('فشل في مسح البيانات', error);
        }
      }
    },

    // Performance Optimization
    debounceSearch: null, // سيتم تعيينها في created()
    throttleScroll: null, // سيتم تعيينها في created()

    // Analytics & Tracking (للتطوير المستقبلي)
    trackProductView(product) {
      // يمكن إضافة تتبع مشاهدة المنتجات هنا
      console.log('Product viewed:', product.title);
    },

    trackAddToCart(product) {
      // يمكن إضافة تتبع إضافة المنتجات للسلة هنا
      console.log('Product added to cart:', product.title);
    },

    trackPurchase(orderData) {
      // يمكن إضافة تتبع المشتريات هنا
      console.log('Purchase completed:', orderData);
    },

    // Legal Pages
    showPrivacyPolicy() {
      // في التطبيق الحقيقي، ستفتح صفحة أو modal منفصل
      alert('سياسة الخصوصية - سيتم فتح صفحة منفصلة في النسخة النهائية');
    },

    showTerms() {
      // في التطبيق الحقيقي، ستفتح صفحة أو modal منفصل
      alert('الشروط والأحكام - سيتم فتح صفحة منفصلة في النسخة النهائية');
    },

    showAbout() {
      // في التطبيق الحقيقي، ستفتح صفحة أو modal منفصل
      alert('حول المتجر - سيتم فتح صفحة منفصلة في النسخة النهائية');
    },

    // Error Recovery
    refreshPage() {
      window.location.reload();
    },

    // Accessibility
    announceToScreenReader(message) {
      // إنشاء element مخفي للقارئات الصوتية
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      // إزالة العنصر بعد فترة
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }
};
</script>

<template>
  <div class="store-container" role="main">
    <!-- Skip Link للوصول السريع -->
    <a href="#main-content" class="skip-link">تخطي إلى المحتوى الرئيسي</a>

    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading-screen" role="status" aria-label="جاري التحميل">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    </div>

    <!-- Error Boundary -->
    <div v-if="hasError" class="error-boundary" role="alert">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <h3>حدث خطأ غير متوقع</h3>
        <p>{{ errorMessage }}</p>
        <button @click="retryOperation" class="btn-primary">إعادة المحاولة</button>
      </div>
    </div>

    <!-- Overlay -->
    <div 
      v-if="sidebarOpen || cartOpen" 
      class="overlay" 
      @click="closeAllPanels"
      @keydown.escape="closeAllPanels"
      tabindex="0"
      aria-label="إغلاق القوائم"
    ></div>

    <!-- رأس الصفحة -->
    <header class="header" role="banner">
      <div class="header-content">
        <div class="logo">
          <i class="fas fa-code logo-icon" role="img" aria-label="شعار المتجر"></i>
          <h1>{{ storeInfo.name }}</h1>
        </div>

        <div class="search-bar" role="search">
          <label for="search-input" class="sr-only">البحث في المنتجات</label>
          <input 
            id="search-input"
            v-model="searchQuery" 
            type="text" 
            :placeholder="searchPlaceholder"
            class="search-input"
            :aria-describedby="searchQuery ? 'search-results-count' : null"
            @input="debouncedSearch"
            @keydown.enter="performSearch"
            autocomplete="off"
            spellcheck="false"
          >
          <button 
            @click="performSearch" 
            class="search-btn"
            aria-label="البحث"
            type="button"
          >
            <i class="fas fa-search search-icon"></i>
          </button>
          <button 
            v-if="searchQuery"
            @click="clearSearch" 
            class="clear-search-btn"
            aria-label="مسح البحث"
            type="button"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="header-actions">
          <button 
            class="cart-btn" 
            @click="toggleCart" 
            :class="{ active: cartOpen }"
            :aria-expanded="cartOpen"
            aria-controls="cart-panel"
            :aria-label="`سلة المشتريات - ${cartItemsCount} عنصر`"
          >
            <i class="fas fa-shopping-cart" aria-hidden="true"></i>
            <span v-if="cartItemsCount > 0" class="cart-count" :aria-label="`${cartItemsCount} عنصر في السلة`">
              {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
            </span>
          </button>

          <button 
            class="menu-btn" 
            @click="toggleSidebar" 
            :class="{ active: sidebarOpen }"
            :aria-expanded="sidebarOpen"
            aria-controls="sidebar-panel"
            aria-label="قائمة التصنيفات"
          >
            <i class="fas fa-bars" aria-hidden="true"></i>
          </button>

          <button 
            v-if="isDarkMode !== null"
            @click="toggleTheme" 
            class="theme-btn"
            :aria-label="isDarkMode ? 'تغيير إلى الوضع النهاري' : 'تغيير إلى الوضع الليلي'"
          >
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- نافذة السلة -->
    <transition name="slide-left">
      <div 
        v-if="cartOpen" 
        id="cart-panel"
        class="cart-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        @keydown.escape="closeCart"
      >
        <div class="cart-header">
          <h3 id="cart-title"><i class="fas fa-shopping-cart" aria-hidden="true"></i> سلة المشتريات</h3>
          <button class="close-btn" @click="closeCart" aria-label="إغلاق السلة">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div class="cart-content">
          <div v-if="cart.length === 0" class="empty-cart">
            <div class="empty-cart-icon">
              <i class="fas fa-shopping-cart" aria-hidden="true"></i>
            </div>
            <p>السلة فارغة</p>
            <small>أضف منتجات لتظهر هنا</small>
          </div>

          <div v-else class="cart-items">
            <div 
              v-for="item in cart" 
              :key="`cart-${item.id}`" 
              class="cart-item"
              :aria-label="`${item.title} - ${formatPrice(item.price)} - الكمية ${item.quantity}`"
            >
              <img 
                :src="sanitizeImageUrl(item.image)" 
                :alt="item.title" 
                class="cart-item-image"
                loading="lazy"
                @error="handleImageError"
              >
              <div class="cart-item-details">
                <h4>{{ truncateText(item.title, 50) }}</h4>
                <p class="cart-item-price">{{ formatPrice(item.price) }}</p>
                <div class="quantity-controls" role="group" :aria-label="`تحكم في كمية ${item.title}`">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)" 
                    class="qty-btn"
                    :disabled="item.quantity <= 1"
                    :aria-label="`تقليل كمية ${item.title}`"
                  >
                    <i class="fas fa-minus" aria-hidden="true"></i>
                  </button>
                  <span class="quantity" :aria-label="`الكمية الحالية ${item.quantity}`">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)" 
                    class="qty-btn"
                    :disabled="item.quantity >= maxQuantity"
                    :aria-label="`زيادة كمية ${item.title}`"
                  >
                    <i class="fas fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <button 
                @click="removeFromCart(item.id)" 
                class="remove-btn"
                :aria-label="`إزالة ${item.title} من السلة`"
              >
                <i class="fas fa-trash" aria-hidden="true"></i>
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
                <div v-if="shippingCost > 0" class="shipping-cost">
                  الشحن: {{ formatPrice(shippingCost) }}
                </div>
                <div v-if="appliedCoupon" class="coupon-discount">
                  خصم الكوبون ({{ appliedCoupon.code }}): -{{ formatPrice(couponDiscount) }}
                </div>
                <div class="final-total">
                  <strong>المجموع الكلي: {{ formatPrice(finalTotal) }}</strong>
                </div>
              </div>

              <div class="coupon-section">
                <div class="coupon-input-group">
                  <input 
                    v-model="couponCode"
                    type="text" 
                    placeholder="كود الخصم"
                    class="coupon-input"
                    :disabled="isApplyingCoupon"
                    @keydown.enter="applyCoupon"
                  >
                  <button 
                    @click="applyCoupon"
                    class="apply-coupon-btn"
                    :disabled="!couponCode.trim() || isApplyingCoupon"
                  >
                    {{ isApplyingCoupon ? 'جاري التطبيق...' : 'تطبيق' }}
                  </button>
                </div>
              </div>

              <div class="cart-actions">
                <button @click="clearCart" class="clear-btn" :disabled="isProcessingOrder">
                  <i class="fas fa-trash" aria-hidden="true"></i>
                  إفراغ السلة
                </button>
                <button 
                  @click="goToCheckout" 
                  class="checkout-btn"
                  :disabled="cart.length === 0 || isProcessingOrder"
                >
                  <i class="fas fa-credit-card" aria-hidden="true"></i>
                  {{ isProcessingOrder ? 'جاري المعالجة...' : 'إتمام الطلب' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- الشريط الجانبي -->
    <transition name="slide-right">
      <div 
        v-if="sidebarOpen" 
        id="sidebar-panel"
        class="sidebar"
        role="navigation"
        aria-labelledby="sidebar-title"
        @keydown.escape="closeSidebar"
      >
        <div class="sidebar-header">
          <h3 id="sidebar-title"><i class="fas fa-list" aria-hidden="true"></i> الأقسام</h3>
          <button class="close-btn" @click="closeSidebar" aria-label="إغلاق قائمة الأقسام">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <nav class="sidebar-nav">
          <ul role="list">
            <li 
              v-for="category in categories" 
              :key="category.id"
              @click="filterProducts(category.id)"
              @keydown.enter="filterProducts(category.id)"
              @keydown.space.prevent="filterProducts(category.id)"
              :class="{ active: selectedCategory === category.id }"
              tabindex="0"
              role="button"
              :aria-pressed="selectedCategory === category.id"
              :aria-label="`تصفية المنتجات حسب ${category.name}`"
            >
              <i :class="getCategoryIcon(category.id)" aria-hidden="true"></i>
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">({{ getCategoryCount(category.id) }})</span>
              <i class="fas fa-chevron-left category-arrow" aria-hidden="true"></i>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <!-- المحتوى الرئيسي -->
    <main id="main-content" class="main-content">

      <!-- المنتجات المميزة -->
      <section 
        v-if="shouldShowFeatured && featuredProducts.length > 0" 
        class="featured-section"
        aria-labelledby="featured-title"
      >
        <h2 id="featured-title">
          <i class="fas fa-star" aria-hidden="true"></i> 
          المنتجات المميزة
        </h2>
        <div class="featured-grid" role="grid">
          <article 
            v-for="product in featuredProducts" 
            :key="`featured-${product.id}`" 
            class="featured-card"
            role="gridcell"
            :aria-label="`منتج مميز: ${product.title}`"
          >
            <div class="featured-image-container">
              <img 
                :src="sanitizeImageUrl(product.image)" 
                :alt="product.title" 
                class="featured-image"
                loading="lazy"
                @error="handleImageError"
              >
              <div class="featured-badge" aria-label="منتج مميز">مميز</div>
              <div v-if="product.originalPrice > product.price" class="discount-badge">
                خصم {{ getDiscountPercentage(product.originalPrice, product.price) }}%
              </div>
            </div>
            <div class="featured-info">
              <h3>{{ product.title }}</h3>
              <p>{{ truncateText(product.description, 100) }}</p>
              <div class="product-rating" :aria-label="`تقييم ${product.rating} من 5`">
                <span class="stars" :aria-hidden="true">{{ renderStars(product.rating) }}</span>
                <span class="rating-text">({{ product.reviews }} تقييم)</span>
              </div>
              <div class="featured-price">
                <span class="current-price">{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price">
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>
              <button 
                @click="addToCart(product)" 
                class="featured-btn"
                :disabled="isProductInCart(product.id) && getCartItem(product.id)?.quantity >= maxQuantity"
                :aria-label="`إضافة ${product.title} إلى السلة بسعر ${formatPrice(product.price)}`"
              >
                <i class="fas fa-shopping-cart" aria-hidden="true"></i> 
                {{ isProductInCart(product.id) ? 'زيادة الكمية' : 'أضف للسلة' }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- فلاتر التصنيفات -->
      <section class="categories-section" aria-labelledby="categories-title">
        <h2 id="categories-title">
          <i class="fas fa-tags" aria-hidden="true"></i> 
          التصنيفات
        </h2>
        <div class="categories-filter" role="tablist">
          <button 
            v-for="category in categories" 
            :key="`filter-${category.id}`"
            @click="filterProducts(category.id)"
            :class="{ active: selectedCategory === category.id }"
            class="category-btn"
            role="tab"
            :aria-selected="selectedCategory === category.id"
            :aria-controls="'products-section'"
            :aria-label="`عرض منتجات ${category.name}`"
          >
            <i :class="getCategoryIcon(category.id)" aria-hidden="true"></i>
            <span>{{ category.name }}</span>
            <span class="category-count">({{ getCategoryCount(category.id) }})</span>
          </button>
        </div>
      </section>

      <!-- عرض المنتجات -->
      <section id="products-section" class="products-section" aria-labelledby="products-title" role="tabpanel">
        <div class="section-header">
          <h2 id="products-title">
            <i class="fas fa-box" aria-hidden="true"></i> 
            المنتجات
          </h2>
          <div class="products-info">
            <span id="search-results-count" class="products-count">
              {{ filteredProducts.length }} منتج
            </span>
            <div v-if="searchQuery" class="search-info">
              نتائج البحث عن: "{{ searchQuery }}"
              <button @click="clearSearch" class="clear-search" aria-label="مسح البحث">
                <i class="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div class="sort-controls">
              <label for="sort-select" class="sr-only">ترتيب المنتجات</label>
              <select 
                id="sort-select"
                v-model="sortBy" 
                class="sort-select"
                @change="sortProducts"
              >
                <option value="default">الترتيب الافتراضي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="newest">الأحدث</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="no-products">
          <div class="no-products-icon">
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
          <h3>لا توجد منتجات</h3>
          <p>لا توجد منتجات تطابق معايير البحث الحالية</p>
          <button @click="resetFilters" class="reset-filters">
            <i class="fas fa-refresh" aria-hidden="true"></i> إعادة تعيين الفلاتر
          </button>
        </div>

        <div v-else class="products-grid" role="grid">
          <article 
            v-for="product in paginatedProducts" 
            :key="product.id" 
            class="product-card"
            role="gridcell"
            :aria-label="`${product.title} - ${formatPrice(product.price)}`"
          >
            <div class="product-image-container">
              <img 
                :src="sanitizeImageUrl(product.image)" 
                :alt="product.title" 
                class="product-image"
                loading="lazy"
                @error="handleImageError"
              >
              <div class="product-badges">
                <div v-if="product.originalPrice > product.price" class="product-badge discount">
                  خصم {{ getDiscountPercentage(product.originalPrice, product.price) }}%
                </div>
                <div v-if="product.featured" class="product-badge featured">مميز</div>
                <div v-if="isNewProduct(product)" class="product-badge new">جديد</div>
              </div>
              <button 
                @click="toggleWishlist(product.id)"
                class="wishlist-btn"
                :class="{ active: isInWishlist(product.id) }"
                :aria-label="isInWishlist(product.id) ? `إزالة ${product.title} من المفضلة` : `إضافة ${product.title} للمفضلة`"
              >
                <i :class="isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'" aria-hidden="true"></i>
              </button>
            </div>

            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ truncateText(product.description, 80) }}</p>
              <div class="product-rating" :aria-label="`تقييم ${product.rating} من 5`">
                <span class="stars" :aria-hidden="true">{{ renderStars(product.rating) }}</span>
                <span class="rating-text">{{ product.rating }} ({{ product.reviews }} تقييم)</span>
              </div>
              <div class="product-tags">
                <span v-for="tag in product.tags" :key="tag" class="product-tag">{{ tag }}</span>
              </div>
              <div class="product-price">
                <span class="current-price">{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price">
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>
              <div class="product-actions">
                <button 
                  @click="addToCart(product)" 
                  class="add-to-cart-btn"
                  :disabled="isProductInCart(product.id) && getCartItem(product.id)?.quantity >= maxQuantity"
                  :aria-label="`إضافة ${product.title} إلى السلة بسعر ${formatPrice(product.price)}`"
                >
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                  <span>{{ isProductInCart(product.id) ? 'زيادة الكمية' : 'أضف للسلة' }}</span>
                </button>
                <button 
                  @click="quickViewProduct(product)"
                  class="quick-view-btn"
                  :aria-label="`عرض سريع لمنتج ${product.title}`"
                >
                  <i class="fas fa-eye" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination" role="navigation" aria-label="صفحات المنتجات">
          <button 
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="pagination-btn"
            aria-label="الصفحة السابقة"
          >
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
          
          <button 
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
            class="pagination-btn"
            :aria-label="`الصفحة ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
          >
            {{ page }}
          </button>
          
          <button 
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="pagination-btn"
            aria-label="الصفحة التالية"
          >
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
        </div>

      </section>
    </main>

    <!-- Quick View Modal -->
    <transition name="modal">
      <div v-if="quickViewProduct" class="modal-backdrop" @click.self="closeQuickView">
        <div class="modal-content quick-view-modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
          <div class="modal-header">
            <h3 id="quick-view-title">{{ quickViewProduct.title }}</h3>
            <button @click="closeQuickView" class="close-btn" aria-label="إغلاق العرض السريع">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="quick-view-content">
              <div class="quick-view-image">
                <img :src="sanitizeImageUrl(quickViewProduct.image)" :alt="quickViewProduct.title" loading="lazy">
              </div>
              <div class="quick-view-details">
                <p>{{ quickViewProduct.description }}</p>
                <div class="product-rating">
                  <span class="stars">{{ renderStars(quickViewProduct.rating) }}</span>
                  <span class="rating-text">{{ quickViewProduct.rating }} ({{ quickViewProduct.reviews }} تقييم)</span>
                </div>
                <div class="product-price">
                  <span class="current-price">{{ formatPrice(quickViewProduct.price) }}</span>
                  <span v-if="quickViewProduct.originalPrice > quickViewProduct.price" class="original-price">
                    {{ formatPrice(quickViewProduct.originalPrice) }}
                  </span>
                </div>
                <button @click="addToCart(quickViewProduct); closeQuickView()" class="btn-primary btn-block">
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                  أضف للسلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Notification -->
    <transition name="notification">
      <div v-if="showNotification" class="notification-card" role="alert" aria-live="polite">
        <div class="notification-content" :class="notificationType">
          <i :class="getNotificationIcon(notificationType)" class="notification-icon" aria-hidden="true"></i>
          <span class="notification-text">{{ notificationMessage }}</span>
          <button @click="closeNotification" class="notification-close" aria-label="إغلاق الإشعار">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- التذييل -->
    <footer class="footer" role="contentinfo">
      <div class="footer-content">
        <div class="footer-section">
          <h4><i class="fas fa-info-circle" aria-hidden="true"></i> حول المتجر</h4>
          <p>{{ storeInfo.description }}</p>
        </div>
        <div class="footer-section">
          <h4><i class="fas fa-phone" aria-hidden="true"></i> التواصل</h4>
          <p>واتساب: {{ storeInfo.whatsapp }}</p>
          <p>الإيميل: {{ storeInfo.email }}</p>
        </div>
        <div class="footer-section">
          <h4><i class="fas fa-shield-alt" aria-hidden="true"></i> الأمان</h4>
          <p>جميع المعاملات محمية بأعلى معايير الأمان</p>
          <div class="security-badges">
            <i class="fas fa-lock" aria-label="اتصال آمن"></i>
            <i class="fas fa-certificate" aria-label="موثق"></i>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} جميع الحقوق محفوظة لـ{{ storeInfo.name }}.</p>
        <div class="footer-links">
          <a href="#privacy" @click.prevent="showPrivacyPolicy">سياسة الخصوصية</a>
          <a href="#terms" @click.prevent="showTerms">الشروط والأحكام</a>
        </div>
      </div>
    </footer>

    <!-- Back to top button -->
    <transition name="fade">
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        aria-label="العودة لأعلى الصفحة"
      >
        <i class="fas fa-chevron-up" aria-hidden="true"></i>
      </button>
    </transition>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

/* CSS Custom Properties */
:root {
  --primary-color: #667eea;
  --primary-dark: #5a67d8;
  --secondary-color: #764ba2;
  --accent-color: #ff4757;
  --success-color: #22c55e;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
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
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.4s ease;
}

/* Light theme overrides */
[data-theme="light"] {
  --text-primary: #1a202c;
  --text-secondary: rgba(26, 32, 44, 0.8);
  --text-muted: rgba(26, 32, 44, 0.6);
  --background-primary: rgba(255, 255, 255, 0.9);
  --background-secondary: rgba(247, 250, 252, 0.9);
  --border-color: rgba(226, 232, 240, 0.8);
  --shadow-light: rgba(102, 126, 234, 0.15);
  --shadow-dark: rgba(0, 0, 0, 0.1);
}

/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Tajawal', sans-serif;
  background: #0a0a0a;
  color: var(--text-primary);
  line-height: 1.6;
  direction: rtl;
  overflow-x: hidden;
}

[data-theme="light"] body {
  background: #f7fafc;
}

.store-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
  position: relative;
}

[data-theme="light"] .store-container {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 25%, #e2e8f0 50%, #edf2f7 75%, #f7fafc 100%);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  right: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 10000;
  transition: top var(--transition-normal);
  font-weight: 500;
}

.skip-link:focus {
  top: 6px;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.loading-spinner {
  text-align: center;
  color: var(--text-primary);
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error Boundary */
.error-boundary {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.error-content {
  background: var(--background-primary);
  backdrop-filter: blur(30px);
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.error-icon {
  font-size: 4rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
}

.error-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.error-content p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

/* Header Styles */
.header {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 20px var(--shadow-dark);
}

[data-theme="light"] .header {
  background: rgba(255, 255, 255, 0.95);
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
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.8rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--shadow-light);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 1rem 4rem 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--shadow-light);
  background: var(--background-secondary);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-btn,
.clear-search-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn {
  left: 1rem;
  font-size: 1.1rem;
}

.clear-search-btn {
  left: 3rem;
  font-size: 0.9rem;
}

.search-btn:hover,
.clear-search-btn:hover {
  color: var(--primary-color);
  background: var(--background-secondary);
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.cart-btn,
.menu-btn,
.theme-btn {
  position: relative;
  background: var(--background-primary);
  border: 2px solid transparent;
  padding: 0.875rem 1rem;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1.2rem;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-btn:hover,
.menu-btn:hover,
.theme-btn:hover,
.cart-btn.active,
.menu-btn.active {
  background: rgba(102, 126, 234, 0.3);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--shadow-light);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, var(--accent-color), #ff3742);
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

/* Notification System */
.notification-card {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius);
  padding: 1.2rem 2rem;
  z-index: 10000;
  max-width: 400px;
  box-shadow: 0 15px 40px var(--shadow-dark);
  border: 1px solid var(--border-color);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-content.success {
  border-left: 4px solid var(--success-color);
}

.notification-content.error {
  border-left: 4px solid var(--accent-color);
}

.notification-content.warning {
  border-left: 4px solid var(--warning-color);
}

.notification-content.info {
  border-left: 4px solid var(--info-color);
}

.notification-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.success-icon { color: var(--success-color) !important; }
.error-icon { color: var(--accent-color) !important; }
.warning-icon { color: var(--warning-color) !important; }
.info-icon { color: var(--info-color) !important; }

.notification-text {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: var(--accent-color);
  background: var(--background-secondary);
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
  border-left: 1px solid var(--border-color);
  box-shadow: -5px 0 25px var(--shadow-dark);
}

[data-theme="light"] .sidebar {
  background: rgba(255, 255, 255, 0.98);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: var(--background-primary);
  border: none;
  color: var(--text-primary);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 10px;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 71, 87, 0.3);
  color: var(--accent-color);
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
  transition: all var(--transition-normal);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.sidebar-nav li:hover,
.sidebar-nav li.active,
.sidebar-nav li:focus {
  background: rgba(102, 126, 234, 0.2);
  border-right: 4px solid var(--primary-color);
  transform: translateX(-5px);
  outline: none;
}

.sidebar-nav li i {
  font-size: 1.3rem;
  color: var(--primary-color);
  width: 20px;
  text-align: center;
}

.category-name {
  font-size: 1rem;
  font-weight: 500;
  flex: 1;
  color: var(--text-primary);
}

.category-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--background-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.category-arrow {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: all var(--transition-normal);
}

.sidebar-nav li:hover .category-arrow {
  transform: translateX(-5px);
  color: var(--primary-color);
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
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 25px var(--shadow-dark);
}

[data-theme="light"] .cart-popup {
  background: rgba(255, 255, 255, 0.98);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.cart-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: var(--text-primary);
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
  color: var(--text-muted);
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

.empty-cart p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.empty-cart small {
  font-size: 0.9rem;
  color: var(--text-muted);
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
  transition: all var(--transition-normal);
}

.cart-item:hover {
  background: var(--background-secondary);
}

.cart-item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid var(--border-color);
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.cart-item-price {
  color: var(--primary-color);
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
  color: var(--primary-color);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.4);
  color: var(--text-primary);
  transform: scale(1.1);
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: 700;
  min-width: 35px;
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.remove-btn {
  background: rgba(255, 71, 87, 0.2);
  border: 1px solid rgba(255, 71, 87, 0.3);
  color: var(--accent-color);
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(255, 71, 87, 0.4);
  color: var(--text-primary);
  transform: scale(1.1);
}

.cart-footer {
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .cart-footer {
  background: rgba(255, 255, 255, 0.3);
}

.cart-summary {
  margin-bottom: 1.5rem;
}

.cart-total,
.cart-savings,
.shipping-cost,
.coupon-discount,
.final-total {
  text-align: center;
  margin-bottom: 0.5rem;
}

.cart-total,
.final-total {
  font-size: 1.3rem;
  color: var(--primary-color);
  font-weight: 700;
}

.cart-savings {
  color: var(--success-color);
  font-weight: 600;
}

.shipping-cost {
  color: var(--text-secondary);
}

.coupon-discount {
  color: var(--success-color);
  font-weight: 600;
}

.coupon-section {
  margin-bottom: 1.5rem;
}

.coupon-input-group {
  display: flex;
  gap: 0.5rem;
}

.coupon-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--background-primary);
  color: var(--text-primary);
  font-family: 'Tajawal', sans-serif;
}

.coupon-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.apply-coupon-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-normal);
  font-family: 'Tajawal', sans-serif;
}

.apply-coupon-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-2px);
}

.apply-coupon-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.clear-btn,
.checkout-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-family: 'Tajawal', sans-serif;
}

.clear-btn {
  background: rgba(255, 71, 87, 0.2);
  color: var(--accent-color);
  border: 1px solid rgba(255, 71, 87, 0.3);
}

.clear-btn:hover:not(:disabled) {
  background: rgba(255, 71, 87, 0.4);
  color: var(--text-primary);
  transform: translateY(-2px);
}

.checkout-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.checkout-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-light);
}

.checkout-btn:disabled,
.clear-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--shadow-light);
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
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  transition: all var(--transition-slow);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  position: relative;
}

.featured-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px var(--shadow-light);
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
  transition: transform var(--transition-slow);
}

.featured-card:hover .featured-image {
  transform: scale(1.1);
}

.featured-badge,
.discount-badge {
  position: absolute;
  top: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.featured-badge {
  right: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #000;
}

.discount-badge {
  left: 1rem;
  background: linear-gradient(135deg, var(--accent-color), #ff3742);
  color: white;
}

.featured-info {
  padding: 2rem;
}

.featured-info h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.featured-info p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
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
  color: var(--text-muted);
}

.featured-price,
.product-price {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-color);
}

.original-price {
  font-size: 1.1rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.featured-btn,
.btn-primary {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1.1rem;
  font-family: 'Tajawal', sans-serif;
}

.featured-btn:hover:not(:disabled),
.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px var(--shadow-light);
}

.featured-btn:disabled,
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-block {
  width: 100%;
}

/* Categories Section */
.categories-section {
  margin-bottom: 4rem;
}

.categories-section h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--shadow-light);
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
  overflow-x: auto;
  padding-bottom: 1rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--background-primary);
  border: 2px solid transparent;
  padding: 1rem 2rem;
  border-radius: 30px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  backdrop-filter: blur(15px);
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-btn:hover,
.category-btn.active,
.category-btn:focus {
  background: rgba(102, 126, 234, 0.3);
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-light);
  outline: none;
}

.category-btn i {
  font-size: 1.2rem;
  color: var(--primary-color);
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
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--shadow-light);
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
  color: var(--primary-color);
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.search-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 193, 7, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  color: var(--warning-color);
  font-weight: 500;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.clear-search {
  background: none;
  border: none;
  color: var(--warning-color);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all var(--transition-normal);
}

.clear-search:hover {
  background: rgba(255, 193, 7, 0.3);
  transform: scale(1.2);
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-select {
  background: var(--background-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  font-family: 'Tajawal', sans-serif;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--shadow-light);
}

.no-products {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-muted);
}

.no-products-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.no-products h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.no-products p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.reset-filters {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reset-filters:hover {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px var(--shadow-light);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

/* Product Card */
.product-card {
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  transition: all var(--transition-slow);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  position: relative;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px var(--shadow-light);
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
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none;
}

.product-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.product-badge.discount {
  background: linear-gradient(135deg, var(--accent-color), #ff3742);
  color: white;
}

.product-badge.featured {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #000;
}

.product-badge.new {
  background: linear-gradient(135deg, var(--success-color), #10b981);
  color: white;
}

.wishlist-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-muted);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.wishlist-btn:hover,
.wishlist-btn.active {
  background: rgba(255, 255, 255, 1);
  color: var(--accent-color);
  transform: scale(1.1);
}

.product-info {
  padding: 2rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.product-tag {
  background: var(--background-secondary);
  color: var(--text-muted);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid var(--border-color);
}

.product-actions {
  display: flex;
  gap: 0.75rem;
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1rem;
  font-family: 'Tajawal', sans-serif;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px var(--shadow-light);
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.quick-view-btn {
  background: var(--background-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-view-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.pagination-btn {
  background: var(--background-primary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 500;
  font-family: 'Tajawal', sans-serif;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled),
.pagination-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Modal Styles */
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
  padding: 2rem;
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(30px);
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px var(--shadow-dark);
}

[data-theme="light"] .modal-content {
  background: rgba(255, 255, 255, 0.95);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.quick-view-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.quick-view-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.quick-view-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quick-view-details p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

[data-theme="light"] .footer {
  background: rgba(255, 255, 255, 0.8);
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
  color: var(--primary-color);
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.security-badges {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.security-badges i {
  font-size: 1.5rem;
  color: var(--success-color);
}

.footer-bottom {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.footer-links a:hover {
  color: var(--primary-color);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px var(--shadow-light);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px var(--shadow-light);
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
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

  .quick-view-content {
    grid-template-columns: 1fr;
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

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .modal-body {
    padding: 1.5rem;
  }

  .back-to-top {
    bottom: 1rem;
    left: 1rem;
    width: 45px;
    height: 45px;
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

  .product-actions {
    flex-direction: column;
  }

  .pagination-btn {
    padding: 0.5rem 0.75rem;
    min-width: 40px;
  }
}

/* Accessibility Improvements */
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

/* Focus States */
button:focus-visible,
input:focus-visible,
select:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --border-color: #000000;
    --text-primary: #000000;
    --background-primary: #ffffff;
  }

  [data-theme="light"] {
    --border-color: #000000;
    --text-primary: #000000;
    --background-primary: #ffffff;
  }
  
  .product-card,
  .featured-card,
  .sidebar,
  .cart-popup {
    border: 2px solid #000000;
  }
}

/* Print Styles */
@media print {
  .header,
  .sidebar,
  .cart-popup,
  .notification-card,
  .overlay,
  .back-to-top,
  .wishlist-btn,
  .quick-view-btn {
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

  body {
    background: white !important;
    color: black !important;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--background-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--primary-dark), #6b46c1);
}

/* Performance Optimizations */
.product-image,
.featured-image,
.cart-item-image {
  will-change: transform;
}

.product-card,
.featured-card {
  will-change: transform, box-shadow;
}

/* Animation Classes */
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

/* Loading Animation */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.loading-shimmer {
  background: linear-gradient(
    90deg,
    var(--background-primary) 25%,
    var(--background-secondary) 50%,
    var(--background-primary) 75%
  );
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.hidden { display: none; }
.block { display: block; }

.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }

.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }

.transition-normal { transition: all var(--transition-normal); }
.transition-fast { transition: all var(--transition-fast); }
.transition-slow { transition: all var(--transition-slow); }

/* Error States */
.error {
  color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
}

.success {
  color: var(--success-color) !important;
  border-color: var(--success-color) !important;
}

.warning {
  color: var(--warning-color) !important;
  border-color: var(--warning-color) !important;
}
</style>
