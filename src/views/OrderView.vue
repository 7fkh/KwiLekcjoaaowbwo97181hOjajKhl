<script>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'

export default {
    name: 'Home',
    data() {
        return {
            isSubmitting: false,
            showSuccess: false,
            selectedProduct: null,
            formData: {
                // معلومات العميل
                discordId: '',
                fullName: '',
                contactInfo: '',
                
                // تفاصيل الطلب
                orderDetails: '',
                paymentMethod: '',
                
                // إضافات اختيارية
                example: '',
                additionalNotes: '',
                agreeToTerms: false
            },
            errors: {},
            products: [
                {
                    id: 1,
                    title: "برمجة سيرفر فايف ام",
                    description: "برمجة سيرفر فايف ام من الصفر مع جميع المميزات المطلوبة والسكريبتات الأساسية",
                    price: 250,
                    originalPrice: 350,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 2,
                    title: "بوت ديسكورد متقدم",
                    description: "بوت ديسكورد مع مميزات متقدمة ولوحة تحكم شاملة وأوامر مخصصة",
                    price: 150,
                    originalPrice: 200,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 3,
                    title: "موقع إلكتروني احترافي",
                    description: "تصميم وبرمجة موقع إلكتروني احترافي متجاوب مع جميع الأجهزة",
                    price: 800,
                    originalPrice: 1000,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 4,
                    title: "تطبيق موبايل مخصص",
                    description: "تصميم وبرمجة تطبيق موبايل مخصص لنظامي iOS و Android",
                    price: 1500,
                    originalPrice: 2000,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 5,
                    title: "نظام إدارة المحتوى",
                    description: "نظام إدارة محتوى متكامل مع لوحة تحكم متقدمة وإدارة المستخدمين",
                    price: 600,
                    originalPrice: 800,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 6,
                    title: "خدمات FiveM إضافية",
                    description: "إضافات وتحسينات وسكريبتات مخصصة لسيرفر FiveM",
                    price: 100,
                    originalPrice: 150,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 7,
                    title: "متجر إلكتروني متكامل",
                    description: "متجر إلكتروني متكامل مع نظام دفع ولوحة تحكم شاملة",
                    price: 1200,
                    originalPrice: 1500,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                },
                {
                    id: 8,
                    title: "أتمتة وسكريبتات",
                    description: "سكريبتات أتمتة مخصصة لتسهيل المهام اليومية والإدارية",
                    price: 300,
                    originalPrice: 400,
                    image: "https://cdn.discordapp.com/attachments/1324222259878957098/1391531649409482832/png.png?ex=68742556&is=6872d3d6&hm=00b49d1e111c173858b24da3dadc37939d1bfa137d15c43020171902b629dcfa&",
                }
            ],
            paymentMethods: [
                { value: 'bank', label: 'تحويل بنكي', icon: 'fas fa-university', popular: true },
                { value: 'stc_pay', label: 'STC Pay', icon: 'fas fa-mobile-alt', popular: true },
                { value: 'paypal', label: 'PayPal', icon: 'fab fa-paypal', popular: false },
                { value: 'visa', label: 'بطاقة ائتمان', icon: 'fas fa-credit-card', popular: false },
            ],
            orderNumber: null
        }
    },
    components: {
        NavBar,
    },
    computed: {
        canSubmit() {
            return this.formData.discordId.trim() &&
                   this.formData.fullName.trim() &&
                   this.formData.contactInfo.trim() &&
                   this.formData.orderDetails.trim() &&
                   this.formData.paymentMethod &&
                   this.formData.agreeToTerms;
        }
    },
    mounted() {
        this.generateOrderNumber();
        this.animateInputs();
        
        const cartQuery = this.$route.query.cart;
        const productId = this.$route.query.productId;
        
        if (productId) {
            this.selectedProduct = this.products.find(p => p.id === parseInt(productId));
            if (this.selectedProduct) {
                this.formData.orderDetails = `طلب ${this.selectedProduct.title}\n\nالسعر: ${this.selectedProduct.price} ريال سعودي\n\nالوصف: ${this.selectedProduct.description}`;
            }
        }
        
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

        validateForm() {
            this.errors = {};
            
            if (!this.formData.discordId.trim()) {
                this.errors.discordId = 'ايدي الديسكورد مطلوب';
            }
            if (!this.formData.fullName.trim()) {
                this.errors.fullName = 'الاسم الكامل مطلوب';
            }
            if (!this.formData.contactInfo.trim()) {
                this.errors.contactInfo = 'رقم التواصل مطلوب';
            }
            if (!this.formData.orderDetails.trim()) {
                this.errors.orderDetails = 'تفاصيل الطلب مطلوبة';
            }
            if (!this.formData.paymentMethod) {
                this.errors.paymentMethod = 'طريقة الدفع مطلوبة';
            }
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
                    title: `طلب رقم ${this.orderNumber}`,
                    description: this.selectedProduct ? `**المنتج المطلوب:** ${this.selectedProduct.title}` : '**طلب مخصص**',
                    color: parseInt('c13029', 16),
                    fields: [
                        {
                            name: 'معلومات العميل',
                            value: `**الاسم:** ${this.formData.fullName}\n**ديسكورد:** ${this.formData.discordId}\n**التواصل:** ${this.formData.contactInfo}`,
                            inline: false
                        },
                        {
                            name: 'تفاصيل الطلب',
                            value: this.formData.orderDetails,
                            inline: false
                        },
                        {
                            name: 'طريقة الدفع',
                            value: paymentMethodData?.label || this.formData.paymentMethod,
                            inline: true
                        }
                    ],
                    footer: {
                        text: `تم الإرسال في ${new Date().toLocaleString('ar-SA')} | النظام المبسط`,
                        icon_url: 'https://i.imgur.com/cgrAYPN.png'
                    },
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: this.selectedProduct ? this.selectedProduct.image : 'https://i.imgur.com/cgrAYPN.png'
                    }
                }]
            };

            if (this.formData.example) {
                applyMessage.embeds[0].fields.push({
                    name: 'مثال/مرجع',
                    value: this.formData.example,
                    inline: false
                });
            }

            if (this.formData.additionalNotes) {
                applyMessage.embeds[0].fields.push({
                    name: 'ملاحظات إضافية',
                    value: this.formData.additionalNotes,
                    inline: false
                });
            }

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

        resetForm() {
            this.formData = {
                discordId: '',
                fullName: '',
                contactInfo: '',
                orderDetails: '',
                paymentMethod: '',
                example: '',
                additionalNotes: '',
                agreeToTerms: false
            };
            this.errors = {};
            this.selectedProduct = null;
            this.generateOrderNumber();
        },

        showAlert(message, type) {
            alert(message);
        }
    }
}
</script>

