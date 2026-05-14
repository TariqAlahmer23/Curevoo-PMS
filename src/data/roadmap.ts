import type { SprintRecord, TeamMember } from '../types'

export const teamMembers: TeamMember[] = [
  {
    id: 'tariq-alahmar',
    name: 'طارق الأحمر',
    role: 'مسؤول الكشف المبكر بالذكاء الاصطناعي',
    responsibility: 'الكشف المبكر'
  },
  {
    id: 'mohammad-zaeir',
    name: 'محمد زعير',
    role: 'مسؤول نموذج المقاومة بالذكاء الاصطناعي',
    responsibility: 'المقاومة'
  },
  {
    id: 'osama-ratla',
    name: 'أسامة رطلة',
    role: 'مطور Backend',
    responsibility: 'تنفيذ سبرنتات الباك اند'
  },
  {
    id: 'yazan-alhajjar',
    name: 'يزن الحجار',
    role: 'مطور Frontend',
    responsibility: 'تنفيذ سبرنتات الفرونت اند'
  },
  {
    id: 'mohammad-mustafa',
    name: 'محمد مصطفى',
    role: 'مسؤول Deployment & Security',
    responsibility: 'النشر والحماية'
  }
]

const roadmapPhases = [
  {
    num: 1,
    phase: 'مرحلة الأساس',
    goal: 'بناء نظام مستخدمين مستقر مع أدوات يومية أساسية.',
    tasks: ['الحسابات', 'تسجيل الدخول', 'ملف المريض', 'ملف الطبيب', 'المذكرة', 'الإعدادات']
  },
  {
    num: 2,
    phase: 'مرحلة الاكتشاف',
    goal: 'تمكين المريض من استكشاف الأطباء قبل الحجز.',
    tasks: ['اختيار معالج مناسب', 'البحث والتصفية', 'عرض ملفات الأطباء', 'إدارة الأوقات المتاحة', 'عرض الأوقات للمريض']
  },
  {
    num: 3,
    phase: 'مرحلة الحجز',
    goal: 'تفعيل دورة الحجز كقيمة أساسية أولى.',
    tasks: ['حجز موعد مع الطبيب', 'تسجيل المريض مع المعالج', 'إضافة الموعد لجدول الطبيب', 'عرض المواعيد للمريض', 'عرض المواعيد للطبيب']
  },
  {
    num: 4,
    phase: 'مرحلة الجلسات',
    goal: 'تمكين الجلسات العلاجية داخل النظام.',
    tasks: ['ربط المريض بالمختص', 'بدء الجلسة', 'إرسال الرسائل', 'إنهاء الجلسة']
  },
  {
    num: 5,
    phase: 'مرحلة العلاج السريري',
    goal: 'إدارة الخطة العلاجية بطريقة سريرية منظمة.',
    tasks: ['طلب ملف المريض', 'عرض ملف المريض', 'كتابة الملاحظات', 'تعديل الخطة العلاجية', 'إرسال رسالة للمريض']
  },
  {
    num: 6,
    phase: 'مرحلة الرعاية اليومية',
    goal: 'تحويل العلاج إلى رحلة يومية مستمرة.',
    tasks: ['أدوات تحسين المزاج', 'المهام اليومية', 'التمارين العلاجية']
  },
  {
    num: 7,
    phase: 'مرحلة الدعم',
    goal: 'تعزيز الدعم النفسي غير السريري.',
    tasks: ['التأمل', 'قصص النجاح']
  },
  {
    num: 8,
    phase: 'مرحلة الطوارئ',
    goal: 'التعامل الآمن مع الحالات الحرجة.',
    tasks: ['واجهة الطوارئ', 'خطط الأمان', 'إرسال إشعار للمختص']
  },
  {
    num: 10,
    phase: 'مرحلة الإدارة',
    goal: 'تشغيل المنصة وإدارتها بشكل احترافي.',
    tasks: ['تسجيل دخول المشرف', 'إنشاء حساب مشرف', 'إدارة المستخدمين', 'إدارة الصلاحيات', 'حظر مستخدم', 'عرض تفاصيل المستخدم']
  }
]

const mkTask = (id: string, title: string, assignedTo: string) => ({
  id,
  title,
  assignedTo,
  status: 'pending' as const,
  completedAt: null,
  note: ''
})

const backendSprints: SprintRecord[] = roadmapPhases.map((phase) => ({
  id: `backend-s${phase.num}`,
  title: `سبرنت ${phase.num} - Backend`,
  phase: phase.phase,
  goal: phase.goal,
  track: 'backend',
  assignedTo: ['osama-ratla'],
  tasks: phase.tasks.map((task, i) => mkTask(`be-${phase.num}-${i + 1}`, `بناء APIs ${task}`, 'osama-ratla'))
}))

const frontendSprints: SprintRecord[] = roadmapPhases.map((phase) => ({
  id: `frontend-s${phase.num}`,
  title: `سبرنت ${phase.num} - Frontend`,
  phase: phase.phase,
  goal: phase.goal,
  track: 'frontend',
  assignedTo: ['yazan-alhajjar'],
  tasks: phase.tasks.map((task, i) => mkTask(`fe-${phase.num}-${i + 1}`, `واجهة ${task}`, 'yazan-alhajjar'))
}))

const aiSprint: SprintRecord = {
  id: 'ai-s9',
  title: 'سبرنت 9 - الذكاء الاصطناعي',
  phase: 'مرحلة الذكاء الاصطناعي',
  goal: 'إضافة الذكاء إلى رحلة العلاج.',
  track: 'ai',
  assignedTo: ['tariq-alahmar', 'mohammad-zaeir'],
  tasks: [
    mkTask('ai-1', 'ربط الكشف المبكر', 'tariq-alahmar'),
    mkTask('ai-2', 'ربط المقاومة', 'mohammad-zaeir')
  ]
}

const deploymentSprint: SprintRecord = {
  id: 'deployment-1',
  title: 'سبرنت Deployment & Security',
  phase: 'مرحلة النشر والحماية',
  goal: 'تجهيز النظام للإطلاق الآمن.',
  track: 'deployment',
  assignedTo: ['mohammad-mustafa'],
  tasks: [
    mkTask('dep-1', 'تجهيز إعدادات النشر', 'mohammad-mustafa'),
    mkTask('dep-2', 'مراجعة إعدادات الحماية', 'mohammad-mustafa'),
    mkTask('dep-3', 'إعداد متغيرات البيئة', 'mohammad-mustafa'),
    mkTask('dep-4', 'تجهيز نسخة الإنتاج', 'mohammad-mustafa'),
    mkTask('dep-5', 'اختبار جاهزية التشغيل', 'mohammad-mustafa')
  ]
}

export const sprintSeeds: SprintRecord[] = [...backendSprints, ...frontendSprints, aiSprint, deploymentSprint]
