// مسابقة باحثات التأسيس - الأسئلة والمحتوى

class QuizManager {
    constructor() {
        this.questions = [];
        this.categories = [];
        this.dailyQuiz = null;
        this.userProgress = {};
        
        this.init();
    }
    
    async init() {
        await this.loadQuestions();
        await this.loadCategories();
        this.loadUserProgress();
        this.generateDailyQuiz();
    }
    
    async loadQuestions() {
        // محاكاة تحميل الأسئلة من قاعدة بيانات
        this.questions = [
            {
                id: 1,
                question: "في أي عام تأسست الدولة السعودية الأولى؟",
                options: [
                    "١٧٢٧م",
                    "١٧٤٤م",
                    "١٨١٨م",
                    "١٩٠٢م"
                ],
                correct: 0,
                category: "history",
                difficulty: "easy",
                points: 10,
                explanation: "تأسست الدولة السعودية الأولى عام ١٧٢٧م على يد الإمام محمد بن سعود.",
                reference: "كتاب تاريخ الدولة السعودية - الجزء الأول"
            },
            {
                id: 2,
                question: "من هو مؤسس الدولة السعودية الثالثة؟",
                options: [
                    "الملك عبدالعزيز بن عبدالرحمن آل سعود",
                    "الملك سعود بن عبدالعزيز",
                    "الملك فيصل بن عبدالعزيز",
                    "الملك عبدالله بن عبدالعزيز"
                ],
                correct: 0,
                category: "history",
                difficulty: "easy",
                points: 10,
                explanation: "الملك عبدالعزيز بن عبدالرحمن آل سعود هو مؤسس الدولة السعودية الثالثة عام ١٩٠٢م.",
                reference: "مذكرات الملك عبدالعزيز"
            },
            {
                id: 3,
                question: "ما هي العاصمة الأولى للدولة السعودية؟",
                options: [
                    "الدرعية",
                    "الرياض",
                    "مكة المكرمة",
                    "جدة"
                ],
                correct: 0,
                category: "geography",
                difficulty: "easy",
                points: 10,
                explanation: "الدرعية كانت العاصمة الأولى للدولة السعودية منذ تأسيسها عام ١٧٢٧م.",
                reference: "دليل المواقع التاريخية"
            },
            {
                id: 4,
                question: "أي من هذه الحرف اليدوية تشتهر بها منطقة نجد؟",
                options: [
                    "السدو",
                    "الفخار",
                    "الخوص",
                    "التطريز الذهبي"
                ],
                correct: 0,
                category: "heritage",
                difficulty: "medium",
                points: 15,
                explanation: "حرفة السدو هي فن نسج الصوف التقليدي الذي تشتهر به نساء نجد.",
                reference: "دليل الحرف اليدوية السعودية"
            },
            {
                id: 5,
                question: "ما هو المشروع الأكبر في رؤية ٢٠٣٠؟",
                options: [
                    "نيوم",
                    "القدية",
                    "ذا لاين",
                    "الرياض الخضراء"
                ],
                correct: 0,
                category: "vision",
                difficulty: "medium",
                points: 15,
                explanation: "نيوم هو المشروع الأكبر في رؤية ٢٠٣٠ باستثمارات تصل إلى ٥٠٠ مليار دولار.",
                reference: "وثيقة رؤية السعودية ٢٠٣٠"
            },
            {
                id: 6,
                question: "أي مدينة سعودية تلقب بعروس البحر الأحمر؟",
                options: [
                    "جدة",
                    "الدمام",
                    "الخبر",
                    "ينبع"
                ],
                correct: 0,
                category: "geography",
                difficulty: "medium",
                points: 15,
                explanation: "جدة تلقب بعروس البحر الأحمر لموقعها المميز على ساحل البحر الأحمر.",
                reference: "الأطلس الجغرافي للمملكة"
            },
            {
                id: 7,
                question: "من هو الشاعر السعودي المعروف بـ'شاعر الأطلال'؟",
                options: [
                    "محمد العبدالله الفيصل",
                    "غازي القصيبي",
                    "عبدالله الفيصل",
                    "طلال الرشيد"
                ],
                correct: 1,
                category: "culture",
                difficulty: "hard",
                points: 20,
                explanation: "غازي القصيبي هو الشاعر السعودي المعروف بشاعر الأطلال.",
                reference: "تاريخ الأدب السعودي"
            },
            {
                id: 8,
                question: "كم تبلغ مساحة المملكة العربية السعودية؟",
                options: [
                    "٢,١٥٠,٠٠٠ كم²",
                    "١,٩٦٠,٠٠٠ كم²",
                    "٢,٢٤٠,٠٠٠ كم²",
                    "١,٨٠٠,٠٠٠ كم²"
                ],
                correct: 0,
                category: "geography",
                difficulty: "hard",
                points: 20,
                explanation: "تبلغ مساحة المملكة العربية السعودية حوالي ٢,١٥٠,٠٠٠ كيلومتر مربع.",
                reference: "الهيئة العامة للإحصاء"
            },
            {
                id: 9,
                question: "ما هو أقدم موقع تراثي في المملكة مسجل في اليونسكو؟",
                options: [
                    "مدائن صالح",
                    "حي الطريف بالدرعية",
                    "جدة التاريخية",
                    "منطقة الحجر"
                ],
                correct: 0,
                category: "heritage",
                difficulty: "hard",
                points: 20,
                explanation: "مدائن صالح هي أقدم موقع تراثي سعودي مسجل في قائمة اليونسكو للتراث العالمي.",
                reference: "منظمة اليونسكو"
            },
            {
                id: 10,
                question: "متى تم اكتشاف النفط في المملكة لأول مرة؟",
                options: [
                    "١٩٣٨م",
                    "١٩٤٥م",
                    "١٩٥٠م",
                    "١٩٣٣م"
                ],
                correct: 0,
                category: "history",
                difficulty: "medium",
                points: 15,
                explanation: "تم اكتشاف النفط في بئر الدمام رقم ٧ (بئر الخير) عام ١٩٣٨م.",
                reference: "تاريخ النفط في المملكة"
            }
        ];
    }
    
