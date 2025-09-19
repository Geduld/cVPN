import { useState, useEffect, useCallback } from 'react';

export type VpnStatus = 'secure' | 'connecting' | 'vulnerable';

interface IpInfo {
  ip: string;
  country: string;
  country_code: string;
  city: string;
  region: string;
  isp: string;
}

interface VpnStatusData {
  status: VpnStatus;
  ipInfo: IpInfo | null;
  lastChecked: Date | null;
  isLoading: boolean;
  error: string | null;
}

export const useVpnStatus = (checkInterval = 5000) => {
  const [statusData, setStatusData] = useState<VpnStatusData>({
    status: 'connecting',
    ipInfo: null,
    lastChecked: null,
    isLoading: true,
    error: null,
  });

  const checkVpnStatus = useCallback(async () => {
    try {
      setStatusData(prev => ({ ...prev, isLoading: true, error: null }));

      // Use multiple IP geolocation services for reliability
      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://ipinfo.io/json',
      ];

      let ipInfo: IpInfo | null = null;
      let serviceIndex = 0;

      // Try services until one works
      while (!ipInfo && serviceIndex < services.length) {
        try {
          const response = await fetch(services[serviceIndex]);
          if (response.ok) {
            const data = await response.json();
            
            // Normalize data from different services
            ipInfo = {
              ip: data.ip || data.query,
              country: data.country_name || data.country,
              country_code: (data.country_code || data.countryCode || data.country)?.toUpperCase(),
              city: data.city,
              region: data.region || data.regionName,
              isp: data.org || data.isp || 'Unknown',
            };
          }
        } catch (err) {
          console.warn(`Service ${services[serviceIndex]} failed:`, err);
        }
        serviceIndex++;
      }

      if (!ipInfo) {
        throw new Error('All IP services failed');
      }

      // Determine VPN status based on location (user is in Germany, VPN should show different country)
      let status: VpnStatus;
      
      if (ipInfo.country_code === 'DE') {
        // Showing German IP - VPN is not working or not connected
        status = 'vulnerable';
      } else {
        // Showing non-German IP - VPN is working
        status = 'secure';
      }

      setStatusData({
        status,
        ipInfo,
        lastChecked: new Date(),
        isLoading: false,
        error: null,
      });

    } catch (error) {
      setStatusData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to check VPN status',
        status: 'connecting', // Assume connecting if we can't determine
      }));
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkVpnStatus();

    // Set up interval for periodic checks
    const interval = setInterval(checkVpnStatus, checkInterval);

    return () => clearInterval(interval);
  }, [checkVpnStatus, checkInterval]);

  const manualRefresh = useCallback(() => {
    checkVpnStatus();
  }, [checkVpnStatus]);

  return {
    ...statusData,
    refresh: manualRefresh,
  };
};