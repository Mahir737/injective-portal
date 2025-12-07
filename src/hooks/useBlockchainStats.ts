import { useState, useEffect } from 'react';

interface BlockchainStats {
  marketCap: number;
  totalTransactions: string;
  blockHeight: string;
  totalAssetValue: number;
  totalStaked: number;
  totalBurned: string;
}

export const useBlockchainStats = () => {
  const [stats, setStats] = useState<BlockchainStats>({
    marketCap: 2450000000,
    totalTransactions: '156.2M',
    blockHeight: '12,450,832',
    totalAssetValue: 890000000,
    totalStaked: 450000000,
    totalBurned: '1.2M INJ'
  });
  const [loading, setLoading] = useState(false);

  // In a real implementation, this would fetch from an API
  useEffect(() => {
    // Placeholder for API integration
  }, []);

  return { stats, loading };
};
