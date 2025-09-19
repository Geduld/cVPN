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
    lg: 'w-8 h-8',
  };

  const iconSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
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
    <div className="flex items-center gap-2">
      <div className={cn(
        'status-indicator flex items-center justify-center',
        sizeClasses[size],
        config.className
      )}>
        <Icon className={cn('text-background', iconSizeClasses[size])} />
      </div>
      <span className="text-sm font-medium text-foreground">
        {config.label}
      </span>
    </div>
  );
};