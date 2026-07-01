import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodayQuestionCardProps {
  question: string;
  onAnswer?: () => void;
}

export default function TodayQuestionCard({ question, onAnswer }: TodayQuestionCardProps) {
  return (
    <div className="bg-warm-100 rounded-2xl p-6 shadow-sm animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-warm-200 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-warm-600" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-text-muted mb-1">💭 今日一问</p>
          <p className="text-base font-medium text-text-primary leading-relaxed">{question}</p>
        </div>
      </div>
      
      <button
        onClick={onAnswer}
        className={cn(
          'mt-4 w-full py-3 rounded-xl',
          'bg-warm-500 text-white font-medium',
          'hover:bg-warm-600 transition-colors',
          'active:scale-[0.98]'
        )}
      >
        点击回答
      </button>
    </div>
  );
}