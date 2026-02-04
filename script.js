// تطبيق رحلة التأسيس - JavaScript الرئيسي

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع المكونات
    initCountdown();
    initTabs();
    initStatsCounter();
    initModals();
    initNavigation();
    initForms();
    initLiveStats();
    
    // التحقق من حالة تسجيل الدخول
    checkAuthStatus();
});

// 1. العد التنازلي ليوم التأسيس
function initCountdown() {
    // تاريخ يوم التأسيس 22 فبراير 2026
    const foundingDay = new Date('February 22, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = foundingDay - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // تنسيق الأرقام العربية
            document.getElementById('days').textContent = days.toLocaleString('ar-SA');
            document.getElementById('hours').textContent = hours.toLocaleString('ar-SA', {minimumIntegerDigits: 2});
            document.getElementById('minutes').textContent = minutes.toLocaleString('ar-SA', {minimumIntegerDigits: 2});
            document.getElementById('seconds').textContent = seconds.toLocaleString('ar-SA', {minimumIntegerDigits: 2});
        } else {
            document.querySelector('.countdown-container').innerHTML = `
                <h3>🎉 اليوم هو يوم التأسيس السعودي! 🎉</h3>
                <p>كل عام والمملكة العربية السعودية وشعبها بخير</p>
            `;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 2. تبويبات المعارض
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة النشاط من جميع الأزرار
            tabBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المختار
            btn.classList.add('active');
            
            // إخفاء جميع المحتويات
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إظهار المحتوى المحدد
            const tabId = btn.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabId}-tab`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
    
    // تحميل محتوى تبويب المعارض ديناميكياً
    loadTabContent('memory');
}

async function loadTabContent(tabName) {
    try {
        const response = await fetch(`api/exhibits/${tabName}.json`);
        const data = await response.json();
        
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (tabContent) {
            tabContent.innerHTML = generateExhibitContent(data);
        }
    } catch (error) {
        console.error('Error loading tab content:', error);
    }
}

function generateExhibitContent(data) {
    return `
        <div class="exhibit-preview">
            <div class="preview-content">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul class="feature-list">
                    ${data.features.map(feature => `
                        <li><i class="fas fa-check-circle"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <a href="${data.link}" class="btn-primary">استكشف الركن الآن</a>
            </div>
            <div class="preview-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
        </div>
    `;
}

// 3. عداد الإحصائيات
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 ثانية
        const increment = target / (duration / 16); // 60 إطار في الثانية
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString('ar-SA');
        }, 16);
    });
}

// 4. النوافذ المنبثقة
function initModals() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    window.openLoginModal = function() {
        loginModal.style.display = 'flex';
        registerModal.style.display = 'none';
    };
    
    window.closeLoginModal = function() {
        loginModal.style.display = 'none';
    };
    
    window.openRegisterModal = function() {
        registerModal.style.display = 'flex';
        loginModal.style.display = 'none';
    };
    
    window.closeRegisterModal = function() {
        registerModal.style.display = 'none';
    };
    
    window.switchToRegister = function() {
        closeLoginModal();
        openRegisterModal();
    };
    
    // إغلاق النافذة عند النقر خارجها
    window.onclick = function(event) {
        if (event.target === loginModal) {
            closeLoginModal();
        }
        if (event.target === registerModal) {
            closeRegisterModal();
        }
    };
}

// 5. التنقل
function initNavigation() {
    // تبديل القائمة المتنقلة
    window.toggleMenu = function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    };
    
    // التنقل السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                document.querySelector('.nav-menu').classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير للموقع عند التمرير
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(17, 61, 28, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-dark)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// 6. النماذج
function initForms() {
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                // محاكاة تسجيل الدخول
                const response = await fakeLogin(email, password);
                
                if (response.success) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    showNotification('تم تسجيل الدخول بنجاح!', 'success');
                    closeLoginModal();
                    updateAuthUI(response.user);
                } else {
                    showNotification('بيانات الدخول غير صحيحة', 'error');
                }
            } catch (error) {
                showNotification('حدث خطأ أثناء تسجيل الدخول', 'error');
            }
        });
    }
    
    // نموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const userData = {
                fullName: document.getElementById('fullName').value,
                studentId: document.getElementById('studentId').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            if (userData.password !== document.getElementById('confirmPassword').value) {
                showNotification('كلمتا المرور غير متطابقتين', 'error');
                return;
            }
            
            try {
                // محاكاة التسجيل
                const response = await fakeRegister(userData);
                
                if (response.success) {
                    showNotification('تم إنشاء الحساب بنجاح!', 'success');
                    localStorage.setItem('user', JSON.stringify(response.user));
                    closeRegisterModal();
                    updateAuthUI(response.user);
                } else {
                    showNotification(response.message, 'error');
                }
            } catch (error) {
                showNotification('حدث خطأ أثناء التسجيل', 'error');
            }
        });
    }
    
    // نموذج النشرة الإخبارية
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // محاكاة الإرسال
            setTimeout(() => {
                showNotification('تم الاشتراك في النشرة الإخبارية بنجاح!', 'success');
                this.reset();
            }, 1000);
        });
    }
}

