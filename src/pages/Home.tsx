import { useState } from 'react';
import { Mic, MessageSquare, Heart, Users, BookOpen, Sparkles } from 'lucide-react';
import FamilyMemberAvatar from '@/components/FamilyMemberAvatar';
import QuickActionButton from '@/components/QuickActionButton';
import TodayQuestionCard from '@/components/TodayQuestionCard';
import { useFamilyStore } from '@/store';
import { mockTodayQuestion } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Home() {
  const { members } = useFamilyStore();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  });

  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date('2026-01-15').getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">
          {greeting}，小明 👋
        </h1>
        <p className="text-sm text-text-muted mt-1">
          今天是和家人的第 {daysSinceStart} 天
        </p>
      </div>

      {/* Family Members Section */}
      <section>
        <h2 className="text-lg font-medium text-text-primary mb-4">我的家人</h2>
        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FamilyMemberAvatar
                member={member}
                size="lg"
                onClick={() => {
                  console.log('Clicked:', member.name);
                }}
                onLongPress={() => {
                  console.log('Long pressed:', member.name);
                }}
              />
            </div>
          ))}
          
          {/* Add Member Button */}
          <div
            className={cn(
              'flex flex-col items-center gap-2 animate-slide-up',
              'cursor-pointer group'
            )}
            style={{ animationDelay: `${members.length * 100}ms` }}
          >
            <div className="w-24 h-24 rounded-full border-3 border-dashed border-warm-300 flex items-center justify-center bg-warm-50 hover:bg-warm-100 transition-colors">
              <Sparkles className="w-8 h-8 text-warm-400 group-hover:text-warm-500 transition-colors" />
            </div>
            <p className="text-sm font-medium text-text-muted group-hover:text-text-primary">
              添加家人
            </p>
          </div>
        </div>
      </section>

      {/* Today Question */}
      <section>
        <TodayQuestionCard question={mockTodayQuestion.question} />
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-medium text-text-primary mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickActionButton icon={Mic} label="点滴记录" color="warm" />
          <QuickActionButton icon={Heart} label="角色互换" color="green" />
          <QuickActionButton icon={MessageSquare} label="对话" color="blue" />
          <QuickActionButton icon={Users} label="家庭空间" color="warm" />
          <QuickActionButton icon={BookOpen} label="代际桥" color="purple" />
          <QuickActionButton icon={Sparkles} label="洞察" color="blue" />
        </div>
      </section>

      {/* Recent Activities */}
      <section className="hidden lg:block">
        <h2 className="text-lg font-medium text-text-primary mb-4">最近互动</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.slice(0, 2).map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-warm-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">与{member.name}对话</p>
                  <p className="text-sm text-text-muted">上次互动：{formatDate(member.lastInteraction)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-secondary line-clamp-2">
                {member.description || '还没有记录点滴'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diff === 0) return '今天';
  if (diff === 1) return '昨天';
  if (diff < 7) return `${diff}天前`;
  
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}