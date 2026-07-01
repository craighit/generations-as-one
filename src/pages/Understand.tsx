import { useState } from 'react';
import {
  ArrowLeftRight,
  MessageSquare,
  BookOpen,
  HeartHandshake,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFamilyStore } from '@/store';

type TabType = 'perspective' | 'simulate' | 'bridge' | 'conflict' | 'guardian';

export default function Understand() {
  const [activeTab, setActiveTab] = useState<TabType>('perspective');
  const { members } = useFamilyStore();

  const tabs = [
    { id: 'perspective', label: '角色互换', icon: ArrowLeftRight },
    { id: 'simulate', label: '沟通模拟', icon: MessageSquare },
    { id: 'bridge', label: '代际桥', icon: BookOpen },
    { id: 'conflict', label: '冲突调解', icon: HeartHandshake },
    { id: 'guardian', label: '家长监护', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-text-primary">理解工坊</h1>
        <p className="text-sm text-text-muted mt-1">通过互动实现真正的相互理解</p>
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
        {activeTab === 'perspective' && <PerspectiveSection members={members} />}
        {activeTab === 'simulate' && <SimulateSection members={members} />}
        {activeTab === 'bridge' && <BridgeSection />}
        {activeTab === 'conflict' && <ConflictSection />}
        {activeTab === 'guardian' && <GuardianSection />}
      </div>
    </div>
  );
}

function PerspectiveSection({ members }: { members: ReturnType<typeof useFamilyStore.getState>['members'] }) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    { id: 's1', title: '妈妈又催婚了', desc: '理解妈妈催婚背后的担心' },
    { id: 's2', title: '爸爸不支持换工作', desc: '理解爸爸的稳定焦虑' },
    { id: 's3', title: '奶奶觉得年轻人不孝顺', desc: '理解代际观念差异' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <h3 className="font-medium text-text-primary mb-2">角色互换体验</h3>
        <p className="text-sm text-text-secondary">
          站在对方的角度，理解TA为什么这么想。"如果我是爸爸/妈妈，我会怎么想？"
        </p>
      </div>

      {!selectedScenario ? (
        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-all text-left animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h4 className="font-semibold text-text-primary">{scenario.title}</h4>
              <p className="text-sm text-text-secondary mt-1">{scenario.desc}</p>
              <ChevronRight className="w-5 h-5 text-warm-500 mt-3" />
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-fade-in">
          {/* Perspective Comparison */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Your Perspective */}
            <div className="bg-soft-blue/10 rounded-2xl p-5 border border-soft-blue/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-soft-blue/20 flex items-center justify-center">
                  <span className="text-soft-blue font-semibold text-sm">我</span>
                </div>
                <h4 className="font-medium text-text-primary">你的视角（28岁女儿）</h4>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong className="text-text-primary">感受：</strong>被催促、被控制、不被理解</li>
                <li>• <strong className="text-text-primary">想法：</strong>我的人生我做主、结婚不是必选项</li>
                <li>• <strong className="text-text-primary">行为：</strong>敷衍、转移话题、有时顶嘴</li>
              </ul>
            </div>

            {/* Their Perspective */}
            <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-warm-200 flex items-center justify-center overflow-hidden">
                  <img src={members[1]?.avatar} alt="妈妈" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-text-primary">妈妈的视角（55岁妈妈）</h4>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• <strong className="text-text-primary">感受：</strong>焦虑、担心、怕你老了孤单</li>
                <li>• <strong className="text-text-primary">想法：</strong>女孩子年纪大了不好找、趁我还能帮你带孩子</li>
                <li>• <strong className="text-text-primary">行为：</strong>反复提、托人介绍、看你烦也得说</li>
              </ul>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
            <h4 className="font-medium text-text-primary mb-3">💡 AI分析</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-warm-500">🎯</span>
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">核心矛盾：</strong>你的「自主需求」vs 她的「安全需求」
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-soft-green">💡</span>
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">理解点：</strong>她的催婚本质是爱与担心，不是控制
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-soft-blue">🤝</span>
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">沟通建议：</strong>先共情她的担心，再讲你的规划
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedScenario(null)}
            className="mt-4 px-4 py-2 bg-warm-100 rounded-lg text-sm text-warm-600 hover:bg-warm-200 transition-colors"
          >
            返回场景选择
          </button>
        </div>
      )}
    </div>
  );
}

