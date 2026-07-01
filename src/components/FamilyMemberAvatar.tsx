import { cn } from '@/lib/utils';
import type { FamilyMember } from '@/types';

interface FamilyMemberAvatarProps {
  member: FamilyMember;
  onClick?: () => void;
  onLongPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function FamilyMemberAvatar({
  member,
  onClick,
  onLongPress,
  size = 'md',
}: FamilyMemberAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  // Long press detection
  let pressTimer: NodeJS.Timeout | null = null;

  const handlePressStart = () => {
    pressTimer = setTimeout(() => {
      if (onLongPress) {
        onLongPress();
      }
    }, 500);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'relative rounded-full overflow-hidden cursor-pointer animate-breathe group',
          sizeClasses[size]
        )}
        onClick={onClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-warm-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs font-medium">点击对话</span>
        </div>
        
        {/* Similarity ring */}
        <div
          className="absolute inset-0 rounded-full border-3 transition-colors"
          style={{
            borderColor:
              member.similarity >= 90 ? '#22C55E' : // 绿色
              member.similarity >= 80 ? '#F97316' : // 橙色
              '#71717A', // 灰色
            borderWidth: '3px',
          }}
        />
      </div>
      
      {/* Name and similarity */}
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{member.name}</p>
        <p
          className={cn(
            'text-xs',
            member.similarity >= 90 ? 'text-soft-green' :
            member.similarity >= 80 ? 'text-warm-500' :
            'text-text-muted'
          )}
        >
          {member.similarity}%相似
        </p>
      </div>
    </div>
  );
}