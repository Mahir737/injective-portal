import { useState, useEffect } from 'react';

interface InjectiveStats {
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  loading: boolean;
  error: string | null;
}

export const useInjectiveStats = () => {
  const [stats, setStats] = useState<InjectiveStats>({
    price: 0,
    marketCap: 0,
    volume24h: 0,
    priceChange24h: 0,
    loading: true,
    error: null,
  });

  const fetchStats = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/injective-protocol');
      const data = await response.json();

      setStats({
        price: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        volume24h: data.market_data.total_volume.usd,
        priceChange24h: data.market_data.price_change_percentage_24h,
        loading: false,
        error: null,
      });
    } catch (error) {
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch stats',
      }));
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};
