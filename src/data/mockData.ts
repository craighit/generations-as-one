import type { FamilyMember, Expert, MemoryRecord, TimelineEvent, FamilyValue, FamilyGoal } from '@/types';

// 家庭成员 Mock 数据
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: '爸爸',
    relationship: '爸爸',
    ageGroup: '60后',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a warm smiling Chinese father in his 60s, gentle expression, family portrait style, soft lighting&image_size=square_hd',
    similarity: 92,
    createdAt: new Date('2026-01-15'),
    lastInteraction: new Date('2026-07-01'),
    description: '典型的60后，当过兵，现在退休了，爱下棋',
  },
  {
    id: '2',
    name: '妈妈',
    relationship: '妈妈',
    ageGroup: '60后',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a warm smiling Chinese mother in her 60s, caring expression, family portrait style, soft lighting&image_size=square_hd',
    similarity: 87,
    createdAt: new Date('2026-01-15'),
    lastInteraction: new Date('2026-06-30'),
    description: '温柔体贴，喜欢做饭，总是担心孩子们吃不好',
  },
  {
    id: '3',
    name: '奶奶',
    relationship: '奶奶',
    ageGroup: '40后',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a warm smiling Chinese grandmother in her 80s, loving expression, family portrait style, soft lighting&image_size=square_hd',
    similarity: 76,
    createdAt: new Date('2026-02-10'),
    lastInteraction: new Date('2026-06-28'),
    description: '慈祥的老人，喜欢给孙辈讲故事',
  },
];

// 专家 Mock 数据
export const mockExperts: Expert[] = [
  {
    id: 'e1',
    name: '学习辅导员',
    specialty: '学习辅导',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a professional friendly tutor, educational setting, warm colors, soft lighting&image_size=square_hd',
    description: '帮助孩子制定学习计划、解答学业疑惑',
  },
  {
    id: 'e2',
    name: '心理陪伴师',
    specialty: '心理陪伴',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a compassionate counselor with warm smile, therapy room setting, soft lighting, supportive expression&image_size=square_hd',
    description: '倾听家庭困扰、提供心理支持和建议',
  },
  {
    id: 'e3',
    name: '家庭理财顾问',
    specialty: '家庭理财',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a professional financial advisor, friendly, modern office, trustworthy expression, soft lighting&image_size=square_hd',
    description: '帮助家庭规划财务、制定理财策略',
  },
  {
    id: 'e4',
    name: '亲子关系指导',
    specialty: '亲子关系',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a family counselor specializing in parent-child relationships, warm and understanding expression, soft lighting&image_size=square_hd',
    description: '改善亲子沟通、化解代际冲突',
  },
  {
    id: 'e5',
    name: '婚姻咨询师',
    specialty: '婚姻咨询',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a marriage counselor, empathetic expression, comfortable counseling room, soft lighting&image_size=square_hd',
    description: '帮助夫妻沟通、化解婚姻矛盾',
  },
];

// 今日一问 Mock 数据
export const mockTodayQuestion = {
  id: 'q1',
  question: '今天妈妈做了什么让你印象深刻的事？',
  date: new Date('2026-07-01'),
};

// 时光走廊事件 Mock 数据
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 't1',
    date: new Date('2026-06-20'),
    title: '端午节全家团聚',
    description: '大家一起包粽子，奶奶教孩子们传统包法',
    type: 'event',
    photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a happy Chinese family gathering for Dragon Boat Festival, making zongzi together, warm atmosphere&image_size=landscape_4_3',
    participants: ['爸爸', '妈妈', '奶奶', '小明'],
  },
  {
    id: 't2',
    date: new Date('2026-05-15'),
    title: '爸爸退休庆祝',
    description: '为爸爸准备了退休庆祝晚餐，全家团聚',
    type: 'milestone',
    photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a retirement celebration dinner for a Chinese father, family gathering, warm and joyful atmosphere&image_size=landscape_4_3',
    participants: ['爸爸', '妈妈', '小明'],
  },
  {
    id: 't3',
    date: new Date('2026-03-08'),
    title: '三八节给妈妈的惊喜',
    description: '孩子们准备了鲜花和手工礼物',
    type: 'event',
    photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Children giving flowers and handmade gifts to their Chinese mother on Womens Day, touching moment, soft lighting&image_size=landscape_4_3',
    participants: ['妈妈', '小明'],
  },
  {
    id: 't4',
    date: new Date('2026-01-01'),
    title: '新年家庭合影',
    description: '在新年第一天拍摄了全家福',
    type: 'photo',
    photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a happy Chinese family portrait on New Year, traditional celebration atmosphere, warm lighting&image_size=landscape_4_3',
    participants: ['爸爸', '妈妈', '奶奶', '小明'],
  },
];

// 家庭价值观 Mock 数据
export const mockFamilyValues: FamilyValue[] = [
  {
    id: 'v1',
    title: '家庭和睦',
    content: '家和万事兴，相互理解、包容是家庭的基石',
    createdAt: new Date('2026-02-01'),
    agreedBy: ['爸爸', '妈妈', '奶奶', '小明'],
  },
  {
    id: 'v2',
    title: '诚实守信',
    content: '做人要诚实，做事要守信，这是长辈教给我们的道理',
    createdAt: new Date('2026-03-01'),
    agreedBy: ['爸爸', '妈妈', '小明'],
  },
  {
    id: 'v3',
    title: '勤俭节约',
    content: '不浪费，懂得珍惜每一份资源和劳动成果',
    createdAt: new Date('2026-04-01'),
    agreedBy: ['奶奶', '爸爸', '妈妈'],
  },
];

// 共同目标 Mock 数据
export const mockFamilyGoals: FamilyGoal[] = [
  {
    id: 'g1',
    title: '今年一起去海南旅行',
    description: '全家一起去海南度假，享受阳光沙滩',
    targetDate: new Date('2026-10-01'),
    status: 'planning',
    participants: ['爸爸', '妈妈', '奶奶', '小明'],
  },
  {
    id: 'g2',
    title: '每周家庭聚餐',
    description: '保持每周至少一次全家一起吃饭的习惯',
    status: 'ongoing',
    participants: ['爸爸', '妈妈', '小明'],
  },
];

// 记忆记录 Mock 数据
export const mockMemoryRecords: MemoryRecord[] = [
  {
    id: 'm1',
    memberId: '1',
    type: 'daily',
    content: '爸爸今天说"做人要踏实，不要急功近利"',
    timestamp: new Date('2026-06-28'),
    visibility: 'public',
    tags: ['人生道理', '父亲的教导'],
    title: '人生教导',
  },
  {
    id: 'm2',
    memberId: '2',
    type: 'event',
    content: '妈妈今天特意做了我爱吃的红烧肉，说工作辛苦要补补',
    timestamp: new Date('2026-06-25'),
    visibility: 'public',
    tags: ['关爱', '美食', '母爱'],
    title: '妈妈的关怀',
  },
];