    async loadCategories() {
        this.categories = [
            {
                id: "history",
                name: "التاريخ",
                icon: "fas fa-landmark",
                description: "أسئلة عن تاريخ المملكة وتأسيسها",
                color: "#113D1C",
                questionCount: this.questions.filter(q => q.category === "history").length
            },
            {
                id: "geography",
                name: "الجغرافيا",
                icon: "fas fa-map",
                description: "أسئلة عن مواقع ومدن المملكة",
                color: "#1E5631",
                questionCount: this.questions.filter(q => q.category === "geography").length
            },
            {
                id: "heritage",
                name: "التراث",
                icon: "fas fa-archway",
                description: "أسئلة عن التراث والحرف التقليدية",
                color: "#8DAE49",
                questionCount: this.questions.filter(q => q.category === "heritage").length
            },
            {
                id: "culture",
                name: "الثقافة",
                icon: "fas fa-theater-masks",
                description: "أسئلة عن الأدب والفنون السعودية",
                color: "#C6A467",
                questionCount: this.questions.filter(q => q.category === "culture").length
            },
            {
                id: "vision",
                name: "الرؤية",
                icon: "fas fa-chart-line",
                description: "أسئلة عن رؤية ٢٠٣٠ ومشاريعها",
                color: "#8B4513",
                questionCount: this.questions.filter(q => q.category === "vision").length
            }
        ];
    }
    
    generateDailyQuiz() {
        const today = new Date().toDateString();
        
        // التحقق إذا كان هناك اختبار يومي مخزن
        const savedDailyQuiz = localStorage.getItem('dailyQuiz');
        if (savedDailyQuiz) {
            const quizData = JSON.parse(savedDailyQuiz);
            if (quizData.date === today) {
                this.dailyQuiz = quizData;
                return;
            }
        }
        
        // إنشاء اختبار يومي جديد
        this.dailyQuiz = {
            date: today,
            questions: this.getRandomQuestions(10), // 10 أسئلة يومياً
            completed: false,
            score: 0,
            timeSpent: 0,
            startTime: new Date().toISOString()
        };
        
        this.saveDailyQuiz();
    }
    
    getRandomQuestions(count) {
        // اختيار أسئلة عشوائية من جميع الفئات
        const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    getQuestionsByCategory(categoryId, count = 5) {
        return this.questions
            .filter(q => q.category === categoryId)
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }
    
    getQuestionById(questionId) {
        return this.questions.find(q => q.id === questionId);
    }
    
    checkAnswer(questionId, selectedAnswer) {
        const question = this.getQuestionById(questionId);
        if (!question) return null;
        
        const isCorrect = question.correct === selectedAnswer;
        const points = isCorrect ? question.points : 0;
        
        return {
            isCorrect,
            points,
            correctAnswer: question.options[question.correct],
            explanation: question.explanation,
            reference: question.reference
        };
    }
    
    saveDailyQuiz() {
        if (this.dailyQuiz) {
            localStorage.setItem('dailyQuiz', JSON.stringify(this.dailyQuiz));
        }
    }
    
    loadUserProgress() {
        const savedProgress = localStorage.getItem('userQuizProgress');
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        } else {
            this.userProgress = {
                totalScore: 0,
                quizzesTaken: 0,
                correctAnswers: 0,
                totalQuestions: 0,
                categoryStats: {},
                achievements: []
            };
        }
    }
    
