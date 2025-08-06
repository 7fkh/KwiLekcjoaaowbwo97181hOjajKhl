import React, { useState, useMemo } from 'react';

const ArabicProgrammingStore = () => {
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
  ];

  const categories = [
    { id: 'الكل', name: 'جميع المنتجات' },
    { id: 'ديسكورد', name: 'بوتات ديسكورد' },
    { id: 'فايف ام', name: 'خدمات FiveM' },
    { id: 'مواقع', name: 'المواقع الإلكترونية' },
    { id: 'تطبيقات', name: 'تطبيقات الموبايل' },
    { id: 'أتمتة', name: 'الأتمتة والسكريبتات' }
  ];

  // Computed values
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'الكل' 
      ? products 
      : products.filter(p => p.category === selectedCategory);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured).slice(0, 4);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const totalSavings = useMemo(() => {
    return cart.reduce((savings, item) => {
      const itemSaving = (item.originalPrice - item.price) * item.quantity;
      return savings + itemSaving;
    }, 0);
  }, [cart]);

  // Methods
  const filterProducts = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const goToCheckout = () => {
    if (cart.length === 0) return;
    
    alert(`إتمام الطلب - المجموع: ${formatPrice(cartTotal)}\nسيتم التواصل معك قريباً لإتمام الطلب`);
    setCartOpen(false);
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

  const clearCart = () => {
    setCart([]);
    setCartOpen(false);
  };

  const renderStars = (rating) => {
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
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      'الكل': 'fas fa-th-large',
      'ديسكورد': 'fab fa-discord',
      'فايف ام': 'fas fa-gamepad',
      'مواقع': 'fas fa-globe',
      'تطبيقات': 'fas fa-mobile-alt',
      'أتمتة': 'fas fa-robot'
    };
    return icons[categoryId] || 'fas fa-tag';
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    return Math.round((1 - currentPrice / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white" style={{direction: 'rtl'}}>
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-8 right-8 bg-black bg-opacity-95 backdrop-blur-xl border border-green-400 border-opacity-40 rounded-2xl p-5 z-50 shadow-2xl shadow-green-500/30">
          <div className="flex items-center gap-4">
            <i className="fas fa-check-circle text-green-500 text-xl"></i>
            <span className="text-white font-semibold">
              تمت إضافة {lastAddedProduct?.title} إلى السلة!
            </span>
          </div>
        </div>
      )}

      {/* Overlay */}
      {(sidebarOpen || cartOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
          onClick={() => {
            setSidebarOpen(false);
            setCartOpen(false);
          }}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 bg-black bg-opacity-95 backdrop-blur-xl border-b border-white border-opacity-10 shadow-2xl z-30">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <i className="fas fa-code text-3xl text-blue-500 drop-shadow-lg"></i>
            <h1 className="text-2xl font-bold text-white">متجر البرمجة</h1>
          </div>

          <div className="relative flex-1 max-w-lg">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text" 
              placeholder="ابحث عن منتج..." 
              className="w-full py-4 px-6 pr-12 border-2 border-white border-opacity-10 rounded-full bg-white bg-opacity-10 text-white text-base placeholder-white placeholder-opacity-70 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:bg-white focus:bg-opacity-15"
            />
            <i className="fas fa-search absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-opacity-70"></i>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className={`relative bg-white bg-opacity-10 border-2 border-transparent py-4 px-4 rounded-2xl text-white cursor-pointer transition-all duration-300 text-xl min-w-[50px] flex items-center justify-center hover:bg-blue-500 hover:bg-opacity-30 hover:border-blue-500 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 ${cartOpen ? 'bg-blue-500 bg-opacity-30 border-blue-500 transform -translate-y-1 shadow-xl shadow-blue-500/30' : ''}`}
            >
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full min-w-[22px] h-[22px] text-xs flex items-center justify-center font-bold shadow-lg shadow-red-500/40">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`bg-white bg-opacity-10 border-2 border-transparent py-4 px-4 rounded-2xl text-white cursor-pointer transition-all duration-300 text-xl min-w-[50px] flex items-center justify-center hover:bg-blue-500 hover:bg-opacity-30 hover:border-blue-500 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 ${sidebarOpen ? 'bg-blue-500 bg-opacity-30 border-blue-500 transform -translate-y-1 shadow-xl shadow-blue-500/30' : ''}`}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Popup */}
      {cartOpen && (
        <div className="fixed top-0 left-0 w-96 h-full bg-black bg-opacity-98 backdrop-blur-xl z-50 border-r border-white border-opacity-10 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center p-8 border-b border-white border-opacity-10">
            <h3 className="flex items-center gap-3 text-xl text-white font-bold">
              <i className="fas fa-shopping-cart"></i> سلة المشتريات
            </h3>
            <button 
              onClick={() => setCartOpen(false)}
              className="bg-white bg-opacity-10 border-none text-white text-lg cursor-pointer p-3 rounded-xl transition-all duration-300 flex items-center justify-center hover:bg-red-500 hover:bg-opacity-30 hover:text-red-500 hover:transform hover:scale-110"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-8 text-white text-opacity-70">
                <div className="text-6xl mb-6 text-white text-opacity-30">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <p className="text-xl mb-2 font-medium">السلة فارغة</p>
                <small className="text-base text-white text-opacity-50">أضف منتجات لتظهر هنا</small>
              </div>
            ) : (
              <div className="p-0">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center p-6 border-b border-white border-opacity-5 gap-4 transition-all duration-300 hover:bg-white hover:bg-opacity-2">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl border-2 border-white border-opacity-10" />
                    <div className="flex-1">
                      <h4 className="text-base mb-2 text-white font-semibold">{item.title}</h4>
                      <p className="text-blue-500 font-bold mb-3 text-lg">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-30 text-blue-500 w-8 h-8 rounded-lg cursor-pointer transition-all duration-300 text-sm flex items-center justify-center hover:bg-blue-500 hover:bg-opacity-40 hover:text-white hover:transform hover:scale-110"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="font-bold min-w-[35px] text-center text-lg text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-30 text-blue-500 w-8 h-8 rounded-lg cursor-pointer transition-all duration-300 text-sm flex items-center justify-center hover:bg-blue-500 hover:bg-opacity-40 hover:text-white hover:transform hover:scale-110"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 text-red-500 p-2 rounded-lg cursor-pointer transition-all duration-300 text-base flex items-center justify-center hover:bg-red-500 hover:bg-opacity-40 hover:text-white hover:transform hover:scale-110"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}

                <div className="p-8 border-t border-white border-opacity-10 bg-black bg-opacity-30">
                  <div className="mb-6">
                    <div className="text-center text-xl mb-2 text-blue-500 font-bold">
                      الإجمالي: {formatPrice(cartTotal)}
                    </div>
                    {totalSavings > 0 && (
                      <div className="text-center text-base text-green-500 font-semibold">
                        وفرت: {formatPrice(totalSavings)}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={clearCart}
                      className="flex-1 py-4 border-none rounded-xl cursor-pointer font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm bg-red-500 bg-opacity-20 text-red-500 border border-red-500 border-opacity-30 hover:bg-red-500 hover:bg-opacity-40 hover:text-white hover:transform hover:-translate-y-1"
                    >
                      <i className="fas fa-trash"></i>
                      إفراغ السلة
                    </button>
                    <button 
                      onClick={goToCheckout}
                      disabled={cart.length === 0}
                      className="flex-1 py-4 border-none rounded-xl cursor-pointer font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm bg-gradient-to-br from-blue-600 to-purple-600 text-white border border-blue-500 border-opacity-30 hover:from-blue-700 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-credit-card"></i>
                      إتمام الطلب
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-black bg-opacity-98 backdrop-blur-xl z-50 border-l border-white border-opacity-10 shadow-2xl">
          <div className="flex justify-between items-center p-8 border-b border-white border-opacity-10">
            <h3 className="flex items-center gap-3 text-xl text-white">
              <i className="fas fa-list"></i> الأقسام
            </h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="bg-white bg-opacity-10 border-none text-white text-lg cursor-pointer p-3 rounded-xl transition-all duration-300 flex items-center justify-center hover:bg-red-500 hover:bg-opacity-30 hover:text-red-500 hover:transform hover:scale-110"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <nav>
            <ul className="list-none p-0 m-0">
              {categories.map(category => (
                <li 
                  key={category.id}
                  onClick={() => filterProducts(category.id)}
                  className={`flex items-center gap-4 py-5 px-6 cursor-pointer transition-all duration-300 border-b border-white border-opacity-5 relative hover:bg-blue-500 hover:bg-opacity-20 hover:border-r-4 hover:border-r-blue-500 hover:transform hover:-translate-x-2 ${selectedCategory === category.id ? 'bg-blue-500 bg-opacity-20 border-r-4 border-r-blue-500 transform -translate-x-2' : ''}`}
                >
                  <i className={`${getCategoryIcon(category.id)} text-xl text-blue-500 w-5 text-center`}></i>
                  <span className="text-base font-medium flex-1 text-white">{category.name}</span>
                  <i className="fas fa-chevron-left text-sm text-white text-opacity-60 transition-all duration-300"></i>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">

        {/* Featured Products */}
        {selectedCategory === 'الكل' && !searchQuery && (
          <section className="mb-16">
            <h2 className="text-4xl mb-8 text-center text-white drop-shadow-xl flex items-center justify-center gap-4">
              <i className="fas fa-star"></i> المنتجات المميزة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <div 
                  key={`featured-${product.id}`}
                  className="bg-white bg-opacity-10 rounded-2xl overflow-hidden transition-all duration-500 backdrop-blur-lg border border-white border-opacity-10 relative hover:transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-500 hover:border-opacity-50"
                >
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black py-2 px-4 rounded-3xl text-sm font-bold shadow-lg shadow-yellow-400/40">
                      مميز
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-white">{product.title}</h3>
                    <p className="text-white text-opacity-80 text-base mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold text-blue-500">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-white text-opacity-50 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-blue-600 to-purple-600 border-none py-4 rounded-2xl text-white font-bold cursor-pointer transition-all duration-300 text-lg hover:from-blue-700 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40"
                    >
                      <i className="fas fa-shopping-cart text-xl"></i> أضف للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl mb-8 text-center text-white drop-shadow-xl flex items-center justify-center gap-4">
            <i className="fas fa-tags"></i> التصنيفات
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {categories.map(category => (
              <button 
                key={category.id}
                onClick={() => filterProducts(category.id)}
                className={`flex items-center gap-3 bg-white bg-opacity-10 border-2 border-transparent py-4 px-8 rounded-full text-white cursor-pointer transition-all duration-300 backdrop-blur-lg font-medium text-base hover:bg-blue-500 hover:bg-opacity-30 hover:border-blue-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 ${selectedCategory === category.id ? 'bg-blue-500 bg-opacity-30 border-blue-500 transform -translate-y-2 shadow-2xl shadow-blue-500/30' : ''}`}
              >
                <i className={`${getCategoryIcon(category.id)} text-xl text-blue-500`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <h2 className="text-4xl text-white drop-shadow-xl flex items-center gap-4">
              <i className="fas fa-box"></i> المنتجات
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="bg-blue-500 bg-opacity-20 py-3 px-6 rounded-3xl font-semibold text-blue-500 border border-blue-500 border-opacity-30">
                {filteredProducts.length} منتج
              </span>
              {searchQuery && (
                <div className="flex items-center gap-2 bg-yellow-500 bg-opacity-20 py-3 px-6 rounded-3xl text-yellow-500 font-medium border border-yellow-500 border-opacity-30">
                  نتائج البحث عن: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="bg-none border-none text-yellow-500 cursor-pointer p-1 rounded-full transition-all duration-300 hover:bg-yellow-500 hover:bg-opacity-30 hover:transform hover:scale-125"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-8 text-white text-opacity-70">
              <div className="text-8xl mb-8 text-white text-opacity-30">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-2xl mb-4 text-white">لا توجد منتجات</h3>
              <p className="text-lg mb-8 text-white text-opacity-60">لا توجد منتجات تطابق معايير البحث الحالية</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('الكل');}}
                className="bg-gradient-to-br from-blue-600 to-purple-600 border-none py-4 px-8 rounded-3xl text-white font-semibold cursor-pointer transition-all duration-300 text-base flex items-center gap-3 mx-auto hover:from-blue-700 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <i className="fas fa-refresh"></i> إعادة تعيين الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-white bg-opacity-10 rounded-2xl overflow-hidden transition-all duration-500 backdrop-blur-lg border border-white border-opacity-10 relative hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-500 hover:border-opacity-40"
                >
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110" />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-600 text-white py-2 px-4 rounded-3xl text-sm font-bold shadow-lg shadow-red-500/40">
                        خصم {getDiscountPercentage(product.originalPrice, product.price)}%
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black py-2 px-4 rounded-3xl text-sm font-bold shadow-lg shadow-yellow-400/40">
                        مميز
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-white">{product.title}</h3>
                    <p className="text-white text-opacity-80 text-base mb-6 leading-relaxed line-clamp-3">{product.description}</p>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-yellow-400 text-lg">{renderStars(product.rating)}</span>
                      <span className="text-sm text-white text-opacity-70">{product.rating} ({product.reviews} تقييم)</span>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-2xl font-bold text-blue-500">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-white text-opacity-50 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-blue-600 to-purple-600 border-none py-4 rounded-2xl text-white font-bold cursor-pointer transition-all duration-300 text-lg hover:from-blue-700 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40"
                    >
                      <i className="fas fa-shopping-cart text-xl"></i>
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 border-t border-white border-opacity-10 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="flex items-center gap-3 text-xl mb-4 text-blue-500">
              <i className="fas fa-info-circle"></i> حول المتجر
            </h4>
            <p className="text-white text-opacity-80 leading-relaxed">متجر متخصص في خدمات البرمجة والتصميم الاحترافي.</p>
          </div>
          <div>
            <h4 className="flex items-center gap-3 text-xl mb-4 text-blue-500">
              <i className="fas fa-phone"></i> التواصل
            </h4>
            <p className="text-white text-opacity-80 leading-relaxed mb-2">واتساب: +966500000000</p>
            <p className="text-white text-opacity-80 leading-relaxed">الإيميل: support@programming-store.com</p>
          </div>
        </div>
        <div className="text-center py-8 border-t border-white border-opacity-10 mt-8 text-white text-opacity-60">
          <p>&copy; 2025 جميع الحقوق محفوظة لمتجر البرمجة.</p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
      `}</style>
    </div>
  );
};

export default ArabicProgrammingStore;