function SimulateSection({ members }: { members: ReturnType<typeof useFamilyStore.getState>['members'] }) {
  const [messages] = useState([
    { role: 'user', content: '爸，我不想考公务员了，我想去互联网公司。' },
    { role: 'ai', content: '什么？！胡闹！公务员多稳定啊！你是不是疯了！', sender: '爸爸' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <h3 className="font-medium text-text-primary mb-2">沟通模拟器</h3>
        <p className="text-sm text-text-secondary">
          模拟一次困难对话，提前练习怎么说。可以选择不同的家庭成员进行模拟。
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-warm-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={members[0]?.avatar} alt="爸爸" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-medium text-text-primary">模拟爸爸</p>
            <p className="text-xs text-soft-green">AI模拟视角</p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-3 animate-slide-up',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={members[0]?.avatar} alt="爸爸" className="w-full h-full object-cover" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[70%] px-4 py-2 rounded-xl',
                  msg.role === 'user'
                    ? 'bg-warm-500 text-white'
                    : 'bg-warm-100 text-text-primary'
                )}
              >
                {msg.role === 'ai' && msg.sender && (
                  <p className="text-xs text-text-muted mb-1">{msg.sender}：</p>
                )}
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Analysis */}
        <div className="p-4 bg-warm-50 border-t border-warm-100">
          <div className="flex items-start gap-2">
            <span className="text-warm-500">⚠️</span>
            <div>
              <p className="text-sm font-medium text-text-primary">沟通效果分析</p>
              <p className="text-xs text-text-secondary mt-1">
                太直接，触发了他的「安全焦虑」。建议：先铺垫，再讲你的理由，最后给他安全感。
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-warm-100">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="输入你的回应..."
              className="flex-1 px-4 py-2 rounded-xl border border-warm-200 focus:border-warm-500 focus:outline-none text-sm"
            />
            <button className="px-4 py-2 bg-warm-500 text-white rounded-xl hover:bg-warm-600 transition-colors text-sm font-medium">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BridgeSection() {
  const questions = [
    { q: '我爸为什么总觉得网上的东西都是骗人的？', category: '代际观念' },
    { q: '我女儿为什么总点外卖，不会自己做饭吗？', category: '生活方式' },
    { q: '奶奶为什么总说年轻人不懂事？', category: '代际沟通' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <h3 className="font-medium text-text-primary mb-2">代际桥问答</h3>
        <p className="text-sm text-text-secondary">
          关于对方那代人的"翻译官"。理解不同年代人的思维方式、价值观差异。
        </p>
      </div>

      <div className="grid gap-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 hover:shadow-md transition-shadow animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-warm-500" />
              <div className="flex-1">
                <p className="font-medium text-text-primary">{item.q}</p>
                <span className="text-xs text-text-muted">{item.category}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-warm-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConflictSection() {
  return (
    <div className="space-y-6">
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <h3 className="font-medium text-text-primary mb-2">冲突调解室</h3>
        <p className="text-sm text-text-secondary">
          AI扮演中立调解者，分析家庭冲突并提供修复建议。帮助双方理解对方的立场。
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
        <h4 className="font-medium text-text-primary mb-4">最近一次冲突</h4>
        <div className="p-4 bg-warm-50 rounded-xl">
          <p className="font-medium text-text-primary">📍 冲突事件</p>
          <p className="text-sm text-text-secondary mt-1">要不要换工作</p>
        </div>
        
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <div className="p-4 bg-soft-blue/10 rounded-xl">
            <p className="text-sm font-medium text-text-primary">😔 你的委屈</p>
            <p className="text-sm text-text-secondary mt-1">不被理解、不被支持</p>
          </div>
          <div className="p-4 bg-warm-100 rounded-xl">
            <p className="text-sm font-medium text-text-primary">😔 他的委屈</p>
            <p className="text-sm text-text-secondary mt-1">担心你、怕你吃苦</p>
          </div>
        </div>

        <div className="p-4 bg-soft-green/10 rounded-xl mt-4">
          <p className="text-sm font-medium text-soft-green">🎯 共同点：都是为了你好</p>
          <p className="text-sm text-text-secondary mt-1">表达方式不对，需要找到双方都能接受的方式</p>
        </div>
      </div>
    </div>
  );
}

function GuardianSection() {
  return (
    <div className="space-y-6">
      <div className="bg-warm-100 rounded-2xl p-5 border border-warm-200">
        <h3 className="font-medium text-text-primary mb-2">家长监护台</h3>
        <p className="text-sm text-text-secondary">
          家长可管理未成年人账户，编辑其信息；未成年人独立时转移所有数据。
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center">
            <Shield className="w-8 h-8 text-warm-500" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">监护人信息</h4>
            <p className="text-sm text-text-secondary">您是家庭中的监护人角色</p>
          </div>
        </div>

        <div className="p-4 bg-warm-50 rounded-xl mb-4">
          <p className="text-sm font-medium text-text-primary">被监护人</p>
          <p className="text-xs text-text-muted mt-1">目前没有需要监护的未成年人账户</p>
        </div>

        <button className="w-full py-3 bg-warm-500 text-white rounded-xl hover:bg-warm-600 transition-colors font-medium">
          添加未成年人账户
        </button>
      </div>
    </div>
  );
}