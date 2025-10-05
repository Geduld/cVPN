import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { VpnStatus } from '@/hooks/useVpnStatus';
import { cn } from '@/lib/utils';

interface VpnStatusIndicatorProps {
  status: VpnStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const VpnStatusIndicator = ({ status, size = 'md' }: VpnStatusIndicatorProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'secure':
        return {
          icon: ShieldCheck,
          className: 'status-secure',
          label: 'Secure',
        };
      case 'connecting':
        return {
          icon: Shield,
          className: 'status-connecting',
          label: 'Connecting',
        };
      case 'vulnerable':
        return {
          icon: ShieldAlert,
          className: 'status-vulnerable',
          label: 'Vulnerable',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        'status-indicator flex items-center justify-center',
        sizeClasses[size],
        config.className
      )}>
        <Icon className={cn('text-background font-bold', iconSizeClasses[size])} strokeWidth={3} />
      </div>
      <span className={cn('font-semibold text-foreground', textSizeClasses[size])}>
        {config.label}
      </span>
    </div>
  );
};