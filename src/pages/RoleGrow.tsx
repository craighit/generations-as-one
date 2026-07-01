import { useState } from 'react';
import {
  Mic,
  MessageSquarePlus,
  Calendar,
  Camera,
  Users,
  Sparkles,
  Lock,
  ChevronRight,
  Plus,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFamilyStore } from '@/store';
import { mockMemoryRecords } from '@/data/mockData';
import FamilyMemberAvatar from '@/components/FamilyMemberAvatar';

type TabType = 'roles' | 'records' | 'insights' | 'private';

export default function RoleGrow() {
  const [activeTab, setActiveTab] = useState<TabType>('roles');
  const { members } = useFamilyStore();

  const tabs = [
    { id: 'roles', label: '角色列表', icon: Users },
    { id: 'records', label: '点滴记录', icon: Mic },
    { id: 'insights', label: '性格洞察', icon: Sparkles },
    { id: 'private', label: '私密空间', icon: Lock },
  ];

  const recordTypes = [
    { icon: Mic, label: '语音速记', color: 'warm', desc: '长按录音，轻松记录' },
    { icon: MessageSquarePlus, label: '聊天导入', color: 'blue', desc: '导入微信聊天记录' },
    { icon: Calendar, label: '事件记录', color: 'green', desc: '记录重要家庭事件' },
    { icon: Camera, label: '照片记忆', color: 'purple', desc: '上传照片，记录故事' },
    { icon: Users, label: 'AI采访', color: 'warm', desc: 'AI引导式采访' },
    { icon: Sparkles, label: '日常签到', color: 'blue', desc: '每日一问，轻松回答' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">角色养成</h1>
        <p className="text-sm text-text-muted mt-1">让AI角色越来越像真实的家人</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-warm-50 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
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
        {activeTab === 'roles' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <FamilyMemberAvatar member={member} size="md" />
                  <div className="flex-1">
                    <p className="text-xs text-text-muted">{member.ageGroup}</p>
                    <p className="text-sm text-text-secondary line-clamp-1">{member.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
                <div className="mt-4 pt-4 border-t border-warm-100 flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    创建于 {new Date(member.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                  <button className="px-3 py-1 bg-warm-100 rounded-lg text-sm text-warm-600 hover:bg-warm-200 transition-colors">
                    对话
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add Role Button */}
            <div
              className="bg-warm-50 rounded-2xl p-5 border-2 border-dashed border-warm-200 hover:bg-warm-100 transition-colors cursor-pointer animate-slide-up flex items-center justify-center"
              style={{ animationDelay: `${members.length * 100}ms` }}
            >
              <div className="flex flex-col items-center gap-2">
                <Plus className="w-8 h-8 text-warm-300" />
                <p className="text-sm text-text-muted">添加家庭成员</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-6">
            {/* Record Type Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recordTypes.map((type, index) => (
                <button
                  key={type.label}
                  className={cn(
                    'flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200 animate-slide-up',
                    'hover:shadow-md active:scale-95',
                    type.color === 'warm' && 'bg-warm-100 text-warm-600 hover:bg-warm-200',
                    type.color === 'blue' && 'bg-soft-blue/10 text-soft-blue hover:bg-soft-blue/20',
                    type.color === 'green' && 'bg-soft-green/10 text-soft-green hover:bg-soft-green/20',
                    type.color === 'purple' && 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <type.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{type.label}</span>
                  <span className="text-xs text-text-muted">{type.desc}</span>
                </button>
              ))}
            </div>

            {/* Recent Records */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">最近记录</h3>
              <div className="grid gap-3">
                {mockMemoryRecords.map((record, index) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-warm-100 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warm-100 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-warm-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{record.title}</p>
                        <p className="text-sm text-text-secondary mt-1">{record.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-text-muted">
                            {new Date(record.timestamp).toLocaleDateString('zh-CN')}
                          </span>
                          {record.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-warm-50 rounded text-xs text-warm-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
              <h3 className="text-lg font-medium text-text-primary mb-4">本周洞察</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {members.slice(0, 2).map((member) => (
                  <div key={member.id} className="p-4 bg-warm-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{member.name}</p>
                        <p className="text-xs text-soft-green">相似度 {member.similarity}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {member.name}最近表现出强烈的关爱倾向，经常主动询问子女的生活状态...
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center p-8 bg-warm-50 rounded-2xl">
              <Sparkles className="w-12 h-12 text-warm-300 mx-auto mb-3" />
              <p className="text-text-muted">积累更多点滴记录，获得更深入的性格洞察</p>
            </div>
          </div>
        )}

        {activeTab === 'private' && (
          <div className="space-y-6">
            <div className="bg-warm-100 rounded-2xl p-6 border border-warm-200">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-warm-600" />
                <h3 className="text-lg font-medium text-text-primary">私密空间</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                这里是你的私密空间，只有你能看到。AI会使用这些信息更好地理解你，但不会影响其他家人的AI版本。
              </p>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                私密功能不是"隐瞒"，而是让你敢于真实记录。有了私密功能，系统才是"真正的理解工具"。
              </p>
            </div>
            
            <div className="grid gap-3">
              <button className="w-full p-4 bg-white rounded-xl shadow-sm border border-warm-100 text-left hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">私密日记</p>
                    <p className="text-sm text-text-muted">记录真实想法和感受</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted ml-auto" />
                </div>
              </button>
              
              <button className="w-full p-4 bg-white rounded-xl shadow-sm border border-warm-100 text-left hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-soft-blue/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-soft-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">情感树洞</p>
                    <p className="text-sm text-text-muted">倾诉烦恼和困扰</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted ml-auto" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}