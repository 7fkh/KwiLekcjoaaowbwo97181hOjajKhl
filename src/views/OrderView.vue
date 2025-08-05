<script>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'

export default {
    name: 'Home',
    components: {
        NavBar,
    },
    data() {
        return {
            isSubmitting: false,
            showSuccess: false,
            formData: {
                // معلومات العميل
                discordId: '',
                fullName: '',
                contactInfo: '',
                
                // المنتج المحدد
                selectedProduct: null,
                
                // تفاصيل الطلب
                quantity: 1,
                orderDetails: '',
                paymentMethod: '',
                
                // إضافات اختيارية
                example: '',
                additionalNotes: '',
                agreeToTerms: false
            },
            errors: {},
            paymentMethods: [
                { value: 'bank', label: 'تحويل بنكي', popular: true },
                { value: 'stc_pay', label: 'STC Pay', popular: true },
                { value: 'paypal', label: 'PayPal', popular: false },
                { value: 'visa', label: 'بطاقة ائتمان', popular: false },
            ],
            products: [
                {
                    id: 1,
                    name: 'تصميم لوجو احترافي',
                    description: 'تصميم شعار احترافي مع ملفات متعددة الصيغ',
                    price: '150',
                    originalPrice: '200',
                    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Logo+Design',
                    rating: 4.9,
                    deliveryTime: '3-5 أيام',
                    category: 'تصميم',
                    popular: true,
                    features: ['تصميم فريد', 'ملفات متعددة', 'مراجعات مجانية']
                },
                {
                    id: 2,
                    name: 'تطوير موقع ويب',
                    description: 'تطوير موقع ويب متجاوب وحديث',
                    price: '800',
                    originalPrice: '1000',
                    image: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Web+Development',
                    rating: 4.8,
                    deliveryTime: '7-10 أيام',
                    category: 'برمجة',
                    popular: true,
                    features: ['تصميم متجاوب', 'لوحة تحكم', 'دعم فني']
                },
                {
                    id: 3,
                    name: 'كتابة محتوى تسويقي',
                    description: 'كتابة محتوى إبداعي وجذاب لوسائل التواصل',
                    price: '100',
                    image: 'https://via.placeholder.com/300x200/ffc107/000000?text=Content+Writing',
                    rating: 4.7,
                    deliveryTime: '2-3 أيام',
                    category: 'كتابة',
                    features: ['محتوى حصري', 'SEO محسن', 'مراجعة مجانية']
                },
                {
                    id: 4,
                    name: 'تحليل البيانات',
                    description: 'تحليل البيانات وإنشاء تقارير مفصلة',
                    price: '300',
                    image: 'https://via.placeholder.com/300x200/17a2b8/ffffff?text=Data+Analysis',
                    rating: 4.6,
                    deliveryTime: '5-7 أيام',
                    category: 'تحليل',
                    features: ['تقارير تفاعلية', 'رسوم بيانية', 'استشارة مجانية']
                },
                {
                    id: 5,
                    name: 'تطبيق موبايل',
                    description: 'تطوير تطبيق موبايل لنظامي iOS وAndroid',
                    price: '1500',
                    originalPrice: '2000',
                    image: 'https://via.placeholder.com/300x200/6f42c1/ffffff?text=Mobile+App',
                    rating: 4.9,
                    deliveryTime: '15-20 يوم',
                    category: 'برمجة',
                    popular: true,
                    features: ['متوافق مع النظامين', 'واجهة حديثة', 'دعم مستمر']
                },
                {
                    id: 6,
                    name: 'حملة إعلانية',
                    description: 'إدارة وتصميم حملة إعلانية متكاملة',
                    price: '500',
                    image: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Ad+Campaign',
                    rating: 4.5,
                    deliveryTime: '7-14 يوم',
                    category: 'تسويق',
                    features: ['استهداف دقيق', 'تقارير يومية', 'تحسين مستمر']
                }
            ],
            orderNumber: null
        }
    },
    computed: {
        canSubmit() {
            return this.formData.discordId.trim() &&
                   this.formData.fullName.trim() &&
                   this.formData.contactInfo.trim() &&
                   this.formData.selectedProduct &&
                   this.formData.quantity > 0 &&
                   this.formData.orderDetails.trim() &&
                   this.formData.paymentMethod &&
                   this.formData.agreeToTerms;
        }
    },
    mounted() {
        this.generateOrderNumber();
        this.animateInputs();
        this.loadProductFromQuery();
        this.loadCartFromQuery();
    },
    methods: {
        generateOrderNumber() {
            this.orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase();
        },
        
        animateInputs() {
            this.$nextTick(() => {
                const elements = document.querySelectorAll('.fade-in');
                elements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.1}s`;
                });
            });
        },

        selectProduct(product) {
            this.formData.selectedProduct = product;
            this.formData.quantity = 1;
        },

        loadProductFromQuery() {
            const selectedProduct = this.$route.query.product;
            if (selectedProduct) {
                try {
                    const product = JSON.parse(selectedProduct);
                    this.formData.selectedProduct = product;
                    this.formData.quantity = 1;
                } catch (err) {
                    console.error('فشل في تحليل بيانات المنتج:', err);
                }
            }
        },

        loadCartFromQuery() {
            const cartQuery = this.$route.query.cart;
            if (cartQuery) {
                try {
                    const cartItems = JSON.parse(cartQuery);
                    if (Array.isArray(cartItems)) {
                        const details = cartItems.map(item => {
                            return `• ${item.title} - الكمية: ${item.quantity} - السعر: ${item.price} ريال`;
                        }).join('\n');
                        this.formData.orderDetails = `الطلب من السلة:\n${details}`;
                    }
                } catch (err) {
                    console.error('فشل في تحليل بيانات السلة:', err);
                }
            }
        },

        validateForm() {
            this.errors = {};
            
            // التحقق من البيانات الأساسية
            if (!this.formData.discordId.trim()) {
                this.errors.discordId = 'ايدي الديسكورد مطلوب';
            }
            if (!this.formData.fullName.trim()) {
                this.errors.fullName = 'الاسم الكامل مطلوب';
            }
            if (!this.formData.contactInfo.trim()) {
                this.errors.contactInfo = 'رقم التواصل مطلوب';
            }
            
            // التحقق من المنتج
            if (!this.formData.selectedProduct) {
                this.errors.selectedProduct = 'يجب اختيار منتج';
            }
            
            // التحقق من الكمية
            if (!this.formData.quantity || this.formData.quantity <= 0) {
                this.errors.quantity = 'الكمية يجب أن تكون أكبر من 0';
            }
            
            // التحقق من تفاصيل الطلب
            if (!this.formData.orderDetails.trim()) {
                this.errors.orderDetails = 'تفاصيل الطلب مطلوبة';
            }
            
            // التحقق من طريقة الدفع
            if (!this.formData.paymentMethod) {
                this.errors.paymentMethod = 'طريقة الدفع مطلوبة';
            }
            
            // التحقق من الموافقة على الشروط
            if (!this.formData.agreeToTerms) {
                this.errors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
            }
            
            return Object.keys(this.errors).length === 0;
        },

        async sendApply() {
            if (!this.validateForm()) {
                this.showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            this.isSubmitting = true;

            const webhookUrl = 'https://discord.com/api/webhooks/1393737456083537930/vapXAbpBwnPurETCHBYkSiibTgeAwrP9GyAwkw8nqE4K4RjeQWUOc2BvI3U-fxTyl-l1';
            
            const paymentMethodData = this.paymentMethods.find(p => p.value === this.formData.paymentMethod);
            
            const applyMessage = {
                content: `تم استلام طلب جديد`,
                embeds: [{
                    title: `🛒 رقم الطلب ${this.orderNumber}`,
                    color: parseInt('c13029', 16),
                    fields: [
                        {
                            name: '📦 معلومات المنتج',
                            value: this.getProductInfo(),
                            inline: false
                        },
                        {
                            name: '👤 معلومات العميل',
                            value: `**الاسم:** ${this.formData.fullName}\n**ديسكورد:** ${this.formData.discordId}\n**التواصل:** ${this.formData.contactInfo}`,
                            inline: false
                        },
                        {
                            name: '📝 تفاصيل الطلب',
                            value: this.formData.orderDetails,
                            inline: false
                        },
                        {
                            name: `💳 طريقة الدفع`,
                            value: paymentMethodData?.label || this.formData.paymentMethod,
                            inline: true
                        }
                    ].concat(this.getOptionalFields()),
                    footer: {
                        text: `تم الإرسال في ${new Date().toLocaleString('ar-SA')} | النظام المبسط`,
                        icon_url: 'https://i.imgur.com/cgrAYPN.png'
                    },
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: this.getProductImage()
                    }
                }]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(applyMessage)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                    this.resetForm();
                }, 4000);
                
            } catch (error) {
                console.error('خطأ في الإرسال:', error);
                this.showAlert('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى', 'error');
            } finally {
                this.isSubmitting = false;
            }
        },

        getProductInfo() {
            if (this.formData.selectedProduct) {
                const product = this.formData.selectedProduct;
                let info = `**المنتج:** ${product.name}\n**الكمية:** ${this.formData.quantity}\n**السعر الوحدة:** ${product.price} ريال\n**المجموع:** ${this.calculateTotal()} ريال`;
                
                if (product.category) {
                    info += `\n**الفئة:** ${product.category}`;
                }
                if (product.description) {
                    info += `\n**الوصف:** ${product.description}`;
                }
                if (product.deliveryTime) {
                    info += `\n**وقت التسليم:** ${product.deliveryTime}`;
                }
                
                return info;
            }
            return '';
        },

        getOptionalFields() {
            const fields = [];
            
            if (this.formData.example) {
                fields.push({
                    name: '🔗 مثال/مرجع',
                    value: this.formData.example,
                    inline: false
                });
            }
            
            if (this.formData.additionalNotes) {
                fields.push({
                    name: '📋 ملاحظات إضافية',
                    value: this.formData.additionalNotes,
                    inline: false
                });
            }
            
            return fields;
        },

        getProductImage() {
            if (this.formData.selectedProduct?.image) {
                return this.formData.selectedProduct.image;
            }
            return 'https://i.imgur.com/cgrAYPN.png';
        },

        resetForm() {
            this.formData = {
                discordId: '',
                fullName: '',
                contactInfo: '',
                selectedProduct: null,
                quantity: 1,
                orderDetails: '',
                paymentMethod: '',
                example: '',
                additionalNotes: '',
                agreeToTerms: false
            };
            this.errors = {};
            this.generateOrderNumber();
        },

        showAlert(message, type) {
            alert(message);
        },

        getPaymentIcon(paymentType) {
            const icons = {
                'bank': '<i class="fas fa-university"></i>',
                'stc_pay': '<i class="fas fa-mobile-alt"></i>',
                'paypal': '<i class="fab fa-paypal"></i>',
                'visa': '<i class="fas fa-credit-card"></i>'
            };
            return icons[paymentType] || '<i class="fas fa-credit-card"></i>';
        },

        increaseQuantity() {
            this.formData.quantity++;
        },

        decreaseQuantity() {
            if (this.formData.quantity > 1) {
                this.formData.quantity--;
            }
        },

        calculateTotal() {
            if (this.formData.selectedProduct && this.formData.selectedProduct.price) {
                const price = parseFloat(this.formData.selectedProduct.price);
                const total = price * this.formData.quantity;
                return total.toFixed(2);
            }
            return '0.00';
        }
    }
}
</script>

<template>
    <div class="main">
        <!-- Font Awesome CDN -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
            <div class="shape shape-5"></div>
        </div>

        <div class="apply">
            <div class="cont">
                <RouterLink to="/" class="logo-container">
                    <img src="https://i.imgur.com/cgrAYPN.png" alt="Logo" class="logo">
                </RouterLink>
                
                <!-- Order Number -->
                <div class="order-number fade-in">
                    <i class="fas fa-ticket-alt"></i>
                    <span>رقم الطلب: {{ orderNumber }}</span>
                </div>
                
                <form @submit.prevent="sendApply" class="form">
                    <div class="form-grid">
                        <!-- قسم المنتجات -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-shopping-bag"></i>
                                اختر المنتج
                            </h3>
                            
                            <div class="products-grid">
                                <div v-for="product in products" 
                                     :key="product.id" 
                                     class="product-card"
                                     :class="{ 'selected': formData.selectedProduct && formData.selectedProduct.id === product.id }"
                                     @click="selectProduct(product)">
                                    
                                    <div class="product-image">
                                        <img :src="product.image" :alt="product.name" />
                                        <div v-if="product.popular" class="popular-badge">الأكثر طلباً</div>
                                    </div>
                                    
                                    <div class="product-info">
                                        <h4 class="product-name">{{ product.name }}</h4>
                                        <p class="product-description">{{ product.description }}</p>
                                        
                                        <div class="product-details">
                                            <div class="price">
                                                <span class="current-price">{{ product.price }} ريال</span>
                                                <span v-if="product.originalPrice" class="original-price">{{ product.originalPrice }} ريال</span>
                                            </div>
                                            
                                            <div class="product-meta">
                                                <div class="rating" v-if="product.rating">
                                                    <i class="fas fa-star"></i>
                                                    <span>{{ product.rating }}/5</span>
                                                </div>
                                                
                                                <div class="delivery-time" v-if="product.deliveryTime">
                                                    <i class="fas fa-clock"></i>
                                                    <span>{{ product.deliveryTime }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="product-features" v-if="product.features">
                                            <div v-for="feature in product.features" :key="feature" class="feature-item">
                                                <i class="fas fa-check"></i>
                                                <span>{{ feature }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span v-if="errors.selectedProduct" class="error-message">{{ errors.selectedProduct }}</span>
                        </div>

                        <!-- الكمية للمنتج المحدد -->
                        <div v-if="formData.selectedProduct" class="section fade-in selected-product">
                            <h3 class="section-title">
                                <i class="fas fa-shopping-cart"></i>
                                تفاصيل الطلب
                            </h3>
                            
                            <div class="selected-product-display">
                                <div class="product-summary">
                                    <div class="summary-image">
                                        <img :src="formData.selectedProduct.image" :alt="formData.selectedProduct.name" />
                                    </div>
                                    <div class="summary-info">
                                        <h4>{{ formData.selectedProduct.name }}</h4>
                                        <p>{{ formData.selectedProduct.description }}</p>
                                        <div class="summary-price">{{ formData.selectedProduct.price }} ريال</div>
                                    </div>
                                </div>
                                
                                <div class="quantity-selector">
                                    <label>
                                        <i class="fas fa-sort-numeric-up"></i>
                                        الكمية المطلوبة
                                    </label>
                                    <div class="quantity-controls">
                                        <button 
                                            type="button" 
                                            class="qty-btn minus" 
                                            @click="decreaseQuantity" 
                                            :disabled="formData.quantity <= 1"
                                        >
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input 
                                            v-model.number="formData.quantity"
                                            type="number"
                                            min="1"
                                            class="qty-input"
                                            readonly
                                        >
                                        <button 
                                            type="button" 
                                            class="qty-btn plus" 
                                            @click="increaseQuantity"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="total-price">
                                        <strong>المجموع: {{ calculateTotal() }} ريال</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- معلومات العميل -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-user"></i>
                                معلومات العميل
                            </h3>
                            
                            <div class="inp">
                                <label for="discordId">
                                    <i class="fab fa-discord"></i>
                                    ايدي الديسكورد الخاص بك *
                                </label>
                                <input 
                                    id="discordId"
                                    v-model="formData.discordId"
                                    placeholder="مثال: user#1234"
                                    type="text"
                                    :class="{ 'error': errors.discordId }"
                                >
                                <span v-if="errors.discordId" class="error-message">{{ errors.discordId }}</span>
                            </div>
                            
                            <div class="inp">
                                <label for="fullName">
                                    <i class="fas fa-user-tie"></i>
                                    الاسم الكامل *
                                </label>
                                <input 
                                    id="fullName"
                                    v-model="formData.fullName"
                                    placeholder="أدخل اسمك الكامل"
                                    type="text"
                                    :class="{ 'error': errors.fullName }"
                                >
                                <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
                            </div>
                            
                            <div class="inp">
                                <label for="contactInfo">
                                    <i class="fas fa-phone"></i>
                                    معلومات التواصل *
                                </label>
                                <input 
                                    id="contactInfo"
                                    v-model="formData.contactInfo"
                                    placeholder="رقم الهاتف أو وسيلة التواصل المفضلة"
                                    type="text"
                                    :class="{ 'error': errors.contactInfo }"
                                >
                                <span v-if="errors.contactInfo" class="error-message">{{ errors.contactInfo }}</span>
                            </div>
                        </div>
                        
                        <!-- تفاصيل إضافية للطلب -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-clipboard-list"></i>
                                تفاصيل إضافية للطلب
                            </h3>
                            
                            <div class="inp">
                                <label for="orderDetails">
                                    <i class="fas fa-edit"></i>
                                    وصف الطلب بالتفصيل *
                                </label>
                                <textarea 
                                    id="orderDetails"
                                    v-model="formData.orderDetails"
                                    placeholder="اشرح بالتفصيل ما تريده، المتطلبات، والمواصفات..."
                                    :class="{ 'error': errors.orderDetails }"
                                    rows="4"
                                ></textarea>
                                <span v-if="errors.orderDetails" class="error-message">{{ errors.orderDetails }}</span>
                            </div>
                        </div>
                        
                        <!-- طريقة الدفع -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-credit-card"></i>
                                طريقة الدفع
                            </h3>
                            
                            <div class="inp">
                                <label>
                                    <i class="fas fa-money-check-alt"></i>
                                    طريقة الدفع المفضلة *
                                </label>
                                <div class="payment-grid">
                                    <div 
                                        v-for="method in paymentMethods" 
                                        :key="method.value"
                                        class="payment-card"
                                        :class="{ 'active': formData.paymentMethod === method.value, 'popular': method.popular }"
                                        @click="formData.paymentMethod = method.value"
                                        tabindex="0"
                                        @keydown.enter="formData.paymentMethod = method.value"
                                        @keydown.space.prevent="formData.paymentMethod = method.value"
                                    >
                                        <div class="payment-icon" v-html="getPaymentIcon(method.value)"></div>
                                        <span class="payment-label">{{ method.label }}</span>
                                        <span v-if="method.popular" class="popular-badge">شائع</span>
                                    </div>
                                </div>
                                <span v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</span>
                            </div>
                        </div>
                        
                        <!-- إضافات اختيارية -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-star"></i>
                                إضافات اختيارية
                            </h3>
                            
                            <div class="inp">
                                <label for="example">
                                    <i class="fas fa-link"></i>
                                    مثال أو مرجع للطلب
                                </label>
                                <input 
                                    id="example"
                                    v-model="formData.example"
                                    placeholder="رابط أو وصف لمثال مشابه (اختياري)"
                                    type="text"
                                >
                            </div>
                            
                            <div class="inp">
                                <label for="additionalNotes">
                                    <i class="fas fa-sticky-note"></i>
                                    ملاحظات إضافية
                                </label>
                                <textarea 
                                    id="additionalNotes"
                                    v-model="formData.additionalNotes"
                                    placeholder="أي ملاحظات أو تفاصيل إضافية..."
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                        
                        <!-- الشروط والإرسال -->
                        <div class="section fade-in">
                            <div class="inp">
                                <label class="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        v-model="formData.agreeToTerms"
                                        :class="{ 'error': errors.agreeToTerms }"
                                    >
                                    <span class="checkbox-text">
                                        <i class="fas fa-check-circle"></i>
                                        أوافق على الشروط والأحكام وسياسة الخصوصية *
                                    </span>
                                </label>
                                <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
                            </div>
                            
                            <button 
                                type="submit" 
                                class="submit-btn"
                                :class="{ 'loading': isSubmitting, 'disabled': !canSubmit }"
                                :disabled="isSubmitting || !canSubmit"
                            >
                                <div v-if="!isSubmitting" class="btn-content">
                                    <i class="fas fa-paper-plane"></i>
                                    <span class="btn-text">إرسال الطلب الآن</span>
                                </div>
                                <div v-else class="loading-content">
                                    <div class="spinner"></div>
                                    <span>جاري الإرسال...</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Success Animation -->
        <transition name="success">
            <div v-if="showSuccess" class="success-overlay">
                <div class="success-card">
                    <div class="success-icon">
                        <div class="checkmark-circle">
                            <div class="checkmark"></div>
                        </div>
                    </div>
                    <h2>
                        <i class="fas fa-check-circle"></i>
                        تم إرسال الطلب بنجاح!
                    </h2>
                    <p><strong>رقم الطلب:</strong> {{ orderNumber }}</p>
                    <p>سيتم التواصل معك في أقرب وقت ممكن</p>
                    <div class="success-actions">
                        <button @click="showSuccess = false" class="success-btn">حسناً</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes backgroundMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0px); }
    40%, 43% { transform: translateY(-20px); }
    70% { transform: translateY(-10px); }
    90% { transform: translateY(-4px); }
}

/* Main Container */
.main {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%);
    background-size: 400% 400%;
    animation: backgroundMove 15s ease infinite;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
    overflow-x: hidden;
}

/* Floating Shapes */
.floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;
}

.shape-1 { width: 80px; height: 80px; top: 20%; left: 10%; animation-delay: 0s; }
.shape-2 { width: 60px; height: 60px; top: 60%; right: 10%; animation-delay: 2s; }
.shape-3 { width: 40px; height: 40px; top: 40%; left: 80%; animation-delay: 4s; }
.shape-4 { width: 100px; height: 100px; top: 10%; right: 30%; animation-delay: 1s; }
.shape-5 { width: 50px; height: 50px; top: 80%; left: 20%; animation-delay: 3s; }

/* Main Content */
.apply {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    z-index: 2;
}

.cont {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 40px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    position: relative;
}

/* Logo */
.logo-container {
    text-decoration: none;
}

.logo {
    width: 150px;
    height: auto;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

.logo:hover {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

/* Order Number */
.order-number {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    padding: 12px 25px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
    animation: bounce 2s infinite;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Form */
.form {
    width: 100%;
}

.fade-in {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
}

.form-grid {
    display: grid;
    gap: 30px;
}

.section {
    background: rgba(255, 255, 255, 0.05);
    padding: 25px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.section-title i {
    color: #007bff;
}

/* Products Grid */
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.product-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.product-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 123, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.2);
}

.product-card.selected {
    border-color: #007bff;
    background: rgba(0, 123, 255, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
}

.product-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.popular-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: linear-gradient(135deg, #ffc107, #ff8c00);
    color: #000;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 11px;
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(255, 193, 7, 0.3);
}

.product-info {
    padding: 20px;
    color: white;
}

.product-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #007bff;
}

.product-description {
    font-size: 14px;
    margin-bottom: 15px;
    opacity: 0.9;
    line-height: 1.4;
}

.product-details {
    margin-bottom: 15px;
}

.price {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.current-price {
    font-size: 18px;
    font-weight: bold;
    color: #28a745;
}

.original-price {
    font-size: 14px;
    text-decoration: line-through;
    color: #6c757d;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.rating, .delivery-time {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
}

.rating i {
    color: #ffc107;
}

.delivery-time i {
    color: #007bff;
}

.product-features {
    display: grid;
    gap: 5px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
}

.feature-item i {
    color: #28a745;
    font-size: 10px;
}

/* Selected Product Display */
.selected-product {
    background: rgba(0, 123, 255, 0.1);
    border: 1px solid rgba(0, 123, 255, 0.3);
}

.selected-product-display {
    display: grid;
    gap: 20px;
}

.product-summary {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 15px;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 15px;
    border-radius: 10px;
}

.summary-image {
    width: 120px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
}

.summary-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.summary-info h4 {
    color: #007bff;
    font-size: 16px;
    margin-bottom: 5px;
}

.summary-info p {
    font-size: 13px;
    margin-bottom: 8px;
    opacity: 0.8;
}

.summary-price {
    font-size: 16px;
    font-weight: bold;
    color: #28a745;
}

/* Quantity Selector */
.quantity-selector {
    display: grid;
    gap: 15px;
}

.quantity-selector label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: white;
}

.quantity-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.qty-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
}

.qty-btn:hover:not(:disabled) {
    background: #0056b3;
    transform: scale(1.1);
}

.qty-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
}

.qty-input {
    width: 80px;
    height: 40px;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
}

.total-price {
    color: #007bff;
    font-size: 18px;
    text-align: center;
    padding: 15px;
    background: rgba(0, 123, 255, 0.1);
    border-radius: 10px;
    border: 1px solid rgba(0, 123, 255, 0.3);
}

/* Input Styles */
.inp {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.inp label {
    color: white;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.inp label i {
    color: #007bff;
    width: 16px;
    text-align: center;
}

.inp input,
.inp textarea {
    border: none;
    padding: 15px 20px;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    font-size: 14px;
    transition: all 0.3s ease;
    width: 100%;
    box-sizing: border-box;
}

.inp input::placeholder,
.inp textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.inp input:focus,
.inp textarea:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
}

.inp input.error,
.inp textarea.error {
    border-color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
}

.error-message {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
}

/* Payment Grid */
.payment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-top: 10px;
}

.payment-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
}

.payment-card:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.payment-card.active {
    background: rgba(0, 123, 255, 0.2);
    border-color: #007bff;
    color: #007bff;
}

.payment-icon {
    font-size: 24px;
    margin-bottom: 8px;
    color: #007bff;
}

.payment-card.active .payment-icon {
    color: #007bff;
}

.payment-label {
    font-size: 12px;
    font-weight: 600;
    color: white;
}

.payment-card .popular-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ffc107;
    color: #000;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
}

/* Checkbox */
.checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    accent-color: #007bff;
    width: 18px;
    height: 18px;
}

.checkbox-text {
    display: flex;
    align-items: center;
    gap: 5px;
}

.checkbox-text i {
    color: #28a745;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.submit-btn:hover:not(.disabled):not(.loading) {
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
}

.submit-btn.disabled {
    background: #6c757d;
    cursor: not-allowed;
    box-shadow: none;
}

.submit-btn.loading {
    pointer-events: none;
    background: #6c757d;
    box-shadow: none;
}

.btn-content,
.loading-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Success Overlay */
.success-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(5px);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.success-card {
    background: white;
    padding: 40px 30px;
    border-radius: 15px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    animation: fadeInUp 0.8s ease-out forwards;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.success-icon {
    margin-bottom: 20px;
}

.checkmark-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #28a745;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    animation: pulse 1s ease infinite;
}

.checkmark {
    width: 20px;
    height: 10px;
    border-left: 4px solid white;
    border-bottom: 4px solid white;
    transform: rotate(-45deg);
}

.success-card h2 {
    color: #28a745;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.success-card p {
    color: #333;
    font-size: 14px;
    margin: 5px 0;
}

.success-btn {
    margin-top: 20px;
    padding: 12px 25px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}

.success-btn:hover {
    background: #0056b3;
}

/* Success Animation */
.success-enter-active, .success-leave-active {
    transition: opacity 0.5s;
}

.success-enter, .success-leave-to {
    opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .cont {
        padding: 20px 15px;
        max-width: 95%;
    }
    
    .products-grid {
        grid-template-columns: 1fr;
    }
    
    .product-summary {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .summary-image {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
    }
    
    .quantity-controls {
        justify-content: center;
    }
    
    .section-title {
        font-size: 18px;
    }
    
    .payment-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .order-number {
        font-size: 12px;
        padding: 10px 20px;
    }
    
    .logo {
        width: 120px;
    }
    
    .form-grid {
        gap: 20px;
    }
}

@media (max-width: 480px) {
    .section {
        padding: 20px 15px;
    }
    
    .product-image {
        height: 150px;
    }
    
    .product-name {
        font-size: 16px;
    }
    
    .qty-btn {
        width: 35px;
        height: 35px;
        font-size: 14px;
    }
    
    .qty-input {
        width: 60px;
        height: 35px;
        font-size: 14px;
    }
    
    .inp input,
    .inp textarea {
        padding: 12px 15px;
        font-size: 13px;
    }
    
    .submit-btn {
        padding: 14px;
        font-size: 14px;
    }
    
    .success-card {
        padding: 30px 20px;
        margin: 20px;
    }
    
    .payment-grid {
        grid-template-columns: 1fr;
    }
    
    .payment-card {
        padding: 12px 8px;
    }
    
    .payment-icon {
        font-size: 20px;
    }
    
    .payment-label {
        font-size: 11px;
    }
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 123, 255, 0.5);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 123, 255, 0.7);
}
</style>
