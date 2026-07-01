import { useState } from 'react';
import { Calendar, Heart, Users, Target, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockTimelineEvents, mockFamilyValues, mockFamilyGoals } from '@/data/mockData';

type TabType = 'timeline' | 'values' | 'goals';

export default function FamilySpace() {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');

  const tabs = [
    { id: 'timeline', label: '时光走廊', icon: Calendar },
    { id: 'values', label: '家庭价值观', icon: Heart },
    { id: 'goals', label: '共同目标', icon: Target },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">家庭空间</h1>
        <p className="text-sm text-text-muted mt-1">建立家庭的数字共同体感</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-warm-50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
              activeTab === tab.id
                ? 'bg-warm-500 text-white shadow-sm'
                : 'text-text-secondary hover:bg-warm-100'
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'timeline' && <TimelineSection />}
        {activeTab === 'values' && <ValuesSection />}
        {activeTab === 'goals' && <GoalsSection />}
      </div>
    </div>
  );
}

function TimelineSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {mockTimelineEvents.map((event, index) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-100 hover:shadow-md transition-shadow animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {event.photoUrl && (
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={event.photoUrl}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-text-muted mb-1">
                    {new Date(event.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="font-semibold text-text-primary">{event.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{event.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Users className="w-4 h-4 text-text-muted" />
                <span className="text-xs text-text-muted">
                  {event.participants.join('、')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValuesSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockFamilyValues.map((value, index) => (
        <div
          key={value.id}
          className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-shadow animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-warm-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-warm-500" />
            </div>
            <h3 className="font-semibold text-text-primary">{value.title}</h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{value.content}</p>
          <div className="flex items-center gap-2 mt-4">
            <Users className="w-4 h-4 text-soft-green" />
            <span className="text-xs text-soft-green">
              {value.agreedBy.length}人认同
            </span>
          </div>
        </div>
      ))}
      
      {/* Add Value Button */}
      <div
        className="bg-warm-50 rounded-2xl p-5 border-2 border-dashed border-warm-200 hover:bg-warm-100 transition-colors cursor-pointer animate-slide-up"
        style={{ animationDelay: `${mockFamilyValues.length * 100}ms` }}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
          <Heart className="w-8 h-8 text-warm-300 mb-2" />
          <p className="text-sm text-text-muted">添加新的家庭价值观</p>
        </div>
      </div>
    </div>
  );
}

function GoalsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockFamilyGoals.map((goal, index) => (
        <div
          key={goal.id}
          className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-shadow animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-soft-blue/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-soft-blue" />
              </div>
              <h3 className="font-semibold text-text-primary">{goal.title}</h3>
            </div>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                goal.status === 'ongoing' && 'bg-soft-green/10 text-soft-green',
                goal.status === 'planning' && 'bg-warm-100 text-warm-600',
                goal.status === 'completed' && 'bg-gray-100 text-text-muted'
              )}
            >
              {goal.status === 'ongoing' && '进行中'}
              {goal.status === 'planning' && '计划中'}
              {goal.status === 'completed' && '已完成'}
            </span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{goal.description}</p>
          {goal.targetDate && (
            <p className="text-xs text-text-muted mt-2">
              目标日期：{new Date(goal.targetDate).toLocaleDateString('zh-CN')}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Users className="w-4 h-4 text-text-muted" />
            <span className="text-xs text-text-muted">
              {goal.participants.join('、')}
            </span>
          </div>
        </div>
      ))}
      
      {/* Add Goal Button */}
      <div
        className="bg-warm-50 rounded-2xl p-5 border-2 border-dashed border-warm-200 hover:bg-warm-100 transition-colors cursor-pointer animate-slide-up"
        style={{ animationDelay: `${mockFamilyGoals.length * 100}ms` }}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
          <Target className="w-8 h-8 text-warm-300 mb-2" />
          <p className="text-sm text-text-muted">添加新的家庭目标</p>
        </div>
      </div>
    </div>
  );
}