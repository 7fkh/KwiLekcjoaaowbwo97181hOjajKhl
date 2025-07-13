<script>
import NavBar from '@/components/NavBar.vue'
import { RouterLink } from 'vue-router'

export default {
    name: 'Home',
    data() {
        return {
            isSubmitting: false,
            showSuccess: false,
            currentStep: 1,
            totalSteps: 4,
            formData: {
                // الخطوة الأولى - معلومات أساسية
                discordId: '',
                fullName: '',
                email: '',
                contactInfo: '',
                
                // الخطوة الثانية - تفاصيل الطلب
                orderType: '',
                orderCategory: '',
                orderDetails: '',
                deliveryTime: '',
                budget: '',
                
                // الخطوة الثالثة - المتطلبات والمرفقات
                requirements: '',
                example: '',
                additionalNotes: '',
                urgency: 'عادي',
                
                // الخطوة الرابعة - الدفع والتأكيد
                paymentMethod: '',
                agreeToTerms: false,
                subscribeToUpdates: false
            },
            errors: {},
            orderTypes: [
                { value: 'تصميم', label: 'تصميم جرافيكي' },
                { value: 'برمجة', label: 'برمجة وتطوير' },
                { value: 'كتابة', label: 'كتابة المحتوى' },
                { value: 'تسويق', label: 'تسويق رقمي' },
                { value: 'ترجمة', label: 'ترجمة' },
                { value: 'صوت', label: 'تعليق صوتي' },
                { value: 'فيديو', label: 'مونتاج فيديو' },
                { value: 'اخرى', label: 'أخرى' }
            ],
            orderCategories: {
                'تصميم': ['لوجو', 'بوستر', 'بروشور', 'كارت شخصي', 'بانر', 'تصميم موقع'],
                'برمجة': ['موقع ويب', 'تطبيق موبايل', 'بوت ديسكورد', 'سكريبت', 'إضافة'],
                'كتابة': ['مقال', 'محتوى موقع', 'كتابة إعلانات', 'تدوين', 'كتابة تقنية'],
                'تسويق': ['إدارة حسابات', 'حملات إعلانية', 'SEO', 'استراتيجية تسويق'],
                'ترجمة': ['عربي إلى إنجليزي', 'إنجليزي إلى عربي', 'ترجمة تقنية', 'ترجمة أدبية'],
                'صوت': ['تعليق إعلاني', 'تعليق تعليمي', 'دوبلاج', 'بودكاست'],
                'فيديو': ['مونتاج إعلاني', 'فيديو تعليمي', 'موشن جرافيك', 'تحرير فيديو'],
                'اخرى': ['خدمة مخصصة']
            },
            deliveryTimes: [
                { value: '24h', label: '24 ساعة' },
                { value: '3days', label: '3 أيام' },
                { value: '1week', label: 'أسبوع' },
                { value: '2weeks', label: 'أسبوعين' },
                { value: '1month', label: 'شهر' },
                { value: 'custom', label: 'وقت مخصص' }
            ],
            budgetRanges: [
                { value: '50-100', label: '50-100 ريال' },
                { value: '100-300', label: '100-300 ريال' },
                { value: '300-500', label: '300-500 ريال' },
                { value: '500-1000', label: '500-1000 ريال' },
                { value: '1000+', label: 'أكثر من 1000 ريال' },
                { value: 'negotiate', label: 'قابل للتفاوض' }
            ],
            paymentMethods: [
                { value: 'bank', label: 'تحويل بنكي' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'visa', label: 'بطاقة ائتمان' },
                { value: 'apple_pay', label: 'Apple Pay' },
                { value: 'stc_pay', label: 'STC Pay' },
                { value: 'cash', label: 'كاش' }
            ],
            urgencyLevels: [
                { value: 'عادي', label: 'عادي', color: '#28a745' },
                { value: 'مهم', label: 'مهم', color: '#ffc107' },
                { value: 'عاجل', label: 'عاجل', color: '#fd7e14' },
                { value: 'طارئ', label: 'طارئ', color: '#dc3545' }
            ],
            animationDelay: 0,
            orderNumber: null
        }
    },
    components: {
        NavBar,
    },
    computed: {
        currentCategories() {
            return this.orderCategories[this.formData.orderType] || [];
        },
        progressPercentage() {
            return (this.currentStep / this.totalSteps) * 100;
        },
        canProceed() {
            return this.validateCurrentStep();
        }
    },
    mounted() {
        this.generateOrderNumber();
        this.animateInputs();
    },
    methods: {
        generateOrderNumber() {
            this.orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase();
        },
        
        animateInputs() {
            this.$nextTick(() => {
                const inputs = document.querySelectorAll('.inp');
                inputs.forEach((input, index) => {
                    input.style.animationDelay = `${index * 0.1}s`;
                });
            });
        },

        validateCurrentStep() {
            this.errors = {};
            
            switch(this.currentStep) {
                case 1:
                    if (!this.formData.discordId.trim()) {
                        this.errors.discordId = 'ايدي الديسكورد مطلوب';
                    }
                    if (!this.formData.fullName.trim()) {
                        this.errors.fullName = 'الاسم الكامل مطلوب';
                    }
                    if (!this.formData.contactInfo.trim()) {
                        this.errors.contactInfo = 'معلومات التواصل مطلوبة';
                    }
                    break;
                    
                case 2:
                    if (!this.formData.orderType) {
                        this.errors.orderType = 'نوع الطلب مطلوب';
                    }
                    if (!this.formData.orderCategory) {
                        this.errors.orderCategory = 'فئة الطلب مطلوبة';
                    }
                    if (!this.formData.orderDetails.trim()) {
                        this.errors.orderDetails = 'تفاصيل الطلب مطلوبة';
                    }
                    if (!this.formData.deliveryTime) {
                        this.errors.deliveryTime = 'وقت التسليم مطلوب';
                    }
                    if (!this.formData.budget) {
                        this.errors.budget = 'الميزانية مطلوبة';
                    }
                    break;
                    
                case 3:
                    if (!this.formData.requirements.trim()) {
                        this.errors.requirements = 'المتطلبات مطلوبة';
                    }
                    break;
                    
                case 4:
                    if (!this.formData.paymentMethod) {
                        this.errors.paymentMethod = 'طريقة الدفع مطلوبة';
                    }
                    if (!this.formData.agreeToTerms) {
                        this.errors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
                    }
                    break;
            }
            
            return Object.keys(this.errors).length === 0;
        },

        nextStep() {
            if (this.validateCurrentStep()) {
                if (this.currentStep < this.totalSteps) {
                    this.currentStep++;
                    this.animateInputs();
                }
            } else {
                this.showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        },

        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.animateInputs();
            }
        },

        getUrgencyColor(urgency) {
            const level = this.urgencyLevels.find(l => l.value === urgency);
            return level ? level.color : '#28a745';
        },

        calculateEstimatedCost() {
            const budgetRange = this.formData.budget;
            const urgency = this.formData.urgency;
            
            let basePrice = 0;
            if (budgetRange.includes('-')) {
                const [min, max] = budgetRange.split('-').map(Number);
                basePrice = (min + max) / 2;
            } else if (budgetRange === '1000+') {
                basePrice = 1000;
            }
            
            // زيادة السعر حسب الإلحاح
            const urgencyMultiplier = {
                'عادي': 1,
                'مهم': 1.2,
                'عاجل': 1.5,
                'طارئ': 2
            };
            
            return Math.round(basePrice * urgencyMultiplier[urgency]);
        },

        async sendApply() {
            if (!this.validateCurrentStep()) {
                this.showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            this.isSubmitting = true;

            const webhookUrl = 'https://discord.com/api/webhooks/1393737456083537930/vapXAbpBwnPurETCHBYkSiibTgeAwrP9GyAwkw8nqE4K4RjeQWUOc2BvI3U-fxTyl-l1';
            
            const urgencyColor = this.getUrgencyColor(this.formData.urgency);
            const estimatedCost = this.calculateEstimatedCost();
            
            const applyMessage = {
                content: `🚀 **طلب جديد وارد!** \n<@&1234567890> تم استلام طلب ${this.formData.urgency}`,
                embeds: [{
                    title: `📋 طلب رقم: ${this.orderNumber}`,
                    description: `**نوع الطلب:** ${this.formData.orderType} - ${this.formData.orderCategory}\n**مستوى الإلحاح:** ${this.formData.urgency}`,
                    color: parseInt(urgencyColor.replace('#', ''), 16),
                    fields: [
                        {
                            name: '👤 معلومات العميل',
                            value: `**الاسم:** ${this.formData.fullName}\n**ديسكورد:** ${this.formData.discordId}\n**التواصل:** ${this.formData.contactInfo}${this.formData.email ? `\n**الإيميل:** ${this.formData.email}` : ''}`,
                            inline: false
                        },
                        {
                            name: '📝 تفاصيل الطلب',
                            value: `**الوصف:** ${this.formData.orderDetails}\n**المتطلبات:** ${this.formData.requirements}`,
                            inline: false
                        },
                        {
                            name: '⏰ التوقيت والتسليم',
                            value: `**وقت التسليم:** ${this.deliveryTimes.find(t => t.value === this.formData.deliveryTime)?.label || this.formData.deliveryTime}\n**الإلحاح:** ${this.formData.urgency}`,
                            inline: true
                        },
                        {
                            name: '💰 الميزانية والدفع',
                            value: `**الميزانية:** ${this.budgetRanges.find(b => b.value === this.formData.budget)?.label || this.formData.budget}\n**طريقة الدفع:** ${this.paymentMethods.find(p => p.value === this.formData.paymentMethod)?.label || this.formData.paymentMethod}\n**التكلفة المتوقعة:** ${estimatedCost} ريال`,
                            inline: true
                        }
                    ],
                    footer: {
                        text: `تم الإرسال في ${new Date().toLocaleString('ar-SA')} | النظام الآلي لإدارة الطلبات`,
                        icon_url: 'https://i.imgur.com/cgrAYPN.png'
                    },
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: 'https://i.imgur.com/cgrAYPN.png'
                    }
                }]
            };

            // إضافة حقول إضافية إذا كانت متوفرة
            if (this.formData.example && this.formData.example !== '.') {
                applyMessage.embeds[0].fields.push({
                    name: '🎨 مثال الطلب',
                    value: this.formData.example,
                    inline: false
                });
            }

            if (this.formData.additionalNotes) {
                applyMessage.embeds[0].fields.push({
                    name: '📌 ملاحظات إضافية',
                    value: this.formData.additionalNotes,
                    inline: false
                });
            }

            // إرسال رسالة منفصلة للإشعارات السريعة
            const quickNotification = {
                content: `⚡ **إشعار سريع** \n📋 طلب جديد: **${this.formData.orderType}** | 🔥 **${this.formData.urgency}** | 💰 **${this.formData.budget}**\n🏷️ رقم الطلب: \`${this.orderNumber}\``,
                embeds: [{
                    color: parseInt(urgencyColor.replace('#', ''), 16),
                    fields: [
                        {
                            name: '⚡ إجراءات سريعة',
                            value: '✅ **قبول الطلب**\n❌ **رفض الطلب**\n💬 **طلب توضيحات**\n📞 **التواصل مع العميل**',
                            inline: true
                        },
                        {
                            name: '📊 معلومات سريعة',
                            value: `**العميل:** ${this.formData.fullName}\n**الميزانية:** ${this.formData.budget}\n**التسليم:** ${this.deliveryTimes.find(t => t.value === this.formData.deliveryTime)?.label}`,
                            inline: true
                        }
                    ]
                }]
            };

            try {
                // إرسال الطلب الكامل
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

                // انتظار قصير ثم إرسال الإشعار السريع
                setTimeout(async () => {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(quickNotification)
                    });
                }, 1000);

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
                email: '',
                contactInfo: '',
                orderType: '',
                orderCategory: '',
                orderDetails: '',
                deliveryTime: '',
                budget: '',
                requirements: '',
                example: '',
                additionalNotes: '',
                urgency: 'عادي',
                paymentMethod: '',
                agreeToTerms: false,
                subscribeToUpdates: false
            };
            this.errors = {};
            this.currentStep = 1;
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
                
                <!-- Progress Bar -->
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
                    </div>
                    <div class="progress-text">الخطوة {{ currentStep }} من {{ totalSteps }}</div>
                </div>
                
                <!-- Order Number -->
                <div class="order-number">
                    <span>رقم الطلب: {{ orderNumber }}</span>
                </div>
                
                <form @submit.prevent="sendApply" class="form">
                    <!-- الخطوة الأولى: معلومات أساسية -->
                    <div v-if="currentStep === 1" class="step-container">
                        <h2 class="step-title">معلومات أساسية</h2>
                        
                        <div class="inp fade-in-up">
                            <label for="discordId">ايدي الديسكورد الخاص بك *</label>
                            <input 
                                id="discordId"
                                v-model="formData.discordId"
                                placeholder="مثال: user#1234"
                                type="text"
                                :class="{ 'error': errors.discordId }"
                            >
                            <span v-if="errors.discordId" class="error-message">{{ errors.discordId }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="fullName">الاسم الكامل *</label>
                            <input 
                                id="fullName"
                                v-model="formData.fullName"
                                placeholder="أدخل اسمك الكامل"
                                type="text"
                                :class="{ 'error': errors.fullName }"
                            >
                            <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="email">البريد الإلكتروني (اختياري)</label>
                            <input 
                                id="email"
                                v-model="formData.email"
                                placeholder="example@email.com"
                                type="email"
                            >
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="contactInfo">معلومات التواصل *</label>
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
                    
                    <!-- الخطوة الثانية: تفاصيل الطلب -->
                    <div v-if="currentStep === 2" class="step-container">
                        <h2 class="step-title">تفاصيل الطلب</h2>
                        
                        <div class="inp fade-in-up">
                            <label for="orderType">نوع الطلب *</label>
                            <select 
                                id="orderType"
                                v-model="formData.orderType"
                                :class="{ 'error': errors.orderType }"
                                @change="formData.orderCategory = ''"
                            >
                                <option value="">اختر نوع الطلب</option>
                                <option v-for="type in orderTypes" :key="type.value" :value="type.value">
                                    {{ type.label }}
                                </option>
                            </select>
                            <span v-if="errors.orderType" class="error-message">{{ errors.orderType }}</span>
                        </div>
                        
                        <div v-if="formData.orderType" class="inp fade-in-up">
                            <label for="orderCategory">فئة الطلب *</label>
                            <select 
                                id="orderCategory"
                                v-model="formData.orderCategory"
                                :class="{ 'error': errors.orderCategory }"
                            >
                                <option value="">اختر فئة الطلب</option>
                                <option v-for="category in currentCategories" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                            <span v-if="errors.orderCategory" class="error-message">{{ errors.orderCategory }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="orderDetails">تفاصيل الطلب *</label>
                            <textarea 
                                id="orderDetails"
                                v-model="formData.orderDetails"
                                placeholder="اشرح بالتفصيل ما تريده..."
                                :class="{ 'error': errors.orderDetails }"
                                rows="4"
                            ></textarea>
                            <span v-if="errors.orderDetails" class="error-message">{{ errors.orderDetails }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="deliveryTime">وقت التسليم المطلوب *</label>
                            <select 
                                id="deliveryTime"
                                v-model="formData.deliveryTime"
                                :class="{ 'error': errors.deliveryTime }"
                            >
                                <option value="">اختر وقت التسليم</option>
                                <option v-for="time in deliveryTimes" :key="time.value" :value="time.value">
                                    {{ time.label }}
                                </option>
                            </select>
                            <span v-if="errors.deliveryTime" class="error-message">{{ errors.deliveryTime }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="budget">الميزانية المتوقعة *</label>
                            <select 
                                id="budget"
                                v-model="formData.budget"
                                :class="{ 'error': errors.budget }"
                            >
                                <option value="">اختر الميزانية</option>
                                <option v-for="budget in budgetRanges" :key="budget.value" :value="budget.value">
                                    {{ budget.label }}
                                </option>
                            </select>
                            <span v-if="errors.budget" class="error-message">{{ errors.budget }}</span>
                        </div>
                    </div>
                    
                    <!-- الخطوة الثالثة: المتطلبات -->
                    <div v-if="currentStep === 3" class="step-container">
                        <h2 class="step-title">المتطلبات والتفاصيل</h2>
                        
                        <div class="inp fade-in-up">
                            <label for="requirements">المتطلبات الخاصة *</label>
                            <textarea 
                                id="requirements"
                                v-model="formData.requirements"
                                placeholder="اذكر أي متطلبات خاصة أو مواصفات محددة..."
                                :class="{ 'error': errors.requirements }"
                                rows="3"
                            ></textarea>
                            <span v-if="errors.requirements" class="error-message">{{ errors.requirements }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="example">مثال أو مرجع للطلب</label>
                            <input 
                                id="example"
                                v-model="formData.example"
                                placeholder="رابط أو وصف لمثال مشابه (اختياري)"
                                type="text"
                            >
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="urgency">مستوى الإلحاح</label>
                            <div class="urgency-selector">
                                <div 
                                    v-for="level in urgencyLevels" 
                                    :key="level.value"
                                    class="urgency-option"
                                    :class="{ 'active': formData.urgency === level.value }"
                                    :style="{ borderColor: level.color }"
                                    @click="formData.urgency = level.value"
                                >
                                    <div class="urgency-dot" :style="{ backgroundColor: level.color }"></div>
                                    <span>{{ level.label }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label for="additionalNotes">ملاحظات إضافية</label>
                            <textarea 
                                id="additionalNotes"
                                v-model="formData.additionalNotes"
                                placeholder="أي ملاحظات أو تفاصيل إضافية..."
                                rows="2"
                            ></textarea>
                        </div>
                    </div>
                    
                    <!-- الخطوة الرابعة: الدفع والتأكيد -->
                    <div v-if="currentStep === 4" class="step-container">
                        <h2 class="step-title">الدفع والتأكيد</h2>
                        
                        <div class="inp fade-in-up">
                            <label for="paymentMethod">طريقة الدفع المفضلة *</label>
                            <select 
                                id="paymentMethod"
                                v-model="formData.paymentMethod"
                                :class="{ 'error': errors.paymentMethod }"
                            >
                                <option value="">اختر طريقة الدفع</option>
                                <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                                    {{ method.label }}
                                </option>
                            </select>
                            <span v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</span>
                        </div>
                        
                        <!-- ملخص الطلب -->
                        <div class="order-summary">
                            <h3>ملخص الطلب</h3>
                            <div class="summary-item">
                                <span>النوع:</span>
                                <span>{{ formData.orderType }} - {{ formData.orderCategory }}</span>
                            </div>
                            <div class="summary-item">
                                <span>التسليم:</span>
                                <span>{{ deliveryTimes.find(t => t.value === formData.deliveryTime)?.label }}</span>
                            </div>
                            <div class="summary-item">
                                <span>الميزانية:</span>
                                <span>{{ budgetRanges.find(b => b.value === formData.budget)?.label }}</span>
                            </div>
                            <div class="summary-item">
                                <span>الإلحاح:</span>
                                <span :style="{ color: getUrgencyColor(formData.urgency) }">{{ formData.urgency }}</span>
                            </div>
                            <div class="summary-item total">
                                <span>التكلفة المتوقعة:</span>
                                <span>{{ calculateEstimatedCost() }} ريال</span>
                            </div>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label class="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    v-model="formData.agreeToTerms"
                                    :class="{ 'error': errors.agreeToTerms }"
                                >
                                <span class="checkmark"></span>
                                أوافق على الشروط والأحكام *
                            </label>
                            <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
                        </div>
                        
                        <div class="inp fade-in-up">
                            <label class="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    v-model="formData.subscribeToUpdates"
                                >
                                <span class="checkmark"></span>
                                أريد تلقي تحديثات حول الطلب عبر البريد الإلكتروني
                            </label>
                        </div>
                    </div>
                    
                    <!-- Navigation Buttons -->
                    <div class="navigation-buttons">
                        <button 
                            v-if="currentStep > 1"
                            type="button" 
                            class="btn btn-secondary"
                            @click="prevStep"
                        >
                            السابق
                        </button>
                        
                        <button 
                            v-if="currentStep < totalSteps"
                            type="button" 
                            class="btn btn-primary"
                            @click="nextStep"
                            :disabled="!canProceed"
                        >
                            التالي
                        </button>
                        
                        <button 
                            v-if="currentStep === totalSteps"
                            type="submit" 
                            class="btn btn-success"
                            :class="{ 'loading': isSubmitting }"
                            :disabled="isSubmitting || !canProceed"
                        >
                            <span v-if="!isSubmitting">إرسال الطلب</span>
                            <div v-else class="loading-spinner">
                                <div class="spinner"></div>
                                <span>جاري الإرسال...</span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Success Animation -->
        <transition name="success">
            <div v-if="showSuccess" class="success-overlay">
                <div class="success-card">
                    <div class="success-icon">
                        <svg viewBox="0 0 50 50" class="checkmark">
                            <circle class="checkmark__circle" cx="25" cy="25" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h2>تم إرسال الطلب بنجاح!</h2>
                    <p>رقم الطلب: <strong>{{ orderNumber }}</strong></p>
                    <p>سيتم التواصل معك في أقرب وقت ممكن</p>
                    <div class="success-actions">
                        <button @click="showSuccess = false" class="btn btn-primary">حسناً</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Keyframe Animations */
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

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
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

@keyframes checkmark {
    0% { stroke-dashoffset: 50; }
    100% { stroke-dashoffset: 0; }
}

@keyframes circle {
    0% { stroke-dashoffset: 157; }
    100% { stroke-dashoffset: 0; }
}

@keyframes progressFill {
    0% { width: 0%; }
    100% { width: var(--progress-width); }
}

.main {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 400% 400%;
    animation: backgroundMove 15s ease infinite;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
    overflow: hidden;
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

.shape-1 {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 60px;
    height: 60px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
}

.shape-3 {
    width: 40px;
    height: 40px;
    top: 40%;
    left: 80%;
    animation-delay: 4s;
}

.shape-4 {
    width: 100px;
    height: 100px;
    top: 10%;
    right: 30%;
    animation-delay: 1s;
}

.shape-5 {
    width: 50px;
    height: 50px;
    top: 80%;
    left: 20%;
    animation-delay: 3s;
}

/* Main Content */
.cont {
    position: relative;
    z-index: 2;
}

.logo-container {
    display: block;
    margin-bottom: 30px;
}

.logo {
    width: 180px;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

.logo:hover {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

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
    max-width: 700px;
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
    animation: fadeInUp 1s ease-out;
}

/* Progress Bar */
.progress-container {
    width: 100%;
    margin-bottom: 20px;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00d4ff 0%, #ff6b6b 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
}

.progress-text {
    text-align: center;
    color: white;
    font-size: 14px;
    font-weight: 600;
}

/* Order Number */
.order-number {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
}

/* Form */
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.step-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.step-title {
    color: white;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.inp {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
}

.inp label {
    text-align: center;
    width: 100%;
    padding: 12px 0;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    border-bottom: 3px solid rgba(255, 255, 255, 0.3);
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.inp label::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.inp:hover label::before {
    left: 100%;
}

.inp input,
.inp textarea,
.inp select {
    border: none;
    padding: 15px 20px;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    border-bottom: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 16px;
    transition: all 0.3s ease;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.inp input::placeholder,
.inp textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
}

.inp input:focus,
.inp textarea:focus,
.inp select:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-bottom-color: #ffd700;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.inp textarea {
    resize: vertical;
    min-height: 80px;
}

.inp select {
    cursor: pointer;
}

.inp select option {
    background: #525359;
    color: white;
}

/* Urgency Selector */
.urgency-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 10px;
}

.urgency-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    font-size: 14px;
}

.urgency-option:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.urgency-option.active {
    background: rgba(255, 255, 255, 0.3);
    border-color: currentColor;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.urgency-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

/* Order Summary */
.order-summary {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin: 20px 0;
}

.order-summary h3 {
    color: white;
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
}

.summary-item:last-child {
    border-bottom: none;
}

.summary-item.total {
    font-weight: 700;
    font-size: 16px;
    color: #ffd700;
    border-top: 2px solid rgba(255, 215, 0, 0.3);
    padding-top: 12px;
    margin-top: 8px;
}

/* Checkbox */
.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    font-size: 14px;
    gap: 10px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.checkbox-label:hover {
    background: rgba(255, 255, 255, 0.2);
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
    background: #28a745;
    border-color: #28a745;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
    content: '✓';
    color: white;
    font-weight: bold;
}

/* Navigation Buttons */
.navigation-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

.btn {
    text-transform: uppercase;
    text-align: center;
    padding: 15px 30px;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    min-width: 120px;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.btn:hover:not(:disabled)::before {
    left: 100%;
}

.btn-primary {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    border-bottom: 3px solid #0056b3;
}

.btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #0056b3 0%, #007bff 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.btn-secondary {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    border-bottom: 3px solid #495057;
}

.btn-secondary:hover:not(:disabled) {
    background: linear-gradient(135deg, #495057 0%, #6c757d 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
}

.btn-success {
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
    border-bottom: 3px solid #1e7e34;
}

.btn-success:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Error Styles */
.error {
    border-bottom-color: #ff4757 !important;
    background: rgba(255, 71, 87, 0.2) !important;
    animation: shake 0.5s ease-in-out;
}

.error-message {
    color: #ff4757;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
    animation: shake 0.5s ease-in-out;
}

/* Success Animation */
.success-enter-active {
    transition: all 0.5s ease;
}

.success-leave-active {
    transition: all 0.5s ease;
}

.success-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.success-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.success-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.success-card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    max-width: 400px;
    animation: fadeInUp 0.5s ease-out;
}

.success-icon {
    margin-bottom: 20px;
}

.checkmark {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    stroke-width: 3;
    stroke: #4caf50;
    stroke-miterlimit: 10;
    animation: checkmark 0.6s ease-in-out;
}

.checkmark__circle {
    stroke-dasharray: 157;
    stroke-dashoffset: 157;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke: #4caf50;
    animation: circle 0.6s ease-in-out;
}

.checkmark__check {
    stroke-dasharray: 25;
    stroke-dashoffset: 25;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke: #4caf50;
    animation: checkmark 0.6s 0.3s ease-in-out forwards;
}

.success-card h2 {
    color: #4caf50;
    margin-bottom: 15px;
    font-size: 24px;
}

.success-card p {
    color: #666;
    font-size: 16px;
    margin-bottom: 10px;
}

.success-actions {
    margin-top: 20px;
}

@media (max-width: 700px) {
    .logo {
        width: 150px;
    }
    
    .cont {
        margin: 10px;
        padding: 30px 15px;
    }
    
    .inp input,
    .inp textarea,
    .inp select {
        padding: 12px 15px;
        font-size: 14px;
    }
    
    .btn {
        padding: 12px 20px;
        font-size: 14px;
        min-width: 100px;
    }
    
    .navigation-buttons {
        flex-direction: column;
        gap: 10px;
    }
    
    .urgency-selector {
        grid-template-columns: 1fr;
    }
    
    .success-card {
        margin: 20px;
        padding: 30px 20px;
    }
    
    .step-title {
        font-size: 20px;
    }
    
    .order-summary {
        padding: 15px;
    }
}
</style>