// 7. إحصائيات حية
function initLiveStats() {
    // تحديث الإحصائيات الحية
    function updateLiveStats() {
        // زيادة عدد المشاركين عشوائياً
        const todayParticipants = document.getElementById('todayParticipants');
        const current = parseInt(todayParticipants.textContent);
        const increase = Math.floor(Math.random() * 3);
        todayParticipants.textContent = (current + increase).toLocaleString('ar-SA');
        
        // تحديث أفضل نتيجة
        const topScore = document.getElementById('topScore');
        const score = parseInt(topScore.textContent);
        const newScore = score + Math.floor(Math.random() * 5);
        if (newScore <= 1000) {
            topScore.textContent = newScore.toLocaleString('ar-SA');
        }
        
        // تحديث الوقت المتبقي
        updateQuizTime();
    }
    
    // تحديث وقت المسابقة
    function updateQuizTime() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const timeLeft = endOfDay - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('quizTime').textContent = 
            `${hours.toLocaleString('ar-SA', {minimumIntegerDigits: 2})}:` +
            `${minutes.toLocaleString('ar-SA', {minimumIntegerDigits: 2})}:` +
            `${seconds.toLocaleString('ar-SA', {minimumIntegerDigits: 2})}`;
    }
    
    updateQuizTime();
    setInterval(updateLiveStats, 10000); // تحديث كل 10 ثواني
    setInterval(updateQuizTime, 1000); // تحديث الوقت كل ثانية
}

// 8. تسجيل الفعاليات
window.registerEvent = function(eventId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        showNotification('يجب تسجيل الدخول أولاً', 'warning');
        openLoginModal();
        return;
    }
    
    // محاكاة التسجيل في الفعالية
    const eventName = eventId === 1 ? 'حفل افتتاح المسابقة' : 'ورشة التراث السعودي';
    
    setTimeout(() => {
        showNotification(`تم تسجيلك في "${eventName}" بنجاح!`, 'success');
        
        // تحديث زر التسجيل
        const buttons = document.querySelectorAll(`button[onclick="registerEvent(${eventId})"]`);
        buttons.forEach(btn => {
            btn.textContent = 'مسجل ✓';
            btn.disabled = true;
            btn.style.backgroundColor = 'var(--secondary-green)';
            btn.style.color = 'var(--white)';
        });
    }, 1000);
};

// 9. وظائف المساعدة
function fakeLogin(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // محاكاة التحقق
            if (email && password.length >= 6) {
                resolve({
                    success: true,
                    user: {
                        id: Date.now(),
                        name: email.split('@')[0],
                        email: email,
                        studentId: '202412345',
                        points: 150,
                        level: 3
                    }
                });
            } else {
                resolve({
                    success: false,
                    message: 'بيانات الدخول غير صحيحة'
                });
            }
        }, 1500);
    });
}

function fakeRegister(userData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // محاكاة إنشاء حساب
            resolve({
                success: true,
                user: {
                    id: Date.now(),
                    name: userData.fullName,
                    email: userData.email,
                    studentId: userData.studentId,
                    points: 100, // نقاط بداية
                    level: 1
                }
            });
        }, 1500);
    });
}

function checkAuthStatus() {
    const user = localStorage.getItem('user');
    if (user) {
        updateAuthUI(JSON.parse(user));
    }
}

function updateAuthUI(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons && user) {
        authButtons.innerHTML = `
            <div class="user-profile">
                <span class="user-name">مرحباً، ${user.name}</span>
                <span class="user-points">${user.points} نقطة</span>
                <button class="btn-logout" onclick="logout()">تسجيل الخروج</button>
            </div>
        `;
        
        // تحديث الإحصائيات في لوحة المعلومات
        updateUserStats(user);
    }
}

function updateUserStats(user) {
    // يمكن تحديث الإحصائيات في الأقسام المختلفة
    console.log('User stats updated:', user);
}

window.logout = function() {
    localStorage.removeItem('user');
    location.reload();
};

function showNotification(message, type = 'info') {
    // إشعار مؤقت
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        border-radius: var(--border-radius);
        z-index: 3000;
        box-shadow: var(--shadow-medium);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// إضافة أنماط للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .user-profile {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: white;
    }
    
    .user-name {
        font-weight: 600;
    }
    
    .user-points {
        background-color: var(--accent-gold);
        color: var(--primary-dark);
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .btn-logout {
        background-color: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 5px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s;
    }
    
    .btn-logout:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);
