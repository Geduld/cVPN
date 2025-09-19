import { useVpnStatus } from '@/hooks/useVpnStatus';
import { VpnStatusIndicator } from './VpnStatusIndicator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, MapPin, Wifi, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VpnStatusApp = () => {
  const { status, ipInfo, lastChecked, isLoading, error, refresh } = useVpnStatus(10000);

  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getLocationText = () => {
    if (!ipInfo) return 'Unknown';
    return `${ipInfo.city}, ${ipInfo.country}`;
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'secure':
        return 'VPN is active and protecting your connection';
      case 'connecting':
        return 'Checking VPN status...';
      case 'vulnerable':
        return 'Warning: Your real IP is exposed!';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-bg flex items-center justify-center">
      <div className="w-full h-full bg-card/90 backdrop-blur-sm border-none">
        <div className="p-3 h-full flex flex-col justify-between">
          {/* Header with Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VpnStatusIndicator status={status} size="md" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={isLoading}
              className="h-6 w-6 p-0 hover:bg-primary/20"
            >
              <RefreshCw className={cn(
                'w-3 h-3',
                isLoading && 'animate-spin'
              )} />
            </Button>
          </div>

          {/* Connection Details */}
          <div className="flex-1 flex items-center justify-between text-xs">
            <div className="space-y-1">
              {ipInfo && (
                <>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span className="text-foreground truncate max-w-[120px]">{getLocationText()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-accent" />
                    <span className="text-foreground font-mono text-xs">{ipInfo.ip}</span>
                  </div>
                </>
              )}

              {error && (
                <div className="text-xs text-destructive bg-destructive/10 p-1 rounded text-[10px]">
                  Connection error
                </div>
              )}
            </div>

            <div className="text-right space-y-1">
              <div className="text-muted-foreground text-[10px]">
                {formatTime(lastChecked)}
              </div>
              <div className="flex justify-end">
                <span className={cn(
                  'w-2 h-2 rounded-full',
                  isLoading ? 'bg-status-connecting animate-pulse' : 'bg-accent'
                )} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};