    saveUserProgress() {
        localStorage.setItem('userQuizProgress', JSON.stringify(this.userProgress));
    }
    
    updateUserProgress(quizResult) {
        this.userProgress.totalScore += quizResult.score;
        this.userProgress.quizzesTaken++;
        this.userProgress.correctAnswers += quizResult.correctAnswers;
        this.userProgress.totalQuestions += quizResult.totalQuestions;
        
        // تحديث إحصائيات الفئات
        quizResult.categoryBreakdown.forEach(category => {
            if (!this.userProgress.categoryStats[category.id]) {
                this.userProgress.categoryStats[category.id] = {
                    correct: 0,
                    total: 0,
                    points: 0
                };
            }
            
            this.userProgress.categoryStats[category.id].correct += category.correct;
            this.userProgress.categoryStats[category.id].total += category.total;
            this.userProgress.categoryStats[category.id].points += category.points;
        });
        
        this.saveUserProgress();
        this.checkAchievements();
    }
    
    checkAchievements() {
        const achievements = [];
        
        // إنجاز: أول اختبار
        if (this.userProgress.quizzesTaken === 1) {
            achievements.push({
                id: 'first_quiz',
                name: 'الباحث المبتدئ',
                description: 'أكمل أول اختبار بنجاح',
                icon: 'fas fa-graduation-cap',
                points: 50,
                earned: true
            });
        }
        
        // إنجاز: ١٠٠ نقطة
        if (this.userProgress.totalScore >= 100) {
            achievements.push({
                id: '100_points',
                name: 'باحث متميز',
                description: 'حقق ١٠٠ نقطة في المسابقة',
                icon: 'fas fa-star',
                points: 100,
                earned: true
            });
        }
        
        // إنجاز: ١٠ اختبارات
        if (this.userProgress.quizzesTaken >= 10) {
            achievements.push({
                id: '10_quizzes',
                name: 'المثابرة',
                description: 'أكمل ١٠ اختبارات',
                icon: 'fas fa-trophy',
                points: 150,
                earned: true
            });
        }
        
        // إضافة الإنجازات الجديدة
        achievements.forEach(achievement => {
            if (!this.userProgress.achievements.some(a => a.id === achievement.id)) {
                this.userProgress.achievements.push(achievement);
            }
        });
        
        this.saveUserProgress();
    }
    
    getLeaderboardData(timeRange = 'daily') {
        // محاكاة بيانات لوحة الصدارة
        const today = new Date().toISOString().split('T')[0];
        
        const data = [
            {
                rank: 1,
                name: 'نورة أحمد',
                points: 985,
                level: 5,
                accuracy: 92,
                quizzes: 47,
                avatar: 'avatar1.png',
                lastActive: today
            },
            {
                rank: 2,
                name: 'سارة الخالدي',
                points: 972,
                level: 5,
                accuracy: 89,
                quizzes: 45,
                avatar: 'avatar2.png',
                lastActive: today
            },
            {
                rank: 3,
                name: 'فاطمة العتيبي',
                points: 965,
                level: 4,
                accuracy: 88,
                quizzes: 42,
                avatar: 'avatar3.png',
                lastActive: today
            },
            {
                rank: 4,
                name: 'لطيفة القحطاني',
                points: 942,
                level: 4,
                accuracy: 85,
                quizzes: 40,
                avatar: 'avatar4.png',
                lastActive: today
            },
            {
                rank: 5,
                name: 'مها السديري',
                points: 928,
                level: 4,
                accuracy: 83,
                quizzes: 38,
                avatar: 'avatar5.png',
                lastActive: today
            }
        ];
        
        // تصفية حسب النطاق الزمني
        if (timeRange === 'weekly') {
            // بيانات الأسبوع
        } else if (timeRange === 'monthly') {
            // بيانات الشهر
        } else if (timeRange === 'all') {
            // جميع البيانات
        }
        
        return data;
    }
    
    getUserRank(userId) {
        const leaderboard = this.getLeaderboardData('all');
        // في الواقع، يجب البحث في قاعدة البيانات
        return leaderboard.findIndex(user => user.id === userId) + 1 || null;
    }
    
    getCategoryStats() {
        return this.categories.map(category => {
            const stats = this.userProgress.categoryStats[category.id] || {
                correct: 0,
                total: 0,
                points: 0
            };
            
            return {
                ...category,
                ...stats,
                accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
            };
        });
    }
}

// تصدير الفئة للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizManager;
} else {
    window.QuizManager = QuizManager;
}

// وظائف مساعدة
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function calculateLevel(points) {
    // كل ١٠٠٠ نقطة = مستوى جديد
    return Math.floor(points / 1000) + 1;
}

