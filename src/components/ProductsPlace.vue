import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Store, 
  MessageCircle, 
  Gamepad2, 
  Globe, 
  Star, 
  CheckCircle,
  Package,
  Filter
} from 'lucide-react';

export default function ArabicStore() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      title: "برمجة سيرفر فايف ام",
      description: "برمجة سيرفر فايف ام من الصفر مع جميع المميزات المطلوبة",
      price: 25,
      originalPrice: 35,
      category: "فايف ام",
      image: "https://i.imgur.com/kAg2dIa.jpeg",
      rating: 4.8,
      reviews: 24
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
      reviews: 18
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
      reviews: 32
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
      reviews: 15
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
      reviews: 28
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
      reviews: 41
    }
  ];

  const categories = [
    { id: 'الكل', name: 'الكل', icon: Store },
    { id: 'ديسكورد', name: 'ديسكورد', icon: MessageCircle },
    { id: 'فايف ام', name: 'فايف ام', icon: Gamepad2 },
    { id: 'مواقع', name: 'مواقع', icon: Globe },
    { id: 'طلب خاص', name: 'طلب خاص', icon: Star }
  ];

  const filteredProducts = () => {
    let filtered = selectedCategory === 'الكل' 
      ? products 
      : products.filter(p => p.category === selectedCategory);
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.includes(searchQuery) || 
        p.description.includes(searchQuery)
      );
    }
    
    return filtered;
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    setLastAddedProduct(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen && cartOpen) {
      setCartOpen(false);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
    if (!cartOpen && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCartOpen(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white" dir="rtl">
      {/* إشعار الإضافة للسلة */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 z-50 shadow-xl shadow-green-500/20 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold">تمت إضافة {lastAddedProduct?.title} إلى السلة!</span>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(sidebarOpen || cartOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            setSidebarOpen(false);
            setCartOpen(false);
          }}
        />
      )}

      {/* رأس الصفحة */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Store className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-purple-400">متجر البرمجة</h1>
            </div>
            
            <div className="flex-1 max-w-md relative">
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text" 
                placeholder="ابحث عن منتج..."
                className="w-full py-3 px-4 pr-12 bg-white/10 border-2 border-white/10 rounded-full text-white placeholder-white/70 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/10 transition-all"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleCart}
                className={`relative p-3 bg-white/10 rounded-2xl transition-all hover:bg-purple-400/30 hover:-translate-y-1 ${cartOpen ? 'bg-purple-400/30' : ''}`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={toggleSidebar}
                className={`p-3 bg-white/10 rounded-2xl transition-all hover:bg-purple-400/30 hover:-translate-y-1 ${sidebarOpen ? 'bg-purple-400/30' : ''}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* الشريط الجانبي */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Filter className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">الأقسام</h3>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <li 
                  key={category.id}
                  onClick={() => filterProducts(category.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:bg-purple-400/20 ${selectedCategory === category.id ? 'bg-purple-400/20 border-r-4 border-purple-400' : ''}`}
                >
                  <IconComponent className="w-6 h-6 text-purple-400" />
                  <span className="text-lg font-medium">{category.name}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* نافذة السلة */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 ${cartOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">سلة المشتريات</h3>
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingCart className="w-16 h-16 text-white/30 mb-4" />
              <p className="text-xl mb-2">السلة فارغة</p>
              <p className="text-white/70">أضف منتجات لتظهر هنا</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-purple-400 font-bold">{item.price} ريال</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center hover:bg-purple-400/40 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center hover:bg-purple-400/40 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <div className="border-t border-white/10 pt-4">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-purple-400">الإجمالي: {cartTotal} ريال</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={clearCart}
                    className="flex-1 py-3 bg-red-500/20 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-colors"
                  >
                    إفراغ السلة
                  </button>
                  <button className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                    إتمام الطلب
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* فلاتر التصنيفات */}
        <section className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Filter className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-center">التصنيفات</h2>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button 
                  key={category.id}
                  onClick={() => filterProducts(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full transition-all hover:bg-purple-400/30 hover:-translate-y-1 ${selectedCategory === category.id ? 'bg-purple-400/30 border-2 border-purple-400' : 'border-2 border-transparent'}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* عرض المنتجات */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold">المنتجات</h2>
            </div>
            <div className="bg-purple-400/20 px-4 py-2 rounded-full">
              <span className="text-purple-400 font-semibold">{filteredProducts().length} منتج</span>
            </div>
          </div>
          
          {filteredProducts().length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-20 h-20 text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">لا توجد منتجات</h3>
              <p className="text-white/70">لا توجد منتجات في هذا القسم حاليًا</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts().map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white/10 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-white/70">
                        {product.rating} ({product.reviews} تقييم)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold text-purple-400">{product.price} ريال</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-white/50 line-through">
                          {product.originalPrice} ريال
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-2xl font-semibold transition-all hover:from-purple-600 hover:to-blue-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>أضف للسلة</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
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
