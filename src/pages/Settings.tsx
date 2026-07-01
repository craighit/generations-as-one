import { useState } from 'react';
import {
  Lock,
  Download,
  Trash2,
  ChevronRight,
  User,
  Shield,
  Bell,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'account',
      icon: User,
      title: '账户管理',
      desc: '个人信息、账户安全',
      items: ['个人信息', '账户安全', '修改密码'],
    },
    {
      id: 'privacy',
      icon: Lock,
      title: '隐私设置',
      desc: '数据可见范围、私密空间设置',
      items: ['默认可见范围', '私密空间管理', '数据安全说明'],
    },
    {
      id: 'guardian',
      icon: Shield,
      title: '监护管理',
      desc: '家长监护权限、未成年人管理',
      items: ['监护权限', '数据转移', '独立申请'],
    },
    {
      id: 'notification',
      icon: Bell,
      title: '通知设置',
      desc: '消息提醒、提醒频率',
      items: ['今日一问提醒', '洞察报告提醒', '家庭活动提醒'],
    },
    {
      id: 'data',
      icon: Download,
      title: '数据管理',
      desc: '导出数据、删除数据',
      items: ['导出所有数据', '导出特定数据', '数据删除'],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">设置</h1>
        <p className="text-sm text-text-muted mt-1">管理你的账户、隐私和数据</p>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warm-500 to-warm-600 flex items-center justify-center text-white font-semibold text-xl">
            小
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">小明</h3>
            <p className="text-sm text-text-muted">xiaoming@email.com</p>
            <p className="text-xs text-soft-green mt-1">家庭成员</p>
          </div>
          <button className="ml-auto px-4 py-2 bg-warm-100 rounded-xl text-sm text-warm-600 hover:bg-warm-200 transition-colors">
            编辑资料
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full p-5 flex items-center gap-4 hover:bg-warm-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-warm-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{section.title}</h3>
                <p className="text-sm text-text-muted">{section.desc}</p>
              </div>
              <ChevronRight
                className={cn(
                  'w-5 h-5 text-text-muted transition-transform',
                  activeSection === section.id && 'rotate-90'
                )}
              />
            </button>

            {/* Expanded Items */}
            {activeSection === section.id && (
              <div className="px-5 pb-4 animate-fade-in">
                <div className="border-t border-warm-100 pt-4 space-y-2">
                  {section.items.map((item, i) => (
                    <button
                      key={i}
                      className="w-full px-4 py-3 bg-warm-50 rounded-xl text-left text-sm text-text-primary hover:bg-warm-100 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Privacy Info Card */}
      <div className="bg-warm-100 rounded-2xl p-6 border border-warm-200">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-warm-600" />
          <h3 className="font-medium text-text-primary">隐私保障</h3>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-center gap-2">
            <span className="text-soft-green">✓</span>
            私密数据使用用户专属密钥加密存储
          </li>
          <li className="flex items-center gap-2">
            <span className="text-soft-green">✓</span>
            每次API请求都验证用户身份，数据经过权限过滤
          </li>
          <li className="flex items-center gap-2">
            <span className="text-soft-green">✓</span>
            AI处理时明确传入当前用户身份，只访问有权限的数据
          </li>
          <li className="flex items-center gap-2">
            <span className="text-soft-green">✓</span>
            所有数据访问记录到审计日志
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <button className="w-full flex items-center justify-center gap-2 py-4 bg-warm-50 rounded-2xl text-text-muted hover:bg-warm-100 transition-colors">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">退出登录</span>
      </button>
    </div>
  );
}