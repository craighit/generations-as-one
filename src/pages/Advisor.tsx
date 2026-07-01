import { useState } from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useExpertStore } from '@/store';
import { mockExperts } from '@/data/mockData';

export default function Advisor() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const { experts } = useExpertStore();

  // Combine mock data with store data
  const allExperts = experts.length > 0 ? experts : mockExperts;

  const specialtyColors = {
    '学习辅导': 'warm',
    '心理陪伴': 'blue',
    '家庭理财': 'green',
    '婚姻咨询': 'purple',
    '亲子关系': 'warm',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">专家顾问</h1>
        <p className="text-sm text-text-muted mt-1">专业AI专家弥补家庭能力不足</p>
      </div>

      {/* Description Card */}
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <p className="text-sm text-text-secondary leading-relaxed">
          家庭的能力有限，但问题无穷。我们提供专业AI专家角色，帮助家庭解决学习、心理、理财、婚姻、亲子等领域的困惑。
          专家基于心理学和教育学理论，提供科学、实用的建议。
        </p>
      </div>

      {!selectedExpert ? (
        /* Expert List */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allExperts.map((expert, index) => (
            <button
              key={expert.id}
              onClick={() => setSelectedExpert(expert.id)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-all text-left animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{expert.name}</h3>
                  <span
                    className={cn(
                      'inline-block px-2 py-1 rounded-lg text-xs font-medium mt-1',
                      specialtyColors[expert.specialty as keyof typeof specialtyColors] === 'warm' &&
                        'bg-warm-100 text-warm-600',
                      specialtyColors[expert.specialty as keyof typeof specialtyColors] === 'blue' &&
                        'bg-soft-blue/10 text-soft-blue',
                      specialtyColors[expert.specialty as keyof typeof specialtyColors] === 'green' &&
                        'bg-soft-green/10 text-soft-green',
                      specialtyColors[expert.specialty as keyof typeof specialtyColors] === 'purple' &&
                        'bg-purple-100 text-purple-600'
                    )}
                  >
                    {expert.specialty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary">{expert.description}</p>

              {/* Action */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-warm-100">
                <div className="flex items-center gap-2 text-soft-green">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">快速对话</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Expert Chat View */
        <div className="animate-fade-in">
          {/* Expert Header */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-warm-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img
                src={allExperts.find((e) => e.id === selectedExpert)?.avatar}
                alt="专家"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {allExperts.find((e) => e.id === selectedExpert)?.name}
              </h3>
              <p className="text-xs text-text-muted">
                {allExperts.find((e) => e.id === selectedExpert)?.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedExpert(null)}
              className="ml-auto px-3 py-1 bg-warm-100 rounded-lg text-sm text-warm-600 hover:bg-warm-200 transition-colors"
            >
              返回列表
            </button>
          </div>

          {/* Chat Messages */}
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden">
            <div className="p-4 space-y-4 min-h-[300px]">
              {/* Welcome Message */}
              <div className="flex gap-3 animate-slide-up">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={allExperts.find((e) => e.id === selectedExpert)?.avatar}
                    alt="专家"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-warm-100 px-4 py-3 rounded-xl max-w-[80%]">
                  <p className="text-sm text-text-primary">
                    你好！我是{allExperts.find((e) => e.id === selectedExpert)?.name}。
                    有什么困惑或问题可以告诉我，我会尽力帮助你。
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-warm-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="输入你的问题..."
                  className="flex-1 px-4 py-2 rounded-xl border border-warm-200 focus:border-warm-500 focus:outline-none text-sm"
                />
                <button className="px-4 py-2 bg-warm-500 text-white rounded-xl hover:bg-warm-600 transition-colors text-sm font-medium">
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}