function getNextLevelPoints(points) {
    const currentLevel = calculateLevel(points);
    const nextLevelPoints = currentLevel * 1000;
    const pointsToNext = nextLevelPoints - points;
    
    return {
        currentLevel,
        nextLevelPoints,
        pointsToNext,
        progress: ((points % 1000) / 1000) * 100
    };
}

// بيانات إضافية للأسئلة
const additionalQuestions = [
    {
        id: 11,
        question: "ما هو أطول وادي في المملكة العربية السعودية؟",
        options: ["وادي الرمة", "وادي حنيفة", "وادي الدواسر", "وادي بيشة"],
        correct: 0,
        category: "geography",
        difficulty: "hard",
        points: 20,
        explanation: "وادي الرمة هو أطول وادي في المملكة بطول ٦٠٠ كم، يمتد من المدينة المنورة إلى الخليج العربي.",
        reference: "الأطلس الجغرافي السعودي"
    },
    {
        id: 12,
        question: "في أي عام تم توحيد المملكة العربية السعودية باسمها الحالي؟",
        options: ["١٩٣٢م", "١٩٠٢م", "١٩٢٦م", "١٩٤٥م"],
        correct: 0,
        category: "history",
        difficulty: "easy",
        points: 10,
        explanation: "تم توحيد المملكة وإعلانها تحت اسم المملكة العربية السعودية في ٢٣ سبتمبر ١٩٣٢م.",
        reference: "وثيقة إعلان المملكة"
    },
    {
        id: 13,
        question: "ما هي العملة الرسمية للمملكة قبل الريال السعودي؟",
        options: ["الجنيه الذهبي", "الريال الفضي", "القرش", "الجنيه الإنجليزي"],
        correct: 1,
        category: "history",
        difficulty: "medium",
        points: 15,
        explanation: "كان الريال الفضي هو العملة الرسمية قبل إصدار الريال السعودي الورقي عام ١٩٥٢م.",
        reference: "تاريخ العملة السعودية"
    },
    {
        id: 14,
        question: "أي من هذه الجامعات هي الأقدم في المملكة؟",
        options: ["جامعة الملك سعود", "جامعة أم القرى", "جامعة الإمام محمد بن سعود", "جامعة الملك عبدالعزيز"],
        correct: 1,
        category: "culture",
        difficulty: "medium",
        points: 15,
        explanation: "جامعة أم القرى هي أقدم جامعة في المملكة، تأسست عام ١٩٤٩م كمدرسة دار التوحيد.",
        reference: "دليل الجامعات السعودية"
    },
    {
        id: 15,
        question: "ما هو الهدف الاستراتيجي لبرنامج جودة الحياة في رؤية ٢٠٣٠؟",
        options: [
            "رفع تصنيف المملكة في مؤشر السعادة",
            "زيادة نسبة ممارسي الرياضة",
            "تحسين الخدمات الصحية",
            "زيادة المساحات الخضراء"
        ],
        correct: 0,
        category: "vision",
        difficulty: "medium",
        points: 15,
        explanation: "يهدف برنامج جودة الحياة إلى رفع تصنيف المملكة في مؤشر السعادة العالمية.",
        reference: "برنامج جودة الحياة - رؤية ٢٠٣٠"
    }
];

// بيانات الإنجازات
const achievementsList = [
    {
        id: 'quiz_streak_3',
        name: 'التواصل المستمر',
        description: 'أكمل ٣ اختبارات يومية متتالية',
        icon: 'fas fa-fire',
        points: 75,
        target: 3,
        type: 'streak'
    },
    {
        id: 'category_master_history',
        name: 'خبير التاريخ',
        description: 'أجب بشكل صحيح على ٢٠ سؤالاً في فئة التاريخ',
        icon: 'fas fa-landmark',
        points: 100,
        target: 20,
        type: 'category',
        category: 'history'
    },
    {
        id: 'perfect_score',
        name: 'الكمال',
        description: 'احصل على نتيجة ١٠٠٪ في اختبار يومي',
        icon: 'fas fa-crown',
        points: 200,
        target: 1,
        type: 'perfect'
    },
    {
        id: 'speed_demon',
        name: 'سرعة البرق',
        description: 'أكمل اختباراً في أقل من دقيقتين',
        icon: 'fas fa-bolt',
        points: 150,
        target: 120, // ثانيتين
        type: 'speed'
    },
    {
        id: 'social_butterfly',
        name: 'المشارك الاجتماعي',
        description: 'شارك ٥ نتائج على وسائل التواصل',
        icon: 'fas fa-share-alt',
        points: 50,
        target: 5,
        type: 'social'
    }
];

// تصدير البيانات
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QuizManager,
        additionalQuestions,
        achievementsList,
        formatTime,
        calculateLevel,
        getNextLevelPoints
    };
}