<template>
    <div class="main">
        <!-- Font Awesome CSS -->
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
                
                <!-- Selected Product Display -->
                <div v-if="selectedProduct" class="selected-product fade-in">
                    <div class="product-card">
                        <div class="product-header">
                            <i class="fas fa-shopping-cart"></i>
                            <h3>المنتج المحدد</h3>
                        </div>
                        <div class="product-content">
                            <div class="product-image">
                                <img :src="selectedProduct.image" :alt="selectedProduct.title">
                            </div>
                            <div class="product-info">
                                <h4>{{ selectedProduct.title }}</h4>
                                <p class="product-description">{{ selectedProduct.description }}</p>
                                <div class="product-pricing">
                                    <span class="current-price">{{ selectedProduct.price }} ريال</span>
                                    <span class="original-price" v-if="selectedProduct.originalPrice">{{ selectedProduct.originalPrice }} ريال</span>
                                    <span class="discount" v-if="selectedProduct.originalPrice">
                                        وفر {{ selectedProduct.originalPrice - selectedProduct.price }} ريال
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form @submit.prevent="sendApply" class="form">
                    <div class="form-grid">
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
                                    <i class="fas fa-id-card"></i>
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
                        
                        <!-- تفاصيل الطلب -->
                        <div class="section fade-in">
                            <h3 class="section-title">
                                <i class="fas fa-clipboard-list"></i>
                                تفاصيل الطلب
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
                                    rows="6"
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
                                    <i class="fas fa-wallet"></i>
                                    طريقة الدفع المفضلة *
                                </label>
                                <div class="payment-grid">
                                    <div 
                                        v-for="method in paymentMethods" 
                                        :key="method.value"
                                        class="payment-card"
                                        :class="{ 'active': formData.paymentMethod === method.value, 'popular': method.popular }"
                                        @click="formData.paymentMethod = method.value"
                                    >
                                        <i :class="method.icon"></i>
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
                                    <i class="fas fa-image"></i>
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
                                    <span class="checkmark"></span>
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
                                    <i class="fas fa-rocket"></i>
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
    max-width: 900px;
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

.logo {
    width: 150px;
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

/* Selected Product */
.selected-product {
    width: 100%;
    max-width: 800px;
}

.product-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}

.product-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: white;
}

.product-header i {
    color: #007bff;
    font-size: 18px;
}

.product-header h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
}

.product-content {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.product-image {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-info {
    flex: 1;
    color: white;
}

.product-info h4 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 10px 0;
    color: #007bff;
}

.product-description {
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 15px 0;
    color: rgba(255, 255, 255, 0.8);
}

.product-pricing {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.current-price {
    font-size: 18px;
    font-weight: 700;
    color: #28a745;
}

.original-price {
    font-size: 14px;
    text-decoration: line-through;
    color: rgba(255, 255, 255, 0.6);
}

.discount {
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
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

.payment-card i {
    font-size: 24px;
    margin-bottom: 8px;
    color: #007bff;
}

.payment-label {
    font-size: 12px;
    font-weight: 600;
    color: white;
}

.popular-badge {
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
    gap: 8px;
}

.checkbox-text i {
    color: #28a745;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    border-radius: 10px;
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
    width: 100%;
    animation: fadeInUp 0.8s ease-out forwards;
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
    padding: 10px 20px;
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

/* Responsive */
@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
    
    .section-title {
        font-size: 18px;
    }
    
    .cont {
        padding: 20px 15px;
    }
    
    .payment-grid {
        grid-template-columns: 1fr;
    }
    
    .product-content {
        flex-direction: column;
        text-align: center;
    }
    
    .product-image {
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }
    
    .product-pricing {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .cont {
        padding: 15px 10px;
    }
    
    .section {
        padding: 20px 15px;
    }
    
    .logo {
        width: 120px;
    }
    
    .order-number {
        font-size: 12px;
        padding: 10px 20px;
    }
}
</style>
