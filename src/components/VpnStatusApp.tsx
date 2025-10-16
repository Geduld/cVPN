import { useVpnStatus } from '@/hooks/useVpnStatus';
import { VpnStatusIndicator } from './VpnStatusIndicator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, MapPin, Wifi, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VpnStatusApp = () => {
  const { status, ipInfo, lastChecked, isLoading, error, refresh } = useVpnStatus(5000);

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
    <div className="w-full h-full bg-background flex items-center justify-center p-3">
      <div className="w-full h-full bg-card/95 backdrop-blur-sm rounded-lg border border-border/50 p-3 flex items-center justify-between gap-4">
        {/* Status on Left */}
        <VpnStatusIndicator status={status} size="lg" />

        {/* Location and IP on Right - Aligned */}
        {ipInfo && (
          <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center text-xs">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-foreground font-semibold">{getLocationText()}</span>

            <Globe className="w-3.5 h-3.5 text-accent" />
            <span className="text-foreground font-mono">{ipInfo.ip}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-xs text-destructive bg-destructive/10 p-2 rounded text-center">
            Connection error
          </div>
        )}
      </div>
    </div>
  );
};