import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  color?: 'warm' | 'blue' | 'green' | 'purple';
  onClick?: () => void;
}

export default function QuickActionButton({
  icon: Icon,
  label,
  color = 'warm',
  onClick,
}: QuickActionButtonProps) {
  const colorClasses = {
    warm: 'bg-warm-100 text-warm-600 hover:bg-warm-200',
    blue: 'bg-soft-blue/10 text-soft-blue hover:bg-soft-blue/20',
    green: 'bg-soft-green/10 text-soft-green hover:bg-soft-green/20',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200',
        'hover:shadow-md active:scale-95',
        colorClasses[color